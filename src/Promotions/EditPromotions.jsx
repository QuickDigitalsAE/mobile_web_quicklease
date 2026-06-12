import React, { useContext, useEffect, useState } from 'react'
import { Form, Formik } from 'formik';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormControl from '../components/form/FormControl';
import SkeletonCreateEdit from './SkeletonCreateEdit';
import CKEditors from '../components/form/CKEditors';
import swal from "sweetalert";
import SubmitButton from '../components/SubmitButton';
import usePost from '../customHooks/usePost';
import StatusToggle from '../components/form/StatusToggle';
import { MainLanguageContext } from '../context/MainLanguageContext';
import { toast } from 'react-toastify';
import useGet from '../customHooks/useGet';
import OneImageUpload from '../components/OneImageUpload';
import { Select } from 'antd';

const EditPromotions = ({ permission }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { mainLanguage } = useContext(MainLanguageContext);

    const [addCar, setAddCar] = useState()
    const [selectedCar, setSelectedCar] = useState()

    const [resget, apiMethodGet] = useGet()
    useEffect(() => {
        apiMethodGet(`promotions/edit/${id}/${mainLanguage}`)
    }, [mainLanguage]);

    const [datas, setDatas] = useState({
        "promotion_image": "",
        "promotion_banner": "",
        "brand_logo": "",
        "promotion_short_paragraph": "",
        "promotion_paragraph": "",
        "car_ids": []
    })

    useEffect(() => {
        if (resget.data) {
            setDatas(resget.data?.data)
            let list = [];
            for (let index = 0; index < resget?.data?.data?.all_cars.length; index++) {
                list.push({
                    label: resget?.data?.data?.all_cars[index]?.product_title,
                    value: resget?.data?.data?.all_cars[index]?.id,
                })

            }
            setAddCar(list);
            let selectedd = []
            for (let index = 0; index < resget?.data?.data?.related_cars.length; index++) {
                selectedd.push(resget?.data?.data?.related_cars[index].id)

            }
            setSelectedCar(selectedd)
        }
    }, [resget.data])

    const handleCkChange = (e, type) => {
        setDatas(d => ({ ...d, [type]: e }));
    };

    const handleCarsToggle = (e) => {
        setSelectedCar(e);
    }

    const [imageLoader, setImageLoader] = useState(false)
    const [res, apiMethod] = usePost();
    const requireFeild = ["promotion_slug", "meta_title", "meta_description", "promotion_title ", "promotion_heading", "promotion_paragraph", "schedule_date"];
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
                promotion_slug: "Slug",
                meta_title: "Meta Title",
                meta_description: "Meta Description",
                promotion_title: "Title",
                promotion_heading: "Heading",
                schedule_date: "schedule date",
            };

            let checkerRequried = [];
            for (const item in values) {
                if (requireFeild.includes(item) && !values[item]) {
                    checkerRequried.push(requireFeildSwal[item]);
                }
            }

            formdata.append(`translation[meta_title]`, values["meta_title"]);
            formdata.append(`translation[meta_description]`, values["meta_description"]);
            formdata.append(`promotion_slug`, values["promotion_slug"]);
            formdata.append(`translation[promotion_title]`, values["promotion_title"]);
            formdata.append(`translation[promotion_heading]`, values["promotion_heading"]);
            formdata.append(`schedule_date`, `${values["schedule_date"].replace("T", " ")}` ?? "");
            formdata.append(`promotion_status`, values["promotion_status"]?.length > 0 ? values["promotion_status"] : "0");
            // formdata.append(`promotion_status`, 1);
            if (checkerRequried.length > 0) {
                swal({
                    title: "Required Fields are empty! Please fill and try again",
                    text: checkerRequried.join(","),
                    icon: "error",
                    dangerMode: true,
                });
            }
            else {
                formdata.append(`translation[promotion_paragraph]`, datas?.promotion_paragraph ?? "");
                formdata.append(`translation[promotion_short_paragraph]`, datas?.promotion_short_paragraph ?? "");
                formdata.append(`promotion_image`, datas?.promotion_value ?? "");
                formdata.append(`promotion_banner`, datas?.promotion_banner_value ?? "");
                formdata.append(`brand_logo`, datas?.brand_logo_value ?? "");
                for (let index = 0; index < selectedCar.length; index++) {
                    formdata.append(`car_ids[]`, selectedCar[index]);
                }
                apiMethod(`promotions/update/${id}/${mainLanguage}`, formdata)
            }
        }

    }
    useEffect(() => {
        if (res.data) {
            const { status, message } = res?.data
            if (status === "false") {
                toast.error(message);
            }
            else {
                navigate("/promotions")
                toast.success(message);
            }
        }
    }, [res.data])

    if (!datas || resget?.isLoading) return <SkeletonCreateEdit heading={"Edit Promotions"} />;
    let initialValues = {
        promotion_slug: resget?.data?.data?.promotion_slug,
        meta_title: resget?.data?.data?.meta_title,
        meta_description: resget?.data?.data?.meta_description,
        promotion_title: resget?.data?.data?.promotion_title ?? "",
        promotion_heading: resget?.data?.data?.promotion_heading ?? "",
        promotion_heading: resget?.data?.data?.promotion_heading ?? "",
        schedule_date: resget?.data?.data.schedule_date && resget?.data?.data.schedule_date.replace(" ", "T"),
        promotion_status: resget?.data?.data?.promotion_status && [`${String(resget?.data?.data?.promotion_status)}`],
    };
    const { promotion_paragraph, promotion_short_paragraph } = datas;
    const check = (module, action) => permission?.[module]?.includes(action);
    return (
        <section className='PromotionCreate product-create-page'>
            <div className="product-create-page__hero">
                <span className="product-create-page__eyebrow">Promotion management</span>
                <h2>Edit Promotion</h2>
                <p>Update promotional content in the same compact, modern layout used across the refreshed admin forms.</p>
            </div>
            <div className='relative flex items-start gap-3'>
                <div className='bg-white rounded-3xl w-full p-4 mx-auto relative'>
                    <Formik initialValues={initialValues} onSubmit={handleSubmit} >
                        <Form name="myForm" className="product-create-page__form">
                            <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3'>
                                <div className="grid grid-cols-2 gap-2">
                                    <FormControl name="promotion_slug" label={"Slug"} placeholder="Enter Slug" className="outline-none w-full h-[3rem] px-5 rounded-xl border border-[red]" control="input2" />
                                    <FormControl name="meta_title" label={"Meta Title"} placeholder="Enter Meta Title" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                                </div>
                                <div className="grid  gap-2">
                                    <FormControl name="meta_description" label={"Meta Description"} placeholder="Enter Meta Description" className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl resize-none" control="textarea2" />
                                </div>
                            </div>
                            <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
                                <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Promotion</div>
                                <div className="grid grid-cols-2 gap-4">
                                    <FormControl name="promotion_title" label={"Title {h1}"} placeholder="Enter Title" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                                    <FormControl name="promotion_heading" label={"Heading"} placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                                </div>
                                <br />
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="">
                                        <div className="mb-1 block text-[#7D8CA7] text-[.8rem]">Short Paragraph</div>
                                        <CKEditors label={"Short Paragraph"} data={promotion_short_paragraph} update={(text) => handleCkChange(text, "promotion_short_paragraph")} />
                                    </div>
                                    <div className="">
                                        <div className="mb-1 block text-[#7D8CA7] text-[.8rem]">Main Paragraph</div>
                                        <CKEditors label={"Main Paragraph"} data={promotion_paragraph} update={(text) => handleCkChange(text, "promotion_paragraph")} />
                                    </div>
                                </div>

                                <br />
                                <br />

                                <div className='mt-4 grid grid-cols-3 gap-4'>
                                    <div className="">
                                        <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">Brand Logo </label>
                                        <OneImageUpload changeImage={setImageLoader} MainImage={datas?.brand_logo} Update={setDatas} sec_value={"brand_logo_value"} sec_image={"brand_logo"} folder_name={"promotion_images"} page_type={"Promotions"} />
                                    </div>
                                    <div>
                                        <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">Promotion Image </label>
                                        <OneImageUpload changeImage={setImageLoader} MainImage={datas?.promotion_image} Update={setDatas} sec_value={"promotion_value"} sec_image={"promotion_image"} folder_name={"promotion_images"} page_type={"Promotions"} />

                                    </div>
                                    <div>
                                        <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]">Promotion Banner </label>
                                        <OneImageUpload changeImage={setImageLoader} MainImage={datas?.promotion_banner} Update={setDatas} sec_value={"promotion_banner_value"} sec_image={"promotion_banner"} folder_name={"promotion_images"} page_type={"Promotions"} />
                                    </div>
                                </div>

                                <div className="mt-4 grid grid-cols-2 gap-4">

                                    <div className='relative'>
                                        <FormControl name="schedule_date" label={"Schedule"} type={'datetime-local'} placeholder="Enter Schedule" className="outline-none mmonth w-full h-[3rem] px-5 rounded-xl" control="input2" />
                                    </div>
                                    {addCar && <div className='antdheight'>
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
                                </div>

                                <StatusToggle
                                  name="promotion_status"
                                  label="Promotion Status"
                                  checkedLabel="Enable"
                                />

                            </div>

                            {check("Promotions", "Promotion Edit") && <div className="product-create-page__actions">
                                <Link to="/promotions" className="product-create-page__cancel">
                                    Cancel
                                </Link>
                                <SubmitButton
                                    props={{
                                        class: "product-create-page__submit btn bg-secondary text-white px-12 uppercase py-3 rounded-full w-100 block submit hover:bg-primary transition-all duration-300",
                                        text: "Update Promotion",
                                    }}
                                    buttonLoading={res.isLoading}
                                />
                            </div>}

                        </Form>
                    </Formik>
                </div>
            </div>
        </section>
    )
}

export default EditPromotions
