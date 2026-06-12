import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const setupFields = [1, 2, 3, 4]
const galleryItems = [1, 2, 3]
const priceBlocks = [1, 2, 3]
const propertyGroups = [1, 2]
const toggleItems = [1, 2, 3, 4, 5, 6]

const SkeletonCreateEdit = ({ heading }) => {
  return (
    <SkeletonTheme baseColor="#e7eef7" highlightColor="#f8fbff">
      <div className="newscreate product-create-page">
        <div className="product-create-page__hero">
          <div className="flex-1">
            <Skeleton height={14} width={120} />
            <Skeleton height={44} width="62%" className="mt-4" />
            <Skeleton count={2} height={16} className="mt-3" />
          </div>
        </div>

        <div className="product-create-page__form product-create-page__form--compact">
          <div className="bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3">
            <Skeleton height={14} width="24%" />
            <Skeleton height={48} className="mt-3 rounded-xl" />
            <div className="grid grid-cols-2 gap-3 mt-4 max-lg:grid-cols-1">
              {setupFields.map((item) => (
                <Skeleton key={item} height={48} className="rounded-xl" />
              ))}
            </div>
            <Skeleton height={48} className="mt-4 rounded-xl" />
            <Skeleton height={136} className="mt-4 rounded-2xl" />
          </div>

          <div className="bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3">
            <Skeleton height={22} width={150} />
            <div className="grid grid-cols-2 gap-3 mt-4 max-lg:grid-cols-1">
              <Skeleton height={48} className="rounded-xl" />
              <Skeleton height={48} className="rounded-xl" />
            </div>
            <Skeleton height={180} className="mt-5 rounded-3xl" />
            <Skeleton height={180} className="mt-5 rounded-3xl" />

            <div className="mt-5">
              <Skeleton height={16} width={110} />
              <Skeleton height={220} className="mt-3 rounded-3xl" />
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <Skeleton height={22} width={130} />
              <Skeleton height={42} width={128} borderRadius={999} />
            </div>
            <div className="grid grid-cols-3 gap-3 mt-4 max-lg:grid-cols-1">
              {galleryItems.map((item) => (
                <Skeleton key={item} height={220} className="rounded-3xl" />
              ))}
            </div>
          </div>

          {priceBlocks.map((item) => (
            <div key={item} className="bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3">
              <Skeleton height={20} width={130} />
              <div className="grid grid-cols-2 gap-4 mt-4 max-lg:grid-cols-1">
                <Skeleton height={48} className="rounded-xl" />
                <Skeleton height={48} className="rounded-xl" />
              </div>
            </div>
          ))}

          <div className="bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3">
            <Skeleton height={18} width={140} />
            <div className="grid grid-cols-2 gap-4 mt-4 max-lg:grid-cols-1">
              <Skeleton height={48} className="rounded-xl" />
              <Skeleton height={48} className="rounded-xl" />
            </div>
          </div>

          <div className="bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3">
            <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1">
              <Skeleton height={48} className="rounded-xl" />
              <Skeleton height={48} className="rounded-xl" />
              <Skeleton height={48} className="rounded-xl" />
              <Skeleton height={48} className="rounded-xl" />
            </div>
          </div>

          <div className="bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3">
            <Skeleton height={18} width={150} />
            <div className="grid grid-cols-2 gap-4 mt-4 max-lg:grid-cols-1">
              <Skeleton height={48} className="rounded-xl" />
              <Skeleton height={48} className="rounded-xl" />
            </div>
          </div>

          <div className="bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3">
            <div className="flex items-center justify-between gap-4">
              <Skeleton height={22} width={110} />
              <Skeleton height={42} width={128} borderRadius={999} />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4 max-lg:grid-cols-1">
              {[1, 2].map((item) => (
                <div key={item} className="bg-[#DEE5F2] p-4 rounded-2xl">
                  <Skeleton height={14} width="38%" />
                  <Skeleton height={48} className="mt-3 rounded-xl" />
                  <Skeleton height={14} width="38%" className="mt-4" />
                  <Skeleton height={48} className="mt-3 rounded-xl" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3">
            <div className="flex items-center justify-between gap-4">
              <Skeleton height={22} width={110} />
              <Skeleton height={42} width={128} borderRadius={999} />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4 max-lg:grid-cols-1">
              {[1, 2].map((item) => (
                <div key={item} className="bg-[#DEE5F2] p-4 rounded-2xl">
                  <Skeleton height={14} width="38%" />
                  <Skeleton height={48} className="mt-3 rounded-xl" />
                  <Skeleton height={14} width="38%" className="mt-4" />
                  <Skeleton height={48} className="mt-3 rounded-xl" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3">
            <Skeleton height={22} width={120} />
            <div className="space-y-6 mt-5">
              {propertyGroups.map((group) => (
                <div key={group}>
                  <Skeleton height={18} width="22%" />
                  <div className="grid grid-cols-2 gap-3 mt-4 max-lg:grid-cols-1">
                    <Skeleton height={48} className="rounded-xl" />
                    <Skeleton height={48} className="rounded-xl" />
                    <Skeleton height={48} className="rounded-xl" />
                    <Skeleton height={48} className="rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3">
            <div className="flex items-center justify-between gap-4">
              <Skeleton height={22} width={120} />
              <Skeleton height={20} width={20} borderRadius={8} />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-5 max-lg:grid-cols-1">
              {[1, 2, 3].map((item) => (
                <div key={item}>
                  <Skeleton height={18} width="44%" />
                  <div className="grid grid-cols-2 gap-3 mt-3 max-lg:grid-cols-1">
                    <Skeleton height={48} className="rounded-xl" />
                    <Skeleton height={48} className="rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3">
            <Skeleton height={16} width={150} />
            <Skeleton height={48} className="mt-3 rounded-xl" />
            <div className="flex flex-wrap gap-4 mt-6">
              {toggleItems.map((item) => (
                <div key={item} className="flex items-center gap-3 px-4 py-3 rounded-full bg-white/70">
                  <Skeleton height={24} width={42} borderRadius={999} />
                  <Skeleton height={14} width={92} />
                </div>
              ))}
            </div>
          </div>

          <div className="product-create-page__actions">
            <Skeleton height={44} width={124} borderRadius={999} />
            <Skeleton height={44} width={168} borderRadius={999} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  )
}

export default SkeletonCreateEdit
