import React, { useEffect, useState } from 'react'
import plus from '../dist/webImages/plus.svg'
import SkeletonHeading from '../components/SkeletonHeading';
import UserCard from './UserCard';
import { Link } from 'react-router-dom';
import SkeletonUserCard from './SkeletonUserCard';
import useFetch from '../customHooks/useFetch';

const User = ({ permission }) => {
    const { loading, data } = useFetch(`allUsers`)
    const [datas, setDatas] = useState()

    useEffect(() => {
        if (data) {
            setDatas(data?.data);
        }
    }, [data]);
 const check = (module, action) => permission?.[module]?.includes(action);
    return (
        <div className='TeamPage pr-10 max-lg:pr-6'>
            {check("Users", "User Edit") && <div className="TeamPageTop flex justify-between items-center">
                {loading ? <SkeletonHeading /> : <h6 className='text-[1rem] mb-2 bookingSectionh relative px-3 font-Mluvka'>{datas ? <><span>{datas.length}</span> Users</> : ""}</h6>}
                <Link to={"/users/create"} className='bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer'>
                    <img src={plus} alt="plus" />
                    <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
                </Link>
            </div>}
            <div className="TeamPageGrid mt-4 bg-[#EFF4FD] rounded-3xl p-6 grid grid-cols-2 gap-3 max-lg:grid-cols-1 max-lg:p-2 ">
                {loading ?
                    Array.from({ length: 8 }).map((_, index) => (
                        <React.Fragment key={index}>
                            <SkeletonUserCard />
                        </React.Fragment>
                    ))
                    :
                    Array.isArray(datas) && datas.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                <UserCard permission={permission} data={item} alldata={datas} deleted={setDatas} />
                            </React.Fragment>
                        )
                    })}
            </div>
        </div>
    )
}

export default User
