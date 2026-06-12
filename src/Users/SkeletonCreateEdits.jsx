import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonCreateEdits = ({ heading }) => {
  return (
    <SkeletonTheme baseColor="#e7eef7" highlightColor="#f8fbff">
      <div className='createTeam user-create-page'>
        <div className='user-create-page__shell'>
          <div className='TeamModel user-create-page__card transition-all duration-300 bg-white rounded-xl'>
            <div className="overflow-auto modelBox">
              <div className="TeamBox user-create-page__content p-5 rounded-xl">
                <aside className="user-create-page__aside">
                  <span className="user-create-page__kicker">{heading || 'Loading User Form'}</span>
                  <Skeleton height={44} width="78%" />
                  <Skeleton count={2} height={16} className="mt-2" />
                  <div className="user-create-page__avatarWrap">
                    <Skeleton circle height={170} width={170} />
                  </div>
                  <div className="user-create-page__asideMeta">
                    <Skeleton height={14} width="70%" />
                    <Skeleton height={14} width="52%" />
                  </div>
                  <div className="user-create-page__asideNote">
                    <Skeleton height={16} width="42%" />
                    <Skeleton count={2} height={14} className="mt-2" />
                  </div>
                </aside>

                <div className="form user-create-page__form mt-7">
                  <section className="user-create-page__section">
                    <div className="user-create-page__sectionHead">
                      <Skeleton height={24} width="34%" />
                      <Skeleton height={14} width="62%" className="mt-2" />
                    </div>
                    <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-1 w-full">
                      <Skeleton height={72} />
                      <Skeleton height={72} />
                      <Skeleton height={72} />
                    </div>
                  </section>

                  <section className="user-create-page__section">
                    <div className="user-create-page__sectionHead">
                      <Skeleton height={24} width="22%" />
                      <Skeleton height={14} width="54%" className="mt-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-5 max-lg:grid-cols-1 w-full">
                      <Skeleton height={72} />
                      <Skeleton height={72} />
                    </div>
                  </section>

                  <section className="user-create-page__section user-create-page__section--toggle mt-4">
                    <div className="user-create-page__toggleRow">
                      <div>
                        <Skeleton height={24} width={140} />
                        <Skeleton height={14} width={250} className="mt-2" />
                      </div>
                      <Skeleton height={44} width={132} borderRadius={999} />
                    </div>
                  </section>
                </div>
              </div>

              <div className="user-create-page__actions">
                <Skeleton height={46} width={130} borderRadius={999} />
                <Skeleton height={46} width={150} borderRadius={999} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  )
}

export default SkeletonCreateEdits
