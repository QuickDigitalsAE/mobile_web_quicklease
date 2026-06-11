import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonCreateEditServices = ({heading}) => {
  return (
    <SkeletonTheme baseColor="#fff" highlightColor="#f0f0f0">
      <div className='services  '>
<div className="servicesBottom">
          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-8'>
            <Skeleton height={24}  />
            <div className='grid grid-cols-2 gap-3 mt-4 max-lg:grid-cols-1'>
              <Skeleton height={120} />
              <Skeleton height={120} />
            </div>
           
          </div>

          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <Skeleton height={24} width={80} />
            <div className='section2Main grid grid-cols-3 mt-3 gap-2 max-lg:grid-cols-1'>
              {[...Array(3)].map((_, index) => (
                <div key={index} className="section2MainBox relative bg-[#D4DEF1] rounded-2xl p-3">
                  <Skeleton height={24} width="100%" />
                  <Skeleton height={24} width="100%" />
                  <Skeleton height={80} width="100%" />
                </div>
              ))}
            </div>
            <div className='bg-[#d9dcf8] py-3 mt-4 w-fit px-6 rounded-full flex items-center gap-2 cursor-pointer'>
              <Skeleton height={20} width={20} circle />
              <Skeleton height={24} width={100} />
            </div>
          </div>

          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
            <Skeleton height={24} width={80}  />
            <div className='section3Main mt-2 grid grid-cols-3 gap-3 max-lg:grid-cols-1'>
              {[...Array(3)].map((_, index) => (
                <div key={index} className="section3MainBox relative bg-[#D4DEF1] rounded-2xl p-3">
                  <Skeleton height={24} width="100%" />
                  <Skeleton height={24} width="100%" />
                  <Skeleton height={80} width="100%" />
                  <div className='relative h-16'>
                    <Skeleton height={48} width={48} circle />
                  </div>
                </div>
              ))}
            </div>
            <div className='bg-[#d9dcf8] py-3 mt-4 w-fit px-6 rounded-full flex items-center gap-2 cursor-pointer'>
              <Skeleton height={20} width={20} circle />
              <Skeleton height={24} width={100} />
            </div>
          </div>

          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-8'>
            <Skeleton height={24} width={80} />
            <div className='section4Main grid grid-cols-2 gap-3 max-lg:grid-cols-1 mt-4'>
              {[...Array(2)].map((_, index) => (
                <div key={index} className="section4MainBox relative bg-[#D4DEF1] rounded-2xl p-3">
                  <Skeleton height={24} width="100%" />
                  <Skeleton height={24} width="100%" />
                  <Skeleton height={80} width="100%" />
                  <div className='relative h-16'>
                    <Skeleton height={48} width={48} circle />
                  </div>
                </div>
              ))}
            </div>
            <div className='bg-[#d9dcf8] py-3 mt-4 w-fit px-6 rounded-full flex items-center gap-2 cursor-pointer'>
              <Skeleton height={20} width={20} circle />
              <Skeleton height={24} width={100} />
            </div>
          </div>

          <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-8'>
            <Skeleton height={48} width={120} />
            <Skeleton height={48} width={120} />
            <Skeleton height={48} width={120} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  )
}

export default SkeletonCreateEditServices
