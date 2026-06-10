import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonEnquiries = () => {
  return (
    <SkeletonTheme baseColor="#fff" highlightColor="#f0f0f0">
      <div className='PrivicyPolicy pr-10'>
        <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-8'>
          <Skeleton height={30} width={150} className="mb-4" />
          <div className='grid grid-cols-2 gap-3 max-lg:grid-cols-1 max-lg:gap-0'>
            <Skeleton height={100} className="w-full mb-4 rounded-xl" />
            <Skeleton height={100} className="w-full mb-4 rounded-xl" />
          </div>
        </div>

      </div>
    </SkeletonTheme>
  );
}

export default SkeletonEnquiries;
