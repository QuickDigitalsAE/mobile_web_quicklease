import React, { useEffect, useState } from 'react'
import plus from '../dist/webImages/plus.svg'
import ReviewsModel from './ReviewsModel';
import ReviewsCard from './ReviewsCard';
import SkeletonReviewsCard from './SkeletonReviewsCard';
import useGet from '../customHooks/useGet';
import { Link } from 'react-router-dom';

const Reviews = ({permission}) => {
      const [resget, apiMethodGet] = useGet()
  const [datas, setDatas] = useState()
        useEffect(() => {
                apiMethodGet(`googleReview`);
            
        }, []);
        useEffect(() => {
            if (!resget.isLoading) {
                setDatas(resget?.data?.data)
            }
        }, [resget.data])
const check = (module, action) => permission?.[module]?.includes(action);
    return (
        <div className='ReviewsPage  '>
            <div className="ReviewsPageTop flex justify-between items-center">
                <h6 className='text-[1rem] mb-2 relative px-3 font-Mluvka'>Reviews</h6>
                {check("Reviews", "Reviews Add") &&<Link to={"/reviews/create"} className='bg-[#d9dcf8] py-3 px-6 rounded-full flex items-center gap-2 cursor-pointer'>
                    <img src={plus} alt="plus" />
                    <span className='font-MluvkaBold text-secondary capitalize'>Add new</span>
                </Link>}
            </div>
            <div className="ReviewsPageGrid mt-4 bg-[#EFF4FD] rounded-3xl p-6 grid grid-cols-3 gap-3 max-lg:grid-cols-1 max-lg:p-3">
            {resget.isLoading   ? 
                         Array.from({ length: 4 }).map((_, index) => (
                            <React.Fragment key={index}>
                            <SkeletonReviewsCard  />
                        </React.Fragment>
                         ))
                        :
                       Array.isArray(datas) && datas.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <ReviewsCard permission={permission} data={item}  alldata={datas} deleted={setDatas} />
                                </React.Fragment>
                            )
                        })}
            </div>
        </div>
    )
}

export default Reviews
