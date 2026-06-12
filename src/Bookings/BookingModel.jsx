import React, { useContext, useEffect, useMemo, useState } from 'react'
import close from "../dist/webImages/close.svg"
import dayjs from 'dayjs';
import usePost from '../customHooks/usePost'
import { toast } from 'react-toastify'
import { MainLanguageContext } from '../context/MainLanguageContext'
import swal from "sweetalert";
import { BookingTab } from '../data/data'
import currency from '../dist/webImages/currency.webp'

const BookingModel = ({ data, modelStatus, modelStatusUpdate, submitss, permission }) => {
  const { id, booking_status, pickup_date_time, return_date_time, coverages_extras, booking_page_slug, payment_status } = data
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
  const overviewCards = useMemo(
    () => [
      { label: 'Booking', value: `#${data?.order_number || data?.id || '-'}` },
      { label: 'Customer', value: data?.client_name || data?.first_name || 'Unknown' },
      { label: 'Payment', value: data?.payment_status || 'unpaid' },
      { label: 'Status', value: data?.booking_status || 'pending' },
    ],
    [data]
  );

  const detailRows = [
    { label: 'Transaction Id', value: data?.transaction_id || '-' },
    { label: 'Product Title', value: data?.product_title || '-' },
    { label: 'Email', value: data?.email || data?.client_email || '-' },
    { label: 'Phone Number', value: data?.phone_number || '-' },
    { label: 'Pickup City', value: data?.pickup_city || '-' },
    { label: 'Return City', value: data?.return_city || '-' },
    { label: 'Pickup Date', value: pickup_date_time ? dayjs(pickup_date_time).format('YYYY-MM-DD HH:mm') : '-' },
    { label: 'Return Date', value: return_date_time ? dayjs(return_date_time).format('YYYY-MM-DD HH:mm') : '-' },
    { label: 'License', value: data?.valid_driving_license || '-' },
    { label: 'Passport', value: data?.valid_passport || '-' },
    { label: 'Deposit Type', value: data?.deposit_type || '-' },
    { label: 'Total Days', value: data?.total_days || '-' },
    { label: 'Promo Code', value: data?.promo_code || '-' },
    { label: 'Promo Discount', value: data?.promo_discount || '-' },
    { label: 'Pay Now Discount', value: data?.pay_now_discount || '-' },
    { label: 'Car Monthly Price', value: data?.car_monthly_price || '-' },
  ];

  const paymentRows = [
    { label: 'Deposit Price', value: data?.deposit_price || '-' },
    { label: 'Summary Amount', value: data?.summary_total_amount || '-' },
    { label: 'VAT', value: data?.summary_total_vat || '-' },
    { label: 'Discount incl. VAT', value: data?.total_discount_incl_vat || '-' },
    { label: 'Grand Total', value: data?.grand_total || '-' },
    { label: 'Partial Amount', value: data?.partial_amount || '-' },
  ];

  return (
    <>
      <div onClick={handleCloseModel} className={`booking-modal__backdrop ${modelStatus ? "is-open" : ""}`}></div>
      <div className={`booking-modal ${modelStatus ? "is-open" : ""}`}>
        <div className="booking-modal__shell">
          <button type="button" className="booking-modal__close" onClick={handleCloseModel} aria-label="Close booking popup">
            <img src={close} alt="" />
          </button>

          <div className="booking-modal__hero">
            <div>
              <span className="booking-modal__eyebrow">Booking detail</span>
              <h2>#{data?.order_number || data?.id || '-'} Booking</h2>
              <p>{booking_page_slug || 'Direct booking overview'} with payment, schedule, and extras in one place.</p>
            </div>

            <div className="booking-modal__heroStats">
              {overviewCards.map((item) => (
                <article key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </article>
              ))}
            </div>
          </div>

          <div className="booking-modal__content">
            <section className="booking-modal__panel">
              <h3>Booking Snapshot</h3>
              <div className="booking-modal__grid">
                {detailRows.map((item) => (
                  <article key={item.label} className="booking-modal__fieldCard">
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </article>
                ))}
              </div>
            </section>

            <section className="booking-modal__panel">
              <h3>Pricing Summary</h3>
              <div className="booking-modal__grid booking-modal__grid--pricing">
                {paymentRows.map((item) => (
                  <article key={item.label} className="booking-modal__fieldCard">
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </article>
                ))}
              </div>

              <div className="booking-modal__tableWrap">
                <div className="booking-modal__tableScroll">
                  <table className="booking-modal__table">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Unit Price</th>
                        <th>Days</th>
                        <th>Amount</th>
                        <th>VAT</th>
                        <th>Final</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(coverages_extras) && coverages_extras.length > 0 ? coverages_extras.map((item) => {
                        const { id: extraId, title, price, total, sum_price, selected_locations, days_count, vat } = item;
                        return (
                          <tr key={extraId}>
                            <td>{selected_locations?.title ? `${title}: ${selected_locations.title}${selected_locations.custom_address ? ` - ${selected_locations.custom_address}` : ''}` : title}</td>
                            <td>{selected_locations?.title ? selected_locations?.price : price}</td>
                            <td>{days_count || '-'}</td>
                            <td>{selected_locations?.title ? selected_locations?.sum_price : sum_price}</td>
                            <td>{selected_locations?.title ? selected_locations?.vat : vat}</td>
                            <td>{selected_locations?.title ? selected_locations?.total : total}</td>
                          </tr>
                        );
                      }) : (
                        <tr>
                          <td colSpan="6" className="booking-modal__empty">No extras added to this booking.</td>
                        </tr>
                      )}
                      <tr>
                        <td colSpan="4" />
                        <td>{data.deposit_type === "deposit" ? "Security Deposit" : "Security Deposit waiver"}</td>
                        <td>
                          {data.deposit_price}
                          {data.deposit_type === "deposit" && data.deposit_selected_tab === "deposit_pay_later" ? " / Pay Later" : ""}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="4" />
                        <td>Total Amount</td>
                        <td>{data.summary_total_amount}</td>
                      </tr>
                      <tr>
                        <td colSpan="4" />
                        <td>Total VAT</td>
                        <td>{data.summary_total_vat}</td>
                      </tr>
                      <tr>
                        <td colSpan="4" />
                        <td>Total Discount incl. VAT</td>
                        <td>{data.total_discount_incl_vat}</td>
                      </tr>
                      <tr className="booking-modal__grandRow">
                        <td colSpan="4" />
                        <td>Grand Total</td>
                        <td><div className="booking-modal__money"><img src={currency} alt="currency" />{data.grand_total}</div></td>
                      </tr>
                      {Number(data.partial_amount) ? (
                        <tr className="booking-modal__grandRow">
                          <td colSpan="4" />
                          <td>Partial ({data.partial_percentage}%)</td>
                          <td><div className="booking-modal__money"><img src={currency} alt="currency" />{data.partial_amount}</div></td>
                        </tr>
                      ) : null}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section className="booking-modal__panel booking-modal__actionsPanel">
              <h3>Update Booking</h3>
              <div className="booking-modal__formGrid">
                <div>
                  <label htmlFor="booking-status">Change State</label>
                  <select id="booking-status" value={statusUpdate.status} onChange={(e) => setStatusUpdate({ ...statusUpdate, status: e.target.value })}>
                    {BookingTab.map((item) => (
                      <option key={item.active} value={item.label}>{item.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="payment-status">Payment Status</label>
                  <select id="payment-status" value={statusUpdate.payment_status} onChange={(e) => setStatusUpdate({ ...statusUpdate, payment_status: e.target.value })}>
                    <option value="unpaid">unpaid</option>
                    <option value="paid">paid</option>
                  </select>
                </div>
              </div>

              <div className="booking-modal__comment">
                <label htmlFor="booking-comment">Comment</label>
                <textarea id="booking-comment" onChange={(e) => setStatusUpdate({ ...statusUpdate, comment: e.target.value })} placeholder="Add a short update about this booking"></textarea>
              </div>

              {check("Booking", "Booking Edit") && (
                <button onClick={handleComplete} className="role-create-page__submit btn bg-secondary text-white uppercase py-3 px-8 rounded-full w-full block submit hover:bg-primary transition-all duration-300">
                  {res.isLoading ? "Loading..." : "Completed"}
                </button>
              )}
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

export default BookingModel
