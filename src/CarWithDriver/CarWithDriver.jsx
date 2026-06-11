import React, { useContext, useEffect, useState } from 'react'
import { MainLanguageContext } from '../context/MainLanguageContext';
import useGet from '../customHooks/useGet';
import usePost from '../customHooks/usePost';
import CarWithDriverCard from './CarWithDriverCard';
import CarWithDriverSkeleton from './CarWithDriverSkeleton';

const CarWithDriver = () => {
    const { mainLanguage } = useContext(MainLanguageContext);
    const [datas, setDatas] = useState()
    const [resget, apiMethodGet] = useGet()
    const [currentPage, setCurrentPage] = useState(1)
    const [paginationn, setPaginationn] = useState(6);
    const [searchValue, setSearchValue] = useState("")
    const [res2, apiMethod2] = usePost()

    const onChange = (current, pageSize) => {
        setCurrentPage(current)
        let formdata = new FormData();
        formdata.append('search_query', searchValue);
        if ((searchValue).trim()) {
            apiMethod2(`catalogs/list/en/10/car_with_driver?page=1`, formdata);
        } else {
            apiMethodGet(`catalogs/list/en/10/car_with_driver?page=1`, formdata);
        }
    };

    useEffect(() => {
        if (mainLanguage) {
            setCurrentPage(1)
            apiMethodGet(`catalogs/list/en/10/car_with_driver?page=1`);
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
            apiMethod2(`catalogs/list/en/10/car_with_driver?page=1`, formdata);
        } else {
            apiMethodGet(`catalogs/list/en/10/car_with_driver?page=1`, formdata);
        }
      };
      const handleChange = debounce(executeApiCall, 1000)

    useEffect(() => {
        if (!resget.isLoading) {
            setDatas(resget?.data?.data)
            setPaginationn(resget.data?.pagination)
        }
    }, [resget.data])

    useEffect(() => {
        setDatas([])
        if (res2.data) {
            setDatas(res2?.data?.data);
            setPaginationn(res2?.data?.pagination)
        }
    }, [res2.data]);

return (
    <div className='bookingPage mb-6  '>
          <div className="TeamPageTop flex justify-between items-center">
                <h6 className='text-[1rem] mb-2 relative px-3 font-Mluvka capitalize'>Car With Driver</h6>
            </div>
        <div className="BookingGrid grid grid-cols-3 max-[1350px]:grid-cols-2 mt-5 gap-4 max-[1000px]:grid-cols-1">
        {resget.isLoading ? 
                      Array.from({ length: 8 }).map((_, index) => (
                          <React.Fragment key={index}>
                            <CarWithDriverSkeleton />
                    </React.Fragment>
                    ))
                    :
                    Array.isArray(datas) && datas.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                <CarWithDriverCard data={item} alldata={datas} deleted={setDatas} />
                            </React.Fragment>
                        )
                    })

            }
        </div>
    </div>
)
}

export default CarWithDriver
