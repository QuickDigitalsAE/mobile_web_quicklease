import React, { useContext, useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import FormControl from '../components/form/FormControl';
import SubmitButton from '../components/SubmitButton';
import CKEditors from '../components/form/CKEditors';
import { Link, useNavigate } from 'react-router-dom';
import SkeletonCreateEdit from './SkeletonCreateEdit';
import { MainLanguageContext } from '../context/MainLanguageContext';
import { toast } from 'react-toastify';
import usePost from '../customHooks/usePost';
import StatusToggle from '../components/form/StatusToggle';
import swal from "sweetalert";
import profile from "../dist/webImages/profile.webp"
import camera from "../dist/webImages/camera.svg"
import OneImageUpload from '../components/OneImageUpload';
import plus from '../dist/webImages/plus.svg'
import { FiPlus } from 'react-icons/fi';

const CreateProductsProperties = () => {
  const navigate = useNavigate();
  const { mainLanguage } = useContext(MainLanguageContext);
  const [loading, setLoading] = useState(true)
  const [datas, setDatas] = useState({
    "property_image": "",
    "property_values": [""],
  })

  let initialValues = {
    type: "",
    property_title: "",
    property_field_type: "",
    property_status: ["1"],
  };

  const [imageLoader, setImageLoader] = useState(false)

  const handleSectionAdd = (sectionKey) => {

    setDatas((prevState) => ({
      ...prevState,
      [sectionKey]: [...(prevState[sectionKey] || []), ""],
    }));
  };

  const handleDelete = (section, index) => {
    setDatas(prevService => ({
      ...prevService,
      [section]: prevService[section].filter((item, index2) => index !== index2)
    }));
  }
  const handleInputChange2 = (e, section, index) => {
    const { name, value } = e.target;
    setDatas(prevService => ({
      ...prevService,
      [section]: prevService[section].map((item, index2) =>
        index === index2 ? value : item
      )
    }));
  }

  const [res, apiMethod] = usePost();
  const requireFeild = ["type", "property_title", "property_field_type",];
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
        type: "Type",
        property_title: "property title",
        property_field_type: "property field type",
      };

      let checkerRequried = [];
      for (const item in values) {
        if (requireFeild.includes(item) && !values[item]) {
          checkerRequried.push(requireFeildSwal[item]);
        }
      }

      formdata.append(`property_status`, values["property_status"]?.length > 0 ? values["property_status"] : "0");
      formdata.append(`type`, values["type"]);
      formdata.append(`translation[property_title]`, values["property_title"]);
      formdata.append(`property_field_type`, values["property_field_type"]);

      if (checkerRequried.length > 0) {
        swal({
          title: "Required Fields are empty! Please fill and try again",
          text: checkerRequried.join(","),
          icon: "error",
          dangerMode: true,
        });
      }
      else {
        for (let index = 0; index < property_values.length; index++) {
          formdata.append(`translation[property_values][]`, datas?.property_values[index] ?? "");

        }
        formdata.append(`property_image`, datas?.property_image_value ?? "");
        apiMethod(`properties/create/${mainLanguage}`, formdata)
      }

    }

  };

  useEffect(() => {
    if (res.data) {
      const { status, message } = res?.data
      if (status === "false") {
        toast.error(message);
      }
      else {
        navigate(`/products/properties`)
        toast.success(message);
      }
    }
  }, [res.data])

  // if (loading) return <SkeletonCreateEdit heading={"Create Products Properties"} />;

  const { property_values } = datas;

  return (
    <div className='newscreate product-create-page'>
      <div className="product-create-page__hero">
        <div>
          <span className="product-create-page__eyebrow">Product Attributes</span>
          <h2>Create a property with cleaner structure</h2>
          <p>
            Define the property type, value options, field behavior, and status from a more polished setup screen.
          </p>
        </div>
      </div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form name="myForm" className="product-create-page__form">
          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3'>
            <div className="grid grid-cols-2  gap-2">
              <div className='mt-3'>
                <div className="mb-1 block text-[#7D8CA7] text-[.9rem]"> Type </div>
                <Field as="select" name="type" className="outline-none w-full h-[3rem] px-5 rounded-xl border border-[#c4d0e3]" >
                  <option value="">---select Type ---</option>
                  <option value="general_information">General Information</option>
                  <option value="car_options">Car Options</option>
                  <option value="car_services">Car Services</option>
                </Field>
              </div>
              <FormControl name="property_title" label={"Heading {h1}"} placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl border border-[#c4d0e3]" control="input2" />
            </div>
          </div>

          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <div className="h4 text-[#7D8CA7] text-[1.5rem] ">Property</div>
            <div>
              <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">property image </label>
              <OneImageUpload changeImage={setImageLoader} MainImage={datas?.property_image} Update={setDatas} sec_value={"property_image_value"} sec_image={"property_image"} folder_name={"properties_images"} page_type={"properties"} />
            </div>
            <div className='flex justify-between mt-5'>
              <div className="h4 text-[#7D8CA7] text-[1.5rem] ">Property Value List</div>
              <Link className='users-table-page__add bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={() => handleSectionAdd("property_values")} >
                <span className='users-table-page__addIcon'>
                  <FiPlus />
                </span>
                <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
              </Link>
            </div>
            <div className="section4Main grid grid-cols-3 gap-3 mt-4 max-lg:grid-cols-1">
              {
                Array.isArray(property_values) && property_values.map((item, index) => {
                  return (
                    <div className="section3MainBox bg-[#DEE5F2] p-4 rounded-lg relative" key={index}>
                      <div className='closeButton cursor-pointer absolute right-[-.5rem] top-[-.5rem] ml-auto bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] grid place-items-center rounded-[.7rem] z-10'
                        onClick={() => handleDelete("property_values", index)}  >
                        <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className="inputBox w-full mt-3">
                        <label htmlFor="" className="mb-1 text-[#7D8CA7] text-[.8rem] flex justify-between"><span>Values</span>  <span>{(index + 1) >= 10 ? (index + 1) : `0${(index + 1)}`}</span></label>
                        <input name='title' placeholder="Enter Values" className="outline-none w-full h-[3rem] px-5 rounded-xl border border-[#c4d0e3]" value={item} onChange={(e) => handleInputChange2(e, "property_values", index)} />
                      </div>
                    </div>
                  )
                })
              }
            </div>

            <div className='mt-3'>
              <div className="mb-1 block text-[#7D8CA7] text-[.9rem]"> Field Type </div>
              <Field as="select" name="property_field_type" className="outline-none w-full h-[3rem] px-5 rounded-xl border border-[#c4d0e3]" >
                <option value="">---select Field Type ---</option>
                <option value="selector">selector</option>
                <option value="input">input</option>
                <option value="radio">radio</option>
                <option value="checkbox">checkbox</option>
              </Field>
            </div>

            <StatusToggle
              name="property_status"
              label="Property Status"
              checkedLabel="Enable"
            />
          </div>
          <div className="product-create-page__actions">
            <Link to="/products/properties" className="product-create-page__cancel">
              Cancel
            </Link>
            <SubmitButton
              props={{
                class: "product-create-page__submit btn bg-secondary text-white px-12 uppercase py-3 rounded-full w-100 block submit hover:bg-primary transition-all duration-300",
                text: "Create Property",
              }}
              buttonLoading={res.isLoading}
            />
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default CreateProductsProperties
