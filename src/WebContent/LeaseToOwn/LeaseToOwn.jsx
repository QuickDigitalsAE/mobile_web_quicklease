import { Form, Formik } from 'formik'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import FormControl from '../../components/form/FormControl'
import plus from '../../dist/webImages/plus.svg'
import SubmitButton from '../../components/SubmitButton';
import { Link } from 'react-router-dom';
import useGet from '../../customHooks/useGet';
import { MainLanguageContext } from '../../context/MainLanguageContext';
import usePost from '../../customHooks/usePost';
import { toast } from "react-toastify";
import OneImageUpload from '../../components/OneImageUpload';
import swal from "sweetalert";
import CKEditors from '../../components/form/CKEditors';
import useFetch from '../../customHooks/useFetch';
import noimg from '../../dist/webImages/nocar.jpg'
import { Tooltip } from 'antd';
import SkeletonLeaseToOwn from './SkeletonLeaseToOwn';
import OneImageUploadMultiple2 from '../../components/OneImageUploadMultiple2';

const LeaseToOwn = ({permission}) => {
  const { mainLanguage } = useContext(MainLanguageContext);
  const [imageLoader, setImageLoader] = useState(false)
  const [resget, apiMethodGet] = useGet()
  const { loading, data } = useFetch(`products/allCars/${mainLanguage}`);
  useEffect(() => {
    if (mainLanguage) {
      apiMethodGet(`webContents/lease-to-own-page/${mainLanguage}`)
    }
  }, [mainLanguage]);
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
      const [car, setCar] = useState([]);
      const [addCar, setAddCar] = useState({
          addCarStatus: false,
          CarList: [],
      });
      const { addCarStatus, CarList } = addCar;
  
      useEffect(() => {
          if (data) {
              setAddCar((prevdata) => ({ ...prevdata, CarList: data?.data }));
          }
      }, [data]);

  const [datas, setDatas] = useState()

  useEffect(() => {
    if (resget.data) {
      setDatas(resget.data?.data)
      setCar(resget.data?.data?.related_cars)
    }
  }, [resget.data])

  const handleCarsToggle = (id) => {
    setCar((prevState) => {
        const isActive = prevState.some((item) => item.id === id);
        if (isActive) {
            return prevState.filter((item) => item.id !== id);
        } else {
            const newCar = CarList.find((item) => item.id === id);
            return [...prevState, newCar];
        }
    });
};

const handleRemoveCars = (index) => {
    swal({
        title: "Are you sure?",
        text: "you want to remove team member?",
        buttons: true,
        icon: "warning",
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            setCar((prevExpertise) => prevExpertise.filter((_, i) => i !== index));
            swal("Successfully Delete", "", "success");
        }
    });
};

  const handleDelete = (section, index) => {
    setDatas(prevService => ({
      ...prevService,
      [section]: prevService[section].filter((item, index2) => index !== index2)
    }));
  }

  const handleCkChange = (e, type) => {
    setDatas(d => ({ ...d, [type]: e }));
  };

  const handleSectionAdd2 = (sectionKey, fields) => {
    setDatas((prevState) => ({
      ...prevState,
      [sectionKey]: [...(prevState[sectionKey] || []), ""],
    }));
  };

  const [res, apiMethod] = usePost();
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
      for (const item in values) {
        formdata.append(`translation[${item}]`, values[item]);
      }

      const appendSectionData = (sectionKey, dataArray) => {
        if (Array.isArray(dataArray)) {
          dataArray.forEach((item, index) => {
            Object.entries(item).forEach(([key, value]) => {
              const fieldValue = key === "image" ? item?.imgValue ?? ""
                : key === "slide_banner" ? item?.slide_banner_value ?? ""
                  : key === "car_image" ? item?.car_value ?? ""
                    : value;
              let aa = ["slide_banner", "car_value", "imgValue"]
              if (aa.includes(key)) {

              }
              else {
                formdata.append(`translation[${sectionKey}][${index}][${key}]`, fieldValue);
              }
            });
          });
        }
      };

      // Shortened usage for all sections
      [
        { key: "slide_banner", data: datas.slide_banner },
      ].forEach(({ key, data }) => appendSectionData(key, data));

      for (let index = 0; index < car.length; index++) {
       formdata.append(`car_ids[]`, car[index]?.id);
       
      }
      console.log(datas)
      formdata.append(`translation[sec_one_description]`, datas?.sec_one_description);
      formdata.append(`banner`, datas?.banner_value ?? "");
      formdata.append(`sec_one_image`, datas?.sec_one_value ?? "");
      apiMethod(`webContents/lease-to-own-page/${mainLanguage}`, formdata)
    }
  }
  useEffect(() => {
    if (res.data) {
      const { status, message } = res?.data
      if (status === false) {
        toast.error(message);
      }
      else {
        toast.success(message);
      }
    }
  }, [res.data])

  if (resget.isLoading || !datas) return <SkeletonLeaseToOwn />
  const { banner,sec_one_image, sec_one_description, slide_banner } = datas
  const initialValues = {
    meta_title: resget?.data?.data.meta_title,
    meta_description: resget?.data?.data.meta_description,
    banner_title: resget?.data?.data.banner_title,
    sec_one_heading: resget?.data?.data.sec_one_heading,
  }
  const check = (module, action) => permission?.[module]?.includes(action);
  return (
    <div className='homePage  '>
      <div className='relative flex items-start gap-3'>
      <div className=" bg-white rounded-xl w-full  mx-auto relative">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}  >
        <Form>
          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <FormControl name="meta_title" label={"Meta Title"} placeholder="Enter Meta Title" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
            <div className='grid grid-cols-1'>
              <FormControl name="meta_description" label={"Meta Description"} placeholder="Enter Meta Description" className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl resize-none" control="textarea2" />
            </div>
          </div>

          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <div className="h4 text-[#7D8CA7] text-[1.1rem] ">corporate lease</div>
            <FormControl name="banner_title" label={"banner title"} placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />

            <div>
                <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">Banner </label>
                <OneImageUpload changeImage={setImageLoader} MainImage={banner} Update={setDatas} sec_value={"banner_value"} sec_image={"banner"} folder_name={"web_content_images"} page_type={"corporatelease"} />
              </div>
           </div>

           <div className='mt-4'>
              <div>
                <div className='flex justify-between'>
                  <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Car Images</div>
                  <Link className='bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={() => handleSectionAdd2("slide_banner", [])} >
                    <img src={plus} alt="plus" />
                    <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
                  </Link>
                </div>
                <div className="section4Main grid grid-cols-3 gap-3 mt-4 max-lg:grid-cols-1">
                  {
                    Array.isArray(slide_banner) && slide_banner.map((item, index) => {
                      const { image_path, image_path_value, image_full_path } = item
                      return (
                        <div className='relative' key={index}>
                          <div className='closeButton cursor-pointer absolute right-[-.5rem] top-[-.5rem] ml-auto bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] grid place-items-center rounded-[.7rem] z-10'
                            onClick={() => handleDelete("slide_banner", index)}  >
                            <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">Car Image</label>
                          {
                            <OneImageUploadMultiple2 changeImage={setImageLoader} indexValue={index} sec_value={"image_path_value"} sec_image={"image_path"} section={"slide_banner"} MainImage={image_path_value ?? image_full_path} Update={setDatas} folder_name={"products_images"} page_type={"products"} />
                          }
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>

           <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
           <FormControl name="sec_one_heading" label={"sec one"} placeholder="Enter sec one" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
           <CKEditors label={"sec_one_description"} data={sec_one_description} update={(text) => handleCkChange(text, "sec_one_description")} />
           <div>
                <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">sec one Banner </label>
                <OneImageUpload changeImage={setImageLoader} MainImage={sec_one_image} Update={setDatas} sec_value={"sec_one_value"} sec_image={"sec_one_image"} folder_name={"web_content_images"} page_type={"corporatelease"} />
              </div>
          
          </div>
          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
          <div className="">
                                    <ul className="list flex flex-wrap gap-2">
                                        {car &&
                                            car.map((item, index) => {
                                                const { id, main_image, product_title } = item;
                                                return (
                                                    <li className="dpartCardProfile-img relative" key={index} >
                                                        <div className="close w-[1.2rem] h-[1.2rem] grid place-items-center p-1 absolute top-[-.2rem] right-[-.2rem] bg-[#FF9898] rounded-3xl cursor-pointer" onClick={() => handleRemoveCars(index)}  >
                                                            <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                                <path d="M6.22583 1.00391L1.19141 6.03799M6.22583 6.03833L1.19141 1.00423" stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </div>
                                                        <Tooltip placement="rightTop" title={product_title} arrow={mergedArrow}>
                                                            <img className={`w-[5rem] h-[5rem] object-cover border-2 border-[#fff]`} src={main_image} alt={id} />
                                                        </Tooltip>
                                                    </li>
                                                );
                                            })}
                                    </ul>

                                    <div className="border mt-3 w-fit border-[#CFD5E2] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer" onClick={() => setAddCar((d) => ({ ...d, addCarStatus: !addCarStatus }))}>
                                        <img src={plus} alt="plus" />
                                        <span className="font-MluvkaBold text-secondary capitalize">  Add Car  </span>
                                    </div>

                                </div>
                                </div>
  
         {check("WebContents", "WebContents Edit") && <SubmitButton
            props={{
              class: "btn bg-secondary text-white px-12 ml-auto uppercase mb-3   py-3 rounded-full w-100 block mt-5 submit hover:bg-primary transition-all duration-300",
              text: "Submit",
            }}
            buttonLoading={res.isLoading}
          />}
        </Form>
      </Formik>
      </div>
      <div className="bg-[#D4DEF1] w-0 sticky top-0 overflow-hidden  transition-all duration-700  rounded-xl max-lg:absolute max-lg:right-0 max-lg:w-[20rem!important]" style={{ width: addCarStatus ? "30%" : "0" }} >
                    {addCarStatus && (
                        <div className="px-3  py-4">
                            <div className="h4 text-[1.1rem] font-MluvkaBold mb-4">
                                <span>Car List</span>
                                <div className="closeButton cursor-pointer absolute bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] top-[.7rem] right-[.7rem] grid place-items-center rounded-[.7rem] z-10" onClick={() => setAddCar((d) => ({ ...d, addCarStatus: !addCarStatus }))} >
                                    <svg className="w-full h-full" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"  >
                                        <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                            <ul className="list lowyerlist overflow-y-auto max-h-[70vh] pr-2">
                                {Array.isArray(CarList) &&
                                    CarList.map((item) => {
                                        const { id, product_title, main_image } = item;
                                        const carlistactive = car.map((l) => l.id);
                                        return (
                                            <li key={id} className="bg-white cursor-pointer my-3 border border-white rounded-3xl py-2 px-4" onClick={() => handleCarsToggle(id)} style={{ borderColor: carlistactive.includes(id) ? "#DCB33E" : "white" }} >
                                                <div className="lawyerCard_ flex items-center gap-4">
                                                    <div className="lawyerCard__img">
                                                        <img className="w-[2.5rem] h-[2.5rem] object-cover rounded-sm" onError={(e) => { e.target.src = noimg; }} src={main_image} alt={product_title} />
                                                    </div>
                                                    <div className="lawyerCard__txt">
                                                        <div className="h2 text-[.9rem] font-Mluvka leading-[1]"> {product_title} </div>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                            </ul>
                        </div>
                    )}
      </div>
      </div>
     
     
    </div>
  )
}

export default LeaseToOwn
