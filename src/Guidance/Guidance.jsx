import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'antd'
import { FiArrowUpRight, FiEdit3, FiExternalLink, FiPlus, FiTrash2 } from 'react-icons/fi'
import swal from 'sweetalert'
import { toast } from 'react-toastify'
import useDelete from '../customHooks/useDelete'
import useGet from '../customHooks/useGet'
import SkeletonUserCard from '../Users/SkeletonUserCard'
import ListPageHero from '../components/ListPageHero'
import GuidanceMediaPreview from './GuidanceMediaPreview'

const Guidance = () => {
  const [guides, setGuides] = useState([])
  const [resGet, apiMethodGet] = useGet()
  const [resDelete, apiMethodDelete] = useDelete()
  const apiMethodGetRef = useRef(apiMethodGet)
  const apiMethodDeleteRef = useRef(apiMethodDelete)

  apiMethodGetRef.current = apiMethodGet
  apiMethodDeleteRef.current = apiMethodDelete

  useEffect(() => {
    apiMethodGetRef.current('guidance')
  }, [])

  useEffect(() => {
    if (resGet?.data?.data) {
      setGuides(Array.isArray(resGet.data.data) ? resGet.data.data : [])
    }
  }, [resGet.data])

  useEffect(() => {
    if (resDelete?.data?.message) {
      toast.success(resDelete.data.message)
      apiMethodGetRef.current('guidance')
    }
  }, [resDelete.data])

  useEffect(() => {
    if (resDelete?.error?.response?.data?.message) {
      toast.error(resDelete.error.response.data.message)
    }
  }, [resDelete.error])

  const handleDelete = useCallback((record) => {
    swal({
      title: `Delete ${record.title || 'this guide'}?`,
      text: 'This action will remove the guidance record.',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        apiMethodDeleteRef.current(`guidance/${record.id}`)
      }
    })
  }, [])

  const columns = useMemo(
    () => [
      {
        title: 'Media',
        key: 'image',
        width: 120,
        render: (_, record) => (
          <div className="w-[4.5rem] h-[4.5rem]">
            <GuidanceMediaPreview src={record.image} alt={record.title} className="w-full h-full rounded-2xl object-cover border border-[#CFD5E2] bg-white" />
          </div>
        ),
      },
      {
        title: 'Guidance',
        key: 'guidance',
        width: 320,
        render: (_, record) => (
          <div>
            <div className="users-table__primary">{record.title || 'Untitled guidance'}</div>
            <div className="users-table__secondary mt-1">
              {record.description ? String(record.description).slice(0, 110) + (String(record.description).length > 110 ? '...' : '') : 'No description'}
            </div>
          </div>
        ),
      },
      {
        title: 'Button',
        key: 'button_text',
        width: 180,
        render: (_, record) => <span className="users-table__record">{record.button_text || 'No button text'}</span>,
      },
      {
        title: 'Redirect',
        key: 'redirect_url',
        width: 260,
        render: (_, record) =>
          record.redirect_url ? (
            <a href={record.redirect_url} target="_blank" rel="noreferrer" className="users-table__actionLink">
              <FiExternalLink />
              <span>Open Link</span>
            </a>
          ) : (
            <span className="users-table__secondary">No URL</span>
          ),
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: 140,
        render: (value) => (
          <span className={`users-table__badge ${value === 1 ? 'users-table__badge--active' : 'users-table__badge--inactive'}`}>
            {value === 1 ? 'Active' : 'Inactive'}
          </span>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        width: 200,
        render: (_, record) => (
          <div className="users-table__actions">
            <Link to={`/guidance/edit/${record.id}`} className="users-table__actionLink">
              <FiEdit3 />
              <span>Edit</span>
            </Link>
            <button type="button" onClick={() => handleDelete(record)} className="users-table__actionIcon" aria-label={`Delete ${record.title || 'guidance'}`}>
              <FiTrash2 />
            </button>
            <Link to={`/guidance/edit/${record.id}`} className="users-table__actionIcon" aria-label={`Open ${record.title || 'guidance'}`}>
              <FiArrowUpRight />
            </Link>
          </div>
        ),
      },
    ],
    [handleDelete]
  )

  if (resGet.isLoading && !guides.length) {
    return <SkeletonUserCard />
  }

  return (
    <section className="users-table-page">
      <ListPageHero
        title="Guidance"
        count={guides.length}
        subtitle="Manage guidance records in a clean table view with quick editing access."
        action={
          <Link to="/guidance/create" className="users-table-page__add bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer">
            <span className="users-table-page__addIcon">
              <FiPlus />
            </span>
            <span className="font-MluvkaBold text-secondary capitalize">Add Guidance</span>
          </Link>
        }
        stats={[
          { label: 'Total guidance', value: guides.length },
          { label: 'Active', value: Array.isArray(guides) ? guides.filter((item) => item.status === 1).length : 0 },
          { label: 'Inactive', value: Array.isArray(guides) ? guides.filter((item) => item.status !== 1).length : 0 },
        ]}
      />

      <div className="users-table-page__panel">
        <div className="users-table-page__tableWrap">
          <Table
            rowKey={(record) => record.id}
            loading={resGet.isLoading}
            dataSource={Array.isArray(guides) ? guides : []}
            columns={columns}
            pagination={false}
            scroll={{ x: 1180 }}
          />
        </div>
      </div>
    </section>
  )
}

export default Guidance
