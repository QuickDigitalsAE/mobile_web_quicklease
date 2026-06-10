import { Form, Formik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import FormControl from '../../components/form/FormControl'
import plus from '../../dist/webImages/plus.svg'
import SubmitButton from '../../components/SubmitButton';
import SkeletonHome from './SkeletonHome';
import { Link } from 'react-router-dom';
import useGet from '../../customHooks/useGet';
import { MainLanguageContext } from '../../context/MainLanguageContext';
import usePost from '../../customHooks/usePost';
import { toast } from "react-toastify";
import OneImageUpload from '../../components/OneImageUpload';
import OneImageUploadMultiple from '../../components/OneImageUploadMultiple';
import swal from "sweetalert";
import CKEditors from '../../components/form/CKEditors';


const Home = ({permission}) => {
  const [imageLoader, setImageLoader] = useState(false)
  const [resget, apiMethodGet] = useGet()
  const { mainLanguage } = useContext(MainLanguageContext);
  useEffect(() => {
    if (mainLanguage) {
      apiMethodGet(`webContents/home/${mainLanguage}`)  
    }
  }, [mainLanguage]);
  const [datas, setDatas] = useState()

  useEffect(() => {
    if (resget.data) {
      setDatas(resget.data?.data)
    }
  }, [resget.data])





  const handleSectionAdd = (sectionKey, fields) => {
    const newEntry = Object.fromEntries(fields.map((field) => [field, ""]));

    setDatas((prevState) => ({
      ...prevState,
      [sectionKey]: [...(prevState[sectionKey] || []), newEntry],
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
        index === index2 ? { ...item, [name]: value } : item
      )
    }));
  }
  const handleCkChange2 = (text, section, index, paragraph) => {
    setDatas(prevService => ({
      ...prevService,
      [section]: prevService[section].map((item, index2) =>
        index === index2 ? { ...item, [paragraph]: text } : item
      )
    }));
  }



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
      formdata.append(`translation[sec_one_paragrah]`, datas["sec_one_paragrah"] ?? "");
      formdata.append(`translation[sec_three_paragrah]`, datas["sec_three_paragrah"] ?? "");
      formdata.append(`sec_three_image`, datas["sec_three_value"] ?? "");
      formdata.append(`sec_six_image`, datas["sec_six_value"] ?? "");
      formdata.append(`sec_seven_image`, datas["sec_seven_value"] ?? "");

      const appendSectionData = (sectionKey, dataArray) => {
        if (Array.isArray(dataArray)) {
          dataArray.forEach((item, index) => {
            Object.entries(item).forEach(([key, value]) => {
              const fieldValue = key === "image" ? item?.imgValue ?? ""
                : key === "banner_image" ? item?.banner_value ?? ""
                  : key === "car_image" ? item?.car_value ?? ""
                    : value;
              let aa = ["banner_value", "car_value", "imgValue"]
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
        { key: "banner", data: datas.banner },
        { key: "sec_one", data: datas.sec_one },
        { key: "sec_two", data: datas.sec_two },
        { key: "sec_three", data: datas.sec_three },
        { key: "sec_four", data: datas.sec_four },
        { key: "sec_five", data: datas.sec_five },
        { key: "sec_seven", data: datas.sec_seven },
        { key: "sec_eight", data: datas.sec_eight },
        { key: "sec_nine", data: datas.sec_nine },
      ].forEach(({ key, data }) => appendSectionData(key, data));

      apiMethod(`webContents/home/${mainLanguage}`, formdata)
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

  const handleCkChange = (e, type) => {
    setDatas(d => ({ ...d, [type]: e }));
  };



  if (resget.isLoading || !datas) return <SkeletonHome />
  const { banner, sec_one, sec_two, sec_three, sec_four, sec_five, sec_seven, sec_eight,sec_nine,sec_one_paragrah,sec_three_paragrah } = datas
  const initialValues = {
    meta_title: resget?.data?.data.meta_title,
    meta_description: resget?.data?.data.meta_description,
    car_heading: resget?.data?.data?.car_heading ?? "",
    sec_one_heading: resget?.data?.data.sec_one_heading,
    sec_two_heading: resget?.data?.data.sec_two_heading,
    sec_two_paragrah: resget?.data?.data.sec_two_paragrah,
    sec_three_heading: resget?.data?.data.sec_three_heading,
    sec_four_heading: resget?.data?.data.sec_four_heading,
    sec_four_paragraph: resget?.data?.data.sec_four_paragraph,
    sec_five_heading_one: resget?.data?.data.sec_five_heading_one,
    sec_five_heading_two: resget?.data?.data.sec_five_heading_two,
    sec_five_paragraph: resget?.data?.data.sec_five_paragraph,
    sec_six_heading_one: resget?.data?.data.sec_six_heading_one,
    sec_six_heading_two: resget?.data?.data.sec_six_heading_two,
    sec_six_paragraph_one: resget?.data?.data.sec_six_paragraph_one,
    sec_six_paragraph_two: resget?.data?.data.sec_six_paragraph_two,
    sec_seven_heading: resget?.data?.data.sec_seven_heading,
    sec_eight_heading: resget?.data?.data.sec_eight_heading,
    sec_nine_heading: resget?.data?.data.sec_nine_heading,
    sec_nine_description: resget?.data?.data.sec_nine_description,
  }
  const check = (module, action) => permission?.[module]?.includes(action);
  return (
    <div className='homePage pr-10 max-lg:pr-6'>
         <h6 className='text-[1rem] mb-2 bookingSectionh relative px-3 font-Mluvka capitalize'>Home Page</h6>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}  >
        <Form>
          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <FormControl name="meta_title" label={"Meta Title"} placeholder="Enter Meta Title" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
            <div className='grid grid-cols-1'>
              <FormControl name="meta_description" label={"Meta Description"} placeholder="Enter Meta Description" className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl resize-none" control="textarea2" />
            <FormControl name="car_heading" label={"Car Heading"} placeholder="Enter Car Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
            </div>
          </div>
          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <div className='flex justify-between'>
              <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Home Banner</div>
              <Link className='bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={() => handleSectionAdd("banner", ["title", "description", "banner_image", "banner_value", "car_image", "car_value"])} >
                <img src={plus} alt="plus" />
                <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
              </Link>
            </div>
            <div className="section4Main grid grid-cols-3 gap-3 mt-4 max-lg:grid-cols-1">
              {
                Array.isArray(banner) && banner.map((item, index) => {
                  const { title, banner_image, car_image, description } = item
                  return (
                    <div className="section3MainBox bg-[#DEE5F2] p-4 rounded-lg relative" key={index}>
                      <div className='closeButton cursor-pointer absolute right-[-.5rem] top-[-.5rem] ml-auto bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] grid place-items-center rounded-[.7rem] z-10'
                        onClick={() => handleDelete("banner", index)}  >
                        <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className="inputBox w-full mt-3">
                        <label htmlFor="" className="mb-1 text-[#7D8CA7] text-[.8rem] flex justify-between"><span>Heading</span>  <span>{(index + 1) >= 10 ? (index + 1) : `0${(index + 1)}`}</span></label>
                        <input name="title" placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" value={title} onChange={(e) => handleInputChange2(e, "banner", index)} />
                      </div>
                      <div className="inputBox w-full mt-3">
                        <label htmlFor="" className="mb-1 block text-[#7D8CA7] text-[.8rem]">Paragraph</label>
                        <textarea id="Paragraph" name="description" placeholder="Paragraph" className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl resize-none" value={description} onChange={(e) => handleInputChange2(e, "banner", index)}></textarea>
                      </div>
                      <div className='mb-2'>
                        <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">banner Image</label>
                        {
                          <OneImageUploadMultiple changeImage={setImageLoader} indexValue={index} section={"banner"} MainImage={banner_image} Update={setDatas} sec_value={"banner_value"} sec_image={"banner_image"} folder_name={"home_banner_images"} page_type={"home"} />
                        }
                      </div>
                      <div>
                        <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">Car Image</label>
                        {
                          <OneImageUploadMultiple changeImage={setImageLoader} indexValue={index} section={"banner"} MainImage={car_image} Update={setDatas} sec_value={"car_value"} sec_image={"car_image"} folder_name={"home_banner_images"} page_type={"home"} />
                        }
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>


          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Section 1</div>
            <FormControl name="sec_one_heading" label={"Heading"} placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
            <CKEditors label={"sec one paragrah"} folder_name={"web_content_images"} page_type={"home"} data={sec_one_paragrah} update={(text) => handleCkChange(text, "sec_one_paragrah")} />
            <div className='flex justify-between mt-5'>
              <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Section 1 Card</div>
              <Link className='bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={() => handleSectionAdd("sec_one", ["title", "description", "banner_image", "banner_value", "car_image", "car_value"])} >
                <img src={plus} alt="plus" />
                <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
              </Link>
            </div>
            <div className="section4Main grid grid-cols-3 gap-3 mt-4 max-lg:grid-cols-1">
              {
                Array.isArray(sec_one) && sec_one.map((item, index) => {
                  const { title, image } = item
                  return (
                    <div className="section3MainBox bg-[#DEE5F2] p-4 rounded-lg relative" key={index}>
                      <div className='closeButton cursor-pointer absolute right-[-.5rem] top-[-.5rem] ml-auto bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] grid place-items-center rounded-[.7rem] z-10'
                        onClick={() => handleDelete("sec_one", index)}  >
                        <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className="inputBox w-full mt-3">
                        <label htmlFor="" className="mb-1 text-[#7D8CA7] text-[.8rem] flex justify-between"><span>Heading</span>  <span>{(index + 1) >= 10 ? (index + 1) : `0${(index + 1)}`}</span></label>
                        <input name='title' placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" value={title} onChange={(e) => handleInputChange2(e, "sec_one", index)} />
                      </div>
                      <div>
                        <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">Image</label>
                        {
                          <OneImageUploadMultiple changeImage={setImageLoader} indexValue={index} section={"sec_one"} MainImage={image} Update={setDatas} sec_value={"imgValue"} sec_image={"image"} folder_name={"web_content_images"} page_type={"home"} />
                        }
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Section 2</div>
            <FormControl name="sec_two_heading" label={"Heading"} placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
            <FormControl name="sec_two_paragrah" label={"Paragrah"} placeholder="Enter Paragrah" className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl" control="textarea2" />
           
            <div className='flex justify-between mt-5'>
              <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Section 2 Card</div>
            </div>
            <div className="section4Main grid grid-cols-3 gap-3 mt-4 max-lg:grid-cols-1">
              {
                Array.isArray(sec_two) && sec_two.map((item, index) => {
                  const { title, image, paragraph } = item
                  return (
                    <div className="section3MainBox bg-[#DEE5F2] p-4 rounded-lg relative" key={index}>
                      <div className="inputBox w-full mt-3">
                        <label htmlFor="" className="mb-1 text-[#7D8CA7] text-[.8rem] flex justify-between"><span>Heading</span>  <span>{(index + 1) >= 10 ? (index + 1) : `0${(index + 1)}`}</span></label>
                        <input name='title' placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" value={title} onChange={(e) => handleInputChange2(e, "sec_two", index)} />
                      </div>
                      <div className="inputBox w-full mt-3">
                        <label htmlFor="" className="mb-1 block text-[#7D8CA7] text-[.8rem]">Paragraph</label>
                        <CKEditors label={"Paragraph"} folder_name={"web_content_images"} page_type={"blogs"} data={paragraph} update={(text) => handleCkChange2(text, "sec_two", index, "paragraph")} />
                      </div>
                      <div>
                        <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">Image</label>
                        {
                          <OneImageUploadMultiple changeImage={setImageLoader} indexValue={index} section={"sec_two"} MainImage={image} Update={setDatas} sec_value={"imgValue"} sec_image={"image"} folder_name={"web_content_images"} page_type={"home"} />
                        }
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Section 3</div>
            <FormControl name="sec_three_heading" label={"Heading"} placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
            <CKEditors label={"sec three paragrah"} folder_name={"web_content_images"} page_type={"home"} data={sec_three_paragrah} update={(text) => handleCkChange(text, "sec_three_paragrah")} />
            <div>
              <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">Section 3 Image </label>
              <OneImageUpload changeImage={setImageLoader} MainImage={datas?.sec_three_image} Update={setDatas} sec_value={"sec_three_value"} sec_image={"sec_three_image"} folder_name={"web_content_images"} page_type={"home"} />
            </div>
            <div className='flex justify-between mt-5'>
              <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Section 3 Card</div>
            </div>
            <div className="section4Main grid grid-cols-3 gap-3 mt-4 max-lg:grid-cols-1">
              {
                Array.isArray(sec_three) && sec_three.map((item, index) => {
                  const { title, paragraph } = item
                  return (
                    <div className="section3MainBox bg-[#DEE5F2] p-4 rounded-lg relative" key={index}>
                      <div className="inputBox w-full mt-3">
                        <label htmlFor="" className="mb-1 text-[#7D8CA7] text-[.8rem] flex justify-between"><span>Heading</span>  <span>{(index + 1) >= 10 ? (index + 1) : `0${(index + 1)}`}</span></label>
                        <input name="title" placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" value={title} onChange={(e) => handleInputChange2(e, "sec_three", index)} />
                      </div>
                      <div className="inputBox w-full mt-3">
                        <label htmlFor="" className="mb-1 block text-[#7D8CA7] text-[.8rem]">Paragraph</label>
                        <textarea id="Paragraph" name="paragraph" placeholder="Paragraph" className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl resize-none" value={paragraph} onChange={(e) => handleInputChange2(e, "sec_three", index)}></textarea>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Section 4</div>
            <FormControl name="sec_four_heading" label={"Heading"} placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
            <FormControl name="sec_four_paragraph" label={"Paragrah"} placeholder="Enter Paragrah" className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl" control="textarea2" />
            <div className='flex justify-between mt-5'>
              <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Section 4 Card</div>
              <Link className='bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={() => handleSectionAdd("sec_four", ["title", "paragraph"])} >
                <img src={plus} alt="plus" />
                <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
              </Link>
            </div>
            <div className="section4Main grid grid-cols-3 gap-3 mt-4 max-lg:grid-cols-1">
              {
                Array.isArray(sec_four) && sec_four.map((item, index) => {
                  const { title, paragraph } = item
                  return (
                    <div className="section3MainBox bg-[#DEE5F2] p-4 rounded-lg relative" key={index}>
                      <div className='closeButton cursor-pointer absolute right-[-.5rem] top-[-.5rem] ml-auto bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] grid place-items-center rounded-[.7rem] z-10'
                        onClick={() => handleDelete("sec_four", index)}  >
                        <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className="inputBox w-full mt-3">
                        <label htmlFor="" className="mb-1 text-[#7D8CA7] text-[.8rem] flex justify-between"><span>Heading</span>  <span>{(index + 1) >= 10 ? (index + 1) : `0${(index + 1)}`}</span></label>
                        <input name="title" placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" value={title} onChange={(e) => handleInputChange2(e, "sec_four", index)} />
                      </div>
                      <div className="inputBox w-full mt-3">
                        <label htmlFor="" className="mb-1 block text-[#7D8CA7] text-[.8rem]">Paragraph</label>
                        <textarea id="Paragraph" name="paragraph" placeholder="Paragraph" className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl resize-none" value={paragraph} onChange={(e) => handleInputChange2(e, "sec_four", index)}></textarea>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Section 5</div>
            <FormControl name="sec_five_heading_one" label={"Heading"} placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
            <FormControl name="sec_five_heading_two" label={"Heading 2"} placeholder="Enter Heading 2" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
            <FormControl name="sec_five_paragraph" label={"Paragrah"} placeholder="Enter Paragrah" className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl" control="textarea2" />
            <div className='flex justify-between mt-5'>
              <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Section 5 Card</div>
              <Link className='bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={() => handleSectionAdd("sec_five", ["title", "paragraph", "image", "imgValue"])} >
                <img src={plus} alt="plus" />
                <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
              </Link>
            </div>
            <div className="section4Main grid grid-cols-3 gap-3 mt-4 max-lg:grid-cols-1">
              {
                Array.isArray(sec_five) && sec_five.map((item, index) => {
                  const { title, paragraph,image } = item
                  return (
                    <div className="section3MainBox bg-[#DEE5F2] p-4 rounded-lg relative" key={index}>
                      <div className='closeButton cursor-pointer absolute right-[-.5rem] top-[-.5rem] ml-auto bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] grid place-items-center rounded-[.7rem] z-10'
                        onClick={() => handleDelete("sec_five", index)}  >
                        <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className="inputBox w-full mt-3">
                        <label htmlFor="" className="mb-1 text-[#7D8CA7] text-[.8rem] flex justify-between"><span>Heading</span>  <span>{(index + 1) >= 10 ? (index + 1) : `0${(index + 1)}`}</span></label>
                        <input name="title" placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" value={title} onChange={(e) => handleInputChange2(e, "sec_five", index)} />
                      </div>
                      <div className="inputBox w-full mt-3">
                        <label htmlFor="" className="mb-1 block text-[#7D8CA7] text-[.8rem]">Paragraph</label>
                        <textarea id="Paragraph" name="paragraph" placeholder="Paragraph" className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl resize-none" value={paragraph} onChange={(e) => handleInputChange2(e, "sec_five", index)}></textarea>
                      </div>
                      <div className='mt-4'>
                        <div>
                          <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">Image </label>
                          <OneImageUploadMultiple changeImage={setImageLoader} indexValue={index} section={"sec_five"} MainImage={image} Update={setDatas} sec_value={"imgValue"} sec_image={"image"} folder_name={"web_content_images"} page_type={"home"} />
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Section 6</div>
            <div className="grid grid-cols-2 max-[1000px]:grid-cols-1 gap-4">
              <FormControl name="sec_six_heading_one" label={"Heading"} placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
              <FormControl name="sec_six_heading_two" label={"Heading 2"} placeholder="Enter Heading 2" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
              <FormControl name="sec_six_paragraph_one" label={"Paragrah"} placeholder="Enter Paragrah" className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl" control="textarea2" />
              <FormControl name="sec_six_paragraph_two" label={"Paragrah 2"} placeholder="Enter Paragrah 2" className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl" control="textarea2" />

              <div className='mt-4'>
                <div>
                  <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">Section 6 Image </label>
                  <OneImageUpload changeImage={setImageLoader} MainImage={datas?.sec_six_image} Update={setDatas} sec_value={"sec_six_value"} sec_image={"sec_six_image"} folder_name={"web_content_images"} page_type={"home"} />
                </div>
              </div>
            </div>
          </div>

          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Section 7</div>
            <FormControl name="sec_seven_heading" label={"Heading"} placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
            <div>
              <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">Section 7 Image </label>
              <OneImageUpload changeImage={setImageLoader} MainImage={datas?.sec_seven_image} Update={setDatas} sec_value={"sec_seven_value"} sec_image={"sec_seven_image"} folder_name={"web_content_images"} page_type={"home"} />
            </div>
            <div className='flex justify-between mt-5'>
              <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Section 7 Card</div>
              <Link className='bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={() => handleSectionAdd("sec_seven", ["title", "paragraph"])} >
                <img src={plus} alt="plus" />
                <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
              </Link>
            </div>
            <div className="section4Main grid grid-cols-3 gap-3 mt-4 max-lg:grid-cols-1">
              {
                Array.isArray(sec_seven) && sec_seven.map((item, index) => {
                  const { title, paragraph } = item
                  return (
                    <div className="section3MainBox bg-[#DEE5F2] p-4 rounded-lg relative" key={index}>
                      <div className='closeButton cursor-pointer absolute right-[-.5rem] top-[-.5rem] ml-auto bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] grid place-items-center rounded-[.7rem] z-10'
                        onClick={() => handleDelete("sec_seven", index)}  >
                        <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className="inputBox w-full mt-3">
                        <label htmlFor="" className="mb-1 text-[#7D8CA7] text-[.8rem] flex justify-between"><span>Heading</span>  <span>{(index + 1) >= 10 ? (index + 1) : `0${(index + 1)}`}</span></label>
                        <input name="title" placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" value={title} onChange={(e) => handleInputChange2(e, "sec_seven", index)} />
                      </div>
                      <div className="inputBox w-full mt-3">
                        <label htmlFor="" className="mb-1 block text-[#7D8CA7] text-[.8rem]">Paragraph</label>
                        <textarea id="Paragraph" name="paragraph" placeholder="Paragraph" className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl resize-none" value={paragraph} onChange={(e) => handleInputChange2(e, "sec_seven", index)}></textarea>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Section 8</div>
            <FormControl name="sec_eight_heading" label={"Heading"} placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
            <div className='flex justify-between mt-5'>
              <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Section 8 Card</div>
              <Link className='bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={() => handleSectionAdd("sec_eight", ["title", "paragraph", "image", "imgValue"])} >
                <img src={plus} alt="plus" />
                <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
              </Link>
            </div>
            <div className="section4Main grid grid-cols-3 gap-3 mt-4 max-lg:grid-cols-1">
              {
                Array.isArray(sec_eight) && sec_eight.map((item, index) => {
                  const { title, image, paragraph,link } = item
                  return (
                    <div className="section3MainBox bg-[#DEE5F2] p-4 rounded-lg relative" key={index}>
                      <div className='closeButton cursor-pointer absolute right-[-.5rem] top-[-.5rem] ml-auto bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] grid place-items-center rounded-[.7rem] z-10'
                        onClick={() => handleDelete("sec_eight", index)}  >
                        <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className="inputBox w-full mt-3">
                        <label htmlFor="" className="mb-1 text-[#7D8CA7] text-[.8rem] flex justify-between"><span>Heading</span>  <span>{(index + 1) >= 10 ? (index + 1) : `0${(index + 1)}`}</span></label>
                        <input name="title" placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" value={title} onChange={(e) => handleInputChange2(e, "sec_eight", index)} />
                      </div>
                      <div className="inputBox w-full mt-3">
                        <label htmlFor="" className="mb-1 text-[#7D8CA7] text-[.8rem] flex justify-between"><span>Slug</span>  <span>{(index + 1) >= 10 ? (index + 1) : `0${(index + 1)}`}</span></label>
                        <input name="link" placeholder="Enter Slug" className="outline-none w-full h-[3rem] px-5 rounded-xl" value={link} onChange={(e) => handleInputChange2(e, "sec_eight", index)} />
                      </div>
                      <div className="inputBox w-full mt-3">
                        <label htmlFor="" className="mb-1 block text-[#7D8CA7] text-[.8rem]">Paragraph</label>
                        <textarea id="Paragraph" name="paragraph" placeholder="Paragraph" className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl resize-none" value={paragraph} onChange={(e) => handleInputChange2(e, "sec_eight", index)}></textarea>
                      </div>
                      <div>
                        <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">Image</label>
                        {
                          <OneImageUploadMultiple changeImage={setImageLoader} indexValue={index} section={"sec_eight"} MainImage={image} Update={setDatas} sec_value={"imgValue"} sec_image={"image"} folder_name={"web_content_images"} page_type={"home"} />
                        }
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Section 9</div>
            <FormControl name="sec_nine_heading" label={"Heading"} placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
            <FormControl name="sec_nine_description" label={"Heading"} placeholder="Enter Heading" className="outline-none mt-2 w-full h-[6rem] px-5 rounded-xl" control="textarea2" />
            <div className='flex justify-between mt-5'>
              <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Section 9 Card</div>
              <Link className='bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={() => handleSectionAdd("sec_nine", ["title", "paragraph", "image", "imgValue"])} >
                <img src={plus} alt="plus" />
                <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
              </Link>
            </div>
            <div className="section4Main grid grid-cols-3 gap-3 mt-4 max-lg:grid-cols-1">
              {
                Array.isArray(sec_nine) && sec_nine.map((item, index) => {
                  const { title, image, paragraph } = item
                  return (
                    <div className="section3MainBox bg-[#DEE5F2] p-4 rounded-lg relative" key={index}>
                      <div className='closeButton cursor-pointer absolute right-[-.5rem] top-[-.5rem] ml-auto bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] grid place-items-center rounded-[.7rem] z-10'
                        onClick={() => handleDelete("sec_nine", index)}  >
                        <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className="inputBox w-full mt-3">
                        <label htmlFor="" className="mb-1 text-[#7D8CA7] text-[.8rem] flex justify-between"><span>Heading</span>  <span>{(index + 1) >= 10 ? (index + 1) : `0${(index + 1)}`}</span></label>
                        <input name="title" placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" value={title} onChange={(e) => handleInputChange2(e, "sec_nine", index)} />
                      </div>
                      <div className="inputBox w-full mt-3">
                        <label htmlFor="" className="mb-1 block text-[#7D8CA7] text-[.8rem]">Paragraph</label>
                        <textarea id="Paragraph" name="paragraph" placeholder="Paragraph" className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl resize-none" value={paragraph} onChange={(e) => handleInputChange2(e, "sec_nine", index)}></textarea>
                      </div>
                      <div>
                        <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">Image</label>
                        {
                          <OneImageUploadMultiple changeImage={setImageLoader} indexValue={index} section={"sec_nine"} MainImage={image} Update={setDatas} sec_value={"imgValue"} sec_image={"image"} folder_name={"web_content_images"} page_type={"home"} />
                        }
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          {check("WebContents", "WebContents Edit") &&<SubmitButton
            props={{
              class: "btn bg-secondary text-white px-12 ml-auto uppercase mb-3   py-3 rounded-full w-100 block mt-5 submit hover:bg-primary transition-all duration-300",
              text: "Submit",
            }}
            buttonLoading={res.isLoading}
          />}
        </Form>
      </Formik>
    </div>
  )
}

export default Home
