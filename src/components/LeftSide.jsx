import React, { useContext, useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MainMenuActiveContext } from '../context/MainMenuActiveContext';
import { Menu } from 'antd';
import {
  FiActivity,
  FiBell,
  FiBookOpen,
  FiBox,
  FiGrid,
  FiLayout,
  FiMessageSquare,
  FiShield,
  FiStar,
  FiUsers,
} from "react-icons/fi";
import { MainProfileContext } from '../context/MainProfileContext';

const links = {
  "/": "sub1",
  "/users": "sub2",
  "/customers": "sub3",
  "/role": "sub5",
  "/booking": "sub42",
  "/lead": "sub43",
  "/products": "sub30",
  "/products/properties": "sub33",
  "/products/coverages": "sub36",
  "/catalogs": "sub27",
  "/promotions": "sub11",
  "/partners": "sub14",
  "/testimonials": "sub26",
  "/activities": "sub60",
};

function getItem(label, key, icon, children, type) {
  return { key, icon, children, label, type };

}

function getLinkItem(label, key, icon, to) {
  return getItem(<Link to={to}>{label}</Link>, key, icon);
}

const LeftSide = ({ permissions, data }) => {
  const { handleProfileData, profileData } = useContext(MainProfileContext);
  useEffect(() => {
    handleProfileData(data)
  }, [])

  const location = useLocation();
  let a = location.pathname.split("/")
  a.pop()
  let pathsplit = location.pathname.includes("edit") ? a.join("/") : location.pathname;
  const selectedKey = [links[pathsplit]].filter(Boolean)
  let User = null
  let Role = null
  let Customer = null
  let partners = null
  let testimonials = null
  let Promotions = null
  let Catalogs = null
  let Products = null
  let ProductProperties = null
  let ProductCoverages = null
  let Booking = null
  let Enquiry = null
  let Activities = null
  let Dashboard = getLinkItem("Dashboard", 'sub1', <FiLayout />, `/`)

  const check = (module, action) => permissions?.[module]?.includes(action);

  if ((check("Users", "User View") && check("Users", "User Menu"))) {
    User = getLinkItem("Users", 'sub2', <FiUsers />, `/users`);
  }

  Customer = getLinkItem("Customers", 'sub3', <FiUsers />, `/customers`);

  if ((check("Roles", "Role View") && check("Roles", "Role Menu"))) {
    Role = getLinkItem("Roles", 'sub5', <FiShield />, `/role`);
  }

  if ((check("Partners", "Partner View") && check("Partners", "Partner Menu"))) {
    partners = getLinkItem("Partners", 'sub14', <FiUsers />, `/partners`);
  }

  if ((check("Testimonials", "Testimonial View") && check("Testimonials", "Testimonial Menu"))) {
    testimonials = getLinkItem("Testimonials", 'sub26', <FiStar />, `/testimonials`);
  }

  if ((check("Promotions", "Promotion View") && check("Promotions", "Promotion Menu"))) {
    Promotions = getLinkItem("Promotions", 'sub11', <FiBell />, `/promotions`);
  }

  if ((check("Catalogs", "Catalogs View") && check("Catalogs", "Catalogs Menu"))) {
    Catalogs = getLinkItem("Catalog", 'sub27', <FiBookOpen />, `/catalogs`);
  }

  if ((check("Products", "Products View") && check("Products", "Products Menu"))) {
    Products = getLinkItem("Products", 'sub30', <FiBox />, `/products`);
  }

  if ((check("ProductProperties", "ProductProperties View") && check("ProductProperties", "ProductProperties Menu"))) {
    ProductProperties = getLinkItem("Product Properties", 'sub33', <FiGrid />, `/products/properties`);
  }

  if ((check("ProductCoverages", "ProductCoverages View") && check("ProductCoverages", "ProductCoverages Menu"))) {
    ProductCoverages = getLinkItem("Product Coverage", 'sub36', <FiGrid />, `/products/coverages`);
  }

  if ((check("Booking", "Booking View") && check("Booking", "Booking Menu"))) {
    Booking = getLinkItem("Bookings", 'sub42', <FiBookOpen />, `/booking`);
  }

  if ((check("Enquiry", "Enquiry View") && check("Enquiry", "Enquiry Menu"))) {
    Enquiry = getLinkItem("Inquiries", 'sub43', <FiMessageSquare />, `/lead`);
  }

  if ((check("Activities", "Activities View") && check("Activities", "Activities Menu"))) {
    Activities = getLinkItem("Activities", 'sub60', <FiActivity />, `/activities`);
  }

  const items = useMemo(
    () =>
      [
        Dashboard,
        User,
        Customer,
        Role,
        Booking,
        Enquiry,
        Products,
        ProductProperties,
        ProductCoverages,
        Catalogs,
        Promotions,
        partners,
        testimonials,
        Activities,
      ].filter(Boolean),
    [
      Dashboard,
      User,
      Customer,
      Role,
      Booking,
      Enquiry,
      Products,
      ProductProperties,
      ProductCoverages,
      Catalogs,
      Promotions,
      partners,
      testimonials,
      Activities,
    ]
  );

  const { getActive, handleGetEditValue } = useContext(MainMenuActiveContext);
  return (
    <aside className={`MainDashboard__left dashboard-sidebar w-[18rem] max-lg:absolute max-lg:w-full max-lg:z-50 max-lg:h-svh transition-all duration-300 ${getActive ? "active" : ""}`}>
      <div className='closeButton hidden max-lg:grid cursor-pointer absolute bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] top-[.7rem] right-[.7rem]  place-items-center rounded-[.7rem] z-10' onClick={() => handleGetEditValue(false)}>
        <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="dashboard-sidebar__brand">
        <Link onClick={() => handleGetEditValue(false)} className="dashboard-sidebar__brandLink">
          <span className="dashboard-sidebar__brandBadge"><img src={require("../dist/webImages/logo.png")} className='rounded-[1rem]' alt="Luxury car" /></span>
          <div>
            <strong>QuickLease</strong>
            <p>Admin workspace</p>
          </div>
        </Link>
      </div>
      <div className="dashboard-sidebar__meta">
        <span>{profileData?.name}</span>
        <p>Minimal compact navigation</p>
      </div>
      <nav className='nav dashboard-sidebar__nav'>
        <Menu
          selectedKeys={selectedKey}
          mode="inline"
          theme="light"
          items={items}
        />
      </nav>
    </aside>
  )
}

export default LeftSide

