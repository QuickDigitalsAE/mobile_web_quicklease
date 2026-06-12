import React, { useContext, useEffect, useMemo, useState } from 'react'
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
  "/users/create": "sub3",
  "/users/edit": "sub4",
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
  let Catalogs = null
  let Products = null
  let ProductProperties = null
  let ProductCoverages = null
  let Booking = null
  let Enquiry = null
  let Activities = null
  let Dashboard = getItem(<Link to={`/`}>Dashboard</Link>, 'sub1', <FiLayout />)

  const check = (module, action) => permissions?.[module]?.includes(action);

  if ((check("Users", "User View") && check("Users", "User Menu"))) {
    const children = [];
    if (check("Users", "User Add")) children.push(getItem(<Link to="/users/create">Create</Link>, 'sub2-1'));
    if (check("Users", "User View")) children.push(getItem(<Link to="/users">User List</Link>, 'sub2-2'));
    User = getItem("Users", 'sub2', <FiUsers />, children);
  }

  if ((check("Roles", "Role View") && check("Roles", "Role Menu"))) {
    const children = [];
    if (check("Roles", "Role Add")) children.push(getItem(<Link to="/role/create">Create</Link>, 'sub5-1'));
    if (check("Roles", "Role View")) children.push(getItem(<Link to="/role">Role List</Link>, 'sub5-2'));
    Role = getItem("Roles", 'sub5', <FiShield />, children);
  }

  if ((check("Partners", "Partner View") && check("Partners", "Partner Menu"))) {
    const children = [];
    if (check("Partners", "Partner Add")) children.push(getItem(<Link to="/partners/create">Create</Link>, 'sub14-1'));
    if (check("Partners", "Partner View")) children.push(getItem(<Link to="/partners">Partners List</Link>, 'sub14-2'));
    partners = getItem("Partners", 'sub14', <FiUsers />, children);
  }

  if ((check("Testimonials", "Testimonial View") && check("Testimonials", "Testimonial Menu"))) {
    const children = [];
    if (check("Testimonials", "Testimonial Add")) children.push(getItem(<Link to="/Testimonials/create">Create</Link>, 'sub26-1'));
    if (check("Testimonials", "Testimonial View")) children.push(getItem(<Link to="/Testimonials">Testimonials List</Link>, 'sub26-2'));
    testimonials = getItem("Testimonials", 'sub26', <FiStar />, children);
  }

  if ((check("Promotions", "Promotion View") && check("Promotions", "Promotion Menu"))) {
    const children = [];
    if (check("Promotions", "Promotion Add")) children.push(getItem(<Link to="/promotions/create">Create</Link>, 'sub11-1'));
    if (check("Promotions", "Promotion View")) children.push(getItem(<Link to="/promotions">Promotions List</Link>, 'sub11-2'));
    Promotions = getItem("Promotions", 'sub11', <FiBell />, children);
  }

  if ((check("Catalogs", "Catalogs View") && check("Catalogs", "Catalogs Menu"))) {
    const children = [];
    if (check("Catalogs", "Catalogs Add")) children.push(getItem(<Link to="/catalogs/create">Create</Link>, 'sub28'));
    if (check("Catalogs", "Catalogs View")) children.push(getItem(<Link to="/catalogs">Catalogs List</Link>, 'sub29'));
    Catalogs = getItem("Catalog", 'sub27', <FiBookOpen />, children);
  }

  if ((check("Products", "Products View") && check("Products", "Products Menu"))) {
    const children = [];
    if (check("Products", "Products Add")) children.push(getItem(<Link to="/products/create">Create</Link>, 'sub31'));
    if (check("Products", "Products View")) children.push(getItem(<Link to="/products">Products List</Link>, 'sub32'));
    Products = getItem("Products", 'sub30', <FiBox />, children);
  }

  if ((check("ProductProperties", "ProductProperties View") && check("ProductProperties", "ProductProperties Menu"))) {
    const children = [];
    if (check("ProductProperties", "ProductProperties Add")) children.push(getItem(<Link to="/products/properties/create">Create</Link>, 'sub34'));
    if (check("ProductProperties", "ProductProperties View")) children.push(getItem(<Link to="/products/properties">Product Properties List</Link>, 'sub35'));
    ProductProperties = getItem("Product Properties", 'sub33', <FiGrid />, children);
  }

  if ((check("ProductCoverages", "ProductCoverages View") && check("ProductCoverages", "ProductCoverages Menu"))) {
    const children = [];
    if (check("ProductCoverages", "ProductCoverages Add")) children.push(getItem(<Link to="/products/coverages/create">Create</Link>, 'sub37'));
    if (check("ProductCoverages", "ProductCoverages View")) children.push(getItem(<Link to="/products/coverages">Coverage List</Link>, 'sub38'));
    ProductCoverages = getItem("Product Coverage", 'sub36', <FiGrid />, children);
  }

  if ((check("Booking", "Booking View") && check("Booking", "Booking Menu"))) {
    Booking = getItem(<Link to="/booking">Bookings</Link>, 'sub42', <FiBookOpen />);
  }

  if ((check("Enquiry", "Enquiry View") && check("Enquiry", "Enquiry Menu"))) {
    Enquiry = getItem(<Link to="/lead">Inquiries</Link>, 'sub43', <FiMessageSquare />);
  }

  if ((check("Activities", "Activities View") && check("Activities", "Activities Menu"))) {
    const children = [];
    if (check("Activities", "Activities View")) children.push(getItem(<Link to="/activities">Activities Logs</Link>, 'sub61'));
    if (check("Activities", "Activities View")) children.push(getItem(<Link to="/activities/auth">Activities Auth</Link>, 'sub62'));
    Activities = getItem("Activities", 'sub60', <FiActivity />, children);
  }

  const items = useMemo(
    () =>
      [
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
      ].filter(Boolean),
    [
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
          defaultSelectedKeys={selectedKey}
          defaultOpenKeys={["sub19"]}
          mode="inline"
          theme="light"
          items={items}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
        />
      </nav>
    </aside>
  )
}

export default LeftSide

