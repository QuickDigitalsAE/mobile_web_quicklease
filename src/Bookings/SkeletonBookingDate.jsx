import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonBookingDate = () => {
  return (
    <SkeletonTheme baseColor="#ddd" highlightColor="#eee">
      <div className="bookingPage-RightBox relative">
        <div className='inputBox bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center'>
          <Skeleton circle={true} width={20} height={20} />
          <div className='font-Mluvka flex items-center gap-1 ml-2'>
            <Skeleton width={50} />
          </div>
        </div>
      </div>
      <div className="bookingPage-RightBox relative">
        <div className='inputBox bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center'>
          <Skeleton circle={true} width={20} height={20} />
          <div className='font-Mluvka flex items-center gap-1 ml-2'>
            <Skeleton width={50} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default SkeletonBookingDate;
