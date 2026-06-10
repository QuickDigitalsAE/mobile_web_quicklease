import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonHeading = () => {
  return (
    <SkeletonTheme baseColor="#ddd" highlightColor="#eee">
      <h6 className='text-[1rem] mb-2 bookingSectionh relative px-3 font-Mluvka'>
        <Skeleton width={100} />
      </h6>
    </SkeletonTheme>
  );
}

export default SkeletonHeading;
