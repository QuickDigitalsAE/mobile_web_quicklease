import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonHome = () => {
  return (
    <SkeletonTheme baseColor="#fff" highlightColor="#f0f0f0">
    <div className="homePage  ">
      {/* Section 1 */}
      <div className="bg-[#EFF4FD] p-6 rounded-3xl mb-3">
        <Skeleton height={48} />
        <div className="grid grid-cols-2 gap-3 mt-4 max-lg:grid-cols-1">
          <Skeleton height={160} />
          <Skeleton height={160} />
        </div>
      </div>
  
      {/* Section 2 */}
      <div className="bg-[#EFF4FD] p-6 rounded-3xl mb-3">
        <div className="header grid grid-cols-3 gap-3 max-lg:grid-cols-1 items-end">
          <div className="header__left">
            <Skeleton height={24} width={100} className="mb-3" />
            <Skeleton height={160} />
          </div>
          <div className="header__center">
            <Skeleton height={160} />
          </div>
          <div className="header__Right">
            <Skeleton height={48} className="mb-3" />
            <Skeleton height={48} />
          </div>
        </div>
      </div>
  
      {/* Section 3 */}
      <div className="bg-[#EFF4FD] p-6 section2 rounded-3xl mb-3">
        <Skeleton height={24} width={100} className="mb-4" />
        <div className="section2Main grid grid-cols-3 gap-3 max-lg:grid-cols-1">
          <div className="section2Main__left">
            <Skeleton height={48} className="mb-3" />
            <Skeleton height={48} />
          </div>
          <div className="section2Main__center">
            <Skeleton height={240} />
          </div>
          <div className="section2Main__right">
            <Skeleton height={160} />
            <Skeleton height={48} className="mt-3" />
            <Skeleton height={48} />
          </div>
        </div>
      </div>
  
      {/* Section 4 */}
      <div className="bg-[#EFF4FD] p-6 section3 rounded-3xl mb-3">
        <Skeleton height={24} width={100} className="mb-4" />
        <div className="section3Main grid grid-cols-2 gap-3 max-lg:grid-cols-1">
          <div className="section3__left">
            <Skeleton height={48} className="mb-3" />
            <Skeleton height={48} />
          </div>
          <div className="section3__Right">
            <Skeleton height={160} />
          </div>
        </div>
      </div>
  
      {/* Section 5 */}
      <div className="bg-[#EFF4FD] p-6 section4 rounded-3xl mb-3">
        <Skeleton height={24} width={100} className="mb-4" />
        <div className="section4_ grid grid-cols-3 gap-3 max-lg:grid-cols-1">
          <div className="section4__left">
            <Skeleton height={48} className="mb-3" />
            <Skeleton height={48} />
          </div>
          <div className="section4__center">
            <Skeleton height={240} />
          </div>
          <div className="section4__Right">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="grid grid-cols-[3fr,7fr] gap-2 items-end mb-3">
                <Skeleton height={48} />
                <Skeleton height={48} />
              </div>
            ))}
          </div>
        </div>
      </div>
  
      {/* Button Skeleton */}
      <Skeleton height={48} width={200} className="mx-auto mt-5" />
    </div>
  </SkeletonTheme>
  
  )
}

export default SkeletonHome