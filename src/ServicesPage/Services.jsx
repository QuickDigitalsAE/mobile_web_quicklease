import React, { useEffect, useState } from 'react'
import plus from '../dist/webImages/plus.svg'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import SkeletonServices from './SkeletonServices';
const Services = () => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);
    const [data, setData] = useState({
        "services": [
            {
                id: 1,
                image: require("../dist/webImages/11.png"),
                title: "Services 01",
            },
            {
                id: 2,
                image: require("../dist/webImages/11.png"),
                title: "Services 01",
            },
            {
                id: 3,
                image: require("../dist/webImages/11.png"),
                title: "Services 01",
            },
            {
                id: 4,
                image: require("../dist/webImages/11.png"),
                title: "Services 01",
            },
            {
                id: 5,
                image: require("../dist/webImages/11.png"),
                title: "Services 01",
            },
            {
                id: 6,
                image: require("../dist/webImages/11.png"),
                title: "Services 01",
            },
            {
                id: 7,
                image: require("../dist/webImages/11.png"),
                title: "Services 01",
            },
            {
                id: 9,
                image: require("../dist/webImages/11.png"),
                title: "Services 01",
            },
            {
                id: 10,
                image: require("../dist/webImages/11.png"),
                title: "Services 01",
            },
            {
                id: 11,
                image: require("../dist/webImages/11.png"),
                title: "Services 01",
            },
            {
                id: 12,
                image: require("../dist/webImages/11.png"),
                title: "Services 01",
            },
            {
                id: 13,
                image: require("../dist/webImages/11.png"),
                title: "Services 01",
            },
        ]
    })
    const { services } = data;
    const handleDelete = () => {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete?",
            buttons: true,
            icon: "warning",
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    swal("Successfully Delete", "", "success");
                }
            });
    }
    if (loading) return <SkeletonServices />
    return (
        <div className='services pr-10 max-lg:pr-6'>
            <div className="servicesTop flex justify-between items-center mb-4">
                <h6 className='text-[1rem] mb-2 bookingSectionh relative px-3 font-Mluvka'> Services</h6>
                <Link to={"/services/create"} className='bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' >
                    <img src={plus} alt="plus" />
                    <span className='font-MluvkaBold text-secondary capitalize'>Add Services</span>
                </Link>
            </div>
            <div className="servicesBottom grid grid-cols-4 gap-4 max-lg:grid-cols-1">
                {
                    services.map((item) => {
                        const { image, title, id } = item
                        return (
                            <div className=' border-2 border-[#ddd] p-3 rounded-2xl relative' key={id}>
                                <div className='closeButton cursor-pointer absolute bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] top-[-1rem] right-[-1rem] grid place-items-center rounded-[.7rem] z-10' onClick={handleDelete}>
                                    <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <Link to={"/services/edit/1"} className="servicesCard relative" >

                                    <div className="servicesCard__img">
                                        <img src={image} className='w-[100%]' alt="" />
                                    </div>
                                    <div className="servicesCard__Body">
                                        <div className="h4 font-MluvkaBold text-[1.4rem] mt-3">{title}</div>
                                    </div>
                                </Link>
                            </div>

                        )
                    })
                }

            </div>
        </div>
    )
}

export default Services