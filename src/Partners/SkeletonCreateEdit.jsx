import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonCreateEdit = ({ heading }) => {
  return (
    <SkeletonTheme baseColor="#e7eef7" highlightColor="#f8fbff">
      <section className="CreatePartners product-create-page">
        <div className="product-create-page__hero">
          <Skeleton height={14} width={128} />
          <Skeleton height={40} width="30%" className="mt-4" />
          <Skeleton height={16} width="52%" className="mt-3" />
        </div>

        <div className="product-create-page__form">
          <div className="bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3">
            <div className="grid grid-cols-2 gap-3 max-lg:grid-cols-1">
              <Skeleton height={48} className="rounded-xl" />
              <Skeleton height={48} className="rounded-xl" />
            </div>
            <Skeleton height={150} className="mt-4 rounded-2xl" />
          </div>

          <div className="bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3">
            <Skeleton height={22} width={108} />
            <Skeleton height={48} className="mt-4 rounded-xl" />
            <Skeleton height={190} className="mt-4 rounded-3xl" />
            <Skeleton height={220} className="mt-5 rounded-3xl" />
            <div className="flex items-center gap-3 mt-6 px-4 py-3 rounded-full bg-white/70 w-fit">
              <Skeleton height={24} width={42} borderRadius={999} />
              <Skeleton height={14} width={112} />
            </div>

            <div className="product-create-page__actions mt-6">
              <Skeleton height={44} width={124} borderRadius={999} />
              <Skeleton height={44} width={162} borderRadius={999} />
            </div>
          </div>
        </div>
      </section>
    </SkeletonTheme>
  )
}

export default SkeletonCreateEdit
