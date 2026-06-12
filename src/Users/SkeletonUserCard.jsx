import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonUserCard = () => {
  return (
    <SkeletonTheme baseColor="#e7eef7" highlightColor="#f8fbff">
      <section className='TeamPage users-table-page'>
        <div className="TeamPageTop users-table-page__top bg-white rounded-3xl p-4 enquiries-table-page__top flex justify-between items-center">
          <div className="w-full max-w-[24rem]">
            <Skeleton height={28} width="42%" />
            <Skeleton height={14} width="92%" className="mt-3" />
          </div>
          <Skeleton height={44} width={132} borderRadius={14} />
        </div>

        <div className="users-table-page__panel">
          <div className="users-table-page__stats">
            {Array.from({ length: 3 }).map((_, index) => (
              <article key={index}>
                <Skeleton height={12} width="55%" />
                <Skeleton height={26} width="36%" className="mt-3" />
              </article>
            ))}
          </div>

          <div className="users-table-page__tableWrap">
            <div className="rounded-[18px] overflow-hidden border border-[#e2ebf5] bg-white">
              <div className="grid grid-cols-[2fr_1.6fr_1fr_.8fr_1.1fr] gap-4 px-5 py-4 bg-[#f5f8fc] max-lg:hidden">
                {['User', 'Email', 'Status', 'Record', 'Action'].map((item) => (
                  <Skeleton key={item} height={12} width="60%" />
                ))}
              </div>

              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="grid grid-cols-[2fr_1.6fr_1fr_.8fr_1.1fr] gap-4 items-center px-5 py-4 border-t border-[#edf2f7] max-lg:grid-cols-1">
                  <div className="flex items-center gap-3">
                    <Skeleton circle height={44} width={44} />
                    <div className="flex-1">
                      <Skeleton height={14} width="52%" />
                      <Skeleton height={12} width="38%" className="mt-2" />
                    </div>
                  </div>
                  <Skeleton height={14} width="78%" />
                  <Skeleton height={30} width={92} borderRadius={999} />
                  <Skeleton height={14} width={40} />
                  <div className="flex items-center gap-3">
                    <Skeleton height={34} width={78} borderRadius={12} />
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

export default SkeletonUserCard
