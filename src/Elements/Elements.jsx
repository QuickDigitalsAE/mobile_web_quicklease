import { Form, Formik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import FormControl from '../components/form/FormControl'
import SkeletonElements from './SkeletonElements'
import useGet from '../customHooks/useGet'
import { MainLanguageContext } from '../context/MainLanguageContext'
import SubmitButton from '../components/SubmitButton'
import usePost from '../customHooks/usePost'
import { toast } from 'react-toastify'
import CKEditors from '../components/form/CKEditors'

const Elements = () => {
    const { mainLanguage } = useContext(MainLanguageContext);
    const [resget, apiMethodGet] = useGet()
    const [datas, setDatas] = useState({
        "subscribe-details":""
    })
      useEffect(() => {
        if (mainLanguage) {
          apiMethodGet(`webContents/elements/${mainLanguage}`);
        }
      }, [mainLanguage]);

      useEffect(() => {
        if(resget.data) {
         setDatas(resget.data?.data)
        }
       }, [resget.data])

      const handleCkChange = (e, type) => {
        setDatas(d => ({ ...d, [type]: e }));
      };
    const [res, apiMethod] = usePost()
    const handleSubmit = async (values) => {
        let formdata = new FormData();
        for (const item in values) {
            formdata.append(`translation[${item}]`, values[item]);
        }
        formdata.append(`translation[subscribe-details]`, datas?.["subscribe-details"]);
        apiMethod(`webContents/elements/${mainLanguage}`, formdata)
    }

    useEffect(() => {
        if (res.data) {
          const { status, message } = res?.data
          if (status === "false") {
            toast.error(message);
          }
          else {
            toast.success(message);
          }
        }
      }, [res.data])

    if(resget.isLoading) return <SkeletonElements />
    const initialValues = resget?.data?.data || {}
    return (
        <div className='ElementsPage pr-10'>
            <div className='bg-[#EFF4FD] p-6 rounded-3xl'>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}  >
                <Form>
                <FormControl name="home"  label={"home"} placeholder="Enter home" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="about"  label={"About"} placeholder="Enter About" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="partners"  label={"Partners"} placeholder="Enter Partners" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="promos"  label={"Promos"} placeholder="Enter Promos" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="fleet"  label={"Fleet"} placeholder="Fleet" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="showall"  label={"Show All"} placeholder="Enter Show All" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="economy-cars-for-rent"  label={"Economy Cars for Rent"} placeholder="Enter Economy Cars for Rent" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="midsize-rental"  label={"Midsize Rental"} placeholder="Enter Midsize Rental" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="crossovers-rental"  label={"Crossovers Rental"} placeholder="Enter Crossovers Rental" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="suv-rental"  label={"SUV Rental"} placeholder="Enter SUV Rental" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="rent-a-luxury-car-dubai"  label={"Rent a Luxury Car Dubai"} placeholder="Enter Rent a Luxury Car Dubai" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="featured"  label={"Featured"} placeholder="Enter Featured" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="monthly-rent-a-car"  label={"Monthly Rent A Car"} placeholder="Enter Monthly Rent A Car" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="brands"  label={"Brands"} placeholder="Enter Brands" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="lease"  label={"Lease"} placeholder="Enter Lease" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="corporate-lease"  label={"Corporate Lease"} placeholder="Enter Corporate Lease" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="personal-lease"  label={"Personal Lease"} placeholder="Enter Personal Lease" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="lease-to-own-with-down-payment"  label={"Lease to Own With Down Payment"} placeholder="Enter Lease to Own With Down Payment" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="lease-to-own-without-down-payment"  label={"Lease to Own Without Down Payment"} placeholder="Enter Lease to Own Without Down Payment" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="flexible-rentals"  label={"Flexible Rentals"} placeholder="Enter Flexible Rentals" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="franchise"  label={"Franchise"} placeholder="Enter Franchise" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="location"  label={"Location"} placeholder="Enter Location" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="faqs"  label={"FAQs"} placeholder="Enter FAQs" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="blogs"  label={"Blogs"} placeholder="Enter Blogs" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="contact"  label={"Contact"} placeholder="Enter Contact" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="our-promotions"  label={"Our Promotions"} placeholder="Enter Our Promotions" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="enter-your-email-address"  label={"Enter Your email address"} placeholder="Enter Your email address" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="our-recent-blogs"  label={"Enter OUR RECENT BLOGS"} placeholder="Enter OUR RECENT BLOGS" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="read-more"  label={"Enter Read more"} placeholder="Enter Read more" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="testimonials"  label={"Enter Testimonials"} placeholder="Enter Testimonials" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="view-all-testimonials"  label={"Enter View All Testimonials"} placeholder="Enter View All Testimonials" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="view-video-testimonials"  label={"Enter View Video Testimonials"} placeholder="Enter View Video Testimonials" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="leave-a-review"  label={"Enter Leave A Review"} placeholder="Enter Leave A Review" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="say-hello"  label={"Enter Say Hello!"} placeholder="Enter Say Hello!" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="certificates"  label={"Enter Certificates"} placeholder="Enter Certificates" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="privacy-policy"  label={"Enter Privacy Policy"} placeholder="Enter Privacy Policy" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="terms-and-conditions"  label={"Enter Terms and Conditions"} placeholder="Enter Terms and Conditions" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="call-us-now"  label={"Call Us now"} placeholder="Enter Call Us now" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="send-enquiry"  label={"Send Enquiry"} placeholder="Enter Send Enquiry" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="signup"  label={"Sign Up"} placeholder="Enter Sign Up" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="login"  label={"Login"} placeholder="Enter Login" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="pay-a-later"  label={"Pay A Later"} placeholder="Enter Pay A Later" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="book-now"  label={"Book Now"} placeholder="Enter Book Now" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="our-rent-a-car-fleet"  label={"Our Rent a Car Fleet"} placeholder="Enter Our Rent a Car Fleet" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="partners"  label={"Partners"} placeholder="Enter Partners" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="view-all"  label={"View All"} placeholder="Enter View All" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="show-all"  label={"Show All"} placeholder="Enter Show All" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="all-blog-post"  label={"ALL BLOG POSTS"} placeholder="Enter ALL BLOG POSTS" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="submit"  label={"Submit"} placeholder="Enter Submit" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="our-car-rental-inventory"  label={"Our Car Rental Inventory"} placeholder="Enter Our Car Rental Inventory" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="name"  label={"Name"} placeholder="Enter name" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="get-in-touch"  label={"Get In Touch"} placeholder="Enter Get In Touch" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="phone-number"  label={"Phone Number"} placeholder="Enter Phone Number" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="date-from"  label={"Date From"} placeholder="Enter Date From" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="date-to"  label={"Date to"} placeholder="Enter Date to" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="select-a-car"  label={"Select A Car"} placeholder="Enter Select A Car" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="promo-code"  label={"Promo Code"} placeholder="Enter Promo Code" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="total-price"  label={"Total Price"} placeholder="Enter Total Price" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="our-rent-a-car-rates"  label={"Our Rent a Car Rates"} placeholder="Enter Our Rent a Car Rates" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="all-posts"  label={"All Posts"} placeholder="Enter All Posts" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="documents-requirements"  label={"documents-requirements"} placeholder="Enter documents-requirements" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="quick-rental"  label={"quick-rental"} placeholder="Enter quick-rental" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="message"  label={"message"} placeholder="Enter message" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="installment-per-month"  label={"Installment per month"} placeholder="Enter installment per month" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="down-payment"  label={"down payment"} placeholder="Enter down payment" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="pickup-location"  label={"Pickup Location"} placeholder="Enter Pickup Location" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="drop-off-location"  label={"Drop-off Location"} placeholder="Enter Drop-off Location" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="pickup-date-time"  label={"Pickup date & time"} placeholder="Enter Pickup date & time" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="drop-off-date-time"  label={"Drop-off date & time"} placeholder="Enter Drop-off date & time" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="find-a-car"  label={"Find a Car"} placeholder="Enter Find a Car" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="select-date"  label={"Select Date"} placeholder="Enter Select Date" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="economy"  label={"economy"} placeholder="Enter economy" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="featured"  label={"featured"} placeholder="Enter featured" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="in-stock"  label={"in-stock"} placeholder="Enter in-stock" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="day"  label={"day"} placeholder="Enter day" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="days"  label={"days"} placeholder="Enter days" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="week"  label={"week"} placeholder="Enter week" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="month"  label={"month"} placeholder="Enter month" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="aed"  label={"AED"} placeholder="Enter AED" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="company-name"  label={"Company Name"} placeholder="Enter Company Name" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="email"  label={"Email"} placeholder="Enter Email" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="car"  label={"Car"} placeholder="Enter Car" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="your-car"  label={"Your Car"} placeholder="Enter Your Car" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="period"  label={"Period"} placeholder="Enter Period" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="select-a-period"  label={"Select a Period"} placeholder="Enter Period" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="one-month"  label={"One Month"} placeholder="Enter One Month" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="three-months"  label={"Three Months"} placeholder="Enter Three Months" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="six-months"  label={"Six Months"} placeholder="Enter Six Months" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="twevle-months"  label={"Twevle Months"} placeholder="Enter Twevle Months" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="two-year"  label={"Two Year"} placeholder="Enter Two Year" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="three-year"  label={"Three Year"} placeholder="Enter Three Year" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="brand-new"  label={"Brand New"} placeholder="Enter Brand New" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="fleet-unit"  label={"Fleet Unit"} placeholder="Enter Fleet Unit" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="other"  label={"Other"} placeholder="Enter Other" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="vehicles-found"  label={"Vehicles Found"} placeholder="Enter Vehicles found" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="filter"  label={"Filter"} placeholder="Enter Filter" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="promo"  label={"Promo"} placeholder="Enter Promo" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="deliver-to-me"  label={"Deliver to me"} placeholder="Enter Deliver to me" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="collect-from-me"  label={"Collect from me"} placeholder="Enter Collect from me" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="details"  label={"Details"} placeholder="Enter Details" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="on-request"  label={"On Request"} placeholder="Enter On Request" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="sort-by-price"  label={"Sort By Price"} placeholder="Enter Sort By Price" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="write-custom-address"  label={"Write Custom Address"} placeholder="Enter Write Custom Address" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="find-the-right-car-now"  label={"FIND THE RIGHT CAR NOW"} placeholder="Enter FIND THE RIGHT CAR NOW" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="start-the-conversation-to-established-good-relationship-and-business"  label={"Start the conversation to established good relationship and business."} placeholder="Enter Start the conversation to established good relationship and business." className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="type-of-cars"  label={"Type Of Cars"} placeholder="Enter Type Of Cars" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="specifications"  label={"Specifications"} placeholder="Enter Specifications" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="short-by-brands"  label={"Short By Brands"} placeholder="Enter Short By Brands" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="select-a-brand"  label={"Select a Brand"} placeholder="Enter Select a Brand" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="from"  label={"From"} placeholder="Enter From" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="to"  label={"To"} placeholder="Enter To" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="from-aed"  label={"From AED"} placeholder="Enter From AED" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="to-aed"  label={"To AED"} placeholder="Enter To AED" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="first-name"  label={"First Name"} placeholder="Enter First Name" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="last-name"  label={"Last Name"} placeholder="Enter Last Name" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="valid"  label={"Valid"} placeholder="Enter Valid" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="your-information"  label={"Your Information"} placeholder="Enter Your Information" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="pickup-location"  label={"Pickup Location"} placeholder="Enter Pickup Location" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="return-location"  label={"Return Location"} placeholder="Enter Return Location" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="drivers-age-is-above-22-years"  label={"Drivers age is above 22 years?"} placeholder="Enter Drivers age is above 22 years?" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="tel"  label={"Tel"} placeholder="Enter Tel" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="start-date-&-time"  label={"Start date & time"} placeholder="Enter Start date & time" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="end-date-&-time"  label={"End date & time"} placeholder="Enter End date & time" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="process-address"  label={"process"} placeholder="Enter process" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="discount-only"  label={"discout only"} placeholder="Enter discout only" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="optional-extras"  label={"Optional Extras"} placeholder="Enter Optional Extras" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="add"  label={"add"} placeholder="Enter add" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="added"  label={"added"} placeholder="Enter added" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="payment"  label={"Payment"} placeholder="Enter Payment" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="deposit"  label={"Deposit"} placeholder="Enter Deposit" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="security-deposit"  label={"Security Deposit"} placeholder="Enter Security Deposit" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="make-partial-prepayment-20%"  label={"Make Partial Prepayment 20%"} placeholder="Enter Make Partial Prepayment 20%" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="make-full-payment"  label={"Make full payment"} placeholder="Enter Make full payment" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="policies"  label={"Policies"} placeholder="Enter Policies" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="pay-at-pickdelivery"  label={"Pay at Pick/Delivery"} placeholder="Enter Pay at Pick/Delivery" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="pay-now"  label={"Pay now"} placeholder="Enter Pay now" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="proceed"  label={"Proceed"} placeholder="Enter Proceed" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="total-payment"  label={"Total Payment"} placeholder="Enter Total Payment" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="discount-0first"  label={"discount first"} placeholder="Enter discount first" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="security-deposit-waiver"  label={"Security Deposit waiver"} placeholder="Enter Security Deposit waiver" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="general-information"  label={"general information"} placeholder="Enter general information" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="car-services"  label={"car services"} placeholder="Enter ca services" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="car-options"  label={"car options"} placeholder="Enter car options" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="no-data-found"  label={"No Data Found"} placeholder="Enter No Data Found" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="partial-payment"  label={"Partial Payment"} placeholder="Enter Partial Payment" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="share"  label={"Share"} placeholder="Enter Share" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="12-months"  label={"months"} placeholder="Enter months" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="full-option"  label={"full option"} placeholder="Enter full option" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="cash-price"  label={"Cash price"} placeholder="Enter Cash Price" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="enter"  label={"enter"} placeholder="Enter enter" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="choose-location-for"  label={"Enter Choose Location for"} placeholder="Enter Choose Location for" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="customer-address"  label={"Enter Customer Address"} placeholder="Enter Customer Address" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="order-summary"  label={"Enter Order Summary"} placeholder="Enter Order Summary" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="or-similar-car"  label={"Enter or similar car"} placeholder="Enter or similar car" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="grand-total"  label={"Enter grand-total"} placeholder="Enter or grand-total" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="partial-total"  label={"Enter partial-total"} placeholder="Enter or similar car" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="i-accept"  label={"Enter i-accept"} placeholder="Enter i-accept" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="items-detail"  label={"Enter items-detail"} placeholder="Enter items-detail" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="unit-price"  label={"Enter unit-price"} placeholder="Enter unit-price" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="amount"  label={"Enter amount"} placeholder="Enter amount" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="vat-amount"  label={"Enter vat-amount"} placeholder="Enter vat-amount" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="total"  label={"Enter total"} placeholder="Enter total" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="country"  label={"Enter Country"} placeholder="Enter Country" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="city"  label={"Enter City"} placeholder="Enter City" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="to-homepage"  label={"Enter homepage"} placeholder="Enter homepage" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="or-similar"  label={"Enter or Similar"} placeholder="Enter or Similar" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="pickup-return-location"  label={"Enter Pickup & Return Location"} placeholder="Enter Pickup & Return Location" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="same-return-location"  label={"Enter Same Return Location"} placeholder="Enter Same Return Location" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="off"  label={"Enter Off"} placeholder="Enter Off" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="reset"  label={"reset"} placeholder="Enter reset" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
                <FormControl name="out-of-stock"  label={"Out Of Stock"} placeholder="Enter Out Of Stock" className="outline-none w-full h-[3rem] px-5 rounded-xl" control="input2" />
        


                <div>
                <div className="mb-1 block text-[#7D8CA7] text-[.8rem]">Subscribe</div>
                <CKEditors label={"Subscribe"} data={datas?.["subscribe-details"]} update={(text) => handleCkChange(text, "subscribe-details")} />
                </div>
                
                
              
                {(
                      <SubmitButton
                        props={{
                          class:
                            "btn bg-secondary text-white  uppercase mt-5   py-3 px-8 rounded-full  submit hover:bg-primary transition-all duration-300",
                          text: "update",
                        }}
                        buttonLoading={res.isLoading}
                      />
                    )}
                </Form>
            </Formik>
            </div>
        </div>
    )

    
}

export default Elements
