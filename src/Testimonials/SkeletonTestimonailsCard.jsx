import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonTestimonailsCard = () => {
  return (
    <SkeletonTheme baseColor="#ddd" highlightColor="#eee">
      <div className='lawyerCard relative bg-[#fff] border border-[#D4DEF1] rounded-3xl shadow-custom p-4'>
        <div className='cursor-pointer relative'>
          <div className="lawyerCard_ flex items-center gap-4">
            <div className="lawyerCard__img">
              <Skeleton width="3.5rem" height="3.5rem" className='rounded-sm' />
            </div>
            <div className="lawyerCard__txt">
              <div className="h2 text-[1.25rem] font-Mluvka leading-[1]">
                <Skeleton width={100} />
              </div>
              <p className='leading-[1] mt-2 text-primary text-[.8rem]'>
                <Skeleton width={150} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  )
}

export default SkeletonTestimonailsCard