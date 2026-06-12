import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const statItems = [1, 2, 3];
const rowItems = [1, 2, 3, 4, 5, 6];

const SkeletonProductsCard = () => {
  return (
    <SkeletonTheme baseColor="#e7eef7" highlightColor="#f8fbff">
      <section className="users-table-page products-table-page">
        <div className="users-table-page__top bg-white rounded-3xl p-4 enquiries-table-page__top flex justify-between items-center">
          <div className="flex-1">
            <Skeleton height={24} width={160} />
            <Skeleton height={16} width="68%" className="mt-3" />
          </div>
          <Skeleton height={44} width={138} borderRadius={14} />
        </div>

        <div className="users-table-page__panel">
          <div className="users-table-page__stats">
            {statItems.map((item) => (
              <article key={item}>
                <Skeleton height={12} width="54%" />
                <Skeleton height={28} width="36%" className="mt-3" />
              </article>
            ))}
          </div>

          <div className="users-table-page__toolbar">
            <div className="users-table-page__search">
              <Skeleton circle height={18} width={18} />
              <div className="flex-1 ml-3">
                <Skeleton height={16} width="36%" />
              </div>
            </div>
          </div>

          <div className="users-table-page__tableWrap">
            <div className="users-table-page__tableShell">
              <div className="grid grid-cols-[1.4fr_.85fr_.7fr_.6fr_.6fr_.6fr_.6fr_.35fr] gap-4 border-b border-[#e2e8f4] px-5 py-4 max-lg:hidden">
                {['product', 'catalog', 'type', 'featured', 'promo', 'stock', 'home', 'action'].map((key) => (
                  <Skeleton key={key} height={14} width="58%" />
                ))}
              </div>

              {rowItems.map((item) => (
                <div
                  key={item}
                  className="grid grid-cols-1 gap-4 border-b border-[#edf2fa] px-5 py-5 lg:grid-cols-[1.4fr_.85fr_.7fr_.6fr_.6fr_.6fr_.6fr_.35fr]"
                >
                  <div className="flex items-center gap-3">
                    <Skeleton height={56} width={72} borderRadius={16} />
                    <div className="flex-1">
                      <Skeleton height={14} width="58%" />
                      <Skeleton height={12} width="24%" className="mt-2" />
                    </div>
                  </div>
                  <Skeleton height={14} width="72%" />
                  <Skeleton height={30} width={92} borderRadius={999} />
                  <Skeleton height={30} width={78} borderRadius={999} />
                  <Skeleton height={30} width={78} borderRadius={999} />
                  <Skeleton height={30} width={78} borderRadius={999} />
                  <Skeleton height={30} width={78} borderRadius={999} />
                  <Skeleton height={36} width={36} borderRadius={12} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SkeletonTheme>
  );
};

export default SkeletonProductsCard;
