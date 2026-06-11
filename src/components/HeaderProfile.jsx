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
        apiMethod("logout", formdata)
    };
    useEffect(() => {
        if (res.data) {
            if (res.data.status === "false") {
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
                <Link className='dashboard-profileMenuLink' to={"/profile"}>Profile</Link>
            </Menu.Item>
            <Menu.Item key="1">
                <button className="dashboard-profileMenuLink" onClick={handleLogOut}>
                    Logout
                </button>
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            {/* <div className="profile__left dashboard-profileCard__text max-lg:hidden">
                <h2>{profileData?.name}</h2>
                <p>{profileData?.email}</p>
            </div> */}
            <div className="flex items-center gap-3">
                {profileData?.profile_image
                    ?
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                            <div className="profile__Box dashboard-profileCard">
                                <div className="profile__Box__img cursor-pointer">
                                    <img src={profileData?.profile_image ?? profileImg} className="w-12 h-12 rounded-full" alt="Profile" />
                                </div>
                            </div>
                        </a>
                    </Dropdown>
                    
                    :
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                            <span className="dashboard-home__avatar">
                                {profileData?.name?.charAt?.(0) ?? "A"}
                            </span>
                        </a>
                    </Dropdown>
                }
                <div>
                    <strong>{profileData?.name}</strong>
                    <p>{profileData?.email}</p>
                </div>
            </div >
            {/* <Dropdown overlay={menu} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                    <div className="profile__Box dashboard-profileCard">
                        <div className="profile__Box__img cursor-pointer">
                            <img src={profileData?.profile_image ?? profileImg} className="dashboard-profileCard__image" alt="Profile" />
                        </div>
                    </div>
                </a>
            </Dropdown> */}
        </>
    );
};

export default HeaderProfile;
