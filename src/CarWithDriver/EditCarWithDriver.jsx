import React, { useContext, useEffect, useMemo, useState } from "react";
import back from "../dist/webImages/back.svg";
import { Field, Form, Formik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormControl from "../components/form/FormControl";
import SkeletonCreateEdit from "./SkeletonCreateEdit";
import CKEditors from "../components/form/CKEditors";
import swal from "sweetalert";
import SubmitButton from "../components/SubmitButton";
import usePost from "../customHooks/usePost";
import { MainLanguageContext } from "../context/MainLanguageContext";
import { toast } from "react-toastify";
import OneImageUpload from "../components/OneImageUpload";
import plus from '../dist/webImages/plus.svg'
import OneImageUploadMultiple from "../components/OneImageUploadMultiple";
import useGet from "../customHooks/useGet";
import { Select, Tooltip } from "antd";
import useFetch from "../customHooks/useFetch";

const EditCarWithDriver = ({permission}) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { mainLanguage } = useContext(MainLanguageContext);
    const { loading, data } = useFetch(`products/allCars/${mainLanguage}`);
    const [resget2, apiMethodGet2] = useGet()
    const [resget, apiMethodGet] = useGet()
   const [catlogsList, setCatlogsList] = useState("")
           const [addCar, setAddCar] = useState()
              const [selectedCar, setSelectedCar] = useState()
     const [slugs, setSlugs] = useState({
                "slugs":"",
                "all_slugs":"",
              })
const [parent_id, setParent_id] = useState("")

    const [datas, setDatas] = useState({
        type: "",
        description: "",
        banner_image: "",
        related_cars: [],
        banner: [{
            "title": "",
            "slider_image": ""
        }],
        sec_one_description: "",
        sec_two_description: "",
        sec_three_description: "",
        sec_four_description: "",
        services: [{
            "title": "",
            "paragraph": "",
            "image": ""
        }],
        sec_one: [{
            "title": "",
            "description": "",
            "image": ""
        }],
        sec_two: [{
            "title": "",
            "description": "",
            "image": ""
        }],
        sec_three: [{
            "title": "",
            "description": "",
            "image": ""
        }],
        sec_faqs: [{
            "question": "",
            "answer": "",
        }],
        sec_testimonials: [{
            "name": "",
            "description": "",
        }],
    });

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



    useEffect(() => {
        apiMethodGet2(`catalogs/dropdownList/en`)
    }, []);
    useEffect(() => {
        apiMethodGet(`catalogs/edit/${id}/${mainLanguage}`)
    }, [mainLanguage]);


    
          useEffect(() => {
            if (resget2.data) {
              const data = resget2.data.data;
              setCatlogsList(data);
        
        
              const options = data?.flatMap(item => {
                const mainOption = {
                  label: item.catalog_title,
                  value: item.id,
                };
        
                const subOptions = item.children?.map(subItem => ({
                  label: `— ${subItem.catalog_title}`,
                  value: subItem.id,
                })) || [];
        
                return [mainOption, ...subOptions];
              });
            }
          }, [resget2.data]);

    useEffect(() => {
        if (resget.data && data) {
            setDatas(resget.data?.data)
            setParent_id(resget.data?.data?.parent_id ?? "")
            let slu = resget.data?.data.slug.split("/")
            slu.pop()
            setSlugs({
                "all_slugs":slu.join("/"),
                "slugs":resget.data?.data.slug.split("/")[resget.data?.data.slug.split("/").length -1] ?? "",
            })
            let list = [];
            for (let index = 0; index < data.data.length; index++) {
              list.push({
                label: data.data[index]?.product_title  + ` => (${data.data[index]?.catalog_title})`,
                value: data.data[index]?.id,
              })
              
            }
            setAddCar(list);
            let selectedd = []
            for (let index = 0; index < resget?.data?.data?.related_cars.length; index++) {
              selectedd.push(resget?.data?.data?.related_cars[index].id)
              
            }
            setSelectedCar(selectedd)
        }
    }, [resget.data,data]);





    const [imageLoader, setImageLoader] = useState(false);

    const handleCkChange = (e, type) => {
        setDatas((d) => ({ ...d, [type]: e }));
    };

    const handleCarsToggle = (e) => {
        setSelectedCar(e);
      }



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
    const requireFeild = [
        "type",
        "parent_id",
        "meta_title",
        "meta_description ",
        "catalog_title",
        "title",
    ];
    const handleSubmit = async (values) => {
        if (imageLoader) {
            swal({
                title: "Wait a Few Second",
                icon: "error",
                dangerMode: true,
            });
        } else {
            let formdata = new FormData();
            let requireFeildSwal = {
                type: "type",
                meta_title: "Meta Title",
                meta_description: "Meta Description",
                catalog_title: "Title",
                title: "Heading",
            };

            let checkerRequried = [];
            for (const item in values) {
                if (requireFeild.includes(item) && !values[item]) {
                    checkerRequried.push(requireFeildSwal[item]);
                }
            }
            if(slugs.slugs) {

            }
            else {
                checkerRequried.push("slug Required");
            }
        
            formdata.append(`translation[meta_title]`, values["meta_title"]);
            formdata.append(`translation[meta_description]`, values["meta_description"]);
            formdata.append(`translation[catalog_title]`, values["catalog_title"]);
            formdata.append(`translation[title]`, values["title"]);
            formdata.append(`translation[description]`, datas?.description ?? "");
            formdata.append(`translation[sec_one_description]`, datas?.sec_one_description ?? "");
            formdata.append(`translation[sec_two_description]`, datas?.sec_two_description ?? "");
            formdata.append(`translation[sec_three_description]`, datas?.sec_three_description  ?? "");
            formdata.append(`translation[sec_four_description]`, datas?.sec_four_description  ?? "");
            formdata.append(`translation[sec_one_heading]`, values?.sec_one_heading ?? "");
            formdata.append(`translation[sec_two_heading]`, values?.sec_two_heading ?? "");
            formdata.append(`translation[sec_three_heading]`, values?.sec_three_heading  ?? "");
            formdata.append(`translation[sec_four_heading]`, values?.sec_four_heading  ?? "");
            formdata.append(`translation[sec_faqs_heading]`, values?.sec_faqs_heading ?? "");
            formdata.append(`translation[testimonials_title]`, values?.testimonials_title ?? "");
            formdata.append(`type`, datas["type"]);
            formdata.append(`banner_image`, datas?.banner_image_value ?? "");
            formdata.append(`brand_logo`, datas?.brand_logo_value ?? "");
            formdata.append(`slug`, slugs.all_slugs ? `${slugs.all_slugs}/${slugs.slugs}` : slugs.slugs);
            formdata.append(`parent_id`, parent_id ?? "");
            formdata.append(`catalog_status`, values["catalog_status"].length > 0 ? 1 : 0);
            // formdata.append(`catalog_status`, 1);
            for (let index = 0; index < selectedCar.length; index++) {
                formdata.append(`car_ids[]`, selectedCar[index]);  
            }




            const appendSectionData = (sectionKey, dataArray) => {
                if (Array.isArray(dataArray)) {
                    dataArray.forEach((item, index) => {
                        Object.entries(item).forEach(([key, value]) => {
                            const fieldValue = key === "image" ? item?.imgValue ?? ""
                                : key === "slider_image" ? item?.slider_image_value ?? "" : value;
                            let aa = ["slider_image_value", "imgValue"]
                            if (aa.includes(key)) {

                            }
                            else {
                                formdata.append(`translation[${sectionKey}][${index}][${key}]`, fieldValue ?? "");
                            }
                        });
                    });
                }
            };

            // Shortened usage for all sections
            [
                { key: "sec_faqs", data: datas.sec_faqs },
                { key: "sec_testimonials", data: datas.sec_testimonials },
                { key: "services", data: datas.services },
                { key: "sec_one", data: datas.sec_one },
                { key: "sec_two", data: datas.sec_two },
                { key: "sec_three", data: datas.sec_three },
                { key: "banner", data: datas.banner },
            ].forEach(({ key, data }) => appendSectionData(key, data));
            apiMethod(`catalogs/update/${id}/${mainLanguage}`, formdata);
        }
    }


    useEffect(() => {
        if (res.data) {
            const { status, message } = res?.data;
            if (status === "false") {
                toast.error(message);
            } else {
                navigate("/carwithdrivers");
                toast.success(message);
            }
        }
    }, [res.data]);

    if (resget.isLoading || !resget?.data?.data) return <SkeletonCreateEdit heading={"Edit Car With Driver"} />;
    let initialValues = {
        type: resget?.data?.data?.type,
        parent_id: resget?.data?.data?.parent_id,
        meta_title: resget?.data?.data?.meta_title,
        meta_description: resget?.data?.data?.meta_description,
        catalog_title: resget?.data?.data?.catalog_title,
        title: resget?.data?.data?.title,
        description: resget?.data?.data?.description,
        sec_one_heading: resget?.data?.data?.sec_one_heading,
        sec_two_heading: resget?.data?.data?.sec_two_heading,
        sec_three_heading: resget?.data?.data?.sec_three_heading ?? "",
        sec_four_description: resget?.data?.data?.sec_four_description ?? "",
        sec_faqs_heading: resget?.data?.data?.sec_faqs_heading,
        testimonials_title: resget?.data?.data?.testimonials_title,
        catalog_status: resget?.data?.data?.catalog_status && [`${String(resget?.data?.data?.catalog_status)}`],
    };


    const { banner, sec_one, sec_two,sec_three, services, description, sec_one_description, sec_two_description,sec_three_description,sec_four_description } = datas;
     const check = (module, action) => permission?.[module]?.includes(action);
    return (
        <section className="PromotionCreate pr-10 max-lg:pr-6">
            <Link to={"/carwithdrivers"} className="back flex items-center mb-5 gap-2">
                <img src={back} className="w-[2rem]" alt="" />
                <span className="text-[1.4rem] font-MluvkaBold">Edit Car With Driver</span>
            </Link>
            <div className="relative flex items-start gap-3">
                <div className=" bg-white rounded-xl w-full  mx-auto relative">
                    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                        <Form name="myForm">
                            <div className="bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3">
                                <div className="grid grid-cols-2 gap-2">
                                    <FormControl name="meta_title" label={"Meta Title"} placeholder="Enter Meta Title" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                                </div>
                                <div className="grid  gap-2">
                                    <FormControl name="meta_description" label={"Meta Description"} placeholder="Enter Meta Description" className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl resize-none" control="textarea2" />
                                </div>
                            </div>

                            <div className="bg-[#EFF4FD] p-6 rounded-3xl mb-3">

                                <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">Banner Image</label>
                                {   mainLanguage === "en" && <OneImageUpload changeImage={setImageLoader} MainImage={datas?.banner_image} Update={setDatas} sec_value={"banner_image_value"} sec_image={"banner_image"} folder_name={"catalog_banner_image"} page_type={"catalog"} />}
                               

                                <FormControl name="catalog_title" label={"catalog title"} placeholder="Enter catalog Title" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                                <FormControl name="title" label={"Heading {h1}"} placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                              <br />
                                <div className="mb-1 block text-[#7D8CA7] text-[.8rem]"> Description</div>
                                <CKEditors label={"Description"} data={description} update={(text) => handleCkChange(text, "description")} />
                                <br />

                                {
                                    datas?.type === "lease" &&
                                    <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
                                        <div className='flex justify-between'>
                                            <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Banner</div>
                                           { mainLanguage === "en" && <Link className='bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={() => handleSectionAdd("banner", ["title", "slider_image"])} >
                                                <img src={plus} alt="plus" />
                                                <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
                                            </Link>}
                                        </div>
                                        <div className="section4Main grid grid-cols-3 gap-3 mt-4 max-lg:grid-cols-1">
                                            {
                                                Array.isArray(banner) && banner.map((item, index) => {
                                                    const { title, slider_image } = item
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
                                                         { mainLanguage === "en" &&   <div className='mb-2'>
                                                                <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">banner Image</label>
                                                                {
                                                                    <OneImageUploadMultiple changeImage={setImageLoader} indexValue={index} section={"banner"} MainImage={slider_image} Update={setDatas} sec_value={"slider_image_value"} sec_image={"slider_image"} folder_name={"catalog_banner_image"} page_type={"catalogs"} />
                                                                }
                                                            </div>}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>}

                                <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
                                    <div className='flex justify-between'>
                                        <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Services</div>
                                     { mainLanguage === "en" &&   <Link className='bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={() => handleSectionAdd("services", ["title", "description", "image"])} >
                                            <img src={plus} alt="plus" />
                                            <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
                                        </Link>}
                                    </div>
                                  
                                    <div className="section4Main grid grid-cols-3 gap-3 mt-4 max-lg:grid-cols-1">
                                        {
                                            Array.isArray(services) && services.map((item, index) => {
                                                const { title, paragraph, image } = item
                                                return (
                                                    <div className="section3MainBox bg-[#DEE5F2] p-4 rounded-lg relative" key={index}>
                                                        <div className='closeButton cursor-pointer absolute right-[-.5rem] top-[-.5rem] ml-auto bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] grid place-items-center rounded-[.7rem] z-10'
                                                            onClick={() => handleDelete("services", index)}  >
                                                            <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </div>
                                                        <div className="inputBox servicesHeading w-full mt-3">
                                                            <label htmlFor="" className="mb-1 text-[#7D8CA7] text-[.8rem] flex justify-between"><span>Heading</span>  <span>{(index + 1) >= 10 ? (index + 1) : `0${(index + 1)}`}</span></label>
                                                              <input name="title" placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" value={title} onChange={(e) => handleInputChange2(e, "services", index)} />
                                                          
                                                        </div>
                                                        <div className="inputBox w-full mt-3">
                                                            <label htmlFor="" className="mb-1 block text-[#7D8CA7] text-[.8rem]">Paragraph</label>
                                                            <CKEditors label={"paragraph"} data={paragraph} update={(text) => handleCkChange2(text, "services", index, "paragraph")} />
                                                        </div>
                                                      { mainLanguage === "en" &&  <div className='mb-2'>
                                                            <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]"> Image</label>
                                                            {
                                                                <OneImageUploadMultiple changeImage={setImageLoader} indexValue={index} section={"services"} MainImage={image} Update={setDatas} sec_value={"imgValue"} sec_image={"image"} folder_name={"catalog_banner_image"} page_type={"catalogs"} />
                                                            }
                                                        </div>}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
                                    <div className='flex justify-between'>
                                        <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Section 1</div>
                                     { mainLanguage === "en" &&   <Link className='bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={() => handleSectionAdd("sec_one", ["title", "description", "image"])} >
                                            <img src={plus} alt="plus" />
                                            <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
                                        </Link>}
                                    </div>
                                    <FormControl name="sec_one_heading" label={"Section 1 Title"} placeholder="Enter Title" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                                    <br />
                                    <div className="mb-1 block text-[#7D8CA7] text-[.8rem]"> Section 1 Description</div>
                                    <CKEditors label={"Description"} data={sec_one_description} update={(text) => handleCkChange(text, "sec_one_description")} />


                                    <div className="section4Main grid grid-cols-3 gap-3 mt-4 max-lg:grid-cols-1">
                                        {
                                            Array.isArray(sec_one) && sec_one.map((item, index) => {
                                                const { title, paragraph, image } = item
                                                return (
                                                    <div className="section3MainBox bg-[#DEE5F2] p-4 rounded-lg relative" key={index}>
                                                        <div className='closeButton cursor-pointer absolute right-[-.5rem] top-[-.5rem] ml-auto bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] grid place-items-center rounded-[.7rem] z-10'
                                                            onClick={() => handleDelete("sec_one", index)}  >
                                                            <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </div>
                                                        <div className="inputBox sec_oneHeading w-full mt-3">
                                                            <label htmlFor="" className="mb-1 text-[#7D8CA7] text-[.8rem] flex justify-between"><span>Heading</span>  <span>{(index + 1) >= 10 ? (index + 1) : `0${(index + 1)}`}</span></label>
                                                            <CKEditors label={"title"} data={title} update={(text) => handleCkChange2(text, "sec_one", index, "title")} />
                                                        </div>
                                                        <div className="inputBox w-full mt-3">
                                                            <label htmlFor="" className="mb-1 block text-[#7D8CA7] text-[.8rem]">Paragraph</label>
                                                            <CKEditors label={"paragraph"} data={paragraph} update={(text) => handleCkChange2(text, "sec_one", index, "paragraph")} />
                                                        </div>
                                                      { mainLanguage === "en" &&  <div className='mb-2'>
                                                            <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]"> Image</label>
                                                            {
                                                                <OneImageUploadMultiple changeImage={setImageLoader} indexValue={index} section={"sec_one"} MainImage={image} Update={setDatas} sec_value={"imgValue"} sec_image={"image"} folder_name={"catalog_banner_image"} page_type={"catalogs"} />
                                                            }
                                                        </div>}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
                                    <div className='flex justify-between'>
                                        <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Section 2</div>
                                       { mainLanguage === "en" && <Link className='bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={() => handleSectionAdd("sec_two", ["title", "description", "image"])} >
                                            <img src={plus} alt="plus" />
                                            <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
                                        </Link>}
                                    </div>
                                    <FormControl name="sec_two_heading" label={"Section 2 Title"} placeholder="Enter Title" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                                    <br />
                                    <div className="mb-1 block text-[#7D8CA7] text-[.8rem]"> Section 2 Description</div>
                                    <CKEditors label={"Description"} data={sec_two_description} update={(text) => handleCkChange(text, "sec_two_description")} />

                                    <div className="section4Main grid grid-cols-3 gap-3 mt-4 max-lg:grid-cols-1">
                                        {
                                            Array.isArray(sec_two) && sec_two.map((item, index) => {
                                                const { title, paragraph, image } = item
                                                return (
                                                    <div className="section3MainBox bg-[#DEE5F2] p-4 rounded-lg relative" key={index}>
                                                        <div className='closeButton cursor-pointer absolute right-[-.5rem] top-[-.5rem] ml-auto bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] grid place-items-center rounded-[.7rem] z-10'
                                                            onClick={() => handleDelete("sec_two", index)}  >
                                                            <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </div>
                                                        <div className="inputBox w-full mt-3">
                                                            <label htmlFor="" className="mb-1 text-[#7D8CA7] text-[.8rem] flex justify-between"><span>Heading</span>  <span>{(index + 1) >= 10 ? (index + 1) : `0${(index + 1)}`}</span></label>
                                                            <CKEditors label={"title"} data={title} update={(text) => handleCkChange2(text, "sec_two", index, "title")} />
                                                        </div>
                                                        <div className="inputBox w-full mt-3">
                                                            <label htmlFor="" className="mb-1 block text-[#7D8CA7] text-[.8rem]">Paragraph</label>
                                                            <CKEditors label={"paragraph"} data={paragraph} update={(text) => handleCkChange2(text, "sec_two", index, "paragraph")} />
                                                        </div>
                                                      { mainLanguage === "en" &&  <div className='mb-2'>
                                                            <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">Image</label>
                                                            {
                                                                <OneImageUploadMultiple changeImage={setImageLoader} indexValue={index} section={"sec_two"} MainImage={image} Update={setDatas} sec_value={"imgValue"} sec_image={"image"} folder_name={"catalog_banner_image"} page_type={"catalogs"} />
                                                            }
                                                        </div>}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
                                    <div className='flex justify-between'>
                                        <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Section 3</div>
                                        <Link className='bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={() => handleSectionAdd("sec_three", ["title", "description", "image"])} >
                                            <img src={plus} alt="plus" />
                                            <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
                                        </Link>
                                    </div>
                                    <FormControl name="sec_three_heading" label={"Section 3 Title"} placeholder="Enter Title" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                                    <br />
                                    <div className="mb-1 block text-[#7D8CA7] text-[.8rem]"> Section 3 Description</div>
                                    <CKEditors label={"Description"} data={sec_three_description} update={(text) => handleCkChange(text, "sec_three_description")} />

                                    <div className="section4Main grid grid-cols-3 gap-3 mt-4 max-lg:grid-cols-1">
                                        {
                                            Array.isArray(sec_three) && sec_three.map((item, index) => {
                                                const { title, paragraph, image } = item
                                                return (
                                                    <div className="section3MainBox bg-[#DEE5F2] p-4 rounded-lg relative" key={index}>
                                                        <div className='closeButton cursor-pointer absolute right-[-.5rem] top-[-.5rem] ml-auto bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] grid place-items-center rounded-[.7rem] z-10'
                                                            onClick={() => handleDelete("sec_three", index)}  >
                                                            <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </div>
                                                        <div className="inputBox w-full mt-3">
                                                            <label htmlFor="" className="mb-1 text-[#7D8CA7] text-[.8rem] flex justify-between"><span>Heading</span>  <span>{(index + 1) >= 10 ? (index + 1) : `0${(index + 1)}`}</span></label>
                                                            <input name="title" placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" value={title} onChange={(e) => handleInputChange2(e, "sec_three", index)} />
                                                        </div>
                                                        <div className="inputBox w-full mt-3">
                                                            <label htmlFor="" className="mb-1 block text-[#7D8CA7] text-[.8rem]">Paragraph</label>
                                                            <CKEditors label={"paragraph"} data={paragraph} update={(text) => handleCkChange2(text, "sec_three", index, "paragraph")} />
                                                        </div>
                                                        <div className='mb-2'>
                                                            <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]"> Image</label>
                                                            {
                                                                <OneImageUploadMultiple changeImage={setImageLoader} indexValue={index} section={"sec_three"} MainImage={image} Update={setDatas} sec_value={"imgValue"} sec_image={"image"} folder_name={"catalog_banner_image"} page_type={"catalogs"} />
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
                                    <div className='flex justify-between'>
                                        <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Section 4</div>
                                    </div>
                                    <FormControl name="sec_four_heading" label={"Section 4 Title"} placeholder="Enter Title" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                                    <br />
                                    <div className="mb-1 block text-[#7D8CA7] text-[.8rem]"> Section 4 Description</div>
                                    <CKEditors label={"Description"} data={sec_four_description} update={(text) => handleCkChange(text, "sec_four_description")} />
                                </div>

                               { mainLanguage === "en" && 
                               
                               
                               
                               addCar &&      <div className='antdheight'>
                               <div className="h4 text-[#7D8CA7] text-[.8rem] mb-1">Product List</div>
                               <Select
                                                showSearch
                                                 mode="multiple"
                                                 placeholder="Please select"
                                                 onChange={(e) => handleCarsToggle(e)}
                                                 value={selectedCar}
                                                 style={{
                                                   width: '100%',
                                                 }}
                                                 options={addCar}
                                                 filterOption={(input, option) =>
                                                   (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                 }
                                               />
                             </div>}

                              { mainLanguage === "en" &&  <div className="overflow-hidden relative pt-7 px-4">
                                    <label className="inline-flex items-center cursor-pointer">
                                        <Field value="1" type="checkbox" name="catalog_status" className="sr-only peer" />
                                        <div className="relative bg-[#1c1c1c] w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer bg-gray-200 peer-checked:after:translate-x-full   after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#401a89]"></div>
                                        <span className="ms-3 text-sm font-medium text-gray-900">  Catalogs Status </span>
                                    </label>
                                </div>}
                            </div>

                            {check("CarWithDriver", "CarWithDriver Edit") && <SubmitButton props={{
                                class: "btn bg-secondary text-white px-12 ml-auto uppercase mb-3   py-3 rounded-full w-100 block mt-5 submit hover:bg-primary transition-all duration-300",
                                text: "Submit",
                            }} buttonLoading={res.isLoading}
                            />}
                        </Form>
                    </Formik>
                </div>
            </div>
        </section>
    );
};

export default EditCarWithDriver;
