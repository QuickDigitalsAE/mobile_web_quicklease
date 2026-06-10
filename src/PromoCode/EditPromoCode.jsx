import React, { useContext, useEffect, useMemo, useState } from 'react'
import back from "../dist/webImages/back.svg";
import { Field, Form, Formik } from 'formik';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormControl from '../components/form/FormControl';
import swal from "sweetalert";
import SubmitButton from '../components/SubmitButton';
import usePost from '../customHooks/usePost';
import { MainLanguageContext } from '../context/MainLanguageContext';
import { toast } from 'react-toastify';
import dayjs from "dayjs"
import useGet from '../customHooks/useGet';
import SkeletonCreateEdit from './SkeletonCreateEdit';
import useFetch from '../customHooks/useFetch';

const EditPromoCode = ({permission}) => {
    const navigate = useNavigate();
      const {id} = useParams();
    const [resget, apiMethodGet] = useGet()
    const { mainLanguage } = useContext(MainLanguageContext);
    const { loading,data } = useFetch(`promotions/listForPromo/${mainLanguage}`)
       useEffect(() => {
          apiMethodGet(`promo_codes/edit/${id}/${mainLanguage}`)
        }, [mainLanguage]);


    const [res, apiMethod] = usePost();
    const requireFeild = ["code_title"];
    const handleSubmit = async (values) => {

            let formdata = new FormData();
            let requireFeildSwal = {
                code_title: "code title",
            };

            let checkerRequried = [];
            for (const item in values) {
                if (requireFeild.includes(item) && !values[item]) {
                    checkerRequried.push(requireFeildSwal[item]);
                }
            }
            

            formdata.append(`target_type`, values["target_type"]);
            formdata.append(`code_title`, values["code_title"]);
            formdata.append(`code_type`, values["code_type"]);
            formdata.append(`code_value`, values["code_value"]);
            if(values["target_type"] = "promotion") {
                formdata.append(`promotion_id`, values["promotion_id"]);
            }
            formdata.append(`code`, values["code"]);
            formdata.append(`expires_at`, `${values["expires_at"].replace("T", " ")}` ?? "");
            formdata.append(`code_status`, values["code_status"]?.length > 0 ? values["code_status"] : "0");

            if (checkerRequried.length > 0) {
                swal({
                    title: "Required Fields are empty! Please fill and try again",
                    text: checkerRequried.join(","),
                    icon: "error",
                    dangerMode: true,
                });
            }
            else {
                apiMethod(`promo_codes/update/${id}/${mainLanguage}`, formdata)
            }


    }
    useEffect(() => {
        if (res.data) {
            const { status, message } = res?.data
            if (status === "false") {
                toast.error(message);
            }
            else {
                navigate("/promo")
                toast.success(message);
            }
        }
    }, [res.data])


    if (resget.isLoading || !resget?.data || loading || !data) return <SkeletonCreateEdit heading={"Edit Promo"} />;
    let initialValues = {
        target_type: resget?.data?.data?.target_type,
        code_title: resget?.data?.data?.code_title,
        promotion_id: resget?.data?.data?.promotion_id,
        code_type: resget?.data?.data?.code_type,
        code_value: resget?.data?.data?.code_value,
        code: resget?.data?.data?.code,
        expires_at: dayjs(resget?.data?.data?.expires_at).format("YYYY-MM-DD"),
        code_status: resget?.data?.data.code_status && [`${String(resget?.data?.data.code_status)}`],
    };
     const check = (module, action) => permission?.[module]?.includes(action);
    return (
        <section className='PromotionCreate pr-10 max-lg:pr-6'>
            <Link to={"/promo"} className="back flex items-center mb-5 gap-2">
                <img src={back} className='w-[2rem]' alt="" />
                <span className='text-[1.4rem] font-MluvkaBold'>Edit Promo</span>
            </Link>
            <div className='relative flex items-start gap-3'>
                <div className=' bg-white rounded-xl w-full  mx-auto relative'>
                    <Formik initialValues={initialValues} onSubmit={handleSubmit} >
                    {({ values }) => {
                            return (
                        <Form name="myForm">
                            <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3'>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className='inputBox w-full mt-3'>
                                        <label htmlFor="Code Title" className="mb-1 block text-[#7D8CA7] text-[.8rem]">Target Type</label>
                                        <Field as="select" name="target_type" className="outline-none w-full h-[3rem] px-5 rounded-xl">
                                            <option value={"default"}>default</option>
                                            <option value={"promotion"}>promotion</option>
                                        </Field>
                                    </div>
                                    <FormControl name="code_title" label={"Code Title"} placeholder="Enter Code Title" className="outline-none w-full h-[3rem] px-5 rounded-xl border border-[red]" control="input2" />
                                    <div className='inputBox w-full mt-3'>
                                        <label htmlFor="Code Title" className="mb-1 block text-[#7D8CA7] text-[.8rem]">Code Type</label>
                                        <Field as="select" name="code_type" className="outline-none w-full h-[3rem] px-5 rounded-xl">
                                            <option value={"amount"}>amount</option>
                                            <option value={"percentage"}>percentage</option>
                                        </Field>
                                    </div>
                                  {values?.target_type !== "default" ? <div className='inputBox w-full mt-3'>
                                                                              <label htmlFor="Code Title" className="mb-1 block text-[#7D8CA7] text-[.8rem]">Promotion Id</label>
                                                                              <Field as="select" name="promotion_id" className="outline-none w-full h-[3rem] px-5 rounded-xl">
                                                                                  <option value="">select code type</option>
                                                                                  {Array.isArray(data?.data) && data?.data.map((item) => {
                                                                                      const {promotion_title,id} = item
                                                                                      return (
                                                                                          <option key={id} value={id}>{promotion_title}</option>
                                                                                      )
                                                                                  })}
                                                                              </Field>
                                                                          </div> : ""}
                                    <FormControl name="code_value" label={"Code Value"} placeholder="Enter Code Value" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                                    <FormControl name="code" label={"Code"} placeholder="Enter Code" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />

                                    <div className='relative'>
                                        <FormControl name="expires_at" label={"expires at"} type={'date'} placeholder="Enter expires at" className="outline-none mmonth w-full h-[3rem] px-5 rounded-xl" control="input2" />
                                    </div>
                                    <div className="overflow-hidden relative pt-7 px-4">
                                        <label className="inline-flex items-center cursor-pointer">
                                            <Field value="1" type="checkbox" name="code_status" className="sr-only peer" />
                                            <div className="relative bg-[#1c1c1c] w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer bg-gray-200 peer-checked:after:translate-x-full   after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#401a89]"></div>
                                            <span className="ms-3 text-sm font-medium text-gray-900">Code Status</span>
                                        </label>
                                    </div>
                                </div>

                            </div>

                            {check("PromoCode", "PromoCode Edit") && <SubmitButton
                                props={{
                                    class: "btn bg-secondary text-white px-12 ml-auto uppercase mb-3   py-3 rounded-full w-100 block mt-5 submit hover:bg-primary transition-all duration-300",
                                    text: "Submit",
                                }}
                                buttonLoading={res.isLoading}
                            />}

                        </Form>
                         )
                        }}
                    </Formik>
                </div>
            </div>
        </section>
    )
}

export default EditPromoCode