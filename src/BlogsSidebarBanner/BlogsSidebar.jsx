import React, { useContext, useEffect, useState } from 'react'
import plus from '../dist/webImages/plus.svg'
import { Link } from 'react-router-dom';
import useGet from '../customHooks/useGet';
import { MainLanguageContext } from '../context/MainLanguageContext';
import usePost from '../customHooks/usePost';
import { Pagination } from 'antd';
import SkeletonBlogsSidebarCard from './SkeletonBlogsSidebarCard';
import BlogsSidebarCard from './BlogsSidebarCard';

const BlogsSidebar = ({permission}) => {
    const { mainLanguage } = useContext(MainLanguageContext);
    const [datas, setDatas] = useState()
    const [resget, apiMethodGet] = useGet()
    const [res2, apiMethod2] = usePost()

    useEffect(() => {
        if (mainLanguage) {
            apiMethodGet(`sidebarBanner/${mainLanguage}`);
            
        }
    }, [mainLanguage]);

    useEffect(() => {
        if (!resget.isLoading) {
            setDatas(resget?.data?.data)
        }

    }, [resget.data])

const check = (module, action) => permission?.[module]?.includes(action);
    return (
        <div className='NewsPage  '>
            <div className="TeamPageTop flex justify-between items-center">
                <h6 className='text-[1rem] mb-2 relative px-3 font-Mluvka capitalize'>Blogs sidebar and updates</h6>
                {check("SidebarBanners", "SidebarBanners Add") &&<div className='flex gap-1'>
                    <Link to={"/blogs/sidebar/create"} className='bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer'>
                        <img src={plus} alt="plus" />
                        <span className='font-MluvkaBold text-secondary capitalize'>Add blogs sidebar</span>
                    </Link>
                </div>}
            </div>
            <div className="NewsPageGrid mt-4 bg-[#EFF4FD] rounded-3xl p-6 grid grid-cols-2 gap-3 max-lg:grid-cols-1 max-lg:p-3">
            {resget.isLoading ? 
                         Array.from({ length: 6 }).map((_, index) => (
                            <React.Fragment key={index}>
                            <SkeletonBlogsSidebarCard  />
                        </React.Fragment>
                         ))
                        :
                        Array.isArray(datas) && datas.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <BlogsSidebarCard permission={permission} data={item} alldata={datas} deleted={setDatas}  />
                                </React.Fragment>
                            )
                        })}
            </div>
        </div>
    )
}

export default BlogsSidebar
