import React from 'react'
import calendar from "../dist/webImages/calendar.svg"
import clock from "../dist/webImages/wall-clock.svg"
import phonecall from "../dist/webImages/phone-call.svg"
import noimg from '../dist/webImages/no_image.jpg'
import dayjs from 'dayjs';
import { BookingTab } from '../data/data'
import currency from '../dist/webImages/currency.webp'

const truncateText = (text, maxLength) => {
    if (text) {
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0, maxLength) + '...';
    }
    return text;
};
const BookingsCard = ({ data, modelDataUpdate, modelStatusUpdate }) => {
    const { id, order_number,transaction_id, first_name, booking_status, email, client_name, client_email, pickup_date_time, return_date_time, grand_total, consultant_designation, card_payment, payment_type, payment_status } = data
    const handleOpenModel = () => {
        modelStatusUpdate(true)
        modelDataUpdate(data)
    }

    const pickup_date = dayjs(pickup_date_time).format('YYYY-MM-DD HH:mm');
    const return_date = dayjs(return_date_time).format('YYYY-MM-DDTHH:mm');
    const maxLength = 50;
    const maxLength2 = 15;
    const truncatedText2 = truncateText(client_name, maxLength2);

    return (
        <div className="bookingBox cursor-pointer bg-[#EFF4FD] p-5 rounded-xl" onClick={handleOpenModel}>
            <ul className='list'>
                <li className='flex items-center justify-between gap-2'>
                    <div className='h2 text-[1.3rem] font-Mluvka flex items-center gap-1 leading-[1]'> <span className='bg-primary px-3 py-2 leading-3 text-white text-[.8rem] rounded-xl'>#{order_number}</span> {truncatedText2}</div>
                    <div className='flex gap-2'>
                        <span className='p-2 text-white rounded-[.5rem] bg-[#B7903B] text-[.8rem]'>{booking_status}</span>
                        <span className='p-2 text-white rounded-[.5rem] bg-primary text-[.8rem]'>{payment_status}</span>
                    </div>

                </li>
            </ul>
            <div className="h3 mb-3">{client_email}</div>
            {/* <div className='flex items-center gap-1'><img src={Coffee} alt="Coffee" /><span className='font-Mluvka text-[.8rem]'>{beverage}</span></div> */}

            <div className='calender  flex items-center gap-2'>
                <span className='font-MluvkaBold text-[.9rem]'>transaction id: {transaction_id}</span>
            </div>
            <div className='calender my-4 flex items-center gap-2'>
                <img src={clock} className='w-[1.5rem]' alt="calender" />
                <span className='font-MluvkaBold text-[.9rem]'>{pickup_date} to {return_date}</span>
            </div>
            <div className='calender  flex items-center gap-2'>
                <span className='font-MluvkaBold text-[.9rem]'>{first_name}</span>
            </div>
            
            <div className='calender flex items-center gap-2'>
                <span className='font-MluvkaBold text-[.9rem]'>{email}</span>
            </div>
            <div className='calender flex items-center gap-2'>
                <span className='font-MluvkaBold text-[.9rem]'>Payment Type:</span>
                <span className='font-MluvkaBold text-[.9rem]'>{payment_type}</span>
            </div>
            <div className='calender flex items-center gap-2'>
                <span className='font-MluvkaBold text-[.9rem]'>Card Payment:</span>
                <span className='font-MluvkaBold text-[.9rem]'>{card_payment}</span>
            </div>
            <div className='calender flex items-center gap-2'>
                <span className='font-MluvkaBold text-[.9rem]'>Price:</span>
                <span className='font-MluvkaBold text-[.9rem]'><div className='flex items-center'><img src={currency} className='w-[15px] mr-[.2rem]' alt='currency' />{grand_total} </div></span>
            </div>
        </div>
    )
}

export default BookingsCard
