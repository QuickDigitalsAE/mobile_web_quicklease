import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import useDelete from '../customHooks/useDelete';
import { toast } from 'react-toastify';

const ReviewsCard = ({ data,alldata,deleted,permission }) => {
    const {id,image,rating,redirect_url} = data
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
                    // swal("Successfully Delete", "", "success");
                    // apiMethodDelete(`googleReview/${id}`)
                }

            });
    }
    const [resDelete, apiMethodDelete] = useDelete()
    useEffect(() => {
        if(resDelete.data) {
          const {message} = resDelete.data
          const update = alldata.filter((item) => item.id !== id)
          deleted(update)
          toast.success(message);
        }
      }, [resDelete.data])
      const check = (module, action) => permission?.[module]?.includes(action);
    return (
        <div className='dpartCard relative bg-[#fff] border border-[#D4DEF1] rounded-3xl shadow-custom p-4'>
       
                {/* {check("Reviews", "Reviews Delete") &&<div className='closeButton cursor-pointer absolute bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] top-[.7rem] right-[.7rem] grid place-items-center rounded-[.7rem] z-10' onClick={handleDelete}>
                    <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>} */}
            <Link to={`/reviews/edit/${id}`} className='cursor-pointer'>
                <div className="dpartCard_  items-center gap-5 ">
                    <div className="dpartCard__img">
                        <img className='w-[10rem] max-w-full rounded-3xl object-cover' src={image} alt="" />
                    </div>
                    <div className="dpartCard__txt ">
                       { <div className={`h3 font-Mluvka  leading-[1.1] mb-1 text-[1.5rem] text-primary `}>{rating}</div>}
                       { <div className={`h3 font-Mluvka  leading-[1.1] mb-1 `}>{redirect_url}</div>}

                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ReviewsCard
