import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const statItems = [1, 2, 3]
const rowItems = [1, 2, 3, 4, 5, 6]

const SkeletonActivitiesTable = ({ title = 'Activities', columns = 6 }) => {
  const compact = columns === 4
  const gridClass = compact
    ? 'lg:grid-cols-[1.15fr_.85fr_.95fr_.45fr]'
    : 'lg:grid-cols-[1.2fr_1.1fr_.7fr_.9fr_.45fr_.7fr]'

  return (
    <SkeletonTheme baseColor="#e7eef7" highlightColor="#f8fbff">
      <section className="users-table-page roles-table-page">
        <div className="users-table-page__top bg-white rounded-3xl p-4 flex justify-between items-center gap-4">
          <div className="flex-1">
            <Skeleton height={24} width={168} />
            <Skeleton height={16} width="66%" className="mt-3" />
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
              <div className={`grid grid-cols-1 gap-4 border-b border-[#e2e8f4] px-5 py-4 max-lg:hidden ${gridClass}`}>
                {Array.from({ length: columns }).map((_, index) => (
                  <Skeleton key={index} height={14} width="58%" />
                ))}
              </div>

              {rowItems.map((item) => (
                <div
                  key={item}
                  className={`grid grid-cols-1 gap-4 border-b border-[#edf2fa] px-5 py-5 ${gridClass}`}
                >
                  <div className="flex items-center gap-3">
                    <Skeleton height={42} width={42} borderRadius={14} />
                    <div className="flex-1">
                      <Skeleton height={14} width="52%" />
                      <Skeleton height={12} width="62%" className="mt-2" />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Skeleton height={42} width={42} borderRadius={14} />
                    <div className="flex-1">
                      <Skeleton height={14} width="48%" />
                      <Skeleton height={12} width="58%" className="mt-2" />
                    </div>
                  </div>

                  {!compact && (
                    <Skeleton height={30} width={92} borderRadius={999} />
                  )}

                  <div>
                    <Skeleton height={14} width="72%" />
                    {!compact && <Skeleton height={12} width="48%" className="mt-2" />}
                  </div>

                  {compact ? (
                    <Skeleton height={14} width="42%" />
                  ) : (
                    <Skeleton height={14} width="42%" />
                  )}

                  {!compact ? (
                    <div className="flex items-center gap-2">
                      <Skeleton height={34} width={74} borderRadius={999} />
                      <Skeleton height={34} width={34} borderRadius={12} />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SkeletonTheme>
  )
}

export default SkeletonActivitiesTable
