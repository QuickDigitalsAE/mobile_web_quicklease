import { Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import FormControl from '../components/form/FormControl'
import SubmitButton from '../components/SubmitButton'
import SkeletonPrivacy from './SkeletonPrivacy'

const Terms = () => {
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
    if (loading) return <SkeletonPrivacy />
    return (
        <div className='PrivicyPolicy pr-10'>
            <Formik initialValues={initialValues}  >
                <Form>
                    <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-8'>
                        <FormControl name="heading" label={"Heading"} placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                        <FormControl name="description" label={" Description"} placeholder="Enter Description" className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl resize-none" control="textarea2" />
                    </div>
                    {(
                        <SubmitButton
                            props={{
                                class: "btn bg-secondary text-white uppercase py-3 px-10 rounded-full w-fit block submit hover:bg-primary transition-all duration-300",
                                text: "Update",
                            }}
                            buttonLoading={false}
                        />
                    )}
                    <br />
                </Form>
            </Formik>
        </div>
    )
}

export default Terms