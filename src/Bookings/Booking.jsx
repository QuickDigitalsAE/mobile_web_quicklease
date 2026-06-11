import React, { useContext, useEffect, useState } from 'react'
import dayjs from 'dayjs';
import BookingsCard from './BookingsCard'
import { BookingTab } from '../data/data';
import BookingModel from './BookingModel';
import calender2 from '../dist/webImages/calendar2.svg';
import SkeletonBookingsCard from './SkeletonBookingsCard';
import SkeletonBookingDate from './SkeletonBookingDate';
import usePost from '../customHooks/usePost';
import { MainLanguageContext } from '../context/MainLanguageContext';
import { Pagination } from 'antd';

const Booking = ({permission}) => {
const { mainLanguage } = useContext(MainLanguageContext); 
const [loading, setLoading] = useState(true)
const [tabIndex, setTabIndex] = useState("pending");
const [datas, setDatas] = useState("")
const [resget, apiMethodGet] = usePost()
const [currentPage, setCurrentPage] = useState(1);
const defaultFromTo = dayjs().subtract(1, 'month').format('YYYY-MM-DD');
const defaultDateTo = dayjs().add(1, 'month').format('YYYY-MM-DD');
const [searchValue, setSearchValue] = useState("")
useEffect(() => {
    if (mainLanguage) {
        setCurrentPage(1)
        setLoading(true);
        let formdata = new FormData();
        if(tabIndex) {
            formdata.append(`booking_status`,tabIndex)
        }
        formdata.append(`from_month`,defaultFromTo)
        formdata.append(`to_month`,defaultDateTo)
        apiMethodGet(`bookings/bookingList/${mainLanguage}/12?page=1`,formdata);
    }
}, [mainLanguage]);

const onChange = (current, pageSize) => {
    setCurrentPage(current)
    let formdata = new FormData();
    formdata.append(`from_month`,defaultFromTo)
    formdata.append(`to_month`,defaultDateTo)
    formdata.append('search_value', searchValue);
    if(tabIndex) {
        formdata.append(`booking_status`,tabIndex)
    }
    if ((searchValue).trim()) {
        apiMethodGet(`bookings/search_bookingList/${mainLanguage}/12?page=${current}`, formdata);
    } else {
        apiMethodGet(`bookings/bookingList/${mainLanguage}/12?page=${current}`,formdata);
    }
  };

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
    formdata.append('from_month', defaultFromTo);
    formdata.append('to_month', defaultDateTo);
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

const [modelData, setModelData] = useState(null);
const [modelStatus, setModelStatus] = useState(false);

const [dateRange, setDateRange] = useState({
    "to_month": defaultDateTo,
    "from_month": defaultFromTo,
});
const {to_month,from_month} = dateRange;
const handleBookintabUpdate = (item) => {
    setCurrentPage(1)
    if(item !== tabIndex) {
        let formdata = new FormData();
        formdata.append(`from_month`,defaultFromTo)
        formdata.append(`to_month`,to_month)
        if(item) {
            formdata.append(`booking_status`,item)
        }
        formdata.append('search_value', searchValue);
        if ((searchValue).trim()) {
            apiMethodGet(`bookings/search_bookingList/${mainLanguage}/12?page=1`, formdata);
        } else {
            apiMethodGet(`bookings/bookingList/${mainLanguage}/12?page=1`,formdata);
        }
    }
    setTabIndex(item)
}
const handleDateUpdate = (date,update) => {
    let newDateRange = { ...dateRange, [update]: date };

    let formdata = new FormData();
    formdata.append(`from_month`,newDateRange.from_month)
    formdata.append(`to_month`,newDateRange.to_month)
    if(tabIndex) {
        formdata.append(`booking_status`,tabIndex)
    }
    formdata.append('search_value', searchValue);
    if ((searchValue).trim()) {
        apiMethodGet(`bookings/search_bookingList/${mainLanguage}/12?page=${currentPage}`, formdata);
    } else {
        apiMethodGet(`bookings/bookingList/${mainLanguage}/12?page=${currentPage}`,formdata);
    }
    setDateRange(newDateRange);
}

const handleForm = () => {
    let formdata = new FormData();
    if(tabIndex) {
        formdata.append(`booking_status`,tabIndex)
    }
    formdata.append(`from_month`,defaultFromTo)
    formdata.append(`to_month`,defaultDateTo)
    apiMethodGet(`bookings/bookingList/${mainLanguage}/12?page=1`,formdata);
}

return (
    <div className='bookingPage mb-6  '>
        <div className="bookingPagetop">
        <div className="bookingPage-Right ml-auto justify-end mb-3 items-center flex gap-3">
            <div className="inputBox w-[16rem] max-lg:hidden">
        <input type="text" onChange={handleChange} className='w-full border h-[2.8rem] rounded-full px-4 border-[#ddd] outline-none' placeholder='Search' />
    </div>
              
            {
                        resget.isLoading ?
                        <SkeletonBookingDate />
                        :
                        <>
               <div className="bookingPage-RightBox relative">
                    <input  type="date" max={to_month}  className='mmonth absolute inset-0 opacity-0' value={from_month} onChange={(e) => handleDateUpdate(e.target.value,"from_month")} />
                    <div className='inputBox bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center'>
                        <img src={calender2} alt="calender2" />
                        <div className='font-Mluvka flex items-center gap-1 max-lg:text-[.8rem]'><dd className='m-0 text-[#8E93B5]'>From</dd><span>{from_month}</span></div>
                    </div>
                </div> 
                <div className="bookingPage-RightBox relative">
                    <input  type="date" min={from_month} className='mmonth absolute inset-0 opacity-0' value={to_month} onChange={(e) => handleDateUpdate(e.target.value,"to_month")} />
                    <div className='inputBox bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center'>
                        <img src={calender2} alt="calender2" />
                        <div className='font-Mluvka flex items-center gap-1 max-lg:text-[.8rem]'><dd className='m-0 text-[#8E93B5]'>To</dd><span>{to_month}</span></div>
                    </div>
                </div>
                        </>
                        
                    }

            </div>
            <div className="bookingPage-left flex items-center">

                <ul className='list flex gap-6 mb-4 max-lg:flex-wrap'>
                    {
                        BookingTab.map((item, index) => {
                            const { label, color,active } = item
                            return (
                                <li key={index} className={`font-MluvkaBold border-l-2 leading-[1] pl-2 cursor-pointer transition-all duration-300 ease-in-out   ${tabIndex === active ? "text-[#000] active" : "text-[#999]"}`} style={{ borderColor: color }} onClick={() => handleBookintabUpdate(active)}>{label}</li>
                            )
                        })
                    }
                </ul>
            </div>
           
        </div>
        <div className="BookingGrid grid grid-cols-4 max-[1400px]:grid-cols-3 gap-4 max-lg:grid-cols-1">
        {(resget.isLoading) ? 
                      Array.from({ length: 8 }).map((_, index) => (
                          <React.Fragment key={index}>
                            <SkeletonBookingsCard />
                    </React.Fragment>
                    ))
                    :
                    (datas?.length == 0 || resget?.error) ?  <h2>No Data</h2> :
                    Array.isArray(datas) && datas.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                <BookingsCard  data={item} modelDataUpdate={setModelData} modelStatusUpdate={setModelStatus} />
                            </React.Fragment>
                        )
                    })

            }
            {modelStatus && <BookingModel permission={permission} submitss={() => handleForm()} data={modelData} modelStatus={modelStatus} modelStatusUpdate={setModelStatus} />}
        </div>
       { (datas?.length !== 0 || !resget?.error) && <div className='my-4'>
            <Pagination
                onChange={onChange}
                current={currentPage}
                total={resget.data?.pagination?.total}
                pageSize={12}
            />
        </div>}

    </div>
)
}

export default Booking
