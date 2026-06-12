import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Pagination, Table } from 'antd'
import { FiArrowUpRight, FiEdit3, FiGift, FiPlus, FiSearch } from 'react-icons/fi'
import plus from '../dist/webImages/plus.svg'
import { MainLanguageContext } from '../context/MainLanguageContext'
import usePost from '../customHooks/usePost'
import useGet from '../customHooks/useGet'
import SkeletonPromotionsCard from './SkeletonPromotionsCard'
import ListPageHero from '../components/ListPageHero'

const Promotions = ({ permission }) => {
  const { mainLanguage } = useContext(MainLanguageContext)
  const [datas, setDatas] = useState([])
  const [resget, apiMethodGet] = useGet()
  const [currentPage, setCurrentPage] = useState(1)
  const [paginationn, setPaginationn] = useState(6)
  const [searchValue, setSearchValue] = useState('')
  const [res2, apiMethod2] = usePost()

  const check = (module, action) => permission?.[module]?.includes(action)
  const canAddPromotions = check('Promotions', 'Promotion Add')
  const canEditPromotions = check('Promotions', 'Promotion Edit')

  const onChange = (current) => {
    setCurrentPage(current)
    const formdata = new FormData()
    formdata.append('search_query', searchValue)

    if (searchValue.trim()) {
      apiMethod2(`promotions/search_promotions_list/${mainLanguage}/6?page=${current}`, formdata)
    } else {
      apiMethodGet(`promotions/list/${mainLanguage}/6?page=${current}`, formdata)
    }
  }

  useEffect(() => {
    if (mainLanguage) {
      setCurrentPage(1)
      apiMethodGet(`promotions/list/${mainLanguage}/6?page=1`)
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
      apiMethod2(`promotions/search_promotions_list/${mainLanguage}/6?page=1`, formdata)
    } else {
      apiMethodGet(`promotions/list/${mainLanguage}/6?page=1`, formdata)
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
        title: 'Promotion',
        key: 'promotion',
        width: 320,
        render: (_, record) => (
          <div className="roles-table__identity">
            <span className="roles-table__icon">
              <FiGift />
            </span>
            <div>
              <div className="roles-table__primary">{record.promotion_title || 'Untitled promotion'}</div>
              <div className="roles-table__secondary">{record.promotion_slug || 'No slug assigned'}</div>
            </div>
          </div>
        ),
      },
      {
        title: 'Summary',
        key: 'summary',
        width: 340,
        render: (_, record) => (
          <div className="users-table__email">
            {record.promotion_short_paragraph
              ? String(record.promotion_short_paragraph).replace(/<[^>]*>/g, '').slice(0, 120) + (String(record.promotion_short_paragraph).replace(/<[^>]*>/g, '').length > 120 ? '...' : '')
              : 'No short summary added'}
          </div>
        ),
      },
      {
        title: 'Schedule',
        key: 'schedule',
        width: 180,
        render: (_, record) => <span className="roles-table__badge">{record.schedule_date || 'Not scheduled'}</span>,
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
            {canEditPromotions && (
              <Link to={`/promotions/edit/${record.id}`} className="users-table__actionLink">
                <FiEdit3 />
                <span>Edit</span>
              </Link>
            )}
            <Link to={`/promotions/edit/${record.id}`} className="users-table__actionIcon" aria-label={`Open ${record.promotion_title || 'promotion'}`}>
              <FiArrowUpRight />
            </Link>
          </div>
        ),
      },
    ],
    [canEditPromotions]
  )

  if (resget.isLoading && !datas?.length) {
    return <SkeletonPromotionsCard />
  }

  return (
    <section className="Promotions users-table-page roles-table-page">
      <ListPageHero
        title="Promotions"
        count={paginationn?.total ?? datas?.length ?? 0}
        subtitle="Manage promotion campaigns in a cleaner table view with faster search and editing."
        action={
          <div className="flex w-full justify-end items-center gap-3">
            <label className="bookings-table-page__search">
              <FiSearch />
              <input type="text" onChange={handleChange} placeholder="Search promotions" />
            </label>

            {canAddPromotions && (
              <Link to="/promotions/create" className="users-table-page__add bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer">
                <span className="users-table-page__addIcon">
                  <FiPlus />
                </span>
                <img src={plus} alt="plus" className="hidden" />
                <span className="font-MluvkaBold text-secondary capitalize">Add Promotion</span>
              </Link>
            )}
          </div>
        }
        stats={[
          { label: 'Total promotions', value: paginationn?.total ?? datas?.length ?? 0 },
          { label: 'Visible on page', value: Array.isArray(datas) ? datas.length : 0 },
          { label: 'Editable', value: canEditPromotions ? (Array.isArray(datas) ? datas.length : 0) : 0 },
        ]}
      />

      <div className="users-table-page__panel">
        <div className="users-table-page__tableWrap">
          <Table
            rowKey={(record) => record.id}
            dataSource={Array.isArray(datas) ? datas : []}
            columns={columns}
            pagination={false}
            scroll={{ x: 980 }}
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

export default Promotions
