import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonFaqs = () => {
  return (
    <SkeletonTheme baseColor="#fff" highlightColor="#f0f0f0">
      <div className='faqsPage  '>
        <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
          <div className="h4 text-[#7D8CA7] text-[1.1rem] mb-4">
            <Skeleton width="30%" />
          </div>
          <div className="grid grid-cols-2 items-end gap-4 mb-4 max-lg:grid-cols-1">
            <Skeleton height={48} width="100%" />
            <Skeleton height={48} width="100%" />
          </div>
        </div>
        <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
          <div className="faqsPageMain grid grid-cols-2 gap-5 max-lg:grid-cols-1">
            {Array(4).fill().map((_, index) => (
              <div className='bg-[#D4DEF1] p-5 rounded-3xl' key={index}>
                <div className='mb-3'>
                  <label htmlFor="" className='mb-2 text-[#7D8CA7] text-[.8rem]'>
                    <span><Skeleton width="40%" /></span>

                  </label>
                  <Skeleton height={48} />
                </div>
                <div className=''>
                  <label htmlFor="" className='mb-1 text-[#7D8CA7] text-[.8rem] block'>
                    <span><Skeleton width="40%" /></span>
                  </label>
                  <Skeleton height={160} />
                </div>
              </div>
            ))}
          </div>
          <div className='bg-[#d9dcf8] py-3 mt-4 w-fit px-6 rounded-full flex items-center gap-2 cursor-pointer'>
            <Skeleton circle={true} height={24} width={24} />
            <span className='font-MluvkaBold text-secondary capitalize'><Skeleton width={80} /></span>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  )
}

export default SkeletonFaqs;
