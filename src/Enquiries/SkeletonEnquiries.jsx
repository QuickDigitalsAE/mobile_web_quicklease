import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const statItems = [1, 2, 3];
const tabItems = [1, 2, 3, 4];
const rowItems = [1, 2, 3, 4, 5, 6];

const SkeletonEnquiries = () => {
  return (
    <SkeletonTheme baseColor="#e7eef7" highlightColor="#f8fbff">
      <section className="users-table-page enquiries-table-page">
        <div className="users-table-page__top enquiries-table-page__top flex justify-between items-center gap-4">
          <div className="flex-1">
            <Skeleton height={22} width={150} />
            <Skeleton height={16} width="70%" className="mt-3" />
          </div>
        </div>

        <div className="users-table-page__panel">
          <div className="users-table-page__stats">
            {statItems.map((item) => (
              <article key={item}>
                <Skeleton height={12} width="52%" />
                <Skeleton height={28} width="38%" className="mt-3" />
              </article>
            ))}
          </div>

          <div className="enquiries-table-page__tabs">
            {tabItems.map((item) => (
              <div key={item} className="enquiries-table-page__tab">
                <Skeleton height={16} width={82} />
              </div>
            ))}
          </div>

          <div className="users-table-page__tableWrap">
            <div className="users-table-page__tableShell">
              <div className="grid grid-cols-[1fr_.9fr_1.1fr_1.35fr_.8fr_.7fr_1fr] gap-4 border-b border-[#e2e8f4] px-5 py-4 max-lg:hidden">
                {['lead', 'submitted', 'contact', 'comment', 'company', 'type', 'source'].map((key) => (
                  <Skeleton key={key} height={14} width="58%" />
                ))}
              </div>

              {rowItems.map((item) => (
                <div
                  key={item}
                  className="grid grid-cols-1 gap-4 border-b border-[#edf2fa] px-5 py-5 lg:grid-cols-[1fr_.9fr_1.1fr_1.35fr_.8fr_.7fr_1fr]"
                >
                  <div>
                    <Skeleton height={14} width="62%" />
                    <Skeleton height={12} width="28%" className="mt-2" />
                  </div>
                  <div>
                    <Skeleton height={14} width="76%" />
                  </div>
                  <div>
                    <Skeleton height={14} width="82%" />
                    <Skeleton height={12} width="64%" className="mt-2" />
                  </div>
                  <div>
                    <Skeleton height={14} width="92%" />
                    <Skeleton height={12} width="78%" className="mt-2" />
                  </div>
                  <Skeleton height={14} width="72%" />
                  <Skeleton height={30} width={88} borderRadius={999} />
                  <div>
                    <Skeleton height={12} width="68%" />
                    <Skeleton height={12} width="84%" className="mt-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SkeletonTheme>
  );
}

export default SkeletonEnquiries;
