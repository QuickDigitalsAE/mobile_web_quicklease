import { Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import FormControl from '../components/form/FormControl'
import SkeletonBoarding from './SkeletonBoarding'
import SubmitButton from '../components/SubmitButton'

const Boarding = () => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }, []);
    const initialValues = {
        email: "",
        password: "",
    }
    if (loading) return <SkeletonBoarding />
    return (
        <div className='Boarding pr-10 max-lg:pr-6'>
            <Formik initialValues={initialValues}  >
                <Form>
                <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
                    <div className="BoardingMain grid grid-cols-3 gap-3 max-lg:grid-cols-1">
                        <div className="BoardingMainBOx">
                        <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Onboarding screen 01</div>
                            <div className="BoardingMainBOx_ bg-[#DEE5F2] p-3 rounded-3xl mt-3">
                            <FormControl name="heading1" label={"heading"} placeholder="Enter heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                            <FormControl name="paragraph1" label={"Sub Heading"} placeholder="Sub Heading" className="outline-none w-full h-[6rem] px-5 py-3 rounded-xl resize-none" control="textarea2" />
                            </div>
                        </div>
                        <div className="BoardingMainBOx">
                        <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Onboarding screen 02</div>
                            <div className="BoardingMainBOx_ bg-[#DEE5F2] p-3 rounded-3xl mt-3">
                            <FormControl name="heading2" label={"heading"} placeholder="Enter heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                            <FormControl name="paragraph2" label={"Sub Heading"} placeholder="Sub Heading" className="outline-none w-full h-[6rem] px-5 py-3 rounded-xl resize-none" control="textarea2" />
                            </div>
                        </div>
                        <div className="BoardingMainBOx">
                        <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Onboarding screen 03</div>
                            <div className="BoardingMainBOx_ bg-[#DEE5F2] p-3 rounded-3xl mt-3">
                            <FormControl name="heading3" label={"heading"} placeholder="Enter heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                            <FormControl name="paragraph3" label={"Sub Heading"} placeholder="Sub Heading" className="outline-none w-full h-[6rem] px-5 py-3 rounded-xl resize-none" control="textarea2" />
                            </div>
                        </div>
                    </div>
                </div>
                <SubmitButton
              props={{
                class: "btn bg-secondary text-white px-12 ml-auto uppercase   py-3 rounded-full w-100 block mt-8 max-lg:mt-4 submit hover:bg-primary transition-all duration-300",
                text: "Update",
              }}
              buttonLoading={false}
            />
                </Form>
            </Formik>
        </div>
    )
}

export default Boarding