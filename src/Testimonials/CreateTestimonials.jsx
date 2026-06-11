import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import FormControl from '../components/form/FormControl';
import SubmitButton from '../components/SubmitButton';
import CKEditors from '../components/form/CKEditors';
import { Link, useNavigate } from 'react-router-dom';
import SkeletonCreateEdit from './SkeletonCreateEdit';
import { MainLanguageContext } from '../context/MainLanguageContext';
import { toast } from 'react-toastify';
import usePost from '../customHooks/usePost';
import swal from "sweetalert";
import useFetch from '../customHooks/useFetch';
import plus from '../dist/webImages/plus.svg'
import noimg from '../dist/webImages/nocar.jpg'
import OneImageUpload from '../components/OneImageUpload';
import { Select, Tooltip } from 'antd';

const CreateTestimonials = () => {
  const navigate = useNavigate();
  const [arrow, setArrow] = useState('Show');
  const mergedArrow = useMemo(() => {
    if (arrow === 'Hide') {
      return false;
    }
    if (arrow === 'Show') {
      return true;
    }
    return {
      pointAtCenter: true,
    };
  }, [arrow]);
  const [imageLoader, setImageLoader] = useState(false)
  const { loading: loading, data: data } = useFetch(`products/allCars/en`);
  const [car, setCar] = useState("")
       const [addCar, setAddCar] = useState()
  useEffect(() => {
            if (data) {
              let list = [];
              for (let index = 0; index < data?.data.length; index++) {
                list.push({
                  label: data?.data[index]?.product_title,
                  value: data?.data[index]?.id,
                })
                
              }
              setAddCar(list);
            }
          }, [data]);
  const { mainLanguage } = useContext(MainLanguageContext);
  const [datas, setDatas] = useState({
    "client_image": "",
    "client_review": "",
    "car_ids": []
  })

  let initialValues = {
    client_name: "",
    client_email: "",
    client_phone: "",
    testimonial_status: ["1"],
  };

  const handleCkChange = (e, type) => {
    setDatas(d => ({ ...d, [type]: e }));
  };

  const handleCarsToggle = (item) => {
    setCar(item);
  }

  const [res, apiMethod] = usePost();
  const requireFeild = ["client_name"];
  const handleSubmit = async (values) => {
    if (imageLoader) {
      swal({
        title: "Wait a Few Second",
        icon: "error",
        dangerMode: true,
      });
    }
    else {
      let formdata = new FormData();
      let requireFeildSwal = {
        client_name: "Client Name",
      };
      let checkerRequried = [];
      for (const item in values) {
        if (requireFeild.includes(item) && !values[item]) {
          checkerRequried.push(requireFeildSwal[item]);
        }
      }

      formdata.append(`translation[client_name]`, values["client_name"]);
      formdata.append(`client_email`, values["client_email"]);
      formdata.append(`client_phone`, values["client_phone"]);
      formdata.append(`testimonial_status`, values["testimonial_status"].length > 0 ? values["testimonial_status"] : "0");
      if (checkerRequried.length > 0) {
        swal({
          title: "Required Fields are empty! Please fill and try again",
          text: checkerRequried.join(","),
          icon: "error",
          dangerMode: true,
        });
      }
      else {
        formdata.append(`translation[client_review]`, datas?.client_review);
        formdata.append(`client_image`, datas?.client_value ?? "");
          formdata.append(`car_id`, car);  
      

        apiMethod(`testimonials/create/${mainLanguage}`, formdata)
      }
    };
  }

  useEffect(() => {
    if (res.data) {
      const { status, message } = res?.data
      if (status === "false") {
        toast.error(message);
      }
      else {
        navigate("/testimonials")
        toast.success(message);
      }
    }
  }, [res.data])
  if (loading) return <SkeletonCreateEdit heading={"Create Testimonials"} />;
  const { client_review } = datas;

  return (
    <div className='newscreate product-create-page'>
<div className="product-create-page__hero">
        <span className="product-create-page__eyebrow">Testimonials management</span>
        <h2>Create Testimonial</h2>
        <p>Add customer feedback in the same compact, modern layout used across the refreshed admin forms.</p>
      </div>
<div className='relative flex items-start gap-3'>
        <div className='bg-white rounded-3xl w-full p-4 mx-auto relative'>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form name="myForm" className="product-create-page__form">
              <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3'>
                <div className="grid grid-cols-2 gap-2">

                  <FormControl name="client_name" label={"Name"} placeholder="Enter Name" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                  <FormControl name="client_email" type="email" label={"Email"} placeholder="Enter Email" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                  <FormControl name="client_phone" label={"Phone"} placeholder="Enter Phone" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                </div>
              </div>
              <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
                <div className="mb-1 block text-[#7D8CA7] text-[.8rem]">Reviews</div>
                <CKEditors label={"Reviews"} data={client_review} update={(text) => handleCkChange(text, "client_review")} />

                <div className='mt-4'>
                  <div>
                    <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">Client Image </label>
                    <OneImageUpload changeImage={setImageLoader} MainImage={datas?.client_image} Update={setDatas} sec_value={"client_value"} sec_image={"client_image"} folder_name={"testimonial_client_images"} page_type={"testimonials"} />
                  </div>
                </div>

      <br />
      <br />

                {addCar &&      <div className='antdheight'>
                <div className="h4 text-[#7D8CA7] text-[.8rem] mb-1">Product List</div>
                <Select
                 showSearch
                  placeholder="Please select"
                  onChange={(e) => handleCarsToggle(e)}
                  style={{
                    width: '100%',
                  }}
                  value={car}
                  options={addCar}
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                />
              </div>}

                <div className="overflow-hidden relative pt-7 px-4">
                  <label className="inline-flex items-center cursor-pointer">
                    <Field value="1" type="checkbox" name="testimonial_status" className="sr-only peer" />
                    <div className="relative bg-[#1c1c1c] w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer bg-gray-200 peer-checked:after:translate-x-full   after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#401a89]"></div>
                    <span className="ms-3 text-sm font-medium text-gray-900">Testimonials Status</span>
                  </label>
                </div>

              </div>

              <div className="product-create-page__actions">
                <Link to="/testimonials" className="product-create-page__cancel">
                  Cancel
                </Link>
                <SubmitButton
                  props={{
                    class: "product-create-page__submit btn bg-secondary text-white px-12 uppercase py-3 rounded-full w-100 block submit hover:bg-primary transition-all duration-300",
                    text: "Create Testimonial",
                  }}
                  buttonLoading={res.isLoading}
                />
              </div>
            </Form>
          </Formik>
        </div>
      </div>

    </div>
  )
}

export default CreateTestimonials
