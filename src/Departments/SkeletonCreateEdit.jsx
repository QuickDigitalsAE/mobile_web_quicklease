import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonCreateEdit = ({heading}) => {
  return (
    <div className='createDepartments  '>
<div className='bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3'>
        <div className='relative flex'>
            <div className='bg-white rounded-3xl w-full mx-auto relative'>
                <div className='overflow-auto modelBox p-5 px-12 max-lg:py-3 max-lg:px-5'>
                    <div className='w-[12rem] h-[12rem] relative mt-4'>
                        <Skeleton style={{borderRadius:"1rem"}} width={192} height={192} />
                    </div>
                    <div className='form mt-7'>
                        <Skeleton height={40} className='mb-3' />
                        <Skeleton height={150} className='mb-3' />
                        <div className='flex items-center gap-5 mt-3'>
                            <Skeleton width={150} height={40} />
                            <div className='flex gap-1'>
                            <Skeleton circle width={40} height={40}  className='mr-2' />
                            <Skeleton circle width={40} height={40}  className='mr-2' />
                            <Skeleton circle width={40} height={40}  className='mr-2' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default SkeletonCreateEdit
