import React, { useEffect, useState } from 'react'
import DepartmentsCard from './DepartmentsCard';
import plus from '../dist/webImages/plus.svg'
import SkeletonHeading from '../components/SkeletonHeading';
import SkeletonDepartmentsCard from './SkeletonDepartmentsCard';
import { Link } from 'react-router-dom';

const Departments = () => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }, []);
    const dummy = ["1", "2", "3", "4", "3", "2", "4", "1"];
    return (
        <div className='DepartmentsPage  '>
            <div className="DepartmentsPageTop flex justify-between items-center">
            {loading ? <SkeletonHeading /> : <h6 className='text-[1rem] mb-2 relative px-3 font-Mluvka'><span>26</span> Departments</h6>}
                
                <Link to={"/departments/create"} className='bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer' >
                    <img src={plus} alt="plus" />
                    <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
                </Link>
            </div>
            <div className="DepartmentsPageGrid mt-4 bg-[#EFF4FD] rounded-3xl p-6 grid grid-cols-3 gap-3 max-lg:grid-cols-1 max-lg:p-3">
            {loading ? 
                         Array.from({ length: 8 }).map((_, index) => (
                            <React.Fragment key={index}>
                            <SkeletonDepartmentsCard  />
                        </React.Fragment>
                         ))
                        :
                        dummy.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <DepartmentsCard data={item}  page={"departments"} />
                                </React.Fragment>
                            )
                        })}
            </div>
        </div>
    )
}

export default Departments
