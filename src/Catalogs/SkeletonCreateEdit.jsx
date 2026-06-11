import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const repeaterCards = [1, 2, 3]
const dualCards = [1, 2]

const SkeletonCreateEdit = ({ heading }) => {
  return (
    <SkeletonTheme baseColor="#e7eef7" highlightColor="#f8fbff">
      <section className="PromotionCreate product-create-page">
        <div className="product-create-page__hero">
          <Skeleton height={14} width={128} />
          <Skeleton height={40} width="34%" className="mt-4" />
          <Skeleton height={16} width="58%" className="mt-3" />
        </div>

        <div className="relative flex items-start gap-3">
          <div className="bg-white rounded-3xl w-full p-4 mx-auto relative">
            <div className="product-create-page__form">
              <div className="bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3">
                <Skeleton height={14} width="24%" />
                <Skeleton height={48} className="mt-3 rounded-xl" />
                <Skeleton height={48} className="mt-4 rounded-xl" />
                <Skeleton height={150} className="mt-4 rounded-2xl" />
              </div>

              <div className="bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3">
                <div className="grid grid-cols-2 gap-3 max-lg:grid-cols-1">
                  <Skeleton height={48} className="rounded-xl" />
                  <Skeleton height={48} className="rounded-xl" />
                  <Skeleton height={48} className="rounded-xl" />
                </div>
              </div>

              <div className="bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3">
                <Skeleton height={220} className="rounded-3xl" />
                <Skeleton height={48} className="mt-4 rounded-xl" />
                <Skeleton height={48} className="mt-4 rounded-xl" />
                <Skeleton height={120} className="mt-4 rounded-2xl" />
                <Skeleton height={48} className="mt-4 rounded-xl" />
                <Skeleton height={180} className="mt-4 rounded-3xl" />
              </div>

              <div className="bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3">
                <div className="flex items-center justify-between gap-4">
                  <Skeleton height={22} width={120} />
                  <Skeleton height={42} width={128} borderRadius={999} />
                </div>
                <div className="grid grid-cols-3 gap-3 mt-4 max-lg:grid-cols-1">
                  {repeaterCards.map((item) => (
                    <div key={item} className="bg-[#DEE5F2] p-4 rounded-2xl">
                      <Skeleton height={48} className="rounded-xl" />
                      <Skeleton height={180} className="mt-4 rounded-2xl" />
                    </div>
                  ))}
                </div>
              </div>

              {['Section 1', 'Section 2', 'Section 4'].map((section) => (
                <div key={section} className="bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3">
                  <div className="flex items-center justify-between gap-4">
                    <Skeleton height={22} width={120} />
                    <Skeleton height={42} width={128} borderRadius={999} />
                  </div>
                  <Skeleton height={48} className="mt-4 rounded-xl" />
                  <Skeleton height={170} className="mt-4 rounded-3xl" />
                  {section === 'Section 1' && <Skeleton height={220} className="mt-4 rounded-3xl" />}
                  <div className="grid grid-cols-3 gap-3 mt-4 max-lg:grid-cols-1">
                    {repeaterCards.map((item) => (
                      <div key={item} className="bg-[#DEE5F2] p-4 rounded-2xl">
                        <Skeleton height={120} className="rounded-2xl" />
                        <Skeleton height={160} className="mt-4 rounded-2xl" />
                        <Skeleton height={180} className="mt-4 rounded-2xl" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3">
                <Skeleton height={22} width={120} />
                <Skeleton height={48} className="mt-4 rounded-xl" />
                <Skeleton height={180} className="mt-4 rounded-3xl" />
                <Skeleton height={220} className="mt-4 rounded-3xl" />
              </div>

              <div className="bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3">
                <div className="flex items-center justify-between gap-4">
                  <Skeleton height={22} width={92} />
                  <Skeleton height={42} width={128} borderRadius={999} />
                </div>
                <Skeleton height={48} className="mt-4 rounded-xl" />
                <div className="grid grid-cols-2 gap-3 mt-4 max-lg:grid-cols-1">
                  {dualCards.map((item) => (
                    <div key={item} className="bg-[#DEE5F2] p-4 rounded-2xl">
                      <Skeleton height={150} className="rounded-2xl" />
                      <Skeleton height={170} className="mt-4 rounded-2xl" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3">
                <div className="flex items-center justify-between gap-4">
                  <Skeleton height={22} width={126} />
                  <Skeleton height={42} width={128} borderRadius={999} />
                </div>
                <Skeleton height={48} className="mt-4 rounded-xl" />
                <div className="grid grid-cols-2 gap-3 mt-4 max-lg:grid-cols-1">
                  {dualCards.map((item) => (
                    <div key={item} className="bg-[#DEE5F2] p-4 rounded-2xl">
                      <Skeleton height={48} className="rounded-xl" />
                      <Skeleton height={170} className="mt-4 rounded-2xl" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#EFF4FD] p-6 rounded-3xl mb-3 max-lg:p-3">
                <Skeleton height={48} className="rounded-xl" />
                <div className="flex items-center gap-3 mt-5 px-4 py-3 rounded-full bg-white/70 w-fit">
                  <Skeleton height={24} width={42} borderRadius={999} />
                  <Skeleton height={14} width={118} />
                </div>
              </div>

              <div className="product-create-page__actions">
                <Skeleton height={44} width={124} borderRadius={999} />
                <Skeleton height={44} width={168} borderRadius={999} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </SkeletonTheme>
  )
}

export default SkeletonCreateEdit
