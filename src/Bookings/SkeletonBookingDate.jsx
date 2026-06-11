import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonBookingDate = () => {
  return (
    <SkeletonTheme baseColor="#e7eef7" highlightColor="#f8fbff">
      <div className="bookings-table-page__dates">
        {[1, 2].map((item) => (
          <div key={item} className="bookings-table-page__dateChip">
            <Skeleton circle height={18} width={18} />
            <div className="flex-1 ml-3">
              <Skeleton height={14} width={108} />
            </div>
          </div>
        ))}
      </div>
    </SkeletonTheme>
  )
}

export default SkeletonBookingDate
