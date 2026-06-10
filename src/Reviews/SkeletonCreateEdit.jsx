import React from 'react'
import { Link } from 'react-router-dom'
import back from "../dist/webImages/back.svg";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonCreateEdit = ({heading}) => {
  return (
    <div className='CreateReviews pr-10 max-lg:pr-6'>
     <Link to={"/reviews"} className="back flex items-center mb-10 gap-2">
            <img src={back} className='w-[2rem]' alt="" />
            <span className='text-[1.4rem] font-MluvkaBold'>{heading}</span>
            </Link>
    <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
        <div className='ReviewsModel transition-all duration-300 bg-white rounded-xl'>
            <div className='overflow-auto modelBox'>
                <div className="ReviewsBox p-5 px-12 rounded-xl grid grid-cols-[auto,1fr] gap-10  max-lg:grid-cols-1 max-lg:gap-2 max-lg:px-5">
                    <div className='w-[8rem] h-[8rem] relative mt-3'>
                        <Skeleton style={{borderRadius:"1rem"}} height={128} width={128} />
                    </div>
                    <div className='form'>
                        <Skeleton height={40} className="outline-none w-full h-[2.7rem] border border-[#CFD5E2] px-5 rounded-full mb-5" />
                        <Skeleton height={40} className="outline-none w-full h-[2.7rem] border border-[#CFD5E2] px-5 rounded-full mb-5" />
                        <Skeleton height={120} className="outline-none w-full h-[12rem] border border-[#CFD5E2] px-5 py-3 resize-none rounded-2xl mb-5" />
                        <ul className='list gap-4 my-3 pb-6'>
                            <li>
                                <Skeleton width={100} height={40} />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default SkeletonCreateEdit
