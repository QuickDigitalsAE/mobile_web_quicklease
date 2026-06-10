import React, { useEffect, useState } from 'react'
import config from "./services/config.json";
import { getTokenSession } from './utils/common'
import LeftSide from './components/LeftSide'
import Header from './components/Header'
import Booking from './Bookings/Booking'
import { Route, Routes, useNavigate } from 'react-router-dom'
import MainProfileProvider from './context/MainProfileContext'
import MainDashboard from './MainDashboard/MainDashboard'
import WebContent from './WebContent/WebContent'
import MainEditValuesProvider from './context/MainEditValuesContext'
// import Setting from './Setting/Setting'
import MainMenuActiveProvider from './context/MainMenuActiveContext'
import UserCreate from './Users/UserCreate'
import MainLanguageProvider from './context/MainLanguageContext'
import User from './Users/User'
import UserEdit from './Users/UserEdit'
import RoleCreate from './Role/RoleCreate'
import RoleEdit from './Role/RoleEdit'
import RoleList from './Role/RoleList'
import Profile from './Profile'
import Blogs from './Blogs/Blogs'
import CreateBlogs from './Blogs/CreateBlogs'
import EditBlogs from './Blogs/EditBlogs'
import PromotionCreate from './Promotions/PromotionCreate'
import Promotions from './Promotions/Promotions'
import EditPromotions from './Promotions/EditPromotions'
import CreatePartners from './Partners/CreatePartners'
import Partners from './Partners/Partners'
import EditPartners from './Partners/EditPartners'
import Quote from './Quote/Quote'
import useFetch from './customHooks/useFetch'
import CreateTestimonials from './Testimonials/CreateTestimonials'
import Testmonials from './Testimonials/Testmonials'
import EditTestimonials from './Testimonials/EditTestimonials'
import CreateCatalogs from './Catalogs/CreateCatalogs'
import Catalogs from './Catalogs/Catalogs'
import EditCatalogs from './Catalogs/EditCatalogs'
import CreateProductsProperties from './ProductsProperties/CreateProductsProperties'
import ProductsProperties from './ProductsProperties/ProductsProperties'
import EditProductsProperties from './ProductsProperties/EditProductsProperties'
import CreateProducts from './Products/CreateProducts'
import ProductsMain from './Products/ProductsMain'
import EditProducts from './Products/EditProducts'
import CreateProductsCoverages from './ProductsCoverages/CreateProductsCoverages'
import ProductsCoverages from './ProductsCoverages/ProductsCoverages'
import EditProductsCoverages from './ProductsCoverages/EditProductsCoverages'
import PromoCodeCreate from './PromoCode/PromoCodeCreate'
import PromoCode from './PromoCode/PromoCode'
import EditPromoCode from './PromoCode/EditPromoCode'
import Home from './WebContent/Home/Home'
import AboutUs from './WebContent/About/AboutUs'
import OurPartners from './WebContent/Partners/OurPartners'
import Testimonials from './WebContent/Testimonials/Testimonials'
import OurBlogs from './WebContent/Blogs/OurBlogs'
import ContactUs from './WebContent/Contact/ContactUs'
import WebFaqs from './WebContent/Faqs/WebFaqs'
import ProductInner from './WebContent/ProductInner/ProductInner'
import CorporateLease from './WebContent/CorporateLease/CorporateLease'
import VehicleList from './WebContent/VehicleList/VehicleList'
import VehicleBooking from './WebContent/VehicleBooking/VehicleBooking'
import ThanksYou from './WebContent/thankyou/ThanksYou'
import TermsAndConditions from './OtherPage/TermsAndConditions'
import PrivicyPolicy from './OtherPage/PrivicyPolicy'
import WebCreateTestimonials from './WebContent/TestimonialsVideo/WebCreateTestimonials'
import NewfolderTest from './WebContent/newfolderTest/NewfolderTest'
import WebLocations from './WebContent/OurLocations/WebLocations'
import WebFranchise from './WebContent/WebFranchise/WebFranchise'
import WebFlexible from './WebContent/WebFexable/WebFlexible'
import Finalize from './WebContent/Finalize/Finalize'
import WebPromotions from './WebContent/Promotions/WebPromotions'
import LeaseToOwn from './WebContent/LeaseToOwn/LeaseToOwn'
import Enquiries from './Enquiries/Enquiries'
import EditCarWithDriver from './CarWithDriver/EditCarWithDriver';
import CarWithDriver from './CarWithDriver/CarWithDriver';
import ActivitiesLogs from './Activities/ActivitiesLogs';
import MainUserDataProvider from './context/MainUserDataContext';
import ActivitiesAuth from './Activities/ActivitiesAuth';
import Reviews from './Reviews/Reviews';
import EditReviews from './Reviews/EditReviews';
import CreateReviews from './Reviews/CreateReviews';
import MainPermissionProvider from './context/MainPermissionContext';
import CancellationReplacementPolicy from './WebContent/CancellationReplacementPolicy/CancellationReplacementPolicy';
import BlogsSidebar from './BlogsSidebarBanner/BlogsSidebar';
import BlogsSidebarCreate from './BlogsSidebarBanner/BlogsSidebarCreate';
import EditBlogsSidebar from './BlogsSidebarBanner/EditBlogsSidebar';
import PushNotification from './PushNotification/PushNotification';
import PushNotificationCreate from './PushNotification/PushNotificationCreate';
import EditPushNotification from './PushNotification/EditPushNotification';
const Dashboard = () => {
  const { loading, data } = useFetch(`getUserProfile`)
  const [userdata, setUserdata] = useState(null);
  const [permission, setPermission] = useState(null);

  useEffect(() => {
    if (data) {
      setUserdata(data.data)
      setPermission(data?.permissions)
    }
  }, [data])


  const navigate = useNavigate();
  useEffect(() => {
    if (!getTokenSession()) {
      navigate(`/${config.demo}login`)
    }
  }, [navigate])
  if (loading || !permission || !userdata) return ''

  const check = (module, action) =>
    permission?.[module]?.includes(action);


  return (
    <MainPermissionProvider data={permission} >
      <MainUserDataProvider data={userdata} >
        <MainProfileProvider>
          <MainLanguageProvider>
            <MainMenuActiveProvider>
              <MainEditValuesProvider>
                <div className='MainDashboard dashboard-shell flex gap-6 max-lg:gap-0'>
                  <LeftSide permissions={data?.permissions} data={data?.data} />
                  <div className="MainDashboard__Right dashboard-shell__main w-[calc(100%-20rem)] max-lg:w-full max-lg:pl-0">
                    <Header />
                    <div className="MainDashboard__RightBody dashboard-shell__body">
                      <Routes>
                        <Route path={`/`} element={<MainDashboard permission={permission} userdata={userdata} />} />
                        <Route path={`/profile`} element={<Profile />} />
                        {/* <Route path={`/setting`} element={<Setting />} /> */}
                        {(check("Booking", "Booking View") && check("Booking", "Booking Menu")) && (
                          <Route path={`/booking`} element={<Booking permission={permission}/>} />
                        )}
                        {(check("Enquiry", "Enquiry View") && check("Enquiry", "Enquiry Menu")) && (
                          <Route path={`/lead`} element={<Enquiries />} />
                        )}
                        <Route path={`/quote`} element={<Quote />} />
                        {
                          (check("Users", "User View") && check("Users", "User Menu")) && (
                            <>
                              <Route path={`/users`} element={<User permission={permission} />} />
                              {check("Users", "User Add") && <Route path={`/users/create`} element={<UserCreate permission={permission} />} />}
                              {<Route path={`/users/edit/:id`} element={<UserEdit permission={permission} />} />}
                            </>
                          )
                        }

                        {(check("Roles", "Role View") && check("Roles", "Role Menu")) && (
                          <>
                            <Route path={`/role`} element={<RoleList permission={permission} />} />
                            {check("Roles", "Role Add") && <Route path={`/role/create`} element={<RoleCreate permission={permission} />} />}
                            {<Route path={`/role/edit/:id`} element={<RoleEdit permission={permission} />} />}
                          </>
                        )}
                        {
                          (check("Catalogs", "Catalogs View") && check("Catalogs", "Catalogs Menu")) && (
                            <>
                              <Route path={`/catalogs`} element={<Catalogs permission={permission} />} />
                              {check("Catalogs", "Catalogs Add") && <Route path={`/catalogs/create`} element={<CreateCatalogs permission={permission} />} />}
                              {<Route path={`/catalogs/edit/:id`} element={<EditCatalogs permission={permission} />} />}
                            </>
                          )
                        }
                        {(check("Catalogs", "Catalogs Menu") && check("Catalogs", "Catalogs View")) && (
                          <>
                            <Route path={`/carwithdrivers`} element={<CarWithDriver permission={permission} />} />
                            {check("Catalogs", "Catalogs Edit") && <Route path={`/carwithdrivers/edit/:id`} element={<EditCarWithDriver permission={permission} />} />}
                          </>
                        )}
                        {(check("Products", "Products Menu") && check("Products", "Products View")) && (
                          <>
                            <Route path={`/products`} element={<ProductsMain permission={permission} />} />
                            {check("Products", "Products Add") && <Route path={`/products/create`} element={<CreateProducts permission={permission} />} />}
                            {<Route path={`/products/edit/:id`} element={<EditProducts permission={permission} />} />}
                          </>
                        )}
                        {(check("ProductProperties", "ProductProperties Menu") && check("ProductProperties", "ProductProperties View")) && (
                          <>
                            <Route path={`/products/properties`} element={<ProductsProperties permission={permission} />} />
                            {check("ProductProperties", "ProductProperties Add") && <Route path={`/products/properties/create`} element={<CreateProductsProperties permission={permission} />} />}
                            {<Route path={`/products/properties/edit/:id`} element={<EditProductsProperties permission={permission} />} />}
                          </>
                        )}
                        {(check("ProductCoverages", "ProductCoverages Menu") && check("ProductCoverages", "ProductCoverages View")) && (
                          <>
                            <Route path={`/products/coverages`} element={<ProductsCoverages permission={permission} />} />
                            {check("ProductCoverages", "ProductCoverages Add") && <Route path={`/products/coverages/create`} element={<CreateProductsCoverages permission={permission} />} />}
                            {<Route path={`/products/coverages/edit/:id`} element={<EditProductsCoverages permission={permission} />} />}
                          </>
                        )}
                        {(check("PromoCode", "PromoCode Menu") && check("PromoCode", "PromoCode View")) && (
                          <>
                            <Route path={`/promo`} element={<PromoCode permission={permission} />} />
                            {check("PromoCode", "PromoCode Add") && <Route path={`/promo/create`} element={<PromoCodeCreate permission={permission} />} />}
                            {<Route path={`/promo/edit/:id`} element={<EditPromoCode permission={permission} />} />}
                          </>
                        )}
                        {(check("Promotions", "Promotion Menu") && check("Promotions", "Promotion View")) && (
                          <>
                            <Route path={`/promotions`} element={<Promotions permission={permission} />} />
                            {check("Promotions", "Promotion Add") && <Route path={`/promotions/create`} element={<PromotionCreate permission={permission} />} />}
                            {<Route path={`/promotions/edit/:id`} element={<EditPromotions permission={permission} />} />}
                          </>
                        )}
                        {(check("Partners", "Partner Menu") && check("Partners", "Partner View")) && (
                          <>
                            <Route path={`/partners`} element={<Partners permission={permission}/>} />
                            {check("Partners", "Partner Add") && <Route path={`/partners/create`} element={<CreatePartners permission={permission}/>} />}
                            {<Route path={`/partners/edit/:id`} element={<EditPartners permission={permission}/>} />}
                          </>
                        )}
                        {(check("Blogs", "Blogs Menu") && check("Blogs", "Blogs View")) && (
                          <>
                            <Route path={`/blogs`} element={<Blogs  permission={permission} />} />
                            {check("Blogs", "Blogs Add") && <Route path={`/blogs/create`} element={<CreateBlogs  permission={permission}  />} />}
                            {<Route path={`/blogs/edit/:slug`} element={<EditBlogs  permission={permission}  />} />}
                            <Route path={`/blogs/sidebar`} element={<BlogsSidebar permission={permission}/>} />
                            {check("Blogs", "Blogs Add") && <Route path={`/blogs/sidebar/create`} element={<BlogsSidebarCreate permission={permission}/>} />}
                            {<Route path={`/blogs/sidebar/edit/:id`} element={<EditBlogsSidebar permission={permission}/>} />}
                          </>
                        )}
                       {(check("PushNotification", "PushNotification Menu") && check("PushNotification", "PushNotification View")) && (
                          <>
                            <Route path={`/push-notification`} element={<PushNotification permission={permission} />} />
                            {check("PushNotification", "PushNotification Add") && <Route path={`/push-notification/create`} element={<PushNotificationCreate permission={permission} />} />}
                            {<Route path={`/push-notification/edit/:id`} element={<EditPushNotification permission={permission} />} />}
                          </>
                        )}
                        {(check("Testimonials", "Testimonial Menu") && check("Testimonials", "Testimonial View")) && (
                          <>
                            <Route path={`/testimonials`} element={<Testmonials permission={permission}/>} />
                            {check("Testimonials", "Testimonial Add") && <Route path={`/testimonials/create`} element={<CreateTestimonials permission={permission}/>} />}
                            {<Route path={`/testimonials/edit/:id`} element={<EditTestimonials permission={permission}/>} />}
                          </>
                        )}
                        {/* {(data?.permissions["WebContents"]?.includes("WebContents Menu")) ? <Route path={`/webcontent`} element={<WebContent permission={data?.permissions} />} /> : ""}
                        {(data?.permissions["WebContents"]?.includes("WebContents Menu")) ? */}
                        {(check("WebContents", "WebContents Menu") && check("WebContents", "WebContents View")) && <Route path={`/webcontent`} element={<WebContent permission={data?.permissions} />} /> }
                        {(check("WebContents", "WebContents Menu") && check("WebContents", "WebContents View")) &&
                          <>
                            <Route path={`/webcontent/home`} element={<Home permission={permission}/>} />
                            <Route path={`/webcontent/about-us`} element={<AboutUs permission={permission}/>} />
                            <Route path={`/webcontent/partners`} element={<OurPartners permission={permission}/>} />
                            <Route path={`/webcontent/our-blogs`} element={<OurBlogs permission={permission}/>} />
                            <Route path={`/webcontent/faqs`} element={<WebFaqs permission={permission}/>} />
                            <Route path={`/webcontent/contact-us`} element={<ContactUs permission={permission}/>} />
                            <Route path={`/webcontent/testimonials`} element={<Testimonials permission={permission}/>} />
                            <Route path={`/webcontent/promotions`} element={<WebPromotions permission={permission}/>} />
                            <Route path={`/webcontent/product-inner`} element={<ProductInner permission={permission}/>} />
                            <Route path={`/webcontent/corporatelease`} element={<CorporateLease permission={permission}/>} />
                            <Route path={`/webcontent/lease-to-own-page`} element={<LeaseToOwn permission={permission}/>} />
                            <Route path={`/webcontent/vehicle-listing`} element={<VehicleList permission={permission}/>} />
                            <Route path={`/webcontent/vehicle-booking`} element={<VehicleBooking permission={permission}/>} />
                            <Route path={`/webcontent/thank-you`} element={<ThanksYou permission={permission}/>} />
                            <Route path={`/webcontent/term-and-conditions`} element={<TermsAndConditions permission={permission}/>} />
                            <Route path={`/webcontent/privacy-policy`} element={<PrivicyPolicy permission={permission}/>} />
                            <Route path={`/webcontent/testimonials-video`} element={<WebCreateTestimonials permission={permission}/>} />
                            <Route path={`/webcontent/newfolder-test-1`} element={<NewfolderTest permission={permission}/>} />
                            <Route path={`/webcontent/our-locations`} element={<WebLocations permission={permission}/>} />
                            <Route path={`/webcontent/franchise`} element={<WebFranchise permission={permission}/>} />
                            <Route path={`/webcontent/flexible`} element={<WebFlexible permission={permission}/>} />
                            <Route path={`/webcontent/finalize`} element={<Finalize permission={permission}/>} />
                            <Route path={`/webcontent/cancellation-replacement-policy`} element={<CancellationReplacementPolicy permission={permission}/>} />
                          </>
                        }
                        {(check("Activities", "Activities Menu") && check("Activities", "Activities View")) && (
                          <>
                            <Route path={`/activities`} element={<ActivitiesLogs />} />
                            <Route path={`/activities/auth`} element={<ActivitiesAuth />} />
                          </>
                        )}
                        {(check("Reviews", "Reviews Menu") && check("Reviews", "Reviews View")) && (
                          <>
                            <Route path={`/reviews`} element={<Reviews permission={permission}/>} />
                            {check("Reviews", "Reviews Add") && <Route path={`/reviews/create`} element={<CreateReviews permission={permission}/>} />}
                            {<Route path={`/reviews/edit/:id`} element={<EditReviews permission={permission}/>} />}
                          </>
                        )}
                      </Routes>
                    </div>
                  </div>
                </div>
              </MainEditValuesProvider>
            </MainMenuActiveProvider>
          </MainLanguageProvider>
        </MainProfileProvider>
      </MainUserDataProvider>
    </MainPermissionProvider>

  )
}

export default Dashboard




