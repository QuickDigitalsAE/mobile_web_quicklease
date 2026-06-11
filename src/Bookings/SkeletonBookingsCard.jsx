import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const statItems = [1, 2, 3]
const tabItems = [1, 2, 3, 4]
const rowItems = [1, 2, 3, 4, 5, 6]

const SkeletonBookingsCard = () => {
  return (
    <SkeletonTheme baseColor="#e7eef7" highlightColor="#f8fbff">
      <section className="bookingPage users-table-page bookings-table-page">
        <div className="users-table-page__top bookings-table-page__top flex justify-between items-center gap-4">
          <div className="flex-1">
            <Skeleton height={22} width={140} />
            <Skeleton height={16} width="72%" className="mt-3" />
          </div>
        </div>

        <div className="users-table-page__panel">
          <div className="users-table-page__stats">
            {statItems.map((item) => (
              <article key={item}>
                <Skeleton height={12} width="48%" />
                <Skeleton height={28} width="36%" className="mt-3" />
              </article>
            ))}
          </div>

          <div className="bookings-table-page__filters">
            <div className="bookings-table-page__search">
              <Skeleton circle height={18} width={18} />
              <div className="flex-1 ml-3">
                <Skeleton height={16} width="42%" />
              </div>
            </div>

            <div className="bookings-table-page__dates">
              <div className="bookings-table-page__dateChip">
                <Skeleton circle height={18} width={18} />
                <div className="flex-1 ml-3">
                  <Skeleton height={14} width={112} />
                </div>
              </div>
              <div className="bookings-table-page__dateChip">
                <Skeleton circle height={18} width={18} />
                <div className="flex-1 ml-3">
                  <Skeleton height={14} width={112} />
                </div>
              </div>
            </div>
          </div>

          <div className="bookings-table-page__tabs">
            {tabItems.map((item) => (
              <div key={item} className="bookings-table-page__tab">
                <Skeleton height={16} width={72} />
              </div>
            ))}
          </div>

          <div className="users-table-page__tableWrap">
            <div className="users-table-page__tableShell">
              <div className="grid grid-cols-[1.25fr_1.15fr_1.2fr_.75fr_.8fr_.55fr_.4fr] gap-4 border-b border-[#e2e8f4] px-5 py-4 max-lg:hidden">
                {['booking', 'customer', 'schedule', 'status', 'payment', 'amount', 'action'].map((key) => (
                  <Skeleton key={key} height={14} width="58%" />
                ))}
              </div>

              {rowItems.map((item) => (
                <div
                  key={item}
                  className="grid grid-cols-1 gap-4 border-b border-[#edf2fa] px-5 py-5 lg:grid-cols-[1.25fr_1.15fr_1.2fr_.75fr_.8fr_.55fr_.4fr]"
                >
                  <div>
                    <Skeleton height={14} width="44%" />
                    <Skeleton height={12} width="72%" className="mt-2" />
                  </div>
                  <div>
                    <Skeleton height={14} width="78%" />
                    <Skeleton height={12} width="42%" className="mt-2" />
                  </div>
                  <div>
                    <Skeleton height={14} width="74%" />
                    <Skeleton height={12} width="58%" className="mt-2" />
                  </div>
                  <Skeleton height={30} width={92} borderRadius={999} />
                  <div>
                    <Skeleton height={30} width={88} borderRadius={999} />
                    <Skeleton height={12} width="60%" className="mt-2" />
                  </div>
                  <Skeleton height={14} width="54%" />
                  <Skeleton height={36} width={36} borderRadius={12} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SkeletonTheme>
  )
}

export default SkeletonBookingsCard
