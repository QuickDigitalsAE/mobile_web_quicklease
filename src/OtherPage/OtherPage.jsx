import React, { useState } from 'react'
import TermsAndConditions from './TermsAndConditions';
import PrivicyPolicy from './PrivicyPolicy';
import { OtherPageTab } from '../data/data';
import CreateTestimonials from '../WebContent/TestimonialsVideo/WebCreateTestimonials';

const OtherPage = () => {
    const TabList = {
        "Term & Conditions": <TermsAndConditions />,
        "Privicy Policy": <PrivicyPolicy />,
        "Testimonials Video": <CreateTestimonials />,
    };
    const [tabIndex, setTabIndex] = useState("Term & Conditions");
    const handleWebtabUpdate = (label) => {
        setTabIndex(label)
    }
  return (
    <div className='OtherPage  '>
         <ul className='list flex gap-6 mb-4'>
                        {
                            OtherPageTab.map((item, index) => {
                                const { label } = item
                                return (
                                    <li key={index} className={`font-MluvkaBold py-2 px-6 cursor-pointer bg-[#EFF4FD] rounded-full transition-all duration-300 ease-in-out border-2   ${tabIndex === label ? " active border-secondary" : "border-transparent"}`}  onClick={() => handleWebtabUpdate(label)}>{label}</li>
                                )
                            })
                        }
                    </ul>

                    <div className="OtherPageBody">
                    {TabList[tabIndex]}
            </div>
    </div>
  )
}

export default OtherPage