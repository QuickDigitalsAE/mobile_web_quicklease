import React, { useContext, useEffect, useState } from 'react'
import img1 from "../dist/webImages/dropdown.svg"
import HeaderProfile from './HeaderProfile'
import { FaBars } from 'react-icons/fa'
import { MainMenuActiveContext } from '../context/MainMenuActiveContext'
import { MainLanguageContext } from '../context/MainLanguageContext'

const Header = () => {
  const { handlelanguage,mainLanguage } = useContext(MainLanguageContext);
    const { handleGetEditValue } = useContext(MainMenuActiveContext);


  return (
    <div className='header py-6 pr-10 flex justify-between items-center max-lg:pr-6'>
      <div className="header__left max-lg:flex max-lg:items-center">
        <div className='hidden max-lg:block' onClick={() => handleGetEditValue(true)}>
        <FaBars className='text-[1.4rem] mr-3 '/>
        </div>
        {/* <div className='font-Mluvka text-[1.938rem] max-lg:text-[1.1rem]'><span className='font-MluvkaBold text-secondary'>38</span> Bookings</div> */}
      </div>
      <div className="header__right flex items-center gap-4">
        <div className="inputBox   relative languages w-[10rem] max-lg:w-[7rem]">
        <img src={img1} alt="dropdown.svg" />
        <select value={mainLanguage} onChange={(e) => handlelanguage(e.target.value)} className='w-full bg-transparent border border-[#ddd]  h-[2.8rem] px-4 rounded-3xl  outline-0 capitalize appearance-none max-lg:text-[.9rem]' name="" id="">
                <option value="en">English</option>
                <option value="ar">Arabic</option>
                {/* <option value="ru">Russian</option>
                <option value="ch">Chinese</option> */}
            </select>
        </div>
        <div className='profile flex items-center gap-4'>
          <HeaderProfile />
        </div>
      </div>
      {/* close header__right  */}
    </div>
  )
}

export default Header
