import React from 'react'
import { Link } from 'react-router-dom'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonRoleList = () => {
  return (
    <SkeletonTheme baseColor="#e7eef7" highlightColor="#f8fbff">
      <section className='TeamPage users-table-page roles-table-page'>
        <section className="users-table-page__hero">
          <div className="users-table-page__heroHead">
            <div>
              <Skeleton height={20} width={140} />
              <Skeleton height={14} width={320} className="mt-2" />
            </div>
            <div className="users-table-page__heroAction">
              <Link to="/role/create" className="users-table-page__addButton">
                <Skeleton height={16} width={16} circle />
                <Skeleton height={14} width={74} />
              </Link>
            </div>
          </div>

          <div className="users-table-page__heroStats">
            {[1, 2, 3].map((item) => (
              <article key={item}>
                <Skeleton height={14} width={88} />
                <Skeleton height={28} width={48} className="mt-3" />
              </article>
            ))}
          </div>
        </section>

        <div className="users-table-page__panel">
          <div className="users-table-page__tableWrap">
            <div className="ant-table-wrapper">
              <div className="ant-table">
                <div className="ant-table-container">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th><Skeleton height={12} width={52} /></th>
                        <th><Skeleton height={12} width={84} /></th>
                        <th><Skeleton height={12} width={48} /></th>
                        <th><Skeleton height={12} width={50} /></th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...Array(6)].map((_, index) => (
                        <tr key={index}>
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <Skeleton height={42} width={42} borderRadius={14} />
                              <div>
                                <Skeleton height={16} width={150} />
                                <Skeleton height={12} width={130} className="mt-2" />
                              </div>
                            </div>
                          </td>
                          <td className="py-4">
                            <Skeleton height={32} width={96} borderRadius={999} />
                          </td>
                          <td className="py-4">
                            <Skeleton height={16} width={40} />
                          </td>
                          <td className="py-4">
                            <div className="flex items-center gap-2">
                              <Skeleton height={36} width={82} borderRadius={999} />
                              <Skeleton height={36} width={36} borderRadius={12} />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SkeletonTheme>
  )
}

export default SkeletonRoleList
