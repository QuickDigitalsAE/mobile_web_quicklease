import React, { useEffect, useState } from 'react'
import plus from '../dist/webImages/plus.svg'
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import FormControl from '../components/form/FormControl';
import swal from "sweetalert";
import profile from "../dist/webImages/profile.webp"
import camera from "../dist/webImages/camera.svg"
import SubmitButton from '../components/SubmitButton';
import SkeletonCreateEditServices from './SkeletonCreateEditServices';
import back from "../dist/webImages/back.svg";

const CreateServices = () => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);
    const [service, setService] = useState({
        "section2": [{
            "id": 1,
            "heading": "",
            "paragraph": "",
        }],
        "section3": [
            {
                "id": 1,
                "heading": "",
                "paragraph": "",
                "imgPath": "",
                "imgValue": "",
            }
        ],
        "section4": {
            "id": 1,
            "heading": "",
            "paragraph": "",
            "icon": [
                {
                    id: 1,
                    title: "",
                    "imgPath": "",
                    "imgValue": "",
                }
            ]
        }
    })
    const { section2, section3, section4 } = service
    const { icon } = section4;

    const initialValues = {
        email: "",
        password: "",
    }
    const [imgPath, setImgPath] = useState();
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            let path = (window.URL || window.webkitURL).createObjectURL(file);
            setImgPath(path);
        }
    }
    const handleFileUpload2 = (e, section, id) => {
        const file = e.target.files[0];
        if (file) {
            let path = (window.URL || window.webkitURL).createObjectURL(file);
            setService(prevService => ({
                ...prevService,
                [section]: prevService[section].map(item =>
                    item.id === id ? { ...item, "imgPath": path, "imgValue": file } : item
                )
            }));
        }
    }
    const handleFileUpload3 = (e, id) => {
        const file = e.target.files[0];
        if (file) {
            let path = (window.URL || window.webkitURL).createObjectURL(file);
            setService(prevService => ({
                ...prevService,
                section4: {
                    ...prevService.section4,
                    icon: prevService.section4.icon.map(item =>
                        item.id === id ? { ...item, imgPath: path, imgValue: file } : item
                    )
                }
            }));
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
    const handleDrop2 = (e, section, id) => {
        if (e.dataTransfer.files[0] && e.dataTransfer.files[0]?.type?.includes("image")) {
            let path = (window.URL || window.webkitURL).createObjectURL(e.dataTransfer.files[0]);
            const file = e.dataTransfer.files[0];
            setService(prevService => ({
                ...prevService,
                [section]: prevService[section].map(item =>
                    item.id === id ? { ...item, "imgPath": path, "imgValue": file } : item
                )
            }));
        } else {
            swal("Only use Image", "", "warning");
        }
    };
    const handleDrop3 = (e, id) => {
        e.preventDefault(); // Prevent default behavior (Prevent file from being opened)

        if (e.dataTransfer.files[0] && e.dataTransfer.files[0]?.type?.includes("image")) {
            const path = (window.URL || window.webkitURL).createObjectURL(e.dataTransfer.files[0]);
            const file = e.dataTransfer.files[0];

            setService(prevService => ({
                ...prevService,
                section4: {
                    ...prevService.section4,
                    icon: prevService.section4.icon.map(item =>
                        item.id === id ? { ...item, imgPath: path, imgValue: file } : item
                    )
                }
            }));
        } else {
            swal("Only use Image", "", "warning");
        }
    };


    const handleInputChange = (e, section, id) => {
        const { name, value } = e.target;
        setService(prevService => ({
            ...prevService,
            [section]: prevService[section].map(item =>
                item.id === id ? { ...item, [name]: value } : item
            )
        }));
    }
    const handleInputChange2 = (e) => {
        const { name, value } = e.target;
        setService(prevService => ({
            ...prevService,
            section4: {
                ...prevService.section4,
                [name]: value,
            }
        }));
    }
    const handleInputChange3 = (e, id) => {
        const { name, value } = e.target;
        setService(prevService => ({
            ...prevService,
            section4: {
                ...prevService.section4,
                icon: prevService.section4.icon.map(item =>
                    item.id === id ? { ...item, [name]: value } : item
                )
            }
        }));
    };

    const handlePlus = () => {
        const newServices = {
            id: section2.length + 1,
            question: "",
            answer: "",
        };

        setService((prevState) => ({
            ...prevState,
            section2: [...prevState.section2, newServices]
        }));
    }
    const handlePlus2 = () => {
        const newServices = {
            id: section3.length + 1,
            question: "",
            answer: "",
            "imgPath": "",
            "imgValue": "",
        };

        setService((prevState) => ({
            ...prevState,
            section3: [...prevState.section3, newServices]
        }));
    }
    const handlePlus3 = () => {
        const newIcon = {
            id: service.section4.icon.length + 1,
            title: "",
            imgPath: "",
            imgValue: "",
        };

        setService(prevState => ({
            ...prevState,
            section4: {
                ...prevState.section4,
                icon: [...prevState.section4.icon, newIcon]
            }
        }));
    };
    const handleDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete?",
            buttons: true,
            icon: "warning",
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    setService((prevState) => ({
                        ...prevState,
                        section2: prevState.section2.filter(faq => faq.id !== id)
                    }));
                    swal("Successfully Delete", "", "success");
                }

            });
    }
    const handleDelete3 = () => {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete?",
            buttons: true,
            icon: "warning",
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    // setService((prevState) => ({
                    //     ...prevState,
                    //     section2: prevState.section2.filter(faq => faq.id !== id)
                    // }));
                    swal("Successfully Delete", "", "success");
                }

            });
    }
    const handleDelete4 = () => {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete?",
            buttons: true,
            icon: "warning",
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    // setService((prevState) => ({
                    //     ...prevState,
                    //     section2: prevState.section2.filter(faq => faq.id !== id)
                    // }));
                    swal("Successfully Delete", "", "success");
                }

            });
    }
    if (loading) return <SkeletonCreateEditServices heading={"Create Services"} />
    return (
        <div className='services pr-10 max-lg:pr-6'>
           <Link to={"/services"} className="back flex items-center mb-5 gap-2">
            <img src={back} className='w-[2rem]' alt="" />
            <span className='text-[1.4rem] font-MluvkaBold'>Create Services</span>
            </Link>
            <div className="servicesBottom">
                <Formik initialValues={initialValues}  >
                    <Form>
                        <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-8'>
                            <FormControl name="heading" label={"Meta Title"} placeholder="Enter Meta Title" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                            <div className='grid grid-cols-2 gap-3 max-lg:grid-cols-1 max-lg:gap-1'>
                                <FormControl name="heading" label={"Meta Description"} placeholder="Enter Meta Description" className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl resize-none" control="textarea2" />
                                <FormControl name="heading" label={"Scheme Code"} placeholder="Scheme Code" className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl resize-none" control="textarea2" />
                            </div>
                        </div>
                        <h2 className='mb-2 font-MluvkaBold text-[1.5rem]'>Service 01 Title will be here</h2>
                        <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
                            <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Section 1</div>
                            <div className="grid grid-cols-[7fr,3fr] gap-4 max-lg:grid-cols-1">
                                <div className='section1left'>
                                    <FormControl name="heading" label={"Heading"} placeholder="Enter Heading" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                                    <FormControl name="subheading" label={"Heading 2"} placeholder="Enter Heading 2" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                                    <FormControl name="description" label={"Description"} placeholder="Description" className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl resize-none" control="textarea2" />
                                </div>
                                <div className="section1right">
                                    <div className=' h-[23rem] relative' onDrop={handleDrop}   >
                                        {imgPath ?
                                            <img src={imgPath || profile} className='w-full h-full rounded-3xl object-cover ' alt="" />
                                            :
                                            <div className='w-full h-full  rounded-3xl object-cover  bg-white'></div>
                                        }
                                        <div className="TeamBoxinput w-[3rem] h-[3rem] bg-[#C0CCE2] grid  place-items-center rounded-full absolute mx-auto right-0 left-0 top-[50%] transform translate-y-[-50%] cursor-pointer z-1">
                                            <input type="file" onChange={handleFileUpload} className='absolute inset-0 opacity-0 cursor-pointer' />
                                            <img src={camera} alt="camera" className='cursor-pointer w-full p-3' />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        {/* close  */}
                        <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
                            <div className="h4 text-[#7D8CA7] text-[1.1rem] ">Section 2</div>
                            <div className='section2Main grid grid-cols-3 mt-3 gap-2 max-lg:grid-cols-1'>
                                {
                                    section2.map((item) => {
                                        const { id, heading, paragraph } = item;
                                        return (
                                            <div key={id} className="section2MainBox relative bg-[#D4DEF1] rounded-2xl p-3">
                                                <div
                                                    className='closeButton cursor-pointer ml-auto bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] grid place-items-center rounded-[.7rem] z-10'
                                                    onClick={() => handleDelete(id)}
                                                >
                                                    <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                                <div className="inputBox w-full mt-3">
                                                    <label className="mb-1 block text-[#7D8CA7] text-[.8rem]">Heading</label>
                                                    <input
                                                        name="heading"
                                                        placeholder="Enter Heading"
                                                        className="outline-none w-full h-[3rem] px-5 rounded-xl"
                                                        value={heading}
                                                        onChange={(e) => handleInputChange(e, "section2", id)}
                                                    />
                                                </div>
                                                <div className="inputBox w-full mt-3">
                                                    <label className="mb-1 block text-[#7D8CA7] text-[.8rem]">Paragraph</label>
                                                    <textarea
                                                        name="paragraph"
                                                        placeholder="Paragraph"
                                                        className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl resize-none"
                                                        value={paragraph}
                                                        onChange={(e) => handleInputChange(e, "section2", id)}
                                                    ></textarea>
                                                </div>

                                            </div>
                                        );
                                    })
                                }


                            </div>
                            <div className='bg-[#d9dcf8] py-3 mt-4 w-fit px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={handlePlus}>
                                <img src={plus} alt="plus" />
                                <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
                            </div>
                        </div>
                        <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
                            <div className="h4 text-[#7D8CA7] text-[1.1rem] mb-2 ">Section 3</div>
                            <div className="section3Main grid grid-cols-3 gap-3 max-lg:grid-cols-1">
                                {section3.map((item) => {
                                    const { id, heading, paragraph, imgPath } = item;
                                    return (
                                        <div className="section3MainBox relative bg-[#D4DEF1] rounded-2xl p-3" key={id}>
                                            <div className='closeButton cursor-pointer ml-auto bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] grid place-items-center rounded-[.7rem] z-10'
                                                onClick={() => handleDelete4()}  >
                                                <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                            <div className="inputBox w-full mt-3">
                                                <label className="mb-1 block text-[#7D8CA7] text-[.8rem]">Heading</label>
                                                <input
                                                    name="heading"
                                                    placeholder="Enter Heading"
                                                    className="outline-none w-full h-[3rem] px-5 rounded-xl"
                                                    value={heading}
                                                    onChange={(e) => handleInputChange(e, "section3", id)}
                                                />
                                            </div>
                                            <div className="inputBox w-full mt-3">
                                                <label htmlFor={`paragraph-3`} className="mb-1 block text-[#7D8CA7] text-[.8rem]">Paragraph</label>
                                                <textarea
                                                    name="paragraph"
                                                    placeholder="Paragraph"
                                                    className="outline-none w-full h-[10rem] px-5 py-3 rounded-xl resize-none"
                                                    value={paragraph}
                                                    onChange={(e) => handleInputChange(e, "section3", id)}
                                                ></textarea>
                                            </div>
                                            <div className=' h-[10rem] relative' onDrop={(e) => handleDrop2(e, "section3", id)}   >
                                                {imgPath ?
                                                    <img src={imgPath || profile} className='w-full h-full rounded-2xl object-cover ' alt="" />
                                                    :
                                                    <div className='w-full h-full  rounded-2xl object-cover  bg-white'></div>
                                                }
                                                <div className="TeamBoxinput w-[3rem] h-[3rem] bg-[#C0CCE2] grid  place-items-center rounded-full absolute mx-auto right-0 left-0 top-[50%] transform translate-y-[-50%] cursor-pointer z-1">
                                                    <input type="file" onChange={(e) => handleFileUpload2(e, "section3", id)} className='absolute inset-0 opacity-0 cursor-pointer' />
                                                    <img src={camera} alt="camera" className='cursor-pointer w-full p-3' />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>
                            <div className='bg-[#d9dcf8] py-3 mt-4 w-fit px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={handlePlus2}>
                                <img src={plus} alt="plus" />
                                <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
                            </div>
                        </div>
                        <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3 section4'>
                            <div className="h4 text-[#7D8CA7] text-[1.1rem] mb-2 ">Section 4</div>
                            <div className="inputBox w-full mt-3">
                                <label className="mb-1 block text-[#7D8CA7] text-[.8rem]">Heading</label>
                                <input
                                    name="heading"
                                    placeholder="Enter Heading"
                                    className="outline-none w-full h-[3rem] px-5 rounded-xl"
                                    value={section4.heading}
                                    onChange={(e) => handleInputChange2(e)}
                                />
                            </div>
                            <div className="inputBox w-full mt-3">
                                <label className="mb-1 block text-[#7D8CA7] text-[.8rem]">Paragraph</label>
                                <input
                                    name="paragraph"
                                    placeholder="Enter Paragraph"
                                    className="outline-none w-full h-[3rem] px-5 rounded-xl"
                                    value={section4.paragraph}
                                    onChange={(e) => handleInputChange2(e)}
                                />
                            </div>
                            <div className="section4M">
                                <div className="h4 text-[#7D8CA7] text-[1.1rem] mb-2 mt-4 ">Icons</div>
                                <div className="section4Ma bg-[#D4DEF1] p-3 rounded-2xl">
                                    <div className=" grid grid-cols-5 gap-3 max-lg:grid-cols-2">
                                        {
                                            icon.map((item) => {
                                                const { id, imgPath, title } = item;
                                                return (
                                                    <div className="section4MainBox relative">
                                                        <div className='closeButton cursor-pointer absolute right-[-.5rem] top-[-.5rem] ml-auto bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] grid place-items-center rounded-[.7rem] z-10'
                                                            onClick={() => handleDelete3()}  >
                                                            <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </div>
                                                        <div className=' h-[10rem] relative' onDrop={(e) => handleDrop3(e, id)}   >
                                                            {imgPath ?
                                                                <img src={imgPath || profile} className='w-full h-full rounded-2xl object-cover ' alt="" />
                                                                :
                                                                <div className='w-full h-full  rounded-2xl object-cover  bg-white'></div>
                                                            }
                                                            <div className="TeamBoxinput w-[3rem] h-[3rem] bg-[#C0CCE2] grid  place-items-center rounded-full absolute mx-auto right-0 left-0 top-[50%] transform translate-y-[-50%] cursor-pointer z-1">
                                                                <input type="file" onChange={(e) => handleFileUpload3(e, id)} className='absolute inset-0 opacity-0 cursor-pointer' />
                                                                <img src={camera} alt="camera" className='cursor-pointer w-full p-3' />
                                                            </div>
                                                        </div>
                                                        <div className="inputBox w-full mt-3">
                                                            <input
                                                                name="title"
                                                                placeholder="Enter Title"
                                                                className="outline-none w-full h-[3rem] px-5 rounded-xl"
                                                                value={title}
                                                                onChange={(e) => handleInputChange3(e, id)}
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                    <div className='bg-[#b4bae9] py-3 mt-4 w-fit px-6 rounded-full flex items-center gap-2 cursor-pointer' onClick={handlePlus3}>
                                        <img src={plus} alt="plus" />
                                        <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
                                    </div>
                                </div>
                            </div>
                            <SubmitButton
                                props={{
                                    class: "btn bg-secondary text-white px-12 ml-auto uppercase   py-3 rounded-full w-100 block mt-5 submit hover:bg-primary transition-all duration-300",
                                    text: "Submit",
                                }}
                                buttonLoading={false}
                            />
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default CreateServices
