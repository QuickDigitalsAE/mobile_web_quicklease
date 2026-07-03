import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Pagination, Table } from 'antd'
import { FiArrowUpRight, FiEdit3, FiMail, FiPhone, FiPlus, FiSearch, FiToggleLeft, FiToggleRight, FiTrash2 } from 'react-icons/fi'
import swal from 'sweetalert'
import { toast } from 'react-toastify'
import profileImg from '../dist/webImages/profile.png'
import useDelete from '../customHooks/useDelete'
import useGet from '../customHooks/useGet'
import usePut2 from '../customHooks/usePut2'
import SkeletonUserCard from '../Users/SkeletonUserCard'
import ListPageHero from '../components/ListPageHero'

const PAGE_SIZE = 10

const getPaginationMeta = (response, fallbackLength) => {
  const meta = response?.meta || response?.pagination || {}
  return {
    currentPage: meta.current_page || response?.current_page || 1,
    total: meta.total || response?.total || fallbackLength || 0,
    perPage: meta.per_page || response?.per_page || PAGE_SIZE,
  }
}

const Customers = ({ permission }) => {
  const [customers, setCustomers] = useState([])
  const [pagination, setPagination] = useState({
    currentPage: 1,
    total: 0,
    perPage: PAGE_SIZE,
  })
  const [searchValue, setSearchValue] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)
  const [resGet, apiMethodGet] = useGet()
  const [resDelete, apiMethodDelete] = useDelete()
  const [resStatus, apiMethodStatus] = usePut2()
  const apiMethodGetRef = useRef(apiMethodGet)
  const apiMethodDeleteRef = useRef(apiMethodDelete)
  const apiMethodStatusRef = useRef(apiMethodStatus)

  apiMethodGetRef.current = apiMethodGet
  apiMethodDeleteRef.current = apiMethodDelete
  apiMethodStatusRef.current = apiMethodStatus

  const check = (module, action) => permission?.[module]?.includes(action)
  const canEditCustomers = check('Customers', 'Customer Edit')
  const canDeleteCustomers = check('Customers', 'Customer Delete')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchValue.trim())
    }, 500)

    return () => clearTimeout(timer)
  }, [searchValue])

  useEffect(() => {
    apiMethodGetRef.current(`customers?per_page=${PAGE_SIZE}&search=${encodeURIComponent(debouncedSearch)}&page=${pagination.currentPage}`)
  }, [debouncedSearch, pagination.currentPage, refreshKey])

  useEffect(() => {
    if (resGet?.data) {
      const nextCustomers = Array.isArray(resGet?.data?.data) ? resGet.data.data : []
      setCustomers(nextCustomers)
      setPagination((prev) => ({
        ...prev,
        ...getPaginationMeta(resGet.data, nextCustomers.length),
      }))
    }
  }, [resGet.data])

  useEffect(() => {
    if (resDelete?.data?.message) {
      toast.success(resDelete.data.message)
      setRefreshKey((prev) => prev + 1)
    }
  }, [resDelete.data])

  useEffect(() => {
    if (resDelete?.error?.response?.data?.message) {
      toast.error(resDelete.error.response.data.message)
    }
  }, [resDelete.error])

  useEffect(() => {
    if (resStatus?.data?.message) {
      toast.success(resStatus.data.message)
      setRefreshKey((prev) => prev + 1)
    }
  }, [resStatus.data])

  useEffect(() => {
    if (resStatus?.error?.response?.data?.message) {
      toast.error(resStatus.error.response.data.message)
    }
  }, [resStatus.error])

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value)
    setPagination((prev) => ({
      ...prev,
      currentPage: 1,
    }))
  }

  const handleDelete = useCallback((record) => {
    swal({
      title: `Delete ${record.name || 'this customer'}?`,
      text: 'This action will remove the customer record.',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        apiMethodDeleteRef.current(`customers/${record.id}`)
      }
    })
  }, [])

  const handleStatusToggle = useCallback((record) => {
    const nextStatus = record.is_active === 1 ? 0 : 1
    apiMethodStatusRef.current(`customers/${record.id}/status`, { is_active: nextStatus })
  }, [])

  const columns = useMemo(
    () => [
      {
        title: 'Customer',
        key: 'customer',
        width: 280,
        render: (_, record) => (
          <div className="users-table__identity">
            <img
              className="users-table__avatar"
              src={record.profile_image || profileImg}
              alt={record.name || 'Customer'}
              onError={(e) => {
                e.currentTarget.onerror = null
                e.currentTarget.src = profileImg
              }}
            />
            <div>
              <div className="users-table__primary">{record.name || 'No name available'}</div>
              <div className="users-table__secondary">#{record.id}</div>
            </div>
          </div>
        ),
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: 240,
        render: (value) => (
          <div className="users-table__meta">
            <FiMail className="users-table__metaIcon" />
            <span>{value || 'No email'}</span>
          </div>
        ),
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        width: 170,
        render: (value) => (
          <div className="users-table__meta">
            <FiPhone className="users-table__metaIcon" />
            <span>{value || 'No phone'}</span>
          </div>
        ),
      },
      {
        title: 'Status',
        dataIndex: 'is_active',
        key: 'is_active',
        width: 140,
        render: (value) => (
          <span className={`users-table__badge ${value === 1 ? 'users-table__badge--active' : 'users-table__badge--inactive'}`}>
            {value === 1 ? 'Active' : 'Inactive'}
          </span>
        ),
      },
      {
        title: 'Updated',
        dataIndex: 'updated_at',
        key: 'updated_at',
        width: 180,
        render: (value) => (value ? new Date(value).toLocaleDateString() : 'No date'),
      },
      {
        title: 'Action',
        key: 'action',
        width: 250,
        render: (_, record) => (
          <div className="users-table__actions">
            {canEditCustomers && (
              <Link to={`/customers/edit/${record.id}`} className="users-table__actionLink">
                <FiEdit3 />
                <span>Edit</span>
              </Link>
            )}
            {canEditCustomers && (
              <button type="button" onClick={() => handleStatusToggle(record)} className="users-table__actionIcon" aria-label={`Toggle status for ${record.name || 'customer'}`}>
                {record.is_active === 1 ? <FiToggleRight /> : <FiToggleLeft />}
              </button>
            )}
            {canDeleteCustomers && (
              <button type="button" onClick={() => handleDelete(record)} className="users-table__actionIcon" aria-label={`Delete ${record.name || 'customer'}`}>
                <FiTrash2 />
              </button>
            )}
            <Link to={`/customers/edit/${record.id}`} className="users-table__actionIcon" aria-label={`Open ${record.name || 'customer'}`}>
              <FiArrowUpRight />
            </Link>
          </div>
        ),
      },
    ],
    [canDeleteCustomers, canEditCustomers, handleDelete, handleStatusToggle]
  )

  if (resGet.isLoading && !customers.length) {
    return <SkeletonUserCard />
  }

  return (
    <section className="users-table-page">
      <ListPageHero
        title="Customers"
        count={pagination.total || customers.length}
        subtitle="Manage customer records in a simple table view with quick search and actions."
        action={
          <div className="flex w-full justify-end items-center gap-3 max-md:flex-col max-md:items-stretch">
            <label className="bookings-table-page__search">
              <FiSearch />
              <input type="text" value={searchValue} onChange={handleSearchChange} placeholder="Search customers" />
            </label>

            <Link to="/customers/create" className="users-table-page__add bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer">
              <span className="users-table-page__addIcon">
                <FiPlus />
              </span>
              <span className="font-MluvkaBold text-secondary capitalize">Add Customer</span>
            </Link>
          </div>
        }
        stats={[
          { label: 'Total customers', value: pagination.total || customers.length },
          { label: 'Active', value: Array.isArray(customers) ? customers.filter((item) => item.is_active === 1).length : 0 },
          { label: 'Visible on page', value: Array.isArray(customers) ? customers.length : 0 },
        ]}
      />

      <div className="users-table-page__panel">
        <div className="users-table-page__tableWrap">
          <Table
            rowKey={(record) => record.id}
            loading={resGet.isLoading}
            dataSource={Array.isArray(customers) ? customers : []}
            columns={columns}
            pagination={false}
            scroll={{ x: 1100 }}
          />
        </div>

        <div className="mt-4">
          <Pagination
            current={pagination.currentPage}
            onChange={(page) => setPagination((prev) => ({ ...prev, currentPage: page }))}
            total={pagination.total}
            pageSize={pagination.perPage}
            showSizeChanger={false}
          />
        </div>
      </div>
    </section>
  )
}

export default Customers
