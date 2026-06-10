import React, { useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const HeaderProfileSkeleton = () => (
    <SkeletonTheme  baseColor="#ddd" highlightColor="#eee">
      <div className="profile__Box relative">
        <div className="profile__Box__img cursor-pointer">
          <Skeleton circle={true} height={64} width={64} />
        </div>
      </div>
    </SkeletonTheme>
  );
const SkeletonHeader = () => {
  return (
    <div className='header py-6 pr-10 flex justify-between items-center'>
    <SkeletonTheme  baseColor="#ddd" highlightColor="#eee">
      <div className="header__left">
        {/* <div className='font-Mluvka text-[1.938rem]'>
          <Skeleton width={80} />
        </div> */}
      </div>
      <div className="header__right flex items-center gap-8">
        <div className="inputBox w-[16rem] max-lg:hidden">
          <Skeleton height={44} />
        </div>
        <div className="inputBox relative languages w-[10rem]">
          <Skeleton height={44} />
        </div>
        <div className='profile flex items-center gap-4'>
          <div className="profile__left max-lg:hidden">
            <h2 className='leading-[1] text-[1.4rem] font-MluvkaBold'>
              <Skeleton width={100} />
            </h2>
            <p className='m-0 text-right text-secondary text-[.8rem] font-Mluvka'>
              <Skeleton width={80} />
            </p>
          </div>
          <HeaderProfileSkeleton />
        </div>
      </div>
    </SkeletonTheme>
  </div>
  )
}

export default SkeletonHeader