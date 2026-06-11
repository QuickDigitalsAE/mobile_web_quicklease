import React, { useContext, useEffect, useState } from 'react'
import plus from '../dist/webImages/plus.svg'
import { Link } from 'react-router-dom';
import useGet from '../customHooks/useGet';
import { MainLanguageContext } from '../context/MainLanguageContext';
import usePost from '../customHooks/usePost';
import { Pagination } from 'antd';
import SkeletonProductsCard from './SkeletonProductsCard';
import ProductsCard from './ProductsCard';

const ProductsMain = ({permission}) => {
    const { mainLanguage } = useContext(MainLanguageContext);
    const [datas, setDatas] = useState()
    const [resget, apiMethodGet] = useGet()
    const [currentPage, setCurrentPage] = useState(1)
    const [paginationn, setPaginationn] = useState(12);
    const [searchValue, setSearchValue] = useState("")
    const [res2, apiMethod2] = usePost()
    const onChange = (current, pageSize) => {
        setCurrentPage(current)
        let formdata = new FormData();
        formdata.append('search_query', searchValue);
        if ((searchValue).trim()) {
            apiMethod2(`products/search_products_list/${mainLanguage}/12?page=${current}`, formdata);
        } else {
            apiMethodGet(`products/list/${mainLanguage}/12?page=${current}`, formdata);
        }
    };

    useEffect(() => {
        if (mainLanguage) {
            setCurrentPage(1)
            apiMethodGet(`products/list/${mainLanguage}/12?page=1`);
            
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
            apiMethod2(`products/search_products_list/${mainLanguage}/12?page=${currentPage}`, formdata);
        } else {
            apiMethodGet(`products/list/${mainLanguage}/12?page=${currentPage}`, formdata);
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

 const check = (module, action) => permission?.[module]?.includes(action);
    return (
        <div className='NewsPage  '>
            <div className="TeamPageTop flex justify-between items-center">
                <h6 className='text-[1rem] mb-2 relative font-Mluvka capitalize'>Products and updates</h6>
                <div className='flex gap-1'>
                    <div className="inputBox w-[16rem] max-lg:hidden">
                        <input type="text" onChange={handleChange} className='w-full border h-[2.8rem] rounded-full px-4 border-[#ddd] outline-none' placeholder='Search' />
                    </div>
                   {check("Products", "Products Add") && <Link to={"/products/create"} className='bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer'>
                        <img src={plus} alt="plus" />
                        <span className='font-MluvkaBold text-secondary capitalize'>Add Products</span>
                    </Link>}
                </div>
            </div>
            <div className="NewsPageGrid mt-4 bg-[#EFF4FD] rounded-3xl p-6 grid grid-cols-3 gap-3 max-lg:grid-cols-1 max-lg:p-3">
            {resget.isLoading ? 
                         Array.from({ length: 12 }).map((_, index) => (
                            <React.Fragment key={index}>
                            <SkeletonProductsCard  />
                        </React.Fragment>
                         ))
                        :
                        Array.isArray(datas) && datas.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <ProductsCard permission={permission} data={item} alldata={datas} deleted={setDatas}  />
                                </React.Fragment>
                            )
                        })}
            </div>
            <div className='my-4'>
                <Pagination
                    onChange={onChange}
                    defaultCurrent={currentPage}
                    total={paginationn?.total}
                    pageSize={12}
                    showSizeChanger={true}
                />
            </div>
        </div>
    )
}

export default ProductsMain
