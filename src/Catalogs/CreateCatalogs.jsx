import React, { useContext, useEffect, useMemo, useState } from "react";
import { Form, Formik } from "formik";
import { Link, useNavigate } from 'react-router-dom';
import FormControl from "../components/form/FormControl";
import useFetch from "../customHooks/useFetch";
import SkeletonCreateEdit from "./SkeletonCreateEdit";
import CKEditors from "../components/form/CKEditors";
import swal from "sweetalert";
import SubmitButton from "../components/SubmitButton";
import usePost from "../customHooks/usePost";
import { MainLanguageContext } from "../context/MainLanguageContext";
import StatusToggle from "../components/form/StatusToggle";
import { toast } from "react-toastify";
import OneImageUpload from "../components/OneImageUpload";
import noimg from '../dist/webImages/nocar.jpg'
import plus from '../dist/webImages/plus.svg'
import OneImageUploadMultiple from "../components/OneImageUploadMultiple";
import useGet from "../customHooks/useGet";
import { Select, Tooltip } from "antd";
import { MainUserDataContext } from "../context/MainUserDataContext";

const CreateCatalogs = () => {
    const navigate = useNavigate();
    const { userdata } = useContext(MainUserDataContext);
    const { mainLanguage } = useContext(MainLanguageContext);
    const { loading, data } = useFetch(`products/allCars/${mainLanguage}`);
    const [resget2, apiMethodGet2] = useGet()
    const [catlogsList, setCatlogsList] = useState("")
    const [slugs, setSlugs] = useState({
        "slugs": "",
        "all_slugs": "",
    })
    const [parent_id, setParent_id] = useState("")
    const [addCar, setAddCar] = useState()
    const [selectedCar, setSelectedCar] = useState()
    const [datas, setDatas] = useState({
        type: "",
        new_style_page_type: "",
        description: "",
        banner_image: "",
        sec_one_image: "",
        sec_three_image: "",
        related_cars: [],
        banner: [{
            "title": "",
            "slider_image": ""
        }],
        sec_one_description: "",
        sec_two_description: "",
        sec_three_description: "",
        sec_four_description: "",
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
        sec_two: [{
            "title": "",
            "description": "",
            "image": ""
        }],
        sec_four: [{
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
        if (data) {
            let list = [];
            for (let index = 0; index < data?.data.length; index++) {
                list.push({
                    label: data?.data[index]?.product_title + ` => (${data?.data[index]?.catalog_title})`,
                    value: data?.data[index]?.id,
                })

            }
            setAddCar(list);
        }
    }, [data]);
    useEffect(() => {
        apiMethodGet2(`catalogs/dropdownList/en`)
    }, []);

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
                    label: `â€” ${subItem.catalog_title}`,
                    value: subItem.id,
                })) || [];

                return [mainOption, ...subOptions];
            });
        }
    }, [resget2.data]);

    const [imageLoader, setImageLoader] = useState(false);

    const handletype = (e, type) => {
        setDatas((d) => ({ ...d, [type]: e }));

    };
    const handleCkChange = (e, type) => {
        setDatas((d) => ({ ...d, [type]: e }));
    };

    const handleCarsToggle = (e) => {
        setSelectedCar(e);
    }

    const handleParent = (e) => {
        const value = e.target.value;

        // If no parent selected
        if (value === "") {
            setParent_id(null);
            setSlugs((prev) => ({
                ...prev,
                all_slugs: ``,
            }));
            return;
        }

        const selectedId = parseInt(e.target.value);
        setParent_id(selectedId);

        // Find the selected item (either parent or child)
        let selectedItem = null;
        let foundParent = catlogsList.find((parent) => {
            if (parent.id === selectedId) {
                selectedItem = parent;
                return true;
            }

            const child = parent.children?.find((c) => c.id === selectedId);
            if (child) {
                selectedItem = child;
                return true;
            }

            return false;
        });

        // Determine the correct slug path
        let all_slugs = '';
        if (selectedItem) {
            all_slugs = `${selectedItem.slug}`;
        }

        // Update state
        setSlugs((prev) => ({
            ...prev,
            all_slugs,
        }));
    };

    const handleSlugUpdate = (e) => {
        setSlugs({
            ...slugs,
            "slugs": e.target.value,
        })
    }

    let initialValues = {
        slug: "",
        type: "",
        parent_id: "",
        meta_title: "",
        meta_description: "",
        catalog_title: "",
        title: "",
        banner_paragraph: "",
        product_heading: "",
        description: "",
        sec_one_heading: "",
        sec_two_heading: "",
        sec_three_heading: "",
        sec_four_heading: "",
        sec_faqs_heading: "",
        testimonials_title: "",
        catalog_status: ["1"],
    };

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
            if (slugs.slugs) {
            }
            else {
                checkerRequried.push("slug Required");
            }
            if (datas["type"]) {
            }
            else {
                checkerRequried.push("Type Required");
            }

            if (checkerRequried.length > 0) {
                swal({
                    title: "Required Fields are empty! Please fill and try again",
                    text: checkerRequried.join(","),
                    icon: "error",
                    dangerMode: true,
                });
            }
            else {
                formdata.append(`translation[meta_title]`, values["meta_title"]);
                formdata.append(`translation[meta_description]`, values["meta_description"]);
                formdata.append(`translation[catalog_title]`, values["catalog_title"]);
                formdata.append(`translation[title]`, values["title"]);
                formdata.append(`translation[banner_paragraph]`, values["banner_paragraph"]);
                formdata.append(`translation[product_heading]`, values["product_heading"]);
                formdata.append(`translation[new_style_page_type]`, datas?.new_style_page_type ?? "");
                formdata.append(`translation[description]`, datas?.description ?? "");
                formdata.append(`translation[sec_one_description]`, datas?.sec_one_description ?? "");
                formdata.append(`translation[sec_two_description]`, datas?.sec_two_description ?? "");
                formdata.append(`translation[sec_three_description]`, datas?.sec_three_description ?? "");
                formdata.append(`translation[sec_four_description]`, datas?.sec_four_description ?? "");
                formdata.append(`translation[sec_one_heading]`, values?.sec_one_heading ?? "");
                formdata.append(`translation[sec_two_heading]`, values?.sec_two_heading ?? "");
                formdata.append(`translation[sec_three_heading]`, values?.sec_three_heading ?? "");
                formdata.append(`translation[sec_four_heading]`, values?.sec_four_heading ?? "");
                formdata.append(`translation[sec_faqs_heading]`, values?.sec_faqs_heading ?? "");
                formdata.append(`translation[testimonials_title]`, values?.testimonials_title ?? "");
                formdata.append(`translation[sec_one_image]`, datas?.sec_one_image_value ?? "");
                formdata.append(`translation[sec_three_image]`, datas?.sec_three_image_value ?? "");
                formdata.append(`sec_one_slider_status`, 1);
            formdata.append(`sec_two_slider_status`, 1);
            formdata.append(`sec_three_slider_status`, 1);
                formdata.append(`type`, datas["type"]);
                formdata.append(`banner_image`, datas?.banner_image_value ?? "");
                formdata.append(`brand_logo`, datas?.brand_logo_value ?? "");
                formdata.append(`slug`, slugs.all_slugs ? `${slugs.all_slugs}/${slugs.slugs}` : slugs.slugs);
                formdata.append(`parent_id`, parent_id ?? "");
                formdata.append(`catalog_status`, values["catalog_status"].length > 0 ? 1 : 0);
console.log(datas)
                for (let index = 0; index < selectedCar?.length; index++) {
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
                [
                    { key: "sec_faqs", data: datas.sec_faqs },
                    { key: "sec_testimonials", data: datas.sec_testimonials },
                    { key: "sec_one", data: datas.sec_one },
                    { key: "sec_two", data: datas.sec_two },
                    { key: "sec_four", data: datas.sec_four },
                    { key: "banner", data: datas.banner },
                ].forEach(({ key, data }) => appendSectionData(key, data));
                apiMethod(`catalogs/create/${mainLanguage}`, formdata);
            }
        }
    }

    useEffect(() => {
        if (res.data) {
            const { status, message } = res?.data;
            if (status === "false") {
                toast.error(message);
            } else {
                console.log(res?.data)
                navigate(`/catalogs/edit/${res?.data?.data?.catalog_id}`)
                toast.success(message);
            }
        }
    }, [res.data]);

    if (resget2.isLoading || !data) return <SkeletonCreateEdit heading={"Create Catalogs"} />;
    const { banner, sec_one, sec_two, sec_three,sec_four, sec_faqs, description, sec_one_description, sec_two_description, sec_three_description, sec_four_description, sec_testimonials } = datas;
    return (
        <section className="PromotionCreate product-create-page">
{console.log(slugs?.all_slugs, slugs.slugs)}
            <div className="product-create-page__hero">
                <span className="product-create-page__eyebrow">Catalog management</span>
                <h2>Create Catalog</h2>
                <p>Build a compact, modern catalog page with the same refreshed theme used across the product modules.</p>
            </div>
            <div className="relative flex items-start gap-3">
                <div className="bg-white rounded-3xl w-full p-4 mx-auto relative">
                    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                        <Form name="myForm" className="product-create-page__form">
                            <div className="bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3">
                                <div className="h4 text-[#7D8CA7] text-[.8rem] mb-1">Slug - {slugs.all_slugs}</div>
                                <input value={slugs?.slugs ?? ""} onChange={handleSlugUpdate} name="slug" label={"Slug"} placeholder="Enter Slug" className="outline-none w-full h-[3rem] px-5 rounded-xl border border-[red]" control="input2" />
                                <div className="grid grid-cols-2 gap-2">
                                    <FormControl name="meta_title" label={"Meta Title"} placeholder="Enter Meta Title" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                                </div>
                                <div className="grid  gap-2">
                                    <FormControl name="meta_description" label={"Meta Description"} placeholder="Enter Meta Description" className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl resize-none" control="textarea2" />
                                </div>
                            </div>
                            <div className="bg-[#EFF4FD] p-6 rounded-3xl mb-3">
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <div className="h4 text-[#7D8CA7] text-[.8rem] mb-1">
                                            Type
                                        </div>
                                        <select value={datas?.type} onChange={(e) => handletype(e.target.value, "type")} name="type" className="outline-none w-full h-[3rem] px-5 rounded-xl"  >
                                            <option value={""}>---select Type ---</option>
                                            <option value={"lease"}>Lease</option>
                                            <option value={"our_locations"}>Our Locations</option>
                                            <option value={"our_fleet"}>Our Fleet</option>
                                            <option value={"car_brands"}>Car Brands</option>
                                            <option value={"new_fleet"}>New Fleet</option>
                                        </select>
                                    </div>
                                    <div>
                                        <div className="h4 text-[#7D8CA7] text-[.8rem] mb-1">
                                            new style page type
                                        </div>
                                        <select value={datas?.new_style_page_type} onChange={(e) => handletype(e.target.value, "new_style_page_type")} name="new_style_page_type" className="outline-none w-full h-[3rem] px-5 rounded-xl"  >
                                            <option value={""}>---select new style page type ---</option>
                                            <option value={"our_fleet"}>Our Fleet</option>
                                            <option value={"car_brands"}>Car Brands</option>
                                        </select>
                                    </div>
                                    <div>
                                        <div className="h4 text-[#7D8CA7] text-[.8rem] mb-1">
                                            Parent
                                        </div>
                                        <select value={parent_id ?? ""} onChange={handleParent} name="parent_id" className="outline-none w-full h-[3rem] px-5 rounded-xl" >
                                            <option value="">---select Parent ---</option>
                                            {Array.isArray(catlogsList) &&
                                                catlogsList.map((item) => {
                                                    const { id, catalog_title, children } = item;
                                                    return (
                                                        <React.Fragment key={id}>
                                                            <option value={id}>{catalog_title}</option>
                                                            {Array.isArray(children) &&
                                                                children.map((item2) => (
                                                                    <option key={item2.id} value={item2.id}>
                                                                        â€” {item2.catalog_title}
                                                                    </option>
                                                                ))}
                                                        </React.Fragment>
                                                    );
                                                })}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#EFF4FD] p-6 rounded-3xl mb-3">

                                {datas?.type === "car_brands" && <><label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">Brand logo</label>
                                    <OneImageUpload changeImage={setImageLoader} MainImage={datas?.brand_logo} Update={setDatas} sec_value={"brand_logo_value"} sec_image={"brand_logo"} folder_name={"catalog_banner_image"} page_type={"catalog"} /></>}

                                <FormControl name="catalog_title" label={"catalog title "} placeholder="Enter catalog Title" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                                <FormControl name="title" label={"Heading {h1}"} placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                                <br />
                                <FormControl name="banner_paragraph" label={"Banner Paragraph"} placeholder="Enter Heading" className="outline-none pt-2 w-full h-[10rem] px-5 rounded-xl" control="textarea" />
                                <br />
                               <FormControl name="product_heading" label={"product heading"} placeholder="Enter Product Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                                <br />
                                <div className="mb-1 block text-[#7D8CA7] text-[.8rem]"> Description</div>
                                <CKEditors label={"Description"} data={description} update={(text) => handleCkChange(text, "description")} />
                                <br />

                                {
                                    datas?.type === "lease" &&
                                    <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
                                        <div className='flex justify-between'>
                                            <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Banner</div>
                                        <Link className='users-table-page__add bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={() => handleSectionAdd("banner", ["title", "slider_image"])} >
                                                <img src={plus} alt="plus" />
                                                <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
                                            </Link>
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
                                                            <div className='mb-2'>
                                                                <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">banner Image</label>
                                                                {
                                                                    <OneImageUploadMultiple changeImage={setImageLoader} indexValue={index} section={"banner"} MainImage={slider_image} Update={setDatas} sec_value={"slider_image_value"} sec_image={"slider_image"} folder_name={"catalog_banner_image"} page_type={"catalogs"} />
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>}

                                <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
                                    <div className='flex justify-between'>
                                        <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Section 1</div>
                                        <Link className='users-table-page__add bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={() => handleSectionAdd("sec_one", ["title", "description", "image"])} >
                                            <img src={plus} alt="plus" />
                                            <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
                                        </Link>
                                    </div>
                                    <FormControl name="sec_one_heading" label={"Section 1 Title"} placeholder="Enter Title" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                                    <br />
                                    <div className="mb-1 block text-[#7D8CA7] text-[.8rem]"> Section 1 Description</div>
                                    <CKEditors label={"Description"} data={sec_one_description} update={(text) => handleCkChange(text, "sec_one_description")} />
                                    <><label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">Sec One Image</label>
                                    <OneImageUpload changeImage={setImageLoader} MainImage={datas?.sec_one_image} Update={setDatas} sec_value={"sec_one_image_value"} sec_image={"sec_one_image"} folder_name={"catalog_banner_image"} page_type={"catalog"} /></>
                                                        
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
                                                        <div className='mb-2'>
                                                            <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">Image</label>
                                                            {
                                                                <OneImageUploadMultiple changeImage={setImageLoader} indexValue={index} section={"sec_one"} MainImage={image} Update={setDatas} sec_value={"imgValue"} sec_image={"image"} folder_name={"catalog_banner_image"} page_type={"catalogs"} />
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
                                        <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Section 2</div>
                                        <Link className='users-table-page__add bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={() => handleSectionAdd("sec_two", ["title", "description", "image"])} >
                                            <img src={plus} alt="plus" />
                                            <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
                                        </Link>
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
                                                            <input name="title" placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" value={title} onChange={(e) => handleInputChange2(e, "sec_two", index)} />
                                                        </div>
                                                        <div className="inputBox w-full mt-3">
                                                            <label htmlFor="" className="mb-1 block text-[#7D8CA7] text-[.8rem]">Paragraph</label>
                                                            <CKEditors label={"paragraph"} data={paragraph} update={(text) => handleCkChange2(text, "sec_two", index, "paragraph")} />
                                                        </div>
                                                        <div className='mb-2'>
                                                            <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]"> Image</label>
                                                            {
                                                                <OneImageUploadMultiple changeImage={setImageLoader} indexValue={index} section={"sec_two"} MainImage={image} Update={setDatas} sec_value={"imgValue"} sec_image={"image"} folder_name={"catalog_banner_image"} page_type={"catalogs"} />
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
                                        <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Section 3</div>
                                    </div>
                                    <FormControl name="sec_three_heading" label={"Section 4 Title"} placeholder="Enter Title" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                                    <br />
                                    <div className="mb-1 block text-[#7D8CA7] text-[.8rem]"> Section 3 Description</div>
                                    <CKEditors label={"Description"} data={sec_three_description} update={(text) => handleCkChange(text, "sec_three_description")} />
                                    <><label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">Section 3 Image</label>
                                    <OneImageUpload changeImage={setImageLoader} MainImage={datas?.sec_three_image} Update={setDatas} sec_value={"sec_three_image_value"} sec_image={"sec_three_image"} folder_name={"catalog_banner_image"} page_type={"catalog"} /></>
                                </div>
                                <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
                                    <div className='flex justify-between'>
                                        <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Section 4</div>
                                        <Link className='users-table-page__add bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={() => handleSectionAdd("sec_four", ["title", "description", "image"])} >
                                            <img src={plus} alt="plus" />
                                            <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
                                        </Link>
                                    </div>
                                    <FormControl name="sec_four_heading" label={"Section 4 Title"} placeholder="Enter Title" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                                    <br />
                                    <div className="mb-1 block text-[#7D8CA7] text-[.8rem]"> Section 4 Description</div>
                                    <CKEditors label={"Description"} data={sec_four_description} update={(text) => handleCkChange(text, "sec_four_description")} />

                                    <div className="section4Main grid grid-cols-3 gap-3 mt-4 max-lg:grid-cols-1">
                                        {
                                            Array.isArray(sec_four) && sec_four.map((item, index) => {
                                                const { title, paragraph, image } = item
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
                                                            <CKEditors label={"paragraph"} data={paragraph} update={(text) => handleCkChange2(text, "sec_four", index, "paragraph")} />
                                                        </div>
                                                        <div className='mb-2'>
                                                            <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]"> Image</label>
                                                            {
                                                                <OneImageUploadMultiple changeImage={setImageLoader} indexValue={index} section={"sec_four"} MainImage={image} Update={setDatas} sec_value={"imgValue"} sec_image={"image"} folder_name={"catalog_banner_image"} page_type={"catalogs"} />
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
                                        <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Faqs</div>
                                        <Link className='users-table-page__add bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={() => handleSectionAdd("sec_faqs", ["question", "answer"])} >
                                            <img src={plus} alt="plus" />
                                            <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
                                        </Link>
                                    </div>
                                    <FormControl name="sec_faqs_heading" label={"Faqs Title"} placeholder="Enter Title" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />

                                    <div className="section4Main grid grid-cols-2 gap-3 mt-4 max-lg:grid-cols-1">
                                        {
                                            Array.isArray(sec_faqs) && sec_faqs.map((item, index) => {
                                                const { question, answer } = item
                                                return (
                                                    <div className="section3MainBox bg-[#DEE5F2] p-4 rounded-lg relative" key={index}>
                                                        <div className='mb-3'>
                                                            <label htmlFor="" className='mb-2 text-[#7D8CA7] text-[.8rem] items-center flex justify-between'>
                                                                <span>Question</span>
                                                                {<div className='closeButton cursor-pointer  bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem]  grid place-items-center rounded-[.7rem] z-10' onClick={() => handleDelete("sec_faqs", index)}>
                                                                    <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                    </svg>
                                                                </div>}
                                                            </label>
                                                            <div className='smallValue'>
                                                                <CKEditors label={"question"} data={question} update={(text) => handleCkChange2(text, "sec_faqs", index, "question")} />
                                                            </div>
                                                        </div>
                                                        <div className=''>
                                                            <label htmlFor="" className='mb-1 text-[#7D8CA7] text-[.8rem] block'><span>Answer</span> </label>
                                                            <CKEditors label={"Answer"} data={answer} update={(text) => handleCkChange2(text, "sec_faqs", index, "answer")} />

                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>

                                <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
                                    <div className='flex justify-between'>
                                        <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Testimonials</div>
                                        <Link className='users-table-page__add bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={() => handleSectionAdd("sec_testimonials", ["question", "answer"])} >
                                            <img src={plus} alt="plus" />
                                            <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
                                        </Link>
                                    </div>
                                    <FormControl name="testimonials_title" label={"Testimonials Title"} placeholder="Enter Title" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />

                                    <div className="section4Main grid grid-cols-2 gap-3 mt-4 max-lg:grid-cols-1">
                                        {
                                            Array.isArray(sec_testimonials) && sec_testimonials.map((item, index) => {
                                                const { message, name } = item
                                                return (
                                                    <div className="section3MainBox bg-[#DEE5F2] p-4 rounded-lg relative" key={index}>
                                                        <div className='mb-3'>
                                                            <label htmlFor="" className='mb-2 text-[#7D8CA7] text-[.8rem] items-center flex justify-between'>
                                                                <span>Testimonials</span>
                                                                {<div className='closeButton cursor-pointer  bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem]  grid place-items-center rounded-[.7rem] z-10' onClick={() => handleDelete("sec_testimonials", index)}>
                                                                    <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                    </svg>
                                                                </div>}
                                                            </label>
                                                            <div className="inputBox w-full mt-3">
                                                                <label htmlFor="" className="mb-1 text-[#7D8CA7] text-[.8rem] flex justify-between"><span>Heading</span>  <span>{(index + 1) >= 10 ? (index + 1) : `0${(index + 1)}`}</span></label>
                                                                <input name="name" placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" value={name} onChange={(e) => handleInputChange2(e, "sec_testimonials", index)} />
                                                            </div>
                                                        </div>
                                                        <div className=''>
                                                            <label htmlFor="" className='mb-1 text-[#7D8CA7] text-[.8rem] block'><span>Description</span> </label>
                                                            <CKEditors label={"Description"} data={message} update={(text) => handleCkChange2(text, "sec_testimonials", index, "message")} />

                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>

                                {addCar && <div className='antdheight'>
                                    <div className="h4 text-[#7D8CA7] text-[.8rem] mb-1">Product List</div>
                                    <Select
                                        showSearch
                                        mode="multiple"
                                        placeholder="Please select"
                                        onChange={(e) => handleCarsToggle(e)}
                                        style={{
                                            width: '100%',
                                        }}
                                        options={addCar}
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                    />
                                </div>}

                                <StatusToggle
                                  name="catalog_status"
                                  label="Catalog Status"
                                  checkedLabel="Enable"
                                />
                            </div>
                            {(userdata?.role_id !== 12) ?
                                <div className="product-create-page__actions">
                                    <Link to="/catalogs" className="product-create-page__cancel">
                                        Cancel
                                    </Link>
                                    <SubmitButton props={{
                                        class: "role-create-page__submit btn bg-secondary text-white uppercase py-3 px-8 rounded-full w-fit block submit hover:bg-primary transition-all duration-300",
                                        text: "Create Catalog",
                                    }} buttonLoading={res.isLoading}
                                    />
                                </div>
                                : ""
                            }
                        </Form>
                    </Formik>
                </div>
            </div>
        </section>
    );
};

export default CreateCatalogs;
