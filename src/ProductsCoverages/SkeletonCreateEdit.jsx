import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const locationItems = [1, 2, 3, 4, 5, 6]
const toggleItems = [1, 2, 3, 4, 5, 6, 7, 8]

const SkeletonCreateEdit = ({ heading }) => {
  return (
    <SkeletonTheme baseColor="#e7eef7" highlightColor="#f8fbff">
      <div className="newscreate product-create-page">
        <div className="product-create-page__hero">
          <div className="flex-1">
            <Skeleton height={14} width={118} />
            <Skeleton height={40} width="56%" className="mt-4" />
            <Skeleton count={2} height={16} className="mt-3" />
          </div>
        </div>

        <div className="product-create-page__form">
          <div className="bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3">
            <div className="grid grid-cols-2 gap-3 max-lg:grid-cols-1">
              <Skeleton height={48} className="rounded-xl" />
              <Skeleton height={48} className="rounded-xl" />
            </div>
            <Skeleton height={180} className="mt-5 rounded-3xl" />
            <div className="grid grid-cols-2 gap-3 mt-5 max-lg:grid-cols-1">
              <Skeleton height={48} className="rounded-xl" />
              <Skeleton height={48} className="rounded-xl" />
            </div>
          </div>

          <div className="bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3">
            <Skeleton height={22} width={168} />
            <div className="section4Main grid grid-cols-3 gap-3 mt-4 max-lg:grid-cols-1">
              {locationItems.map((item) => (
                <div key={item} className="bg-[#DEE5F2] p-4 rounded-2xl">
                  <Skeleton height={18} width="46%" />
                  <Skeleton height={14} width="54%" className="mt-4" />
                  <Skeleton height={48} className="mt-3 rounded-xl" />
                  <Skeleton height={14} width="58%" className="mt-4" />
                  <Skeleton height={48} className="mt-3 rounded-xl" />
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-4 mt-6">
              {toggleItems.map((item) => (
                <div key={item} className="flex items-center gap-3 px-4 py-3 rounded-full bg-white/70">
                  <Skeleton height={24} width={42} borderRadius={999} />
                  <Skeleton height={14} width={104} />
                </div>
              ))}
            </div>
          </div>

          <div className="product-create-page__actions">
            <Skeleton height={44} width={124} borderRadius={999} />
            <Skeleton height={44} width={176} borderRadius={999} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  )
}

export default SkeletonCreateEdit
