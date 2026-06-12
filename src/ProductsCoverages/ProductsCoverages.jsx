import React, { useContext, useEffect, useMemo, useState } from 'react'
import { MainLanguageContext } from '../context/MainLanguageContext';
import usePost from '../customHooks/usePost';
import useGet from '../customHooks/useGet';
import { Link } from 'react-router-dom';
import { Pagination, Table } from 'antd';
import { FiArrowUpRight, FiEdit3, FiPlus, FiSearch, FiShield } from 'react-icons/fi';
import plus from '../dist/webImages/plus.svg'
import ListPageHero from '../components/ListPageHero';

const ProductsCoverages = ({ permission }) => {
  const { mainLanguage } = useContext(MainLanguageContext);
  const [datas, setDatas] = useState([])
  const [resget, apiMethodGet] = useGet()
  const [currentPage, setCurrentPage] = useState(1)
  const [paginationn, setPaginationn] = useState(6);
  const [searchValue, setSearchValue] = useState("")
  const [res2, apiMethod2] = usePost()

  const check = (module, action) => permission?.[module]?.includes(action);
  const canAdd = check("ProductCoverages", "ProductCoverages Add")
  const canEdit = check("ProductCoverages", "ProductCoverages Edit")

  const onChange = (current) => {
    setCurrentPage(current)
    let formdata = new FormData();
    formdata.append('search_query', searchValue);
    if ((searchValue).trim()) {
      apiMethod2(`coverages/search_list/${mainLanguage}/6?page=${current}`, formdata);
    } else {
      apiMethodGet(`coverages/list/${mainLanguage}/6?page=${current}`, formdata);
    }
  };

  useEffect(() => {
    if (mainLanguage) {
      setCurrentPage(1)
      apiMethodGet(`coverages/list/${mainLanguage}/6?page=1`);
    }
  }, [mainLanguage]);

  let debounceTimer;
  const debounce = (func, delay) => {
    return (...args) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const executeApiCall = (e) => {
    setSearchValue(e.target.value)
    let formdata = new FormData();
    formdata.append('search_query', e.target.value);
    if ((e.target.value).trim()) {
      apiMethod2(`coverages/search_list/${mainLanguage}/6?page=${currentPage}`, formdata);
    } else {
      apiMethodGet(`coverages/list/${mainLanguage}/6?page=${currentPage}`, formdata);
    }
  };
  const handleChange = debounce(executeApiCall, 1000)

  useEffect(() => {
    if (!resget.isLoading) {
      setDatas(resget?.data?.data || [])
      setPaginationn(resget.data?.pagination)
    }
  }, [resget.data])

  useEffect(() => {
    setDatas([])
    if (res2.data) {
      setDatas(res2?.data?.data || []);
      setPaginationn(res2?.data?.pagination)
    }
  }, [res2.data]);

  const columns = useMemo(
    () => [
      {
        title: 'Coverage',
        key: 'coverage',
        width: 280,
        render: (_, record) => (
          <div className="roles-table__identity">
            <span className="roles-table__icon">
              <FiShield />
            </span>
            <div>
              <div className="roles-table__primary">{record.title || 'Untitled coverage'}</div>
              <div className="roles-table__secondary">{record.tooltip || 'No tooltip provided'}</div>
            </div>
          </div>
        ),
      },
      {
        title: 'Less Than 30 Days',
        dataIndex: 'less_30_days_price',
        key: 'less_30_days_price',
        width: 170,
        render: (value) => <span className="bookings-table__amount">{value || '0'}</span>,
      },
      {
        title: 'More Than 30 Days',
        dataIndex: 'more_30_days_price',
        key: 'more_30_days_price',
        width: 170,
        render: (value) => <span className="bookings-table__amount">{value || '0'}</span>,
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
            {canEdit && (
              <Link to={`/products/coverages/edit/${record.id}`} className="users-table__actionLink">
                <FiEdit3 />
                <span>Edit</span>
              </Link>
            )}
            <Link to={`/products/coverages/edit/${record.id}`} className="users-table__actionIcon" aria-label={`Open ${record.title || 'coverage'}`}>
              <FiArrowUpRight />
            </Link>
          </div>
        ),
      },
    ],
    [canEdit]
  )

  return (
    <section className='users-table-page roles-table-page'>
      <ListPageHero
        title="Coverages"
        count={datas?.length ?? 0}
        subtitle="Review coverage titles, tooltip copy, and pricing tiers from a cleaner table view."
        action={
          <div className='flex gap-3 max-lg:flex-col w-full justify-end'>
            <div className="bookings-table-page__search">
              <FiSearch className="bookings-table-page__searchIcon" />
              <input type="text" onChange={handleChange} className='bookings-table-page__searchInput' placeholder='Search coverages' />
            </div>
            {canAdd && (
              <Link to={"/products/coverages/create"} className='users-table-page__add bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer'>
                <span className="users-table-page__addIcon">
                  <FiPlus />
                </span>
                <span className='font-MluvkaBold text-secondary capitalize'>Add Coverage</span>
              </Link>
            )}
          </div>
        }
        stats={[
          { label: 'Total coverages', value: datas?.length ?? 0 },
          { label: 'With tooltip', value: Array.isArray(datas) ? datas.filter((item) => item.tooltip).length : 0 },
          { label: 'Editable', value: canEdit ? datas?.length ?? 0 : 0 },
        ]}
      />

      <div className="users-table-page__panel">
        <div className="users-table-page__tableWrap">
          <Table
            loading={resget.isLoading}
            rowKey={(record) => record.id}
            dataSource={Array.isArray(datas) ? datas : []}
            columns={columns}
            pagination={false}
            locale={{ emptyText: 'No coverages found' }}
            scroll={{ x: 980 }}
          />
        </div>

        <div className='mt-1'>
          <Pagination
            onChange={onChange}
            current={currentPage}
            total={paginationn?.total}
            pageSize={6}
          />
        </div>
      </div>
    </section>
  )
}

export default ProductsCoverages
