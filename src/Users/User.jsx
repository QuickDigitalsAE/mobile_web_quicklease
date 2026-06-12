import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'antd'
import { FiArrowUpRight, FiEdit3, FiMail, FiPlus } from 'react-icons/fi'
import plus from '../dist/webImages/plus.svg'
import profileImg from '../dist/webImages/profile.png'
import useFetch from '../customHooks/useFetch'
import SkeletonUserCard from './SkeletonUserCard'

const User = ({ permission }) => {
  const { loading, data } = useFetch(`allUsers`)
  const [datas, setDatas] = useState([])

  useEffect(() => {
    if (data?.data) {
      setDatas(data.data)
    }
  }, [data])

  const check = (module, action) => permission?.[module]?.includes(action)
  const canEditUsers = check('Users', 'User Edit')
  const canAddUsers = check("Users", "User Add")

  const columns = useMemo(
    () => [
      {
        title: 'User',
        key: 'user',
        width: 280,
        render: (_, record) => (
          <div className="users-table__identity">
            <img
              className="users-table__avatar"
              src={record.profile_image ?? profileImg}
              alt={record.username ?? record.name ?? 'User'}
            />
            <div>
              <div className="users-table__primary">{record.username || 'No username'}</div>
              <div className="users-table__secondary">{record.name || 'No name available'}</div>
            </div>
          </div>
        ),
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: 260,
        render: (value) => (
          <div className="users-table__meta">
            <FiMail className="users-table__metaIcon" />
            <span>{value || 'No email'}</span>
          </div>
        ),
      },
      {
        title: 'Status',
        dataIndex: 'user_enabled',
        key: 'user_enabled',
        width: 140,
        render: (value) => (
          <span className={`users-table__badge ${value === 1 ? 'users-table__badge--active' : 'users-table__badge--inactive'}`}>
            {value === 1 ? 'Enabled' : 'Disabled'}
          </span>
        ),
      },
      {
        title: 'Record',
        key: 'record',
        width: 110,
        render: (_, record) => <span className="users-table__record">#{record.id}</span>,
      },
      {
        title: 'Action',
        key: 'action',
        width: 180,
        render: (_, record) => (
          <div className="users-table__actions">
            {canEditUsers && (
              <Link to={`/users/edit/${record.id}`} className="users-table__actionLink">
                <FiEdit3 />
                <span>Edit</span>
              </Link>
            )}
            <Link to={`/users/edit/${record.id}`} className="users-table__actionIcon" aria-label={`Open ${record.username || record.name || 'user'}`}>
              <FiArrowUpRight />
            </Link>
          </div>
        ),
      },
    ],
    [canEditUsers]
  )

  if (loading) {
    return <SkeletonUserCard />
  }

  return (
    <section className='TeamPage users-table-page'>
      <div className="TeamPageTop users-table-page__top bg-white rounded-3xl p-4 enquiries-table-page__top flex justify-between items-center">
        <div>
          <>
            <h6 className='text-[1rem] mb-2 relative px-3 font-Mluvka'>
              <span>{datas?.length ?? 0}</span> Users
            </h6>
            <p className="users-table-page__subtitle">
              Review team accounts, status, and edit access from a cleaner table view.
            </p>
          </>
        </div>
        {canAddUsers && (
          <Link to={"/users/create"} className='users-table-page__add bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer'>
            <span className="users-table-page__addIcon">
              <FiPlus />
            </span>
            <img src={plus} alt="plus" className="hidden" />
            <span className='font-MluvkaBold text-secondary capitalize'>Add User</span>
          </Link>
        )}
      </div>

      <div className="users-table-page__panel">
        <div className="users-table-page__stats">
          <article>
            <span>Total accounts</span>
            <strong>{datas?.length ?? 0}</strong>
          </article>
          <article>
            <span>Enabled</span>
            <strong>{Array.isArray(datas) ? datas.filter((item) => item.user_enabled === 1).length : 0}</strong>
          </article>
          <article>
            <span>Disabled</span>
            <strong>{Array.isArray(datas) ? datas.filter((item) => item.user_enabled !== 1).length : 0}</strong>
          </article>
        </div>

        <div className="users-table-page__tableWrap">
          <Table
            rowKey={(record) => record.id}
            loading={loading}
            dataSource={Array.isArray(datas) ? datas : []}
            columns={columns}
            pagination={false}
            scroll={{ x: 960 }}
          />
        </div>
      </div>
    </section>
  )
}

export default User
