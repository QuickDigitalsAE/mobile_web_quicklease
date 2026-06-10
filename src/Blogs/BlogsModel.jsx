import React, { useEffect, useState } from 'react';
import close from "../dist/webImages/close.svg";
import { Form, Formik } from 'formik';
import FormControl from '../components/form/FormControl';
import SubmitButton from '../components/SubmitButton';
import CKEditors from '../components/form/CKEditors';
import UploadProduct from '../components/UploadProduct';

const BlogsModel = ({ data, modelStatus, modelStatusUpdate }) => {
    const [datas, setDatas] = useState({
        "discription": "discription",
        "authordiscription": "Autor Details"
    });
    const [fileList, setFileList] = useState([
    ]);
    const { discription,authordiscription } = datas;
    const { dtitle } = data;
    let initialValues = {
        dtitle: dtitle ?? "",
        discription: discription ?? "",
    };
    
    useEffect(() => {
        if (data) {
            setDatas((prevData) => ({...prevData,discription: data?.discription}));
        }
    }, [data]);

    const handleCloseModel = () => {
        modelStatusUpdate(false);
    };

    const handlediscriptionChange = (event, editor) => {
        const data = editor.getData();
        setDatas(d => ({ ...d, "discription": data }));
    };
    
    const handleauthordiscriptionChange = (event, editor) => {
        const data = editor.getData();
        setDatas({ ...datas, "authordiscription": data });
    };
    const hanldefileUpdate = (values) => {
        setFileList(values)
      }
    const handleSubmit = async (values) => {
        console.log(values);
    };

    return (
        <>
            <div onClick={handleCloseModel} className={`backgroundFixed w-full h-screen  fixed top-[50%] left-0 right-0 transform translate-y-[-50%]  bg-black opacity-90 z-10 ${modelStatus ? "block" : "hidden"}`}></div>
            <div className={`BlogsModel  transition-all duration-300  bg-white rounded-xl fixed z-20  left-0 right-0 mx-auto transform translate-y-[-50%] w-[50%] ${modelStatus ? "opacity-100 top-[50%] active" : "top-[40rem] opacity-0"}`}>
                <div className='closeButton cursor-pointer absolute bg-[#E0EBFF] w-[2.938rem] h-[2.938rem] top-0 right-[-4rem] grid place-items-center rounded-[.7rem]' onClick={handleCloseModel}>
                    <img src={close} alt="" />
                </div>
                <div className='max-h-[80vh] overflow-auto modelBox'>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    <Form name="myForm">
                        <div className='p-5 px-12 rounded-xl'>
                        <UploadProduct label={"News Images"} updatess={(item) => hanldefileUpdate(item)} filelis={fileList} />
                            <div className='form mt-2'>
                                <div className='grid grid-cols-2 gap-2'>
                                    <FormControl name="authorname" placeholder="Enter Author Name" className="outline-none w-full h-[2.7rem] border border-[#CFD5E2] px-5 rounded-full" control="input" />
                                    <FormControl type="date" name="date" className="outline-none w-full h-[2.7rem] border border-[#CFD5E2] px-5 rounded-full" control="input" />
                                </div>
                                <CKEditors label={"Autor Details"}  data={authordiscription} update={handleauthordiscriptionChange}  />
                               <FormControl name="name" placeholder="Enter Name" className="outline-none w-full h-[2.7rem] border border-[#CFD5E2] px-5 rounded-full" control="input" />
                               <CKEditors label={"discription"}  data={discription} update={handlediscriptionChange}  />
                            </div>
                        </div>
                        <ul className='list gap-4 my-3 pb-6 px-12'>
                            <li>
                                {data ? (
                                    <SubmitButton
                                        props={{
                                            class: "btn bg-secondary text-white uppercase py-3 px-10 rounded-full w-fit block submit hover:bg-primary transition-all duration-300",
                                            text: "Update",
                                        }}
                                        buttonLoading={false}
                                    />
                                ) : (
                                    <SubmitButton
                                        props={{
                                            class: "btn bg-secondary text-white uppercase py-3 px-10 rounded-full w-fit block submit hover:bg-primary transition-all duration-300",
                                            text: "Add",
                                        }}
                                        buttonLoading={false}
                                    />
                                )}
                            </li>
                        </ul>
                    </Form>
                </Formik>
                </div>
            </div>
        </>
    );
};

export default BlogsModel;
