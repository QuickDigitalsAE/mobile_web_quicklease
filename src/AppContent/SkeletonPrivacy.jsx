import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonPrivacy = () => {
  return (
    <SkeletonTheme baseColor="#fff" highlightColor="#f0f0f0">
      <div className='PrivicyPolicy pr-10 max-lg:pr-6'>
        <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-8'>
          <Skeleton height={30}  className="mb-4" />
          <Skeleton height={100} className="w-full mb-4 rounded-xl" />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default SkeletonPrivacy;
