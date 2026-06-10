import React, { useContext, useEffect, useState } from 'react'
import usePost from '../customHooks/usePost';
import swal from "sweetalert";
import { MainLanguageContext } from '../context/MainLanguageContext';
import { Link, useNavigate } from 'react-router-dom';
import back from "../dist/webImages/back.svg";
import { Field, Form, Formik } from 'formik';
import FormControl from '../components/form/FormControl';
import CKEditors from '../components/form/CKEditors';
import SubmitButton from '../components/SubmitButton';
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
        <section className='CreatePartners  pr-10 max-lg:pr-6'>
            <Link to={"/partners"} className="back flex items-center mb-6 gap-2">
                <img src={back} className='w-[2rem]' alt="" />
                <span className='text-[1.4rem] font-MluvkaBold'>Create Partners</span>
            </Link>

            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form name="myForm">
                    <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3'>
                        <div className="grid grid-cols-2 gap-2">
                            <FormControl name="partner_slug" label={"Slug"} placeholder="Enter Slug" className="outline-none w-full h-[3rem] px-5 rounded-xl border border-[red]" control="input2" />
                            <FormControl name="meta_title" label={"Meta Title"} placeholder="Enter Meta Title" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                        </div>
                        <div className="grid  gap-2">
                            <FormControl name="meta_description" label={"Meta Description"} placeholder="Enter Meta Description" className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl resize-none" control="textarea2" />
                        </div>
                    </div>
                    <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
                        <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Partners</div>
                        <FormControl name="partner_title" label={"Heading {h1}"} placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                        <br />
                        <div className="mb-1 block text-[#7D8CA7] text-[.8rem]">Main Paragraph</div>
                        <CKEditors label={"Main Paragraph"}  folder_name={"paratners_images"} page_type={"paratners"} data={partner_paragraph} update={(text) => handleCkChange(text, "partner_paragraph")} />


                        <div>
                <label className="mb-1  mt-3 block text-[#7D8CA7] text-[.8rem]"> Image </label>
                <OneImageUpload changeImage={setImageLoader} MainImage={datas?.partner_image} Update={setDatas} sec_value={"partner_value"} sec_image={"partner_image"} folder_name={"partner_images"} page_type={"partner"} />
              </div>
              <div className="overflow-hidden relative pt-7 px-4">
                <label className="inline-flex items-center cursor-pointer">
                  <Field  value="1" type="checkbox" name="partner_status"  className="sr-only peer"  />
                  <div className="relative bg-[#1c1c1c] w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer bg-gray-200 peer-checked:after:translate-x-full   after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#401a89]"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900">Partners Status</span>
                </label>
              </div>

                        <SubmitButton
                        props={{
                            class: "btn bg-secondary text-white px-12 ml-auto uppercase mb-3   py-3 rounded-full w-100 block mt-5 submit hover:bg-primary transition-all duration-300",
                            text: "Submit",
                        }}
                        buttonLoading={res.isLoading}
                    />
                    </div>
                   
                </Form>
            </Formik>
        </section>
    )
}

export default CreatePartners