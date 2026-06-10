import React, { useState } from 'react'
import Terms from './Terms';
import Boarding from './Boarding';
import { appContentTab } from '../data/data';
import Privacy from './Privacy';

const   AppContent = () => {
  const TabList = {
    "On Boarding": <Boarding />,
    "Terms and conditions": <Terms />,
    "Privacy": <Privacy />,
};
const [tabIndex, setTabIndex] = useState("On Boarding");
const handleWebtabUpdate = (label) => {
    setTabIndex(label)
}
  return (
    <div className='webContentPage'>
    <div className="bookingPagetop flex justify-between items-center mb-6">
           <div className="bookingPage-left flex items-center">

               <ul className='list flex gap-6 mb-4 flex-wrap'>
                   {
                       appContentTab.map((item, index) => {
                           const { label } = item
                           return (
                               <li key={index} className={`font-MluvkaBold border-l-2 border-secondary leading-[1] pl-2 cursor-pointer transition-all duration-300 ease-in-out   ${tabIndex === label ? "text-[#000] active" : "text-[#999]"}`}  onClick={() => handleWebtabUpdate(label)}>{label}</li>
                           )
                       })
                   }
               </ul>
           </div>
       </div>
       <div className="bookingPageBody">
               {TabList[tabIndex]}
       </div>
</div>
  )
}

export default AppContent