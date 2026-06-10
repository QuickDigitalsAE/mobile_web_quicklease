import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonProductInner = () => {
  return (
    <SkeletonTheme baseColor="#fff" highlightColor="#f0f0f0">
      <div className='contactUsPage pr-10'>
        <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
          <Skeleton height={24} width={150} className="mb-4" />
          <div className='grid grid-cols-2 gap-3 max-lg:grid-cols-1'>
            <Skeleton height={150} className="w-full mb-4 rounded-xl" />
            <Skeleton height={150} className="w-full mb-4 rounded-xl" />
          </div>
        </div>

        <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
          <Skeleton height={24} width={100} className="mb-4" />
          <Skeleton height={40} className="w-full mb-4 rounded-xl" />
        </div>

        <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
          <Skeleton height={24} width={100} className="mb-4" />
          <Skeleton height={40} className="w-full mb-4 rounded-xl" />
          <div className="section2Main mt-3 grid grid-cols-3 gap-3 max-lg:grid-cols-1">
            {Array(3).fill().map((_, index) => (
              <div className="section2MainBox bg-[#D4DEF1] p-4 rounded-2xl" key={index}>
                <Skeleton height={40} className="w-full mb-4 rounded-xl" />
                <Skeleton height={150} className="w-full mb-4 rounded-xl" />
                <Skeleton height={40} className="w-full mb-4 rounded-xl" />
                <Skeleton height={40} className="w-full mb-4 rounded-xl" />
                <Skeleton height={150} className="w-full mb-4 rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}

export default SkeletonProductInner;
