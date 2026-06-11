import React, { useContext, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import HeaderProfile from './HeaderProfile'
import back from '../dist/webImages/back.svg'
import { MainMenuActiveContext } from '../context/MainMenuActiveContext'
import { MainLanguageContext } from '../context/MainLanguageContext'

const routeMeta = [
  { match: /^\/$/, title: 'Dashboard', subtitle: 'Overview of your workspace' },
  { match: /^\/profile$/, title: 'Profile', subtitle: 'Manage your account details', backPath: '/' },
  { match: /^\/quote$/, title: 'Quotes', subtitle: 'Review submitted quote requests' },
  { match: /^\/booking$/, title: 'Bookings', subtitle: 'Track reservations and status' },
  { match: /^\/lead$/, title: 'Inquiries', subtitle: 'Review incoming leads' },
  { match: /^\/users\/create$/, title: 'Create User', subtitle: 'Add a new team member account', backPath: '/users' },
  { match: /^\/users\/edit\/[^/]+$/, title: 'Edit User', subtitle: 'Update team member details', backPath: '/users' },
  { match: /^\/users$/, title: 'Users', subtitle: 'Manage team members and accounts' },
  { match: /^\/role\/create$/, title: 'Create Role', subtitle: 'Define a new permission set', backPath: '/role' },
  { match: /^\/role\/edit\/[^/]+$/, title: 'Edit Role', subtitle: 'Adjust role access and permissions', backPath: '/role' },
  { match: /^\/role$/, title: 'Roles', subtitle: 'Control access and permissions' },
  { match: /^\/catalogs\/create$/, title: 'Create Catalog', subtitle: 'Add a new catalog entry', backPath: '/catalogs' },
  { match: /^\/catalogs\/edit\/[^/]+$/, title: 'Edit Catalog', subtitle: 'Update your catalog structure', backPath: '/catalogs' },
  { match: /^\/catalogs$/, title: 'Catalog', subtitle: 'Organize your product collections' },
  { match: /^\/carwithdrivers\/edit\/[^/]+$/, title: 'Edit Car With Driver', subtitle: 'Update chauffeur listing details', backPath: '/carwithdrivers' },
  { match: /^\/carwithdrivers$/, title: 'Car With Driver', subtitle: 'Manage chauffeur listings and content' },
  { match: /^\/products\/properties\/create$/, title: 'Create Product Property', subtitle: 'Add a new structured attribute', backPath: '/products/properties' },
  { match: /^\/products\/properties\/edit\/[^/]+$/, title: 'Edit Product Property', subtitle: 'Update structured attribute settings', backPath: '/products/properties' },
  { match: /^\/products\/properties$/, title: 'Product Properties', subtitle: 'Control structured attributes' },
  { match: /^\/products\/coverages\/create$/, title: 'Create Product Coverage', subtitle: 'Add a new coverage option', backPath: '/products/coverages' },
  { match: /^\/products\/coverages\/edit\/[^/]+$/, title: 'Edit Product Coverage', subtitle: 'Update coverage details', backPath: '/products/coverages' },
  { match: /^\/products\/coverages$/, title: 'Product Coverage', subtitle: 'Configure coverage details' },
  { match: /^\/products\/create$/, title: 'Create Product', subtitle: 'Add a new inventory listing', backPath: '/products' },
  { match: /^\/products\/edit\/[^/]+$/, title: 'Edit Product', subtitle: 'Update inventory details and pricing', backPath: '/products' },
  { match: /^\/products$/, title: 'Products', subtitle: 'Manage active inventory' },
  { match: /^\/promo\/create$/, title: 'Create Promo Code', subtitle: 'Add a new promotional code', backPath: '/promo' },
  { match: /^\/promo\/edit\/[^/]+$/, title: 'Edit Promo Code', subtitle: 'Update promo code details', backPath: '/promo' },
  { match: /^\/promo$/, title: 'Promo Code', subtitle: 'Manage discount and offer codes' },
  { match: /^\/promotions\/create$/, title: 'Create Promotion', subtitle: 'Publish a new offer', backPath: '/promotions' },
  { match: /^\/promotions\/edit\/[^/]+$/, title: 'Edit Promotion', subtitle: 'Update campaign content', backPath: '/promotions' },
  { match: /^\/promotions$/, title: 'Promotions', subtitle: 'Publish offers and updates' },
  { match: /^\/partners\/create$/, title: 'Create Partner', subtitle: 'Add a new partner profile', backPath: '/partners' },
  { match: /^\/partners\/edit\/[^/]+$/, title: 'Edit Partner', subtitle: 'Update partner information', backPath: '/partners' },
  { match: /^\/partners$/, title: 'Partners', subtitle: 'Maintain partner records' },
  { match: /^\/blogs\/sidebar\/create$/, title: 'Create Sidebar Blog', subtitle: 'Add a new sidebar blog entry', backPath: '/blogs/sidebar' },
  { match: /^\/blogs\/sidebar\/edit\/[^/]+$/, title: 'Edit Sidebar Blog', subtitle: 'Update sidebar blog content', backPath: '/blogs/sidebar' },
  { match: /^\/blogs\/sidebar$/, title: 'Sidebar Blogs', subtitle: 'Manage sidebar blog content', backPath: '/blogs' },
  { match: /^\/blogs\/create$/, title: 'Create Blog', subtitle: 'Draft a new blog post', backPath: '/blogs' },
  { match: /^\/blogs\/edit\/[^/]+$/, title: 'Edit Blog', subtitle: 'Update blog content and metadata', backPath: '/blogs' },
  { match: /^\/blogs$/, title: 'Blogs', subtitle: 'Manage published blog content' },
  { match: /^\/push-notification\/create$/, title: 'Create Push Notification', subtitle: 'Compose a new mobile alert', backPath: '/push-notification' },
  { match: /^\/push-notification\/edit\/[^/]+$/, title: 'Edit Push Notification', subtitle: 'Update notification content and targeting', backPath: '/push-notification' },
  { match: /^\/push-notification$/, title: 'Notifications', subtitle: 'Manage outgoing alerts' },
  { match: /^\/testimonials\/create$/, title: 'Create Testimonial', subtitle: 'Add a new testimonial entry', backPath: '/testimonials' },
  { match: /^\/testimonials\/edit\/[^/]+$/, title: 'Edit Testimonial', subtitle: 'Update testimonial content', backPath: '/testimonials' },
  { match: /^\/testimonials$/, title: 'Testimonials', subtitle: 'Curate user trust signals' },
  { match: /^\/webcontent\/.+$/, title: 'Mobile Content', subtitle: 'Edit managed web and app content', backPath: '/webcontent' },
  { match: /^\/webcontent$/, title: 'Mobile Content', subtitle: 'Edit managed web and app content' },
  { match: /^\/activities\/auth$/, title: 'Activity Authorization', subtitle: 'Review authentication activity', backPath: '/activities' },
  { match: /^\/activities$/, title: 'Activities Reviews', subtitle: 'Inspect activity history and audits' },
  { match: /^\/reviews\/create$/, title: 'Create Review', subtitle: 'Add a new review item', backPath: '/reviews' },
  { match: /^\/reviews\/edit\/[^/]+$/, title: 'Edit Review', subtitle: 'Update review content', backPath: '/reviews' },
  { match: /^\/reviews$/, title: 'Reviews', subtitle: 'Manage review records and content' },
]

const languageFlags = {
  en: '🇬🇧',
  ar: '🇸🇦',
}

const Header = () => {
  const { handlelanguage, mainLanguage } = useContext(MainLanguageContext)
  const { handleGetEditValue } = useContext(MainMenuActiveContext)
  const location = useLocation()

  const pageMeta = useMemo(
    () => routeMeta.find((item) => item.match.test(location.pathname)) ?? routeMeta[0],
    [location.pathname]
  )

  const today = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(new Date()),
    []
  )

  return (
    <header className='header dashboard-header'>
      <div className="header__left dashboard-header__left">
        <div className='dashboard-header__toggle lg:hidden max-lg:block' onClick={() => handleGetEditValue(true)}>
          <FaBars className='text-[1.2rem]' />
        </div>
        {pageMeta.backPath && (
          <Link to={pageMeta.backPath} className="dashboard-header__back" aria-label={`Back to ${pageMeta.title}`}>
            <img src={back} className="dashboard-header__backIcon" alt="" />
          </Link>
        )}
        <div>
          <span className="dashboard-header__eyebrow">{today}</span>
          <h1>{pageMeta.title}</h1>
          <p>{pageMeta.subtitle}</p>
        </div>
      </div>
      <div className="header__right dashboard-header__right">
        <div className="inputBox dashboard-languageBox">
          <label htmlFor="language-switcher" className="sr-only">Language</label>
          <span className="dashboard-languageBox__flag" aria-hidden="true">
            {languageFlags[mainLanguage] ?? languageFlags.en}
          </span>
          <select
            id="language-switcher"
            value={mainLanguage}
            onChange={(e) => handlelanguage(e.target.value)}
            className='dashboard-languageBox__select'
            name="language"
          >
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
