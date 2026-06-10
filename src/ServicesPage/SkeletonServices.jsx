import React from 'react'
import { Link } from 'react-router-dom'
import plus from '../dist/webImages/plus.svg'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonServices = () => {
  return (
    <SkeletonTheme baseColor="#EFF4FD" highlightColor="#D4DEF1">
    <div className='services pr-10 max-lg:pr-6'>
    <div className="servicesTop flex justify-between items-center mb-4">
                <h6 className='text-[1rem] mb-2 bookingSectionh relative px-3 font-Mluvka'> Services</h6>
                <Link to={"/services/create"} className='bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' >
                    <img src={plus} alt="plus" />
                    <span className='font-MluvkaBold text-secondary capitalize'>Add Services</span>
                </Link>
            </div>
      <div className="servicesBottom grid grid-cols-4 gap-4 max-lg:grid-cols-1">
        {[...Array(16)].map((_, index) => (
          <div key={index} className="servicesCard border-2 border-[#ddd] p-3 rounded-2xl">
            <div className="servicesCard__img">
              <Skeleton height={160} width="100%" />
            </div>
            <div className="servicesCard__Body mt-3">
              <Skeleton height={24} width="80%" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </SkeletonTheme>
  )
}

export default SkeletonServices