import React, { useEffect, useState } from 'react'
import { Form, Formik } from 'formik';
import FormControl from '../components/form/FormControl';
import swal from "sweetalert";
import profile from "../dist/webImages/profile.webp"
import camera from "../dist/webImages/camera.svg"
import close from "../dist/webImages/close.svg"
import SubmitButton from '../components/SubmitButton';

const ReviewsModel = ({ data, modelStatus, modelStatusUpdate }) => {
  const { dtitle,discription } = data;
  let initialValues = {
    dtitle: dtitle ?? "",
    discription: discription ?? "",
  }
  const [imgPath, setImgPath] = useState();
  useEffect(() => {
    if (data) {
      setImgPath("https://testingdigitaldmcc.com/raalc/webImages/team/1.webp");
    }
  }, [data])
  const handleCloseModel = () => {
    modelStatusUpdate(false)
  }
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      let path = (window.URL || window.webkitURL).createObjectURL(file);
      setImgPath(path);
    }
  }
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files[0] && e.dataTransfer.files[0]?.type?.includes("image")) {
      let path = (window.URL || window.webkitURL).createObjectURL(e.dataTransfer.files[0]);
      setImgPath(path);
      // const file = e.dataTransfer.files[0];
      // onUpload(file);
    }
    else {
      swal("Only use Image", "", "warning");
    }
  };

  const handleSubmit = async (values) => {
    console.log(values)
  }
  return (
    <>
      <div onClick={handleCloseModel} className={`backgroundFixed w-full h-screen  fixed top-[50%] left-0 right-0 transform translate-y-[-50%]  bg-black opacity-90 z-10 ${modelStatus ? "block" : "hidden"}`}></div>
      <div className={`ReviewsModel  transition-all duration-300  bg-white rounded-xl fixed z-20  left-0 right-0 mx-auto transform translate-y-[-50%] w-[50%] ${modelStatus ? "opacity-100 top-[50%] active" : "top-[40rem] opacity-0"}`}>
        <div className='closeButton cursor-pointer absolute bg-[#E0EBFF] w-[2.938rem] h-[2.938rem] top-0 right-[-4rem] grid place-items-center rounded-[.7rem]' onClick={handleCloseModel}>
          <img src={close} alt="" />
        </div>
        <div className='max-h-[80vh] overflow-auto modelBox'>
        <Formik initialValues={initialValues}
          onSubmit={handleSubmit}>
          <Form name="myForm">
            <div className="ReviewsBox p-5 px-12 rounded-xl grid grid-cols-[auto,1fr] gap-10">
              <div className='w-[8rem] h-[8rem] relative mt-3' onDrop={handleDrop}   >
                <img src={imgPath || profile} className='w-full h-full rounded-3xl object-cover border-2 border-[#C0CCE2]' alt="" />
                <div className="TeamBoxinput w-[3rem] h-[3rem] bg-[#C0CCE2] grid  place-items-center rounded-full absolute mx-auto right-0 left-0 top-[50%] transform translate-y-[-50%] cursor-pointer z-1">
                  <input type="file" onChange={handleFileUpload} className='absolute inset-0 opacity-0 cursor-pointer' />
                  <img src={camera} alt="camera" className='cursor-pointer w-full p-3' />
                </div>
              </div>
              <div className='form'>
                <FormControl name="name" placeholder="Enter Name" className="outline-none w-full h-[2.7rem] border border-[#CFD5E2] px-5 rounded-full" control="input" />
                <FormControl name="occupation" placeholder="Enter Occupation" className="outline-none w-full h-[2.7rem] border border-[#CFD5E2] px-5 rounded-full" control="input" />
                <FormControl name="review" placeholder="Enter Review" className="outline-none w-full h-[12rem] border border-[#CFD5E2] px-5 py-3 resize-none rounded-2xl " control="textarea" />
                <ul className='list gap-4  my-3 pb-6'>
                            <li className=''>
                                {data ?
                                    <SubmitButton
                                        props={{
                                            class: "btn bg-secondary  text-white  uppercase   py-3 px-20 rounded-full w-fit block submit hover:bg-primary transition-all duration-300",
                                            text: "Update",
                                        }}
                                        buttonLoading={false}
                                    />
                                    :
                                    <SubmitButton
                                        props={{
                                            class: "btn bg-secondary text-white  uppercase   py-3 px-20 rounded-full w-fit block submit hover:bg-primary transition-all duration-300",
                                            text: "Add",
                                        }}
                                        buttonLoading={false}
                                    />
                                }
                            </li>
                        </ul>
              </div>
            
            </div>
           
          </Form>
        </Formik>
        </div>
      </div>
    </>
  )
}

export default ReviewsModel
