import React, { useEffect, useState } from 'react'
import { Form, Formik } from 'formik';
import FormControl from '../components/form/FormControl';
import swal from "sweetalert";
import profile from "../dist/webImages/profile.webp"
import camera from "../dist/webImages/camera.svg"
import plus from '../dist/webImages/plus.svg'
import SubmitButton from '../components/SubmitButton';
import CKEditors from '../components/form/CKEditors';
import { Link } from 'react-router-dom';
import back from "../dist/webImages/back.svg";
import SkeletonCreateEdit from './SkeletonCreateEdit';

const EditDepartments = () => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }, []);
    const [datas, setDatas] = useState({
        "discription": "discription",
    });
    const { discription } = datas;
    let initialValues = {
        dtitle: "",
        discription: "",
    }
    const [imgPath, setImgPath] = useState();
    const [lowyers, setLowyers] = useState([])
    const [addLowyer, setAddLowyer] = useState({
        "addLowyerStatus": false,
        "LowyerList": [
            {
                id: 1,
                image: require(`../dist/webImages/lawyers/1.png`),
                label: "Abu Hamza",
                discription: "Head of Pleading Department",
            },
            {
                id: 2,
                image: require(`../dist/webImages/lawyers/2.png`),
                label: "Abu Hamza",
                discription: "Head of Pleading Department",
            },
            {
                id: 3,
                image: require(`../dist/webImages/lawyers/3.png`),
                label: "Abu Hamza",
                discription: "Head of Pleading Department",
            },
            {
                id: 4,
                image: require(`../dist/webImages/lawyers/1.png`),
                label: "Abu Hamza",
                discription: "Head of Pleading Department",
            },
            {
                id: 5,
                image: require(`../dist/webImages/lawyers/1.png`),
                label: "Abu Hamza",
                discription: "Head of Pleading Department",
            },
            {
                id: 6,
                image: require(`../dist/webImages/lawyers/1.png`),
                label: "Abu Hamza",
                discription: "Head of Pleading Department",
            },
            {
                id: 7,
                image: require(`../dist/webImages/lawyers/1.png`),
                label: "Abu Hamza",
                discription: "Head of Pleading Department",
            },
            {
                id: 7,
                image: require(`../dist/webImages/lawyers/1.png`),
                label: "Abu Hamza",
                discription: "Head of Pleading Department",
            },
            {
                id: 9,
                image: require(`../dist/webImages/lawyers/1.png`),
                label: "Abu Hamza",
                discription: "Head of Pleading Department",
            },
            {
                id: 10,
                image: require(`../dist/webImages/lawyers/1.png`),
                label: "Abu Hamza",
                discription: "Head of Pleading Department",
            },
            {
                id: 11,
                image: require(`../dist/webImages/lawyers/1.png`),
                label: "Abu Hamza",
                discription: "Head of Pleading Department",
            },
            {
                id: 12,
                image: require(`../dist/webImages/lawyers/1.png`),
                label: "Abu Hamza",
                discription: "Head of Pleading Department",
            },
        ]
    })
    const { addLowyerStatus, LowyerList } = addLowyer
    useEffect(() => {
          setImgPath("https://testingdigitaldmcc.com/raalc/webImages/team/1.webp");
          setLowyers([{
            id: 1,
            image: require(`../dist/webImages/lawyers/1.png`),
            label: "Abu Hamza",
            discription: "Head of Pleading Department",
          },
          {
            id: 2,
            image: require(`../dist/webImages/lawyers/2.png`),
            label: "Abu Hamza",
            discription: "Head of Pleading Department",
          },
          {
            id: 3,
            image: require(`../dist/webImages/lawyers/3.png`),
            label: "Abu Hamza",
            discription: "Head of Pleading Department",
          }])
      }, [])
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
    const handleRemoveLowyers = (index) => {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete?",
            buttons: true,
            icon: "warning",
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    setLowyers(prevExpertise => prevExpertise.filter((_, i) => i !== index));
                    swal("Successfully Delete", "", "success");
                }

            });
    };
    const handlediscriptionChange = (event, editor) => {
        const data = editor.getData();
        setDatas(d => ({ ...d, "discription": data }));
    };
    const handleLawyersToggle = (id) => {
        setLowyers(prevState => {
            const isActive = prevState.some(item => item.id === id);
            if (isActive) {
                return prevState.filter(item => item.id !== id);
            } else {
                const newLowyer = LowyerList.find(item => item.id === id);
                return [...prevState, newLowyer];
            }
        });
    }
    const handleSubmit = async (values) => {
        console.log(values)
    }
    if(loading) return <SkeletonCreateEdit heading={"Edit Departments"} />
    return (
        <div className='EditDepartments pr-10 max-lg:pr-6'>
             <Link to={"/departments"} className="back flex items-center mb-5 gap-2">
            <img src={back} className='w-[2rem]' alt="" />
            <span className='text-[1.4rem] font-MluvkaBold'>Edit Department</span>
            </Link>
            <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3'>
                <div className='relative flex'>
                    <div className=' bg-white rounded-xl w-full  mx-auto relative'>
                        <div className='overflow-auto modelBox'>
                            <Formik initialValues={initialValues}
                                onSubmit={handleSubmit}>
                                <Form name="myForm">
                                    <div className="DepartmentsBox p-5 px-12 rounded-xl max-lg:py-3 max-lg:px-5">
                                        <div className='w-[12rem] h-[12rem] relative mt-4' onDrop={handleDrop}   >
                                            <img src={imgPath || profile} className='w-full h-full rounded-3xl object-cover border-2 border-[#C0CCE2]' alt="" />
                                            <div className="TeamBoxinput w-[3rem] h-[3rem] bg-[#C0CCE2] grid  place-items-center rounded-full absolute mx-auto right-0 left-0 top-[50%] transform translate-y-[-50%] cursor-pointer z-1">
                                                <input type="file" onChange={handleFileUpload} className='absolute inset-0 opacity-0 cursor-pointer' />
                                                <img src={camera} alt="camera" className='cursor-pointer w-full p-3' />
                                            </div>
                                        </div>
                                        <div className='form mt-7'>
                                            <FormControl name="dtitle" placeholder="Enter Department Title" className="outline-none w-full h-[2.7rem] border border-[#CFD5E2] px-5 rounded-full" control="input" />
                                            <CKEditors label={"discription"} data={discription} update={handlediscriptionChange} />
                                            <div className='flex items-center gap-5 mt-3 max-lg:flex-col'>
                                                <div className='border border-[#CFD5E2] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={() => setAddLowyer(d => ({ ...d, addLowyerStatus: !addLowyerStatus }))}>
                                                    <img src={plus} alt="plus" />
                                                    <span className='font-MluvkaBold text-secondary capitalize'>Add Lowyers</span>
                                                </div>
                                                <ul className='list flex max-lg:flex-wrap gap-2'>
                                                    {lowyers && lowyers.map((item, index) => {
                                                        const { id, image } = item;
                                                        return (
                                                            <li className="dpartCardProfile-img relative" key={id}>
                                                                <div className='close w-[1.2rem] h-[1.2rem] grid place-items-center p-1 absolute top-[-.2rem] right-[-.2rem] bg-[#FF9898] rounded-3xl cursor-pointer' onClick={() => handleRemoveLowyers(index)}>
                                                                    <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M6.22583 1.00391L1.19141 6.03799M6.22583 6.03833L1.19141 1.00423" stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                    </svg>
                                                                </div>
                                                                <img className={`w-[2.8rem] h-[2.8rem] min-w-[2.8rem] min-h-[2.8rem] rounded-full object-cover border-2 border-[#fff]`} src={image} alt={image} />
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                        </div>

                                    </div>
                                    <ul className='list gap-4  my-3 pb-6 px-6'>
                                        <li className=''>
                                            {
                                                <SubmitButton
                                                    props={{
                                                        class: "btn bg-secondary text-white  uppercase ml-auto  py-3 px-10 rounded-full w-fit block submit hover:bg-primary transition-all duration-300",
                                                        text: "Update",
                                                    }}
                                                    buttonLoading={false}
                                                />
                                            }
                                        </li>
                                    </ul>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                    <div className='bg-[#D4DEF1] w-0 overflow-hidden  transition-all duration-700  self-stretch rounded-xl max-lg:absolute max-lg:right-0 max-lg:w-[20rem!important]' style={{ width: addLowyerStatus ? "30%" : "0" }}>
                        {addLowyerStatus && <div className='px-3 h-full  py-4'>
                            <div className="h4 text-[1.1rem] font-MluvkaBold mb-4">
                                <span>Lawyers</span>
                                <div className='closeButton cursor-pointer absolute bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] top-[.7rem] right-[.7rem] grid place-items-center rounded-[.7rem] z-10' onClick={() => setAddLowyer(d => ({ ...d, addLowyerStatus: !addLowyerStatus }))}>
                                    <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                            <ul className='list lowyerlist overflow-y-auto max-h-[60vh] pr-2'>
                                {LowyerList.map((item) => {
                                    const { id, label, image, discription } = item;
                                    const lowyerslistactive = lowyers.map(l => l.id);
                                    return (
                                        <li key={id} className='bg-white cursor-pointer my-3 border border-white rounded-3xl py-2 px-4' onClick={() => handleLawyersToggle(id)} style={{ borderColor: lowyerslistactive.includes(id) ? "#DCB33E" : "white" }}>
                                            <div className="lawyerCard_ flex items-center gap-4">
                                                <div className="lawyerCard__img">
                                                    <img className='w-[2.5rem] rounded-sm' src={image} alt={image} />
                                                </div>
                                                <div className="lawyerCard__txt" >
                                                    <div className="h2 text-[.9rem] font-Mluvka leading-[1]">{label}</div>
                                                    <p className='leading-[1] mt-1 text-primary text-[.8rem]'>{discription}</p>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })}

                            </ul>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditDepartments
