import React, { useContext, useEffect, useState } from 'react'
import usePost from '../customHooks/usePost';
import swal from "sweetalert";
import { MainLanguageContext } from '../context/MainLanguageContext';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import FormControl from '../components/form/FormControl';
import CKEditors from '../components/form/CKEditors';
import SubmitButton from '../components/SubmitButton';
import StatusToggle from '../components/form/StatusToggle';
import { toast } from 'react-toastify';
import OneImageUpload from '../components/OneImageUpload';

const CreatePartners = () => {
  const [imageLoader, setImageLoader] = useState(false)
    const navigate = useNavigate();
    const { mainLanguage } = useContext(MainLanguageContext);
    const [datas, setDatas] = useState({
        "partner_paragraph": "",
        "partner_image": ""
    })
    let initialValues = {
        meta_title: "",
        meta_description: "",
        partner_slug: "",
        partner_title: "",
        partner_status: ["1"],
    };

 

      const handleCkChange = (e, type) => {
        setDatas(d => ({ ...d, [type]: e }));
      };
    
    
    
  

    const [res, apiMethod] = usePost();
    const requireFeild = ["meta_title", "meta_description", "partner_title", "partner_paragraph"];
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
        let requireFeildSwal = {
            meta_title: "Meta title",
            meta_description: "Meta Description",
            partner_title: "Title",
            partner_paragraph: "Paragraph",
        };

        let checkerRequried = [];
        for (const item in values) {
            if (requireFeild.includes(item) && !values[item]) {
                checkerRequried.push(requireFeildSwal[item]);
            }
        }

        formdata.append(`translation[meta_title]`, values["meta_title"]);
        formdata.append(`translation[meta_description]`, values["meta_description"]);
        formdata.append(`translation[partner_title]`, values["partner_title"]);
        formdata.append(`partner_status`, values["partner_status"].length > 0 ? values["partner_status"] : "0");
        formdata.append(`partner_slug`, values["partner_slug"]);

        if( !datas?.partner_value ) {
            checkerRequried.push("partner Image");
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
            formdata.append(`translation[partner_paragraph]`, datas?.partner_paragraph);
            formdata.append(`partner_image`, datas?.partner_value ?? "");

            apiMethod(`partners/create/${mainLanguage}`, formdata)
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
            navigate("/partners")
            toast.success(message);
          }
        }
      }, [res.data])

    if ("") return ""

    const { partner_paragraph } = datas;

    return (
        <section className='CreatePartners product-create-page'>
<div className="product-create-page__hero">
                <span className="product-create-page__eyebrow">Partner management</span>
                <h2>Create Partner</h2>
                <p>Add partner content in the same compact, modern layout used across the refreshed admin forms.</p>
            </div>
<Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form name="myForm" className="product-create-page__form">
                    <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3'>
                        <div className="grid grid-cols-2 gap-2 mt-4">
                            <FormControl name="partner_slug" label={"Slug"} placeholder="Enter Slug" className="outline-none w-full h-[3rem] px-5 rounded-xl border border-[#c4d0e3] border border-[red]" control="input2" />
                            <FormControl name="meta_title" label={"Meta Title"} placeholder="Enter Meta Title" className="outline-none w-full h-[3rem] px-5 rounded-xl border border-[#c4d0e3]" control="input2" />
                        </div>
                        <div className="grid  gap-2">
                            <FormControl name="meta_description" label={"Meta Description"} placeholder="Enter Meta Description" className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl resize-none" control="textarea2" />
                        </div>
                    </div>
                    <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
                        <div className="h4 text-[#7D8CA7] text-[1.5rem] ">Partners</div>
                        <FormControl name="partner_title" label={"Heading {h1}"} placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl border border-[#c4d0e3]" control="input2" />
                        <br />
                        <div className="mb-1 block text-[#7D8CA7] text-[.9rem]">Main Paragraph</div>
                        <CKEditors label={"Main Paragraph"}  folder_name={"paratners_images"} page_type={"paratners"} data={partner_paragraph} update={(text) => handleCkChange(text, "partner_paragraph")} />

                        <div>
                <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]"> Image </label>
                <OneImageUpload changeImage={setImageLoader} MainImage={datas?.partner_image} Update={setDatas} sec_value={"partner_value"} sec_image={"partner_image"} folder_name={"partner_images"} page_type={"partner"} />
              </div>
              <StatusToggle
                name="partner_status"
                label="Partners Status"
                checkedLabel="Enable"
              />

                        <div className="product-create-page__actions">
                            <Link to="/partners" className="product-create-page__cancel">
                                Cancel
                            </Link>
                            <SubmitButton
                            props={{
                                class: "product-create-page__submit btn bg-secondary text-white px-12 uppercase py-3 rounded-full w-100 block submit hover:bg-primary transition-all duration-300",
                                text: "Create Partner",
                            }}
                            buttonLoading={res.isLoading}
                        />
                        </div>
                    </div>
                   
                </Form>
            </Formik>
        </section>
    )
}

export default CreatePartners
