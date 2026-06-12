import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const statItems = [1, 2, 3]
const rowItems = [1, 2, 3, 4, 5, 6]

const CatalogsSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#e7eef7" highlightColor="#f8fbff">
      <section className="TeamPage users-table-page roles-table-page">
        <div className="TeamPageTop users-table-page__top bg-white rounded-3xl p-4 enquiries-table-page__top flex justify-between items-center gap-4">
          <div className="flex-1">
            <Skeleton height={24} width={160} />
            <Skeleton height={16} width="64%" className="mt-3" />
          </div>

          <div className="flex w-full items-center justify-end gap-3">
            <div className="users-table-page__search">
              <Skeleton circle height={18} width={18} />
              <div className="flex-1 ml-3">
                <Skeleton height={16} width="40%" />
              </div>
            </div>
            <Skeleton height={44} width={142} borderRadius={999} />
          </div>
        </div>

        <div className="users-table-page__panel">
          <div className="users-table-page__stats">
            {statItems.map((item) => (
              <article key={item}>
                <Skeleton height={12} width="52%" />
                <Skeleton height={28} width="36%" className="mt-3" />
              </article>
            ))}
          </div>

          <div className="users-table-page__tableWrap">
            <div className="users-table-page__tableShell">
              <div className="grid grid-cols-[1.15fr_1.35fr_.55fr_.45fr_.65fr] gap-4 border-b border-[#e2e8f4] px-5 py-4 max-lg:hidden">
                {['catalog', 'description', 'type', 'record', 'action'].map((key) => (
                  <Skeleton key={key} height={14} width="58%" />
                ))}
              </div>

              {rowItems.map((item) => (
                <div
                  key={item}
                  className="grid grid-cols-1 gap-4 border-b border-[#edf2fa] px-5 py-5 lg:grid-cols-[1.15fr_1.35fr_.55fr_.45fr_.65fr]"
                >
                  <div className="flex items-center gap-3">
                    <Skeleton height={42} width={42} borderRadius={14} />
                    <div className="flex-1">
                      <Skeleton height={14} width="48%" />
                      <Skeleton height={12} width="62%" className="mt-2" />
                    </div>
                  </div>
                  <div>
                    <Skeleton height={12} width="92%" />
                    <Skeleton height={12} width="84%" className="mt-2" />
                    <Skeleton height={12} width="76%" className="mt-2" />
                  </div>
                  <Skeleton height={30} width={92} borderRadius={999} />
                  <Skeleton height={14} width="40%" />
                  <div className="flex items-center gap-2">
                    <Skeleton height={34} width={74} borderRadius={999} />
                    <Skeleton height={34} width={34} borderRadius={12} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SkeletonTheme>
  )
}

export default CatalogsSkeleton
