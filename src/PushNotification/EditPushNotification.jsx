import React, { useEffect, useState } from 'react';
import back from '../dist/webImages/back.svg';
import { Form, Formik } from 'formik';
import { Link, useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { toast } from 'react-toastify';
import FormControl from '../components/form/FormControl';
import SkeletonCreateEdit from './SkeletonCreateEdit';
import SubmitButton from '../components/SubmitButton';
import useGet from '../customHooks/useGet';
import OneImageUpload from '../components/OneImageUpload'; // path check kar lena
import usePut2 from '../customHooks/usePut2';

const EditPushNotification = ({ permission }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resget, apiMethodGet] = useGet();
  const [res, apiMethod] = usePut2();

  const [datas, setDatas] = useState({
    image: '',
  });

  const [imageLoader, setImageLoader] = useState(false);

  const [dataFields, setDataFields] = useState([{ key: '', value: '' }]);

  useEffect(() => {
    apiMethodGet(`admin/notifications/${id}`);
  }, [id]);

  useEffect(() => {
    if (res.error) {
      toast.error(res?.error?.response?.data?.message ?? 'Failed to update notification');
    }
  }, [res.error]);

  useEffect(() => {
    if (res.data) {
      const { status, message } = res.data;

      if (status === 'false' || status === false) {
        toast.error(message);
        return;
      }

      toast.success(message ?? 'Notification updated successfully');
      navigate('/push-notification');
    }
  }, [navigate, res.data]);

  const notificationData = resget?.data?.data ?? {};

  useEffect(() => {
    if (notificationData && Object.keys(notificationData).length > 0) {
        setDatas(notificationData)
      setDataFields(formatDataToFields(notificationData?.data));
    }
  }, [resget.data]);

  const formatDataToFields = (dataObj) => {
    if (!dataObj || typeof dataObj !== 'object' || Array.isArray(dataObj)) {
      return [{ key: '', value: '' }];
    }

    const entries = Object.entries(dataObj).map(([key, value]) => ({
      key: key ?? '',
      value: value !== null && value !== undefined ? String(value) : '',
    }));

    return entries.length > 0 ? entries : [{ key: '', value: '' }];
  };

  const addDataField = () => {
    setDataFields((prev) => [...prev, { key: '', value: '' }]);
  };

  const removeDataField = (index) => {
    setDataFields((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDataFieldChange = (index, field, value) => {
    setDataFields((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const buildDataObject = () => {
    const obj = {};

    for (const item of dataFields) {
      const key = item.key?.trim();
      const value = item.value?.trim();

      if (!key && !value) continue;

      if (!key) {
        throw new Error('One of the data keys is empty.');
      }

      obj[key] = value ?? '';
    }

    return obj;
  };

  const handleSubmit = async (values) => {
    if (imageLoader) {
      swal({
        title: 'Wait a few seconds',
        text: 'Image is still uploading.',
        icon: 'error',
        dangerMode: true,
      });
      return;
    }

    const requiredFields = ['title', 'notification'];
    const fieldLabels = {
      title: 'Title',
      notification: 'Notification',
    };

    const emptyFields = requiredFields
      .filter((field) => !values[field]?.trim())
      .map((field) => fieldLabels[field]);

    if (emptyFields.length > 0) {
      swal({
        title: 'Required fields are empty',
        text: emptyFields.join(', '),
        icon: 'error',
        dangerMode: true,
      });
      return;
    }

    let parsedData = {};
    try {
      parsedData = buildDataObject();
    } catch (error) {
      swal({
        title: 'Invalid data fields',
        text: error.message || 'Please fill all key/value fields correctly.',
        icon: 'error',
        dangerMode: true,
      });
      return;
    }

    const finalImage = datas?.image_value|| '';

    const payload = {
      title: values.title.trim(),
      notification: values.notification.trim(),
      image: finalImage,
      data: parsedData,
    };

    await apiMethod(`admin/notifications/${id}`, payload, 'put');
  };

  const initialValues = {
    title: notificationData?.title ?? '',
    notification: notificationData?.notification ?? '',
    image: notificationData?.image ?? '',
  };

  const check = (module, action) => permission?.[module]?.includes(action);

  if (resget.isLoading || !resget.data) {
    return <SkeletonCreateEdit heading="Edit Push Notification" />;
  }

  return (
    <section className="PushNotificationCreate pr-10 max-lg:pr-6">
      <Link to="/push-notification" className="back flex items-center mb-5 gap-2">
        <img src={back} className="w-[2rem]" alt="" />
        <span className="text-[1.4rem] font-MluvkaBold">Edit Push Notification</span>
      </Link>

      <div className="relative flex items-start gap-3">
        <div className="bg-white rounded-xl w-full mx-auto relative">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            <Form name="pushNotificationCreateForm">
              <div className="bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3">
                <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1">
                  <FormControl
                    name="title"
                    label="Title"
                    placeholder="Enter title"
                    className="outline-none w-full h-[3rem] px-5 rounded-xl"
                    control="input2"
                  />
                </div>

                <div className="mt-4">
                  <label className="mb-2 block text-[#7D8CA7] text-[.8rem]">
                    Image
                  </label>
                  <OneImageUpload
                    changeImage={setImageLoader}
                    MainImage={datas?.image}
                    Update={setDatas}
                    sec_value={'image_value'}
                    sec_image={'image'}
                    folder_name={'push_notification_images'}
                    page_type={'Push_Notification'}
                  />
                </div>

                <div className="mt-4">
                  <FormControl
                    name="notification"
                    label="Notification"
                    placeholder="Enter notification message"
                    className="outline-none w-full h-[8rem] px-5 py-3 rounded-xl resize-none"
                    control="textarea2"
                  />
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-[#7D8CA7] text-[.8rem]">
                      Data (Key / Value)
                    </label>

                    <button
                      type="button"
                      onClick={addDataField}
                      className="bg-secondary text-white px-4 py-2 rounded-lg text-sm"
                    >
                      + Add More
                    </button>
                  </div>

                  <div className="space-y-3">
                    {dataFields.map((item, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-[1fr_1fr_auto] gap-3 max-lg:grid-cols-1"
                      >
                        <input
                          type="text"
                          placeholder="Key e.g. screen"
                          value={item.key}
                          onChange={(e) =>
                            handleDataFieldChange(index, 'key', e.target.value)
                          }
                          className="outline-none w-full h-[3rem] px-4 rounded-xl"
                        />

                        <input
                          type="text"
                          placeholder="Value e.g. home"
                          value={item.value}
                          onChange={(e) =>
                            handleDataFieldChange(index, 'value', e.target.value)
                          }
                          className="outline-none w-full h-[3rem] px-4 rounded-xl"
                        />

                        {dataFields.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeDataField(index)}
                            className="bg-[#fb2c36] text-white px-4 py-2 rounded-xl h-[3rem]"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {check('PushNotification', 'PushNotification Edit') && (
                <SubmitButton
                  props={{
                    class:
                      'btn bg-secondary text-white px-12 ml-auto uppercase mb-3 py-3 rounded-full w-100 block mt-5 submit hover:bg-primary transition-all duration-300',
                    text: 'Update',
                  }}
                  buttonLoading={res.isLoading}
                />
              )}
            </Form>
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default EditPushNotification;