import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Pagination, Table } from 'antd'
import { FiArrowUpRight, FiEdit3, FiPlus, FiSearch, FiUsers } from 'react-icons/fi'
import plus from '../dist/webImages/plus.svg'
import useGet from '../customHooks/useGet'
import { MainLanguageContext } from '../context/MainLanguageContext'
import usePost from '../customHooks/usePost'
import SkeletonPartnersCard from './SkeletonPartnersCard'

const Partners = ({ permission }) => {
  const { mainLanguage } = useContext(MainLanguageContext)
  const [datas, setDatas] = useState([])
  const [resget, apiMethodGet] = useGet()
  const [currentPage, setCurrentPage] = useState(1)
  const [paginationn, setPaginationn] = useState(6)
  const [searchValue, setSearchValue] = useState('')
  const [res2, apiMethod2] = usePost()

  const check = (module, action) => permission?.[module]?.includes(action)
  const canAddPartners = check('Partners', 'Partner Add')
  const canEditPartners = check('Partners', 'Partner Edit')

  const onChange = (current) => {
    setCurrentPage(current)
    const formdata = new FormData()
    formdata.append('search_query', searchValue)

    if (searchValue.trim()) {
      apiMethod2(`partners/search_partner_list/${mainLanguage}/6?page=${current}`, formdata)
    } else {
      apiMethodGet(`partners/list/${mainLanguage}/6?page=${current}`, formdata)
    }
  }

  useEffect(() => {
    if (mainLanguage) {
      setCurrentPage(1)
      apiMethodGet(`partners/list/${mainLanguage}/6?page=1`)
    }
  }, [mainLanguage])

  let debounceTimer
  const debounce = (func, delay) => {
    return (...args) => {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        func(...args)
      }, delay)
    }
  }

  const executeApiCall = (e) => {
    const value = e.target.value
    setSearchValue(value)
    setCurrentPage(1)

    const formdata = new FormData()
    formdata.append('search_query', value)

    if (value.trim()) {
      apiMethod2(`partners/search_partner_list/${mainLanguage}/6?page=1`, formdata)
    } else {
      apiMethodGet(`partners/list/${mainLanguage}/6?page=1`, formdata)
    }
  }

  const handleChange = debounce(executeApiCall, 1000)

  useEffect(() => {
    if (!resget.isLoading) {
      setDatas(resget?.data?.data || [])
      setPaginationn(resget?.data?.pagination)
    }
  }, [resget.data])

  useEffect(() => {
    setDatas([])
    if (res2.data) {
      setDatas(res2?.data?.data || [])
      setPaginationn(res2?.data?.pagination)
    }
  }, [res2.data])

  const columns = useMemo(
    () => [
      {
        title: 'Partner',
        key: 'partner',
        width: 320,
        render: (_, record) => (
          <div className="roles-table__identity">
            <span className="roles-table__icon">
              <FiUsers />
            </span>
            <div>
              <div className="roles-table__primary">{record.partner_title || 'Untitled partner'}</div>
              <div className="roles-table__secondary">{record.partner_slug || 'No slug assigned'}</div>
            </div>
          </div>
        ),
      },
      {
        title: 'Summary',
        key: 'summary',
        width: 360,
        render: (_, record) => (
          <div className="users-table__email">
            {record.partner_paragraph
              ? String(record.partner_paragraph).replace(/<[^>]*>/g, '').slice(0, 120) + (String(record.partner_paragraph).replace(/<[^>]*>/g, '').length > 120 ? '...' : '')
              : 'No description added'}
          </div>
        ),
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
            {canEditPartners && (
              <Link to={`/partners/edit/${record.id}`} className="users-table__actionLink">
                <FiEdit3 />
                <span>Edit</span>
              </Link>
            )}
            <Link to={`/partners/edit/${record.id}`} className="users-table__actionIcon" aria-label={`Open ${record.partner_title || 'partner'}`}>
              <FiArrowUpRight />
            </Link>
          </div>
        ),
      },
    ],
    [canEditPartners]
  )

  if (resget.isLoading && !datas?.length) {
    return (
      <div className="NewsPageGrid mt-4 bg-[#EFF4FD] rounded-3xl p-6 grid grid-cols-2 gap-3 max-lg:grid-cols-1 max-lg:p-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonPartnersCard key={index} />
        ))}
      </div>
    )
  }

  return (
    <section className="NewsPage users-table-page roles-table-page">
      <div className="TeamPageTop bg-white rounded-3xl p-4 users-table-page__top flex justify-between items-center gap-4">
        <div>
          <h6 className="text-[1rem] mb-2 relative font-Mluvka capitalize">
            <span>{paginationn?.total ?? datas?.length ?? 0}</span> Partners
          </h6>
          <p className="users-table-page__subtitle">
            Manage partner entries in a cleaner table view with faster search and editing access.
          </p>
        </div>

        <div className="flex w-full justify-end items-center gap-3 ">
          <label className="bookings-table-page__search">
            <FiSearch />
            <input type="text" onChange={handleChange} placeholder="Search partners" />
          </label>

          {canAddPartners && (
            <Link to="/partners/create" className="users-table-page__add bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer">
              <span className="users-table-page__addIcon">
                <FiPlus />
              </span>
              <img src={plus} alt="plus" className="hidden" />
              <span className="font-MluvkaBold text-secondary capitalize">Add Partner</span>
            </Link>
          )}
        </div>
      </div>

      <div className="users-table-page__panel">
        <div className="users-table-page__stats">
          <article>
            <span>Total partners</span>
            <strong>{paginationn?.total ?? datas?.length ?? 0}</strong>
          </article>
          <article>
            <span>Visible on page</span>
            <strong>{Array.isArray(datas) ? datas.length : 0}</strong>
          </article>
          <article>
            <span>Editable</span>
            <strong>{canEditPartners ? (Array.isArray(datas) ? datas.length : 0) : 0}</strong>
          </article>
        </div>

        <div className="users-table-page__tableWrap">
          <Table
            rowKey={(record) => record.id}
            dataSource={Array.isArray(datas) ? datas : []}
            columns={columns}
            pagination={false}
            scroll={{ x: 920 }}
          />
        </div>

        <div className="mt-4">
          <Pagination
            current={currentPage}
            onChange={onChange}
            total={paginationn?.total}
            pageSize={6}
            showSizeChanger={false}
          />
        </div>
      </div>
    </section>
  )
}

export default Partners
