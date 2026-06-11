import React, { useContext, useEffect, useState } from 'react'
import close from "../dist/webImages/close.svg"
import dayjs from 'dayjs';
import usePost from '../customHooks/usePost'
import { toast } from 'react-toastify'
import { MainLanguageContext } from '../context/MainLanguageContext'
import swal from "sweetalert";
import { DatePicker, Select } from 'antd'
import { BookingTab } from '../data/data'
import currency from '../dist/webImages/currency.webp'
const { Option } = Select;

const BookingModel = ({ data, modelStatus, modelStatusUpdate, submitss, permission }) => {
  const { id, order_number, first_name, booking_status, email, client_name, client_email, pickup_date_time, return_date_time, total_price, coverages_extras, card_payment, payment_type, total_days, booking_page_slug, product_title, payment_status } = data
  const pickup_date = dayjs(pickup_date_time).format('YYYY-MM-DD HH:mm');
  const return_date = dayjs(return_date_time).format('YYYY-MM-DDTHH:mm');
  const { mainLanguage } = useContext(MainLanguageContext);

  const [statusUpdate, setStatusUpdate] = useState({
    "comment": "",
    "status": booking_status,
    "payment_status": payment_status,
  })

  const handleCloseModel = () => {
    modelStatusUpdate(false)
  }

  const [res, apiMethod] = usePost()
  const requireFeild = [
    "status",
    "comment",
    "payment_status",
  ];
  const handleComplete = () => {
    let formdata = new FormData();
    let requireFeildSwal = {
      status: "Change Status",
      comment: "Comment",
      payment_status: "Payment Status",
    };

    let checkerRequried = [];
    for (const item in statusUpdate) {
      if (requireFeild.includes(item) && !statusUpdate[item]) {
        checkerRequried.push(requireFeildSwal[item]);
      }
    }
    if (checkerRequried.length > 0) {
      swal({
        title: "Required Fields are empty! Please fill and try again",
        text: checkerRequried.join(","),
        icon: "error",
        dangerMode: true,
      });
    }
    else {
      formdata.append("booking_status", statusUpdate.status ?? "");
      formdata.append("description", statusUpdate.comment ?? "");
      formdata.append("payment_status", statusUpdate.payment_status ?? "");
      apiMethod(`bookings/bookingStatus/${id}/${mainLanguage}`, formdata)
    }

  }

  useEffect(() => {
    if (res.data) {
      console.log(res?.data)
      const { status, message } = res?.data
      if (status === "false") {
        toast.error(message);
      }
      else {
        submitss()
        modelStatusUpdate(false)
        toast.success(message);
      }
    }
  }, [res.data])

  const check = (module, action) => permission?.[module]?.includes(action);
  return (
    <>
      <div onClick={handleCloseModel} className={`backgroundFixed w-full h-screen  fixed top-[50%] left-0 right-0 transform translate-y-[-50%]  bg-black opacity-90 z-10 ${modelStatus ? "block" : "hidden"}`}></div>
      <div className={`bookingModel p-5 transition-all duration-300  bg-white rounded-xl fixed z-20  left-0 right-0 mx-auto transform translate-y-[-50%] w-[80%] ${modelStatus ? "opacity-100 top-[50%] active" : "top-[40rem] opacity-0"}`}>
        <div className='closeButton cursor-pointer absolute bg-[#E0EBFF] w-[2.938rem] h-[2.938rem] top-0 right-[-4rem] grid place-items-center rounded-[.7rem] max-lg:right-[-1rem] max-lg:top-[-2rem] ' onClick={handleCloseModel}>
          <img src={close} alt="" />
        </div>
        <div className="h4 text-[2rem] text-primary mb-3 font-[700]">Booking Model</div>
        <div className='max-h-[250px] overflow-x-hidden pr-7 overflow-auto modelBox'>
          <div className='mb-2'><span className='font-bold'>Referrer:</span>{data?.booking_page_slug}</div>
          <ul className='grid grid-cols-4 gap-4'>
            <li><span className='font-bold'>Transaction Id: </span>{data?.transaction_id}</li>
            <li><span className='font-bold'>Product Title: </span>{data?.product_title}</li>
            <li><span className='font-bold'>First Name: </span>{data?.first_name}</li>
            <li><span className='font-bold'>Last Name: </span>{data?.last_name}</li>
            <li><span className='font-bold'>Email: </span>{data?.email}</li>
            <li><span className='font-bold'>Phone Number: </span>{data?.phone_number}</li>

            <li><span className='font-bold'>Pickup City: </span>{data?.pickup_city}</li>
            <li><span className='font-bold'>Pickup Address: </span>{data?.pickup_address}</li>
            <li><span className='font-bold'>Pickup DateTime: </span>{data?.pickup_date_time}</li>
            <li><span className='font-bold'>Valid Driving License: </span>{data?.valid_driving_license}</li>
            <li><span className='font-bold'>Valid Passport: </span>{data?.valid_passport}</li>
            <li><span className='font-bold'>Total Days: </span>{data?.total_days}</li>
            <li><span className='font-bold'>Promo Code: </span>{data?.promo_code}</li>
            <li><span className='font-bold'>Promo Discount: </span>{data?.promo_discount}</li>
            <li><span className='font-bold'>Pay Now Discount: </span>{data?.pay_now_discount}</li>
            <li><span className='font-bold'>Car Monthly Price: </span>{data?.car_monthly_price}</li>
            <li><span className='font-bold'>Deposit Type: </span>{data?.deposit_type}</li>
            <li><span className='font-bold'>Deposit Selected Tab: </span>{data?.deposit_selected_tab}</li>
            <li><span className='font-bold'>Deposit Price: </span>{data?.deposit_price}</li>
            <li><span className='font-bold'>Return City: </span>{data?.return_city}</li>
            <li><span className='font-bold'>Return Address: </span>{data?.return_address}</li>
            <li><span className='font-bold'>Return DateTime: </span>{data?.return_date_time}</li>
            <li><span className='font-bold'>Payment Type: </span>{data?.payment_type}</li>
            <li><span className='font-bold'>Payment Status: </span>{data?.payment_status}</li>
            <li><span className='font-bold'>Payment Process: </span>{data?.booking_status}</li>
            <li><span className='font-bold'>Partial Percentage: </span>{data?.partial_percentage}</li>
          </ul>

          <h3 className="text-lg font-semibold mt-6">Extras</h3>
          <div className="mt-2">
            <table className="min-w-[800px] w-full ">
              <thead>
                <tr >
                  <th className="p-3 border">Items Detail</th>
                  <th className="p-3 border">Unit Price</th>
                  <th className="p-3 border">days</th>
                  <th className="p-3 border">Amount </th>
                  <th className="p-3 border">VAT Amount</th>
                  <th className="p-3 border">Final Amount</th>
                </tr>
              </thead>
              <tbody>

                {Array.isArray(coverages_extras) && coverages_extras.map((item) => {
                  const { id, title, price, total, sum_price, selected_locations, days_count, vat } = item;
                  return (
                    <tr className="w-fit" key={id}>
                      <td className="py-2 px-3 w-fit border border-[#ddd]">{selected_locations?.title ? `${title}: ${selected_locations.title}${selected_locations.custom_address ? ` - ${selected_locations.custom_address}` : ''}` : title}</td>
                      <td className="py-2 px-3 w-fit border border-[#ddd]">{selected_locations?.title ? selected_locations?.price : price}</td>
                      <td className="py-2 px-3 w-fit border border-[#ddd]">{days_count ? days_count : "-"}</td>
                      <td className="py-2 px-3 w-fit border border-[#ddd]">{selected_locations?.title ? selected_locations?.sum_price : sum_price}</td>
                      <td className="py-2 px-3 w-fit border border-[#ddd]">{selected_locations?.title ? selected_locations?.vat : vat}</td>
                      <td className="py-2 px-3 w-fit border border-[#ddd]">{selected_locations?.title ? selected_locations?.total : total}</td>
                    </tr>
                  );
                })}

                <tr>
                  <td colSpan="4" className="py-2 px-3 w-fit border border-[#ddd]"></td>
                  <td className="py-2 px-3 w-fit border border-[#ddd]">{data.deposit_type === "deposit" ?
                    "Security Deposit" : "Security Deposit waiver"} </td>
                  <td className="py-2 px-3 w-fit border border-[#ddd]">{data.deposit_price} {((data.deposit_type === "deposit") && (data.deposit_selected_tab === "deposit_pay_later")) ?
                    ("/ Pay Later") : ""}</td>
                </tr>
                <tr>
                  <td colSpan="4" className="py-2 px-3 w-fit border border-[#ddd]"></td>
                  <td className="py-2 px-3 w-fit border border-[#ddd]">Total Amount</td>
                  <td className="py-2 px-3 w-fit border border-[#ddd]">{data.summary_total_amount}</td>
                </tr>
                <tr>
                  <td colSpan="4" className="py-2 px-3 w-fit border border-[#ddd]"></td>
                  <td className="py-2 px-3 w-fit border border-[#ddd]">Total Vat</td>
                  <td className="py-2 px-3 w-fit border border-[#ddd]">{data.summary_total_vat}</td>
                </tr>
                <tr>
                  <td colSpan="4" className="py-2 px-3 w-fit border border-[#ddd]"></td>
                  <td className="py-2 px-3 w-fit border border-[#ddd]">Total Discount incl Vat</td>
                  <td className="py-2 px-3 w-fit border border-[#ddd]">{data.total_discount_incl_vat}</td>
                </tr>

                <tr className="w-fit payment-summary__total ">
                  <td colSpan="4" className="py-2 px-3 w-fit border border-[#ddd]"></td>
                  <td className=" w-fit font-medium text-white px-4 bg-primary ">Grand Total</td>
                  <td className=" w-fit font-bold text-[1rem] bg-primary text-white py-2 px-3 "><div className='flex items-center'><img src={currency} className='w-[15px] mr-[.2rem]' alt='currency' />{data.grand_total}</div></td>
                </tr>
                {Number(data.partial_amount) ? <tr className="w-fit payment-summary__total ">
                  <td colSpan="4" className="py-2 px-3 w-fit border border-[#ddd]"></td>
                  <td className="w-fit border-t font-medium text-white px-4 bg-primary  border-[#ddd]">Partial ({data.partial_percentage}%)</td>
                  <td className="w-fit border-t font-medium text-white px-4 py-2 bg-primary"><div className='flex items-center'><img src={currency} className='w-[15px] mr-[.2rem]' alt='currency' />{data.partial_amount} </div></td>
                </tr> : ""}
                {Number(data.partial_amount) ? <tr className="w-fit payment-summary__total ">
                  <td colSpan="4" className="py-2 px-3 w-fit border border-[#ddd]"></td>
                  <td className="py-2 px-3 w-fit border border-[#ddd]">Balance to be paid</td>
                  <td className="py-2 px-3 w-fit border border-[#ddd]"><div className='flex items-center'><img src={currency} className='w-[15px] mr-[.2rem]' alt='currency' />{Number(data.grand_total) - Number(data.partial_amount) } </div></td>
                </tr> : ""}
              </tbody>
            </table>
          </div>
        </div>

        <div className='mt-3'>
          <div className='grid mb-3 gap-3 grid-cols-2'>
            <div>
              <label className='' htmlFor="">Change State</label>
              <select value={statusUpdate.status} onChange={(e) => setStatusUpdate({ ...statusUpdate, "status": e.target.value })} className='w-full border border-[#ddd] py-2 px-2' name="" id="">
                {
                  BookingTab.map((item, index) => {
                    const { label, color, active } = item
                    return (
                      <option key={index} value={label}>{label}</option>
                    )
                  })
                }

              </select>
            </div>
            <div>
              <label className='' htmlFor="">Payment Status</label>
              <select value={statusUpdate.payment_status} onChange={(e) => setStatusUpdate({ ...statusUpdate, "payment_status": e.target.value })} className='w-full border border-[#ddd] py-2 px-2' name="" id="">

                <option value="unpaid">unpaid</option>
                <option value="paid">paid</option>

              </select>
            </div>
          </div>
          <label htmlFor="">Comment</label>
          <textarea onChange={(e) => setStatusUpdate({ ...statusUpdate, "comment": e.target.value })} className='w-full border border-[#ddd] py-2 px-2' name="" id="" placeholder='comment'></textarea>
        </div>

       {check("Booking", "Booking Edit") && <button onClick={handleComplete} className='bg-secondary text-white uppercase font-Mluvka rounded-full py-3 px-5 w-full'>{res.isLoading ? "loading" : "Completed"}</button>}

      </div>
    </>
  )
}

export default BookingModel
