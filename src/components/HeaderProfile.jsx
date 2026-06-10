import React, { useContext, useEffect } from 'react';
import { Dropdown, Menu } from 'antd';
import { removeTokenSession } from '../utils/common';
import { Link, useNavigate } from 'react-router-dom';
import config from "../services/config.json";
import usePost from '../customHooks/usePost';
import { toast } from 'react-toastify';
import { MainProfileContext } from '../context/MainProfileContext';
import profileImg from '../dist/webImages/profile.png'

const HeaderProfile = () => {
    const { profileData } = useContext(MainProfileContext);
    const navigate = useNavigate();
    const [res, apiMethod] = usePost()
    const handleLogOut = () => {
        removeTokenSession();
        let formdata = new FormData();
        apiMethod("logout",formdata)
    };
    useEffect(() => {
        if(res.data) {
          if(res.data.status === "false") {
            toast.error(res.data.message);
          }
          else {
            toast.success(res.data.message);
            navigate(`/${config.demo}login`);
          }
        }
      }, [res.data])

    const menu = (
        <Menu>
            <Menu.Item key="2">
               <Link className='px-6 font-Mluvka' to={"/profile"}>Profile</Link>
            </Menu.Item>
            <Menu.Item key="1">
                <button className="px-6 font-Mluvka" onClick={handleLogOut}>
                    Logout
                </button>
            </Menu.Item>
        </Menu>
    );

    return (
        <>
          <div className="profile__left max-lg:hidden">
                <h2 className='leading-[1] text-[1.2rem] font-MluvkaBold text-right'>{profileData?.name}</h2>
                <p className='m-0 text-right text-secondary text-[.6rem] font-Mluvka'>{profileData?.email}</p>
            </div>
        <Dropdown overlay={menu} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
                <div className="profile__Box relative">
                    <div className="profile__Box__img cursor-pointer">
                        <img src={profileData?.profile_image ?? profileImg} className="w-[4rem] h-[4rem] max-lg:w-[3rem] max-lg:h-[3rem] rounded-full p-2 object-cover border border-[#CFD5E2]" alt="Profile" />
                    </div>
                </div>
            </a>
        </Dropdown>
                            </>
    );
};

export default HeaderProfile;
