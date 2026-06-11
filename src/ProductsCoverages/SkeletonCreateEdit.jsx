import React from 'react'
import { Link } from 'react-router-dom'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonCreateEdit = ({heading}) => {
  return (
    <SkeletonTheme baseColor="#fff" highlightColor="#f0f0f0">
    <div className='newscreate pr-10'>
<div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
        <Skeleton height={48} />
        <div className='grid grid-cols-2 gap-3 mt-4 max-lg:grid-cols-1'>
          <Skeleton height={160} />
          <Skeleton height={160} />
        </div>
      </div>
      <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3'>
        <Skeleton height={48} />
        <div className='form mt-2'>
          <div className='grid grid-cols-2 max-lg:grid-cols-1 gap-2'>
            <Skeleton height={48} />
            <Skeleton height={48} />
          </div>
          <Skeleton height={160} className="mt-4" />
          <Skeleton height={48} className="mt-4" />
          <Skeleton height={160} className="mt-4" />
        </div>
        <Skeleton width={100} height={48} className="mt-10" />
      </div>
    </div>
  </SkeletonTheme>
  )
}

export default SkeletonCreateEdit
