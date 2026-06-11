import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonBoarding = () => {
  return (
    <SkeletonTheme baseColor="#fff" highlightColor="#f0f0f0">
      <div className='Boarding  '>
        <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
          <div className="BoardingMain grid grid-cols-3 gap-3 max-lg:grid-cols-1">
            <div className="BoardingMainBOx">
              <Skeleton height={30} width={200} className="mb-4" />
              <div className="BoardingMainBOx_ bg-[#DEE5F2] p-3 rounded-3xl mt-3">
                <Skeleton height={30} className="w-full mb-4 rounded-xl" />
                <Skeleton height={100} className="w-full mb-4 rounded-xl" />
              </div>
            </div>
            <div className="BoardingMainBOx">
              <Skeleton height={30} width={200} className="mb-4" />
              <div className="BoardingMainBOx_ bg-[#DEE5F2] p-3 rounded-3xl mt-3">
                <Skeleton height={30} className="w-full mb-4 rounded-xl" />
                <Skeleton height={100} className="w-full mb-4 rounded-xl" />
              </div>
            </div>
            <div className="BoardingMainBOx">
              <Skeleton height={30} width={200} className="mb-4" />
              <div className="BoardingMainBOx_ bg-[#DEE5F2] p-3 rounded-3xl mt-3">
                <Skeleton height={30} className="w-full mb-4 rounded-xl" />
                <Skeleton height={100} className="w-full mb-4 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}

export default SkeletonBoarding;
