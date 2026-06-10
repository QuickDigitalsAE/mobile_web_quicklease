import React from 'react'
import { Link } from 'react-router-dom'
import back from "../dist/webImages/back.svg";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonCreateEdits = ({heading}) => {
      return (
        <SkeletonTheme baseColor="#fff" highlightColor="#f0f0f0">
          <div className='createTeam pr-10 max-lg:pr-6'>
          <Link to={"/role"} className="back flex items-center mb-10 gap-2">
            <img src={back} className='w-[2rem]' alt="" />
            <span className='text-[1.4rem] font-MluvkaBold'>{heading}</span>
            </Link>
    
            <div className='bg-[#EFF4FD] p-6 rounded-3xl mb-8 max-lg:p-2'>
              <div className={`RoleCreate transition-all duration-300 bg-white rounded-xl`}>
                <div className="overflow-auto modelBox">
                  <div className="TeamBox p-5 rounded-xl">
                    <div className="form mt-7">
                      <Skeleton width="100%" height={44} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
    
            <div className='bg-[#EFF4FD] roleMain p-6 rounded-3xl mb-3 max-lg:p-2'>
              <div className="btn w-fit bg-primary px-7 rounded-full flex items-center gap-3 py-3 text-white cursor-pointer ml-auto">
                <Skeleton width={20} height={20} />
                <Skeleton width={80} height={20} />
              </div>
    
              <div className="roleMainM grid grid-cols-3 gap-4 mt-4">
                {[...Array(3)].map((_, index) => (
                  <div
                    className="roleMainMBox py-5 px-5 bg-[#DEE5F2] rounded-3xl"
                    key={index}
                  >
                    <div className="roleMainMBoxt flex justify-between items-center">
                      <div className="roleMainMBoxl">
                        <Skeleton width={60} height={16} />
                      </div>
                      <div className="roleMainMBoxr">
                        <Skeleton width={24} height={24} />
                      </div>
                    </div>
    
                    <div className="roleMainMBoxb">
                      <ul className="list">
                        {[...Array(3)].map((_, i) => (
                          <li
                            className="bg-white rounded-2xl py-4 px-6 flex items-center gap-2 my-3"
                            key={i}
                          >
                            <Skeleton width={20} height={20} />
                            <Skeleton width={100} height={16} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SkeletonTheme>
      );
    };

export default SkeletonCreateEdits
