import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonDepartmentsCard = ({  page }) => {
    return (
        <SkeletonTheme baseColor="#ddd" highlightColor="#eee">
        <div className='dpartCard relative bg-[#fff] border border-[#D4DEF1] rounded-3xl shadow-custom p-4'>
          <div className='cursor-pointer'>
            <div className="dpartCard_ grid grid-cols-[4fr,6fr] gap-5 items-center">
              <div className="dpartCard__img h-full">
                <Skeleton width="100%" height="100%" className='rounded-3xl' />
              </div>
              <div className="dpartCard__txt">
                <div className={`h3 font-Mluvka leading-[1.1] mb-1`} style={{ fontSize: `${page !== "home" ? "1.6rem" : "1.1rem"}` }}>
                  <Skeleton width={page !== "home" ? 160 : 110} />
                </div>
                <div className="h4 font-Mluvka text-primary">
                  <b className='font-MluvkaBold'>
                    <Skeleton width={20} />
                  </b> 
                  <Skeleton width={60} />
                </div>
                <div className="dpartCardProfile flex mt-1">
                  {[...Array(3)].map((_, index) => (
                    <div className="dpartCardProfile-img" key={index}>
                      <Skeleton circle={true} width={30} height={30} style={{ marginLeft: index !== 0 ? '-0.75rem' : '0' }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {page !== "home" && (
              <p className='text-[.8rem] text-[#3C3E56] leading-[1.5] my-2'>
                <Skeleton count={3} />
              </p>
            )}
          </div>
        </div>
      </SkeletonTheme>
    )
}

export default SkeletonDepartmentsCard
