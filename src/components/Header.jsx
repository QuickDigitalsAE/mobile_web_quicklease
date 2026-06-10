import React, { useContext, useMemo } from 'react'
import HeaderProfile from './HeaderProfile'
import { FaBars } from 'react-icons/fa'
import { MainMenuActiveContext } from '../context/MainMenuActiveContext'
import { MainLanguageContext } from '../context/MainLanguageContext'
import { useLocation } from 'react-router-dom'

const pageTitles = {
  "/": { title: "Dashboard", subtitle: "Overview of your workspace" },
  "/users": { title: "Users", subtitle: "Manage team members and accounts" },
  "/role": { title: "Roles", subtitle: "Control access and permissions" },
  "/booking": { title: "Bookings", subtitle: "Track reservations and status" },
  "/lead": { title: "Inquiries", subtitle: "Review incoming leads" },
  "/products": { title: "Products", subtitle: "Manage active inventory" },
  "/products/properties": { title: "Product Properties", subtitle: "Control structured attributes" },
  "/products/coverages": { title: "Product Coverage", subtitle: "Configure coverage details" },
  "/catalogs": { title: "Catalog", subtitle: "Organize your product collections" },
  "/promotions": { title: "Promotions", subtitle: "Publish offers and updates" },
  "/push-notification": { title: "Notifications", subtitle: "Manage outgoing alerts" },
  "/partners": { title: "Partners", subtitle: "Maintain partner records" },
  "/testimonials": { title: "Testimonials", subtitle: "Curate user trust signals" },
  "/webcontent": { title: "Mobile Content", subtitle: "Edit managed web and app content" },
  "/activities": { title: "Activities Reviews", subtitle: "Inspect activity history and audits" },
};

const Header = () => {
  const { handlelanguage,mainLanguage } = useContext(MainLanguageContext);
  const { handleGetEditValue } = useContext(MainMenuActiveContext);
  const location = useLocation();
  const pageMeta = useMemo(() => {
    const exact = pageTitles[location.pathname];
    if (exact) return exact;
    const match = Object.entries(pageTitles).find(([path]) => location.pathname.startsWith(path) && path !== "/");
    return match?.[1] ?? pageTitles["/"];
  }, [location.pathname]);
  const today = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date()),
    []
  );

  return (
    <header className='header dashboard-header'>
      <div className="header__left dashboard-header__left">
        <div className='dashboard-header__toggle hidden max-lg:block' onClick={() => handleGetEditValue(true)}>
          <FaBars className='text-[1.2rem]'/>
        </div>
        <div>
          <span className="dashboard-header__eyebrow">{today}</span>
          <h1>{pageMeta.title}</h1>
          <p>{pageMeta.subtitle}</p>
        </div>
      </div>
      <div className="header__right dashboard-header__right">
        <div className="inputBox dashboard-languageBox">
          <label htmlFor="language-switcher" className="sr-only">Language</label>
          <select id="language-switcher" value={mainLanguage} onChange={(e) => handlelanguage(e.target.value)} className='dashboard-languageBox__select' name="language">
            <option value="en">English</option>
            <option value="ar">Arabic</option>
          </select>
        </div>
        <div className='profile dashboard-header__profile'>
          <HeaderProfile />
        </div>
      </div>
    </header>
  )
}

export default Header
