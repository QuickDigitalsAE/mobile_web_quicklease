import React from 'react'
import back from "../dist/webImages/back.svg";
import { Link } from 'react-router-dom';
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
   
   
   <div className='createTeam pr-10 max-lg:pr-6'>
               <Link to={"/team"} className="back flex items-center mb-5 gap-2">
            <img src={back} className='w-[2rem]' alt="" />
            <span className='text-[1.4rem] font-MluvkaBold'>Create Header Menu</span>
            </Link>
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