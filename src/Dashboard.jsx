import React, { useEffect, useState } from 'react'
import config from "./services/config.json";
import { getTokenSession } from './utils/common'
import LeftSide from './components/LeftSide'
import Header from './components/Header'
import Booking from './Bookings/Booking'
import { Route, Routes, useNavigate } from 'react-router-dom'
import MainProfileProvider from './context/MainProfileContext'
import MainDashboard from './MainDashboard/MainDashboard'
import MainEditValuesProvider from './context/MainEditValuesContext'
// import Setting from './Setting/Setting'
import MainMenuActiveProvider from './context/MainMenuActiveContext'
import UserCreate from './Users/UserCreate'
import MainLanguageProvider from './context/MainLanguageContext'
import User from './Users/User'
import UserEdit from './Users/UserEdit'
import Customers from './Customers/Customers'
import CustomerCreate from './Customers/CustomerCreate'
import CustomerEdit from './Customers/CustomerEdit'
import Guidance from './Guidance/Guidance'
import GuidanceCreate from './Guidance/GuidanceCreate'
import GuidanceEdit from './Guidance/GuidanceEdit'
import RoleCreate from './Role/RoleCreate'
import RoleEdit from './Role/RoleEdit'
import RoleList from './Role/RoleList'
import Profile from './Profile'
import PromotionCreate from './Promotions/PromotionCreate'
import Promotions from './Promotions/Promotions'
import EditPromotions from './Promotions/EditPromotions'
import CreatePartners from './Partners/CreatePartners'
import Partners from './Partners/Partners'
import EditPartners from './Partners/EditPartners'
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
import Enquiries from './Enquiries/Enquiries'
import ActivitiesLogs from './Activities/ActivitiesLogs';
import MainUserDataProvider from './context/MainUserDataContext';
import ActivitiesAuth from './Activities/ActivitiesAuth';
import MainPermissionProvider from './context/MainPermissionContext';
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
                  <div className="MainDashboard__Right dashboard-shell__main w-[calc(100%-20rem)] max-lg:w-full max-lg:pl-0 lg:py-[14px]">
                    <Header />
                    <div className="MainDashboard__RightBody dashboard-shell__body rounded-3xl">
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
                        {
                          (check("Users", "User View") && check("Users", "User Menu")) && (
                            <>
                              <Route path={`/users`} element={<User permission={permission} />} />
                              {check("Users", "User Add") && <Route path={`/users/create`} element={<UserCreate permission={permission} />} />}
                              {<Route path={`/users/edit/:id`} element={<UserEdit permission={permission} />} />}
                            </>
                          )
                        }
                        <>
                          <Route path={`/customers`} element={<Customers permission={permission} />} />
                          <Route path={`/customers/create`} element={<CustomerCreate permission={permission} />} />
                          <Route path={`/customers/edit/:id`} element={<CustomerEdit permission={permission} />} />
                        </>
                        <>
                          <Route path={`/guidance`} element={<Guidance permission={permission} />} />
                          <Route path={`/guidance/create`} element={<GuidanceCreate permission={permission} />} />
                          <Route path={`/guidance/edit/:id`} element={<GuidanceEdit permission={permission} />} />
                        </>

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
                        {(check("Testimonials", "Testimonial Menu") && check("Testimonials", "Testimonial View")) && (
                          <>
                            <Route path={`/testimonials`} element={<Testmonials permission={permission}/>} />
                            {check("Testimonials", "Testimonial Add") && <Route path={`/testimonials/create`} element={<CreateTestimonials permission={permission}/>} />}
                            {<Route path={`/testimonials/edit/:id`} element={<EditTestimonials permission={permission}/>} />}
                          </>
                        )}
                        {(check("Activities", "Activities Menu") && check("Activities", "Activities View")) && (
                          <>
                            <Route path={`/activities`} element={<ActivitiesLogs />} />
                            <Route path={`/activities/auth`} element={<ActivitiesAuth />} />
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

