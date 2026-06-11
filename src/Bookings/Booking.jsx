import React, { useContext, useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs';
import { BookingTab } from '../data/data';
import BookingModel from './BookingModel';
import calender2 from '../dist/webImages/calendar2.svg';
import SkeletonBookingDate from './SkeletonBookingDate';
import usePost from '../customHooks/usePost';
import { MainLanguageContext } from '../context/MainLanguageContext';
import { Pagination, Table } from 'antd';
import { FiArrowUpRight, FiClock, FiMail, FiSearch } from 'react-icons/fi';

const Booking = ({ permission }) => {
  const { mainLanguage } = useContext(MainLanguageContext);
  const [tabIndex, setTabIndex] = useState("pending");
  const [datas, setDatas] = useState([])
  const [resget, apiMethodGet] = usePost()
  const [currentPage, setCurrentPage] = useState(1);
  const defaultFromTo = dayjs().subtract(1, 'month').format('YYYY-MM-DD');
  const defaultDateTo = dayjs().add(1, 'month').format('YYYY-MM-DD');
  const [searchValue, setSearchValue] = useState("")
  const [modelData, setModelData] = useState(null);
  const [modelStatus, setModelStatus] = useState(false);
  const [dateRange, setDateRange] = useState({
    to_month: defaultDateTo,
    from_month: defaultFromTo,
  });

  const { to_month, from_month } = dateRange;

  useEffect(() => {
    if (mainLanguage) {
      setCurrentPage(1)
      let formdata = new FormData();
      if (tabIndex) {
        formdata.append(`booking_status`, tabIndex)
      }
      formdata.append(`from_month`, defaultFromTo)
      formdata.append(`to_month`, defaultDateTo)
      apiMethodGet(`bookings/bookingList/${mainLanguage}/12?page=1`, formdata);
    }
  }, [mainLanguage]);

  useEffect(() => {
    setDatas([])
    if (resget.data) {
      setDatas(resget?.data?.data)
    }
  }, [resget.data]);

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
    formdata.append('search_value', e.target.value);
    formdata.append('from_month', from_month);
    formdata.append('to_month', to_month);
    if (tabIndex) {
      formdata.append('booking_status', tabIndex);
    }
    if ((e.target.value).trim()) {
      apiMethodGet(`bookings/search_bookingList/${mainLanguage}/12?page=1`, formdata);
    } else {
      apiMethodGet(`bookings/bookingList/${mainLanguage}/12?page=1`, formdata);
    }
  };

  const handleChange = debounce(executeApiCall, 1000)

  const onChange = (current) => {
    setCurrentPage(current)
    let formdata = new FormData();
    formdata.append(`from_month`, from_month)
    formdata.append(`to_month`, to_month)
    formdata.append('search_value', searchValue);
    if (tabIndex) {
      formdata.append(`booking_status`, tabIndex)
    }
    if ((searchValue).trim()) {
      apiMethodGet(`bookings/search_bookingList/${mainLanguage}/12?page=${current}`, formdata);
    } else {
      apiMethodGet(`bookings/bookingList/${mainLanguage}/12?page=${current}`, formdata);
    }
  };

  const handleBookintabUpdate = (item) => {
    setCurrentPage(1)
    if (item !== tabIndex) {
      let formdata = new FormData();
      formdata.append(`from_month`, from_month)
      formdata.append(`to_month`, to_month)
      if (item) {
        formdata.append(`booking_status`, item)
      }
      formdata.append('search_value', searchValue);
      if ((searchValue).trim()) {
        apiMethodGet(`bookings/search_bookingList/${mainLanguage}/12?page=1`, formdata);
      } else {
        apiMethodGet(`bookings/bookingList/${mainLanguage}/12?page=1`, formdata);
      }
    }
    setTabIndex(item)
  }

  const handleDateUpdate = (date, update) => {
    let newDateRange = { ...dateRange, [update]: date };

    let formdata = new FormData();
    formdata.append(`from_month`, newDateRange.from_month)
    formdata.append(`to_month`, newDateRange.to_month)
    if (tabIndex) {
      formdata.append(`booking_status`, tabIndex)
    }
    formdata.append('search_value', searchValue);
    if ((searchValue).trim()) {
      apiMethodGet(`bookings/search_bookingList/${mainLanguage}/12?page=${currentPage}`, formdata);
    } else {
      apiMethodGet(`bookings/bookingList/${mainLanguage}/12?page=${currentPage}`, formdata);
    }
    setDateRange(newDateRange);
  }

  const handleForm = () => {
    let formdata = new FormData();
    if (tabIndex) {
      formdata.append(`booking_status`, tabIndex)
    }
    formdata.append(`from_month`, from_month)
    formdata.append(`to_month`, to_month)
    formdata.append('search_value', searchValue);
    apiMethodGet(`bookings/bookingList/${mainLanguage}/12?page=1`, formdata);
  }

  const columns = useMemo(
    () => [
      {
        title: 'Booking',
        key: 'booking',
        width: 260,
        render: (_, record) => (
          <div className="bookings-table__identity">
            <div>
              <div className="bookings-table__primary">#{record.order_number || record.id}</div>
              <div className="bookings-table__secondary">{record.client_name || record.first_name || 'No customer name'}</div>
            </div>
          </div>
        ),
      },
      {
        title: 'Customer',
        key: 'customer',
        width: 260,
        render: (_, record) => (
          <div>
            <div className="users-table__meta">
              <FiMail className="users-table__metaIcon" />
              <span>{record.client_email || record.email || 'No email'}</span>
            </div>
            <div className="bookings-table__subMeta">{record.first_name || 'No first name'}</div>
          </div>
        ),
      },
      {
        title: 'Schedule',
        key: 'schedule',
        width: 260,
        render: (_, record) => (
          <div className="bookings-table__schedule">
            <div className="users-table__meta">
              <FiClock className="users-table__metaIcon" />
              <span>{dayjs(record.pickup_date_time).format('YYYY-MM-DD HH:mm')}</span>
            </div>
            <div className="bookings-table__subMeta">
              To {dayjs(record.return_date_time).format('YYYY-MM-DD HH:mm')}
            </div>
          </div>
        ),
      },
      {
        title: 'Status',
        key: 'status',
        width: 160,
        render: (_, record) => (
          <span className={`users-table__badge ${record.booking_status === 'completed' ? 'users-table__badge--active' : 'bookings-table__badge--pending'}`}>
            {record.booking_status || 'Pending'}
          </span>
        ),
      },
      {
        title: 'Payment',
        key: 'payment',
        width: 170,
        render: (_, record) => (
          <div>
            <span className={`users-table__badge ${record.payment_status === 'paid' ? 'users-table__badge--active' : 'users-table__badge--inactive'}`}>
              {record.payment_status || 'unpaid'}
            </span>
            <div className="bookings-table__subMeta">{record.payment_type || 'No payment type'}</div>
          </div>
        ),
      },
      {
        title: 'Amount',
        key: 'amount',
        width: 130,
        render: (_, record) => <span className="bookings-table__amount">{record.grand_total || '0'}</span>,
      },
      {
        title: 'Action',
        key: 'action',
        width: 100,
        render: (_, record) => (
          <button
            type="button"
            className="users-table__actionIcon"
            aria-label={`Open booking ${record.order_number || record.id}`}
            onClick={() => {
              setModelStatus(true)
              setModelData(record)
            }}
          >
            <FiArrowUpRight />
          </button>
        ),
      },
    ],
    []
  )

  return (
    <section className='bookingPage users-table-page bookings-table-page'>
      <div className="users-table-page__top bookings-table-page__top flex justify-between items-center">
        <div>
          <h6 className='text-[1rem] mb-2 relative px-3 font-Mluvka'>
            <span>{Array.isArray(datas) ? datas.length : 0}</span> Bookings
          </h6>
          <p className="users-table-page__subtitle">
            Review orders, payment state, and schedules from a cleaner booking table.
          </p>
        </div>
      </div>

      <div className="users-table-page__panel">
        <div className="users-table-page__stats">
          <article>
            <span>Total results</span>
            <strong>{Array.isArray(datas) ? datas.length : 0}</strong>
          </article>
          <article>
            <span>Paid</span>
            <strong>{Array.isArray(datas) ? datas.filter((item) => item.payment_status === 'paid').length : 0}</strong>
          </article>
          <article>
            <span>Status</span>
            <strong>{tabIndex || 'all'}</strong>
          </article>
        </div>

        <div className="bookings-table-page__filters">
          <div className="bookings-table-page__search">
            <FiSearch className="bookings-table-page__searchIcon" />
            <input type="text" onChange={handleChange} className='bookings-table-page__searchInput' placeholder='Search bookings' />
          </div>

          {resget.isLoading ? (
            <SkeletonBookingDate />
          ) : (
            <div className="bookings-table-page__dates">
              <div className="bookingPage-RightBox relative">
                <input type="date" max={to_month} className='mmonth absolute inset-0 opacity-0' value={from_month} onChange={(e) => handleDateUpdate(e.target.value, "from_month")} />
                <div className='inputBox bookings-table-page__dateChip'>
                  <img src={calender2} alt="calender2" />
                  <div className='font-Mluvka flex items-center gap-1 max-lg:text-[.8rem]'><dd className='m-0 text-[#8E93B5]'>From</dd><span>{from_month}</span></div>
                </div>
              </div>
              <div className="bookingPage-RightBox relative">
                <input type="date" min={from_month} className='mmonth absolute inset-0 opacity-0' value={to_month} onChange={(e) => handleDateUpdate(e.target.value, "to_month")} />
                <div className='inputBox bookings-table-page__dateChip'>
                  <img src={calender2} alt="calender2" />
                  <div className='font-Mluvka flex items-center gap-1 max-lg:text-[.8rem]'><dd className='m-0 text-[#8E93B5]'>To</dd><span>{to_month}</span></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <ul className='list bookings-table-page__tabs'>
          {BookingTab.map((item, index) => {
            const { label, color, active } = item
            return (
              <li
                key={index}
                className={`bookings-table-page__tab ${tabIndex === active ? "active" : ""}`}
                style={{ '--booking-tab-color': color }}
                onClick={() => handleBookintabUpdate(active)}
              >
                {label}
              </li>
            )
          })}
        </ul>

        <div className="users-table-page__tableWrap">
          <Table
            rowKey={(record) => record.id}
            loading={resget.isLoading}
            dataSource={Array.isArray(datas) ? datas : []}
            columns={columns}
            pagination={false}
            locale={{ emptyText: 'No bookings found' }}
            scroll={{ x: 1280 }}
          />
        </div>

        {(datas?.length !== 0 || !resget?.error) && (
          <div className='my-1'>
            <Pagination
              onChange={onChange}
              current={currentPage}
              total={resget.data?.pagination?.total}
              pageSize={12}
            />
          </div>
        )}
      </div>

      {modelStatus && <BookingModel permission={permission} submitss={() => handleForm()} data={modelData} modelStatus={modelStatus} modelStatusUpdate={setModelStatus} />}
    </section>
  )
}

export default Booking
