import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'antd'
import { FiArrowUpRight, FiEdit3, FiPlus, FiShield } from 'react-icons/fi'
import plus from '../dist/webImages/plus.svg'
import useGet from '../customHooks/useGet';
import { MainLanguageContext } from '../context/MainLanguageContext';
import SkeletonRoleList from './SkeletonRoleList';
import ListPageHero from '../components/ListPageHero';

const RoleList = ({permission}) => {
    const { mainLanguage } = useContext(MainLanguageContext);  
    const [datas, setDatas] = useState([])
    const [resget, apiMethodGet] = useGet()

    useEffect(() => {
        if (mainLanguage) {
            apiMethodGet(`roles`);
        }
    }, [mainLanguage]);
    useEffect(() => {
        if(!resget.isLoading) {
           setDatas(resget?.data?.data)
        }
       
       }, [resget.data])

    const check = (module, action) => permission?.[module]?.includes(action);
    const canAddRoles = check("Roles", "Role Add")
    const canEditRoles = check("Roles", "Role Edit")

    const columns = useMemo(
      () => [
        {
          title: 'Role',
          key: 'role',
          width: 320,
          render: (_, record) => (
            <div className="roles-table__identity">
              <span className="roles-table__icon">
                <FiShield />
              </span>
              <div>
                <div className="roles-table__primary">{record.name || 'Untitled role'}</div>
                <div className="roles-table__secondary">Access group for admin actions</div>
              </div>
            </div>
          ),
        },
        {
          title: 'Permissions',
          key: 'permissions',
          width: 180,
          render: (_, record) => {
            const permissionsCount = Array.isArray(record.permissions)
              ? record.permissions.length
              : Array.isArray(record.role_permissions)
                ? record.role_permissions.length
                : 0

            return (
              <span className="roles-table__badge">
                {permissionsCount} actions
              </span>
            )
          },
        },
        {
          title: 'Record',
          key: 'record',
          width: 120,
          render: (_, record) => <span className="users-table__record">#{record.id}</span>,
        },
        {
          title: 'Action',
          key: 'action',
          width: 190,
          render: (_, record) => (
            <div className="users-table__actions">
              {canEditRoles && (
                <Link to={`/role/edit/${record.id}`} className="users-table__actionLink">
                  <FiEdit3 />
                  <span>Edit</span>
                </Link>
              )}
              <Link to={`/role/edit/${record.id}`} className="users-table__actionIcon" aria-label={`Open ${record.name || 'role'}`}>
                <FiArrowUpRight />
              </Link>
            </div>
          ),
        },
      ],
      [canEditRoles]
    )

    if (resget.isLoading) return <SkeletonRoleList />

  return (
    <section className='TeamPage users-table-page roles-table-page'>
      <ListPageHero
        title="Roles"
        count={datas?.length ?? 0}
        subtitle="Manage role definitions and permission groups from a cleaner table view."
        action={canAddRoles ? (
          <Link to={"/role/create"} className='users-table-page__add bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer'>
            <span className="users-table-page__addIcon">
              <FiPlus />
            </span>
            <span className='font-MluvkaBold text-secondary capitalize'>Add Role</span>
          </Link>
        ) : null}
        stats={[
          { label: 'Total roles', value: datas?.length ?? 0 },
          { label: 'Editable', value: canEditRoles ? datas?.length ?? 0 : 0 },
          { label: 'Access groups', value: Array.isArray(datas) ? new Set(datas.map((item) => item.name)).size : 0 },
        ]}
      />

      <div className="users-table-page__panel">
        <div className="users-table-page__tableWrap">
          <Table
            rowKey={(record) => record.id}
            dataSource={Array.isArray(datas) ? datas : []}
            columns={columns}
            pagination={false}
            scroll={{ x: 840 }}
          />
        </div>
      </div>
    </section>
  )
}

export default RoleList
