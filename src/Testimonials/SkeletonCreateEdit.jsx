import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonCreateEdit = ({ heading }) => {
  return (
    <SkeletonTheme baseColor="#e7eef7" highlightColor="#f8fbff">
      <div className="newscreate product-create-page">
        <div className="product-create-page__hero">
          <Skeleton height={14} width={144} />
          <Skeleton height={40} width="34%" className="mt-4" />
          <Skeleton height={16} width="58%" className="mt-3" />
        </div>

        <div className="relative flex items-start gap-3">
          <div className="bg-white rounded-3xl w-full p-4 mx-auto relative">
            <div className="product-create-page__form">
              <div className="bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3">
                <div className="grid grid-cols-2 gap-3 max-lg:grid-cols-1">
                  <Skeleton height={48} className="rounded-xl" />
                  <Skeleton height={48} className="rounded-xl" />
                  <Skeleton height={48} className="rounded-xl" />
                </div>
              </div>

              <div className="bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3">
                <Skeleton height={180} className="rounded-3xl" />
                <Skeleton height={220} className="mt-5 rounded-3xl" />
                <Skeleton height={48} className="mt-5 rounded-xl" />
                <div className="flex items-center gap-3 mt-6 px-4 py-3 rounded-full bg-white/70 w-fit">
                  <Skeleton height={24} width={42} borderRadius={999} />
                  <Skeleton height={14} width={126} />
                </div>
              </div>

              <div className="product-create-page__actions">
                <Skeleton height={44} width={124} borderRadius={999} />
                <Skeleton height={44} width={176} borderRadius={999} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  )
}

export default SkeletonCreateEdit
