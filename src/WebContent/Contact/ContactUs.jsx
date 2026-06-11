import { Form, Formik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import FormControl from '../../components/form/FormControl'
import swal from "sweetalert";
import camera from "../../dist/webImages/camera.svg"
import profile from "../../dist/webImages/profile.webp"
import plus from '../../dist/webImages/plus.svg'
import { Link } from 'react-router-dom';
import SubmitButton from '../../components/SubmitButton';
import { MainLanguageContext } from '../../context/MainLanguageContext';
import useGet from '../../customHooks/useGet';
import usePost from '../../customHooks/usePost';
import { toast } from 'react-toastify';
import SkeletonContactUs from './SkeletonContactUs';
import CKEditors from '../../components/form/CKEditors';
import OneImageUpload from '../../components/OneImageUpload';
import OneImageUploadMultiple from '../../components/OneImageUploadMultiple';
const ContactUs = ({permission}) => {
             const [imageLoader, setImageLoader] = useState(false)
    const [resget, apiMethodGet] = useGet()
    const { mainLanguage } = useContext(MainLanguageContext);
    useEffect(() => {
        apiMethodGet(`webContents/contact-us/${mainLanguage}`)
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

    const handleCkChange = (e, type) => {
        setDatas(d => ({ ...d, [type]: e }));
      };

    const [res, apiMethod] = usePost();
    const handleSubmit = async (values) => {
        if(imageLoader) {
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
                        const fieldValue = key === "image" ? item?.imgValue ?? "" : value;
                        let aa = ["imgValue"]
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
            { key: "social", data: datas.social },
        ].forEach(({ key, data }) => appendSectionData(key, data));
        formdata.append(`translation[opening_text]`, datas?.opening_text);  
        formdata.append(`translation[address]`, datas?.address);  
        formdata.append(`translation[banner]`, datas?.banner);  
        apiMethod(`webContents/contact-us/${mainLanguage}`, formdata)
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

    if (resget.isLoading || !datas) return <SkeletonContactUs />
    const { social } = datas
    const initialValues = {
        meta_title: resget?.data?.data?.meta_title,
        meta_description: resget?.data?.data?.meta_description,
        banner_title: resget?.data?.data?.banner_title,
        heading: resget?.data?.data?.heading,
        short_paragraph: resget?.data?.data?.short_paragraph,
        address_heading: resget?.data?.data?.address_heading,
        address: resget?.data?.data?.address,
        phone_heading: resget?.data?.data?.phone_heading,
        phone_number: resget?.data?.data?.phone_number,
        phone_number_2: resget?.data?.data?.phone_number_2,
        branches_heading: resget?.data?.data?.branches_heading,
        branches_number_txt: resget?.data?.data?.branches_number_txt,
        branches_number: resget?.data?.data?.branches_number,
        branches_number_txt_2: resget?.data?.data?.branches_number_txt_2,
        branches_number_2: resget?.data?.data?.branches_number_2,
        branches_number_txt_3: resget?.data?.data?.branches_number_txt_3,
        branches_number_3: resget?.data?.data?.branches_number_3,
        opening_heading: resget?.data?.data?.opening_heading,
        email_heading: resget?.data?.data?.email_heading,
        email_address: resget?.data?.data?.email_address,
        location_url: resget?.data?.data?.location_url,
        social_heading: resget?.data?.data?.social_heading,
        location_heading: resget?.data?.data?.location_heading,
        location_details: resget?.data?.data?.location_details,
        country_merchant_domicile_heading: resget?.data?.data?.country_merchant_domicile_heading,
        country_merchant_domicile: resget?.data?.data?.country_merchant_domicile,
        mailing_address_heading: resget?.data?.data?.mailing_address_heading,
        mailing_address: resget?.data?.data?.mailing_address,
        merchant_heading: resget?.data?.data?.merchant_heading,
        merchant_name: resget?.data?.data?.merchant_name,
        website_mid_currency_heading: resget?.data?.data?.website_mid_currency_heading,
        website_mid_currency: resget?.data?.data?.website_mid_currency,
    }
    const check = (module, action) => permission?.[module]?.includes(action);
    return (
        <div className='aboutPage  '>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}  >
                <Form>
                    <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
                        <FormControl name="meta_title" label={"Meta Title"} placeholder="Enter Meta Title" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                        <div className='grid grid-cols-1'>
                            <FormControl name="meta_description" label={"Meta Description"} placeholder="Enter Meta Description" className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl resize-none" control="textarea2" />
                        </div>
                    </div>
                    <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
                        <FormControl name="banner_title" label={"Banner Heading"} placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                        
                        <FormControl name="heading" label={"Heading"} placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                        <FormControl name="short_paragraph" label={"Short Paragraph"} placeholder="Enter Short Paragraph" className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl resize-none" control="textarea2" />
                        <FormControl name="location_url" label={"location Url"} placeholder="Enter Short Paragraph" className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl resize-none" control="textarea2" />
                        
                        <div>
                            <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">Banner Image </label>
                            <OneImageUpload changeImage={setImageLoader} MainImage={datas?.banner} Update={setDatas} sec_value={"banner_value"} sec_image={"banner"} folder_name={"web_content_images"} page_type={"contectus"} />
                        </div>

                    </div>
                    <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
                    
                        <FormControl name="address_heading" label={"Address Heading"} placeholder="Enter Address Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                       <div className="mb-1 block text-[#7D8CA7] text-[.8rem]">Address</div>
                        <CKEditors label={"Address"} data={datas?.address} update={(text) => handleCkChange(text, "address")} />
                        <FormControl name="phone_heading" label={"Phone Heading"} placeholder="Enter Phone Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                        <FormControl name="phone_number" label={"Phone Number"} placeholder="Enter Phone Number" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                        <FormControl name="phone_number_2" label={"Phone Number 2"} placeholder="Enter Phone Number 2" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />

                        <FormControl name="branches_heading" label={"Branches"} placeholder="Enter Branches Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                        <FormControl name="branches_number_txt" label={"Branches text"} placeholder="Enter Branches text" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                        <FormControl name="branches_number" label={"Branches Number"} placeholder="Enter Branches Number" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                        <FormControl name="branches_number_txt_2" label={"Branches text 2"} placeholder="Enter Branches text 2" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                        <FormControl name="branches_number_2" label={"Branches Number 2"} placeholder="Enter Branches Number 2" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                        <FormControl name="branches_number_txt_3" label={"Branches text 3"} placeholder="Enter Branches text 3" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                        <FormControl name="branches_number_3" label={"Branches Number 3"} placeholder="Enter Branches Number 3" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                       

                        <FormControl name="opening_heading" label={"Opening Heading"} placeholder="Enter Opening Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                        
                        <div className="mb-1 block text-[#7D8CA7] text-[.8rem]">Opening text</div>
                        <CKEditors label={"Phone Number"} data={datas?.opening_text} update={(text) => handleCkChange(text, "opening_text")} />
                            <div className="grid grid-col-2 gap-3">
                        <FormControl name="email_heading" label={"Email Heading"} placeholder="Enter Email Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                        <FormControl name="location_heading" label={"location heading"} placeholder="Enter location heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                        <FormControl name="location_details" label={"location details"} placeholder="Enter location details" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                        <FormControl name="country_merchant_domicile_heading" label={"country merchant domicile heading"} placeholder="Enter country merchant domicile heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                        <FormControl name="country_merchant_domicile" label={"country merchant domicile"} placeholder="Enter country merchant domicile" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                        <FormControl name="mailing_address_heading" label={"mailing address heading"} placeholder="Enter mailing address heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                        <FormControl name="mailing_address" label={"mailing address"} placeholder="Enter mailing address" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                        <FormControl name="merchant_heading" label={"merchant heading"} placeholder="Enter merchant heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                        <FormControl name="merchant_name" label={"merchant name"} placeholder="Enter merchant name" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                        <FormControl name="website_mid_currency_heading" label={"website mid currency heading"} placeholder="Enter website mid currency heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                        <FormControl name="website_mid_currency" label={"website mid currency"} placeholder="Enter website mid currency" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                         
                          
                          
                          
                          
                            </div>
                    </div>

                    <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
                        <FormControl name="social_heading" label={"Heading"} placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                        <div className='flex justify-between mt-5'>
                            <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Social List</div>
                            <Link className='bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={() => handleSectionAdd("social", ["title", "url","image"])} >
                                <img src={plus} alt="plus" />
                                <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
                            </Link>
                        </div>
                        <div className="section4Main grid grid-cols-3 gap-3 mt-4 max-lg:grid-cols-1">
                            {
                                Array.isArray(social) && social.map((item, index) => {
                                    const { title,url, image } = item
                                    return (
                                        <div className="section3MainBox bg-[#DEE5F2] p-4 rounded-lg relative" key={index}>
                                            <div className='closeButton cursor-pointer absolute right-[-.5rem] top-[-.5rem] ml-auto bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] grid place-items-center rounded-[.7rem] z-10'
                                                onClick={() => handleDelete("social", index)}  >
                                                <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                            <div className="inputBox w-full mt-3">
                                                <label htmlFor="" className="mb-1 text-[#7D8CA7] text-[.8rem] flex justify-between"><span>Heading</span>  <span>{(index + 1) >= 10 ? (index + 1) : `0${(index + 1)}`}</span></label>
                                                <input name='title' placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" value={title} onChange={(e) => handleInputChange2(e, "social", index)} />
                                            </div>
                                            <div className="inputBox w-full mt-3">
                                                <label htmlFor="" className="mb-1 text-[#7D8CA7] text-[.8rem] flex justify-between"><span>Link</span></label>
                                                <input name='url' placeholder="Enter Link" className="outline-none w-full h-[3rem] px-5 rounded-xl" value={url} onChange={(e) => handleInputChange2(e, "social", index)} />
                                            </div>
                                            <div>
                                                <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">Image</label>
                                                {
                          <OneImageUploadMultiple changeImage={setImageLoader}  indexValue={index} section={"social"}  MainImage={image} Update={setDatas} sec_value={"imgValue"} sec_image={"image"} folder_name={"web_content_images"} page_type={"contact_us"} />
                        }
                                             
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                  {check("WebContents", "WebContents Edit") &&  <SubmitButton
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

export default ContactUs