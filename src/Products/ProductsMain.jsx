import React, { useContext, useEffect, useMemo, useState } from 'react'
import plus from '../dist/webImages/plus.svg'
import { Link } from 'react-router-dom'
import useGet from '../customHooks/useGet'
import { MainLanguageContext } from '../context/MainLanguageContext'
import usePost from '../customHooks/usePost'
import { Pagination, Table } from 'antd'
import SkeletonProductsCard from './SkeletonProductsCard'
import { FiArrowUpRight, FiImage, FiSearch } from 'react-icons/fi'

const ProductsMain = ({ permission }) => {
  const { mainLanguage } = useContext(MainLanguageContext)
  const [datas, setDatas] = useState([])
  const [resget, apiMethodGet] = useGet()
  const [currentPage, setCurrentPage] = useState(1)
  const [paginationn, setPaginationn] = useState(12)
  const [searchValue, setSearchValue] = useState('')
  const [res2, apiMethod2] = usePost()

  const onChange = (current) => {
    setCurrentPage(current)
    const formdata = new FormData()
    formdata.append('search_query', searchValue)
    if (searchValue.trim()) {
      apiMethod2(`products/search_products_list/${mainLanguage}/12?page=${current}`, formdata)
    } else {
      apiMethodGet(`products/list/${mainLanguage}/12?page=${current}`, formdata)
    }
  }

  useEffect(() => {
    if (mainLanguage) {
      setCurrentPage(1)
      apiMethodGet(`products/list/${mainLanguage}/12?page=1`)
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
    setSearchValue(e.target.value)
    const formdata = new FormData()
    formdata.append('search_query', e.target.value)
    if (e.target.value.trim()) {
      apiMethod2(`products/search_products_list/${mainLanguage}/12?page=1`, formdata)
    } else {
      apiMethodGet(`products/list/${mainLanguage}/12?page=1`, formdata)
    }
    setCurrentPage(1)
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

  const check = (module, action) => permission?.[module]?.includes(action)

  const columns = useMemo(
    () => [
      {
        title: 'Product',
        key: 'product',
        width: 320,
        render: (_, record) => (
          <div className="users-table__identity">
            <div className="products-table__imageWrap">
              {record.main_image ? (
                <img
                  src={record.main_image}
                  alt={record.product_title || 'Product'}
                  className="products-table__image"
                />
              ) : (
                <div className="products-table__image products-table__image--empty">
                  <FiImage />
                </div>
              )}
            </div>
            <div>
              <div className="users-table__name">{record.product_title || 'Untitled product'}</div>
              <div className="users-table__meta">
                <span>#{record.id}</span>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: 'Catalog',
        dataIndex: 'catalog_title',
        key: 'catalog_title',
        width: 210,
        render: (value) => <span className="enquiries-table__text">{value || 'No catalog'}</span>,
      },
      {
        title: 'Vehicle Type',
        dataIndex: 'vehicle_type',
        key: 'vehicle_type',
        width: 170,
        render: (value) => <span className="enquiries-table__badge">{value || 'N/A'}</span>,
      },
      {
        title: 'Featured',
        key: 'featured',
        width: 140,
        render: (_, record) => (
          <span className={`users-table__badge ${record.featured ? 'users-table__badge--active' : 'users-table__badge--inactive'}`}>
            {record.featured ? 'Yes' : 'No'}
          </span>
        ),
      },
      {
        title: 'Promo',
        key: 'promo',
        width: 140,
        render: (_, record) => (
          <span className={`users-table__badge ${record.promo_status ? 'users-table__badge--active' : 'users-table__badge--inactive'}`}>
            {record.promo_status ? 'Active' : 'Off'}
          </span>
        ),
      },
      {
        title: 'Stock',
        key: 'stock',
        width: 140,
        render: (_, record) => (
          <span className={`users-table__badge ${record.stock_status ? 'users-table__badge--active' : 'users-table__badge--inactive'}`}>
            {record.stock_status ? 'In stock' : 'Out'}
          </span>
        ),
      },
      {
        title: 'Home',
        key: 'home',
        width: 140,
        render: (_, record) => (
          <span className={`users-table__badge ${record.show_on_home ? 'users-table__badge--active' : 'users-table__badge--inactive'}`}>
            {record.show_on_home ? 'Visible' : 'Hidden'}
          </span>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        width: 110,
        render: (_, record) => (
          <Link
            to={`/products/edit/${record.id}`}
            className="users-table__actionIcon"
            aria-label={`Edit ${record.product_title || 'product'}`}
          >
            <FiArrowUpRight />
          </Link>
        ),
      },
    ],
    []
  )

  if (resget.isLoading && !datas?.length) {
    return <SkeletonProductsCard />
  }

  return (
    <section className="users-table-page products-table-page">
      <div className="users-table-page__top bg-white rounded-3xl p-4 enquiries-table-page__top flex justify-between items-center">
        <div>
          <h6 className="text-[1rem] mb-2 relative font-Mluvka capitalize">
            <span>{Array.isArray(datas) ? datas.length : 0}</span> Products
          </h6>
          <p className="users-table-page__subtitle">
            Browse products, preview images, and manage inventory from one cleaner table layout.
          </p>
        </div>

        {check('Products', 'Products Add') && (
          <Link to="/products/create" className="users-table-page__addButton">
            <img src={plus} alt="plus" />
            <span>Add Product</span>
          </Link>
        )}
      </div>

      <div className="users-table-page__panel">
        <div className="users-table-page__stats">
          <article>
            <span>Total results</span>
            <strong>{Array.isArray(datas) ? datas.length : 0}</strong>
          </article>
          <article>
            <span>Featured</span>
            <strong>{Array.isArray(datas) ? datas.filter((item) => item.featured).length : 0}</strong>
          </article>
          <article>
            <span>Visible on home</span>
            <strong>{Array.isArray(datas) ? datas.filter((item) => item.show_on_home).length : 0}</strong>
          </article>
        </div>

        <div className="users-table-page__toolbar">
          <div className="users-table-page__search">
            <FiSearch className="users-table-page__searchIcon" />
            <input
              type="text"
              onChange={handleChange}
              className="users-table-page__searchInput"
              placeholder="Search products"
            />
          </div>
        </div>

        <div className="users-table-page__tableWrap">
          <Table
            rowKey={(record) => record.id}
            loading={resget.isLoading}
            dataSource={Array.isArray(datas) ? datas : []}
            columns={columns}
            pagination={false}
            locale={{ emptyText: 'No products found' }}
            scroll={{ x: 1380 }}
          />
        </div>

        <div className="my-4">
          <Pagination
            onChange={onChange}
            current={currentPage}
            total={paginationn?.total}
            pageSize={12}
            showSizeChanger={false}
          />
        </div>
      </div>
    </section>
  )
}

export default ProductsMain
