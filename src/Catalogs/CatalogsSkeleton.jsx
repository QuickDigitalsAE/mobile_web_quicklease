import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CatalogsSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#ddd" highlightColor="#eee">
      <div className="bookingBox cursor-pointer bg-[#EFF4FD] p-5 rounded-xl">
        <ul className='list mb-3'>
          <li className='flex justify-between'>
            <div className='h2 text-[1.5rem] font-Mluvka'><Skeleton width={100} /></div> 
            <div className='flex items-center gap-1'><Skeleton width={20} height={20} /><span className='font-Mluvka'><Skeleton width={50} /></span></div>
          </li>
        </ul>
        <div className="h3 capitalize mb-3"><Skeleton width={150} /></div>

        <div className='calender my-4 flex items-center gap-2'>
          <Skeleton width={20} height={20} />
          <span className='font-MluvkaBold text-[.9rem]'><Skeleton width={100} /></span>
        </div>

        <div className='evening mb-4'>
          <ul className='list flex items-center gap-3'>
            <li className='flex items-center gap-2 bg-white py-3 px-5 rounded-full'><Skeleton width={20} height={20} />  <span className='font-MluvkaLight text-[.8rem]'><Skeleton width={50} /></span></li>
            <li className='flex items-center gap-2 bg-white py-3 px-5 rounded-full'><Skeleton width={20} height={20} />  <span className='font-MluvkaLight text-[.8rem]'><Skeleton width={50} /></span></li>
          </ul>
        </div>

        <div className='Lawyer my-4 flex items-center gap-2 '>
          <span className='text-[#95ACD5] font-Mluvka text-[.8rem]'><Skeleton width={50} /></span>
          <div className='w-full h-[.1rem] bg-[#C9D4E9]'></div>
        </div>

        <div className='bookingprofile flex items-center gap-3'>
          <div className="bookingprofile__img  grid place-items-center rounded-xl">
            <Skeleton circle={true} style={{width:"4rem",height:"4rem"}} />
          </div>
          <div className="bookingprofile__txt">
            <div className="h5 font-Mluvka capitalize leading-[1] mb-1"><Skeleton width={100} /></div>
            <div className="h4 text-[.8rem]"><Skeleton width={150} /></div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  )
}

export default CatalogsSkeleton
