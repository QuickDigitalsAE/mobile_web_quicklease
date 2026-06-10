import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MainMenuActiveContext } from '../context/MainMenuActiveContext';
import { FaRegNewspaper } from "react-icons/fa";
import { Menu } from 'antd';
import { MdDashboard, MdOutlineAppSettingsAlt } from "react-icons/md";
import { LiaElementor } from "react-icons/lia";
import { CgWebsite } from "react-icons/cg";
import { IoMdPeople } from 'react-icons/io';
import { MainProfileContext } from '../context/MainProfileContext';


const links = {
  "/": "sub1",
  "/users": "sub2",
  "/users/create": "sub3",
  "/users/edit": "sub4",
  "/blogs": "sub11",
  "/blogs/create": "sub11",
  "/blogs/edit": "sub11",
  "/elements": "sub16",
  "/webcontent": "sub17",
  "/appcontent": "sub18",
  "/products/coverages": "sub36",
  "/products/coverages/create": "sub36",
  "/products/coverages/edit": "sub36",
};

function getItem(label, key, icon, children, type) {
  return { key, icon, children, label, type };

}

const LeftSide = ({ permissions, data }) => {
  const { handleProfileData, profileData } = useContext(MainProfileContext);
  useEffect(() => {
    handleProfileData(data)
  }, [])

  const location = useLocation();
  // let abc = []
  // if(location.pathname.includes("case") || location.pathname.includes("case/update") || location.pathname.includes("case/inquires")) {
  //     abc = ["sub3"]
  // }
  // else if(location.pathname.includes("services") || location.pathname.includes("service/category")) {
  //     abc = ["sub19"]
  // }
  // else {
  //     abc = []
  // }
  const [openKeys, setOpenKeys] = useState("");
  let a = location.pathname.split("/")
  a.pop()
  let pathsplit = location.pathname.includes("edit") ? a.join("/") : location.pathname;
  const [selectedKey, setSelectedKey] = useState([links[pathsplit]])
  const rootSubmenuKeys = [
    'sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6', 'sub7', 'sub8', 'sub9',
    'sub10', 'sub11', 'sub12', 'sub13', 'sub14', 'sub15', 'sub16', 'sub17',
    'sub18', 'sub19', 'sub20', 'sub21', 'sub22', 'sub23', 'sub24', 'sub25',
    'sub26', 'sub27', 'sub28', 'sub29', 'sub30', 'sub31', 'sub32', 'sub33',
    'sub34', 'sub35', 'sub36',
    'sub37', 'sub38', 'sub39', 'sub40', 'sub41'
    , 'sub42', 'sub43', 'sub44'
    , 'sub45', 'sub46', 'sub47', 'sub60', 'sub61', 'sub62', 'sub63', 'sub64', 'sub65', 'sub66', 'sub67', 'sub68'
  ];
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) == -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) == -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  let User = null
  let Role = null
  let partners = null
  let testimonials = null
  let Promotions = null
  let Blogs = null
  let Blogssidebar = null
  let WebContent = null
  let Catalogs = null
  let Carwithdriver = null
  let Products = null
  let ProductProperties = null
  let ProductCoverages = null
  let Promo = null
  let Booking = null
  let Enquiry = null
  let Review = null
  let Activities = null
  let Dashboard = getItem(<Link to={`/`}>Dashboard</Link>, 'sub1', <MdDashboard />)

  const check = (module, action) => permissions?.[module]?.includes(action);


  if ((check("Users", "User View") && check("Users", "User Menu"))) {
    const children = [];
    if (check("Users", "User Add")) children.push(getItem(<Link to="/users/create">Create</Link>, 'sub2-1'));
    if (check("Users", "User View")) children.push(getItem(<Link to="/users">User List</Link>, 'sub2-2'));
    User = getItem("User", 'sub2', <IoMdPeople />, children);
  }

  if ((check("Roles", "Role View") && check("Roles", "Role Menu"))) {
    const children = [];
    if (check("Roles", "Role Add")) children.push(getItem(<Link to="/role/create">Create</Link>, 'sub5-1'));
    if (check("Roles", "Role View")) children.push(getItem(<Link to="/role">User List</Link>, 'sub5-2'));
    Role = getItem("Role", 'sub5', <IoMdPeople />, children);
  }

  if ((check("Partners", "Partner View") && check("Partners", "Partner Menu"))) {
    const children = [];
    if (check("Partners", "Partner Add")) children.push(getItem(<Link to="/partners/create">Create</Link>, 'sub14-1'));
    if (check("Partners", "Partner View")) children.push(getItem(<Link to="/partners">Partners List</Link>, 'sub14-2'));
    partners = getItem("Partners", 'sub14', <IoMdPeople />, children);
  }

  if ((check("Testimonials", "Testimonial View") && check("Testimonials", "Testimonial Menu"))) {
    const children = [];
    if (check("Testimonials", "Testimonial Add")) children.push(getItem(<Link to="/Testimonials/create">Create</Link>, 'sub26-1'));
    if (check("Testimonials", "Testimonial View")) children.push(getItem(<Link to="/Testimonials">Testimonials List</Link>, 'sub26-2'));
    testimonials = getItem("Testimonials", 'sub26', <IoMdPeople />, children);
  }

  if ((check("Promotions", "Promotion View") && check("Promotions", "Promotion Menu"))) {
    const children = [];
    if (check("Promotions", "Promotion Add")) children.push(getItem(<Link to="/promotions/create">Create</Link>, 'sub11-1'));
    if (check("Promotions", "Promotion View")) children.push(getItem(<Link to="/promotions">Promotions List</Link>, 'sub11-2'));
    Promotions = getItem("Promotion", 'sub11', <IoMdPeople />, children);
  }

  if ((check("Blogs", "Blogs View") && check("Blogs", "Blogs Menu"))) {
    const children = [];
    if (check("Blogs", "Blogs Add")) children.push(getItem(<Link to="/blogs/create">Create</Link>, 'sub8-1'));
    if (check("Blogs", "Blogs View")) children.push(getItem(<Link to="/blogs">Blogs List</Link>, 'sub8-2'));
    Blogs = getItem("Blogs", 'sub8', <IoMdPeople />, children);
  }

  if ((check("Blogs", "Blogs View") && check("Blogs", "Blogs Menu"))) {
    const children = [];
    if (check("Blogs", "Blogs Add")) children.push(getItem(<Link to="/blogs/sidebar/create">Create</Link>, 'sub66-1'));
    if (check("Blogs", "Blogs View")) children.push(getItem(<Link to="/blogs/sidebar">Blogs Sidebar List</Link>, 'sub66-2'));
    Blogssidebar = getItem("Blogs Slider", 'sub66', <IoMdPeople />, children);
  }

  if ((check("WebContents", "WebContents View") && check("WebContents", "WebContents Menu"))) {
    WebContent = getItem(<Link to="/webcontent">WebContent</Link>, 'sub21', <CgWebsite />);
  }

  let quote = getItem(<Link to={`/quote`}>Quote</Link>, 'sub22', <MdOutlineAppSettingsAlt />)

  if ((check("Catalogs", "Catalogs View") && check("Catalogs", "Catalogs Menu"))) {
    const children = [];
    if (check("Catalogs", "Catalogs Add")) children.push(getItem(<Link to="/catalogs/create">Create</Link>, 'sub28'));
    if (check("Catalogs", "Catalogs View")) children.push(getItem(<Link to="/catalogs">Catalogs List</Link>, 'sub29'));
    Catalogs = getItem("Catalogs", 'sub27', <FaRegNewspaper />, children);
  }

  if ((check("CarWithDriver", "CarWithDriver View") && check("CarWithDriver", "CarWithDriver Menu"))) {
    const children = [];
    if (check("CarWithDriver", "CarWithDriver View")) children.push(getItem(<Link to="/carwithdrivers">Car With Driver List</Link>, 'sub47'));
    Carwithdriver = getItem("Car With Driver", 'sub45', <FaRegNewspaper />, children);
  }

  if ((check("Products", "Products View") && check("Products", "Products Menu"))) {
    const children = [];
    if (check("Products", "Products Add")) children.push(getItem(<Link to="/products/create">Create</Link>, 'sub31'));
    if (check("Products", "Products View")) children.push(getItem(<Link to="/products">Products List</Link>, 'sub32'));
    Products = getItem("Products", 'sub30', <FaRegNewspaper />, children);
  }

  if ((check("ProductProperties", "ProductProperties View") && check("ProductProperties", "ProductProperties Menu"))) {
    const children = [];
    if (check("ProductProperties", "ProductProperties Add")) children.push(getItem(<Link to="/products/properties/create">Create</Link>, 'sub34'));
    if (check("ProductProperties", "ProductProperties View")) children.push(getItem(<Link to="/products/properties">Product Properties List</Link>, 'sub35'));
    ProductProperties = getItem("Products Properties", 'sub33', <FaRegNewspaper />, children);
  }

  if ((check("ProductCoverages", "ProductCoverages View") && check("ProductCoverages", "ProductCoverages Menu"))) {
    const children = [];
    if (check("ProductCoverages", "ProductCoverages Add")) children.push(getItem(<Link to="/products/coverages/create">Create</Link>, 'sub37'));
    if (check("ProductCoverages", "ProductCoverages View")) children.push(getItem(<Link to="/products/coverages">Product Properties List</Link>, 'sub38'));
    ProductCoverages = getItem("Products Coverages", 'sub36', <FaRegNewspaper />, children);
  }

  if ((check("PromoCode", "PromoCode View") && check("PromoCode", "PromoCode Menu"))) {
    const children = [];
    if (check("PromoCode", "PromoCode Add")) children.push(getItem(<Link to="/promo/create">Create</Link>, 'sub40'));
    if (check("PromoCode", "PromoCode View")) children.push(getItem(<Link to="/promo">Promo List</Link>, 'sub41'));
    Promo = getItem("Promo", 'sub39', <FaRegNewspaper />, children);
  }
  if ((check("PushNotification", "PushNotification View") && check("PushNotification", "PushNotification Menu"))) {
    const children = [];
    if (check("PushNotification", "PushNotification Add")) children.push(getItem(<Link to="/push-notification/create">Create</Link>, 'sub60'));
    if (check("PushNotification", "PushNotification View")) children.push(getItem(<Link to="/push-notification">Push Notification List</Link>, 'sub61'));
    Promo = getItem("Push Notification", 'sub62', <FaRegNewspaper />, children);
  }

  if ((check("Booking", "Booking View") && check("Booking", "Booking Menu"))) {
    Booking = getItem(<Link to="/booking">Booking</Link>, 'sub42', <MdDashboard />);
  }

  if ((check("Enquiry", "Enquiry View") && check("Enquiry", "Enquiry Menu"))) {
    Enquiry = getItem(<Link to="/lead">Enquiry</Link>, 'sub43', <MdDashboard />);
  }

  if ((check("Activities", "Activities View") && check("Activities", "Activities Menu"))) {
    const children = [];
    if (check("Activities", "Activities View")) children.push(getItem(<Link to="/activities">Activities Logs</Link>, 'sub61'));
    if (check("Activities", "Activities View")) children.push(getItem(<Link to="/activities/auth">Activities Auth</Link>, 'sub62'));
    Activities = getItem("Activities", 'sub60', <FaRegNewspaper />, children);
  }
  
  if ((check("Reviews", "Reviews View") && check("Reviews", "Reviews Menu"))) {
    Review = getItem(<Link to="/reviews">Reviews</Link>, 'sub63', <MdDashboard />);
  }

  let items = [
    Dashboard,
    User,
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
    Review,
  ];



  const { getActive, handleGetEditValue } = useContext(MainMenuActiveContext);
  return (
    <div className={`MainDashboard__left w-[18rem] bg-[#1C1C1C] max-lg:absolute max-lg:w-full  max-lg:z-50 max-lg:h-svh transition-all duration-300  py-5 pl-4 ${getActive ? "active" : ""}`}>
      <div className='closeButton hidden max-lg:grid cursor-pointer absolute bg-[#FFCEDA] w-[2rem] h-[2rem] p-[.6rem] top-[.7rem] right-[.7rem]  place-items-center rounded-[.7rem] z-10' onClick={() => handleGetEditValue(false)}>
        <svg className='w-full h-full' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.8612 1.34766L0.951172 16.2567M15.8612 16.2577L0.951172 1.34863" stroke="#ED2656" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="logo pb-11 px-6">
        <Link onClick={() => handleGetEditValue(false)}>
          <img src={require("../dist/webImages/logo.webp")} className='w-[6rem] mx-auto max-lg:m-0' alt="" />
        </Link>
      </div>
      <nav className='nav max-h-[70vh] overflow-y-auto pr-4'>
        <Menu
          defaultSelectedKeys={selectedKey}
          defaultOpenKeys={["sub19"]}
          mode="inline"
          theme="light"
          items={items}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
        />
      </nav>
      {/* {(data?.role_id !== 10) && <div className='mt-8'><Link onClick={() => handleGetEditValue(false)} to={"/setting"} className={`font-Mluvka text-[1.063rem] px-8 text-white ${location.pathname.includes("setting") ? "text-secondary" : ""}`}>Settings</Link></div>} */}   
    </div>
  )
}

export default LeftSide



