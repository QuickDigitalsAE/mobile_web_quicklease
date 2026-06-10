import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonElements = () => {
  return (
    <SkeletonTheme baseColor="#fff" highlightColor="#f0f0f0">
    <div className='ElementsPage pr-10'>
    <div className='bg-[#EFF4FD] p-6 rounded-3xl'>
    <Skeleton height={48} />
    <Skeleton height={48} />
    <Skeleton height={48} />
    <Skeleton height={48} />
        
    </div>
</div>
</SkeletonTheme>
  ) 
}

export default SkeletonElements