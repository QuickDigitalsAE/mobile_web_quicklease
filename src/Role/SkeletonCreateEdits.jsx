import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonCreateEdits = ({ heading }) => {
  return (
    <SkeletonTheme baseColor="#e7eef7" highlightColor="#f8fbff">
      <div className='createTeam role-create-page'>
        <div className='role-create-page__shell'>
          <div className='RoleCreate role-create-page__hero transition-all duration-300 bg-white rounded-xl'>
            <div className="role-create-page__heroGrid">
              <aside className="role-create-page__aside">
                <span className="role-create-page__kicker">{heading || 'Loading Role Form'}</span>
                <Skeleton height={44} width="82%" />
                <Skeleton count={2} height={16} className="mt-2" />
                <div className="role-create-page__miniStats">
                  <article>
                    <Skeleton circle width={38} height={38} />
                    <div className="flex-1">
                      <Skeleton height={18} width="42%" />
                      <Skeleton height={12} width="70%" className="mt-2" />
                    </div>
                  </article>
                  <article>
                    <Skeleton circle width={38} height={38} />
                    <div className="flex-1">
                      <Skeleton height={18} width="42%" />
                      <Skeleton height={12} width="70%" className="mt-2" />
                    </div>
                  </article>
                </div>
                <div className="role-create-page__asideNote">
                  <Skeleton height={16} width="38%" />
                  <Skeleton count={2} height={14} className="mt-2" />
                </div>
              </aside>

              <section className='role-create-page__identity bg-[#EFF4FD] p-6 rounded-3xl mb-0 max-lg:p-2'>
                <div className="role-create-page__sectionHead">
                  <Skeleton height={24} width="34%" />
                  <Skeleton height={14} width="70%" className="mt-2" />
                </div>
                <div className="RoleCreate transition-all duration-300 bg-white rounded-xl">
                  <div className="overflow-auto modelBox">
                    <div className="TeamBox p-5 rounded-xl">
                      <div className="form mt-7">
                        <Skeleton height={72} />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        <div className='bg-[#EFF4FD] mt-4 roleMain role-create-page__permissions p-6 rounded-3xl mb-3 max-lg:p-2'>
          <div className="role-create-page__permissionsTop">
            <div>
              <Skeleton height={24} width={180} />
              <Skeleton height={14} width={220} className="mt-2" />
            </div>
            <Skeleton height={44} width={128} borderRadius={999} />
          </div>

          <div className="roleMainM role-create-page__permissionGrid grid grid-cols-3 gap-4 mt-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div className="roleMainMBox role-create-page__permissionCard py-5 px-5 bg-[#DEE5F2] rounded-3xl" key={index}>
                <div className="roleMainMBoxt role-create-page__permissionHead flex justify-between items-center">
                  <div className="roleMainMBoxl">
                    <Skeleton height={14} width={72} />
                    <Skeleton height={12} width={94} className="mt-2" />
                  </div>
                  <Skeleton height={28} width={28} borderRadius={10} />
                </div>

                <div className="roleMainMBoxb">
                  <ul className="list role-create-page__permissionList">
                    {Array.from({ length: 4 }).map((__, itemIndex) => (
                      <li
                        className="bg-white rounded-2xl py-4 px-6 flex items-center gap-2 my-3 roleMainMBoxbb role-create-page__permissionItem"
                        key={itemIndex}
                      >
                        <Skeleton height={20} width={20} borderRadius={6} />
                        <Skeleton height={14} width="62%" />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="role-create-page__actions">
          <Skeleton height={44} width={124} borderRadius={999} />
          <Skeleton height={44} width={140} borderRadius={999} />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default SkeletonCreateEdits
