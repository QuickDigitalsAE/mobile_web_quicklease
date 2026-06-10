import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonProductsCard = () => {
  return (
    <SkeletonTheme baseColor="#ddd" highlightColor="#eee">
      <div className='NewsCard relative shadow-custom border border-[#D4DEF1] rounded-3xl bg-white'>
       
        <div className="NewsCardMain p-4 grid items-center grid-cols-[4fr,6fr] max-lg:grid-cols-1 gap-4">
          <div className="NewsCard__left h-full max-lg:h-[10rem]">
            <Skeleton width="100%" height={"100%"} />
          </div>
          <div className="NewsCard__leftRight pr-8">
            <div className="h2 text-[1.25rem] capitalize font-MluvkaLight leading-[1.2] mb-2">
              <Skeleton width="80%" />
              <Skeleton width="60%" />
            </div>
            <p className='text-[#393946] text-[.8rem] leading-[1.5] mb-4'>
              <Skeleton count={3} />
            </p>
            <ul className='list'>
              <li className='text-primary flex justify-between items-center'>
                <Skeleton width={100} />
                <Skeleton width={100} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default SkeletonProductsCard;
