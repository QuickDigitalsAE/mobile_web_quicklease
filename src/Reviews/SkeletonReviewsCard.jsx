import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonReviewsCard = () => {
  return (
    <SkeletonTheme baseColor="#ddd" highlightColor="#eee">
      <div className='dpartCard relative bg-[#fff] border border-[#D4DEF1] rounded-3xl shadow-custom p-4'>
        <div className='cursor-pointer'>
          <div className="dpartCard_ grid grid-cols-[3fr,7fr] items-center gap-5">
            <div className="dpartCard__img ">
              <Skeleton width="100%" height={120} style={{borderRadius:"2rem"}} />
            </div>
            <div className="dpartCard__txt">
              <div className="h3 font-Mluvka leading-[1.1] mb-1 text-[1.5rem]">
                <Skeleton width="80%" />
              </div>
              <div className="h3 font-Mluvka leading-[1.1] mb-1">
                <Skeleton width="50%" />
              </div>
            </div>
          </div>
          <p className='text-[.8rem] text-[#3C3E56] leading-[1.5] my-2'>
            <Skeleton count={3} />
          </p>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default SkeletonReviewsCard;
