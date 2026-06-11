import React from 'react'

import AntdSelect from '../components/form/AntdSelect';
import { Form, Formik } from 'formik';
import FormControl from '../components/form/FormControl';

const CreateHeaderMenu = () => {
    const datas = [
        {
            value: 'header',
            label: 'Header Menu',
        },
        {
            value: 'footer',
            label: 'Footer Menu',
        },
    ]
    let initialValues = {
        name: "",
        department: "",
        case:  "",
      };
      const handleSubmit = async (values) => {

      }
  return (
   <>
   
   
   <div className='createTeam  '>
<div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-2'>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form name="myForm">
                <div className="grid grid-cols-2 gap-2">    
                <AntdSelect label={"Menu"} data={datas} placeholder={"Select Menu"} />
                <AntdSelect label={"Parent"} data={datas} placeholder={"Select Parent"} />
                <AntdSelect label={"Object"} data={datas} placeholder={"Select Object"} />
                <AntdSelect label={"Page"} data={datas} placeholder={"Select Page"} />
                </div>
                <div className="grid grid-cols-2 gap-2">    
                <FormControl
                 label="Title"
                 name="name"
                 placeholder="Enter your Title"
                 className="outline-none w-full h-[2.7rem] border border-[#CFD5E2] px-5 rounded-xl"
                 control="input" />
                </div>
                </Form>
                </Formik>    
            </div>
    </div>
   
   </>

  )
}

export default CreateHeaderMenu