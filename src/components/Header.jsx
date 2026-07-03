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
  { match: /^\/booking$/, title: 'Bookings', subtitle: 'Track reservations and status' },
  { match: /^\/lead$/, title: 'Inquiries', subtitle: 'Review incoming leads' },
  { match: /^\/users\/create$/, title: 'Create User', subtitle: 'Add a new team member account', backPath: '/users' },
  { match: /^\/users\/edit\/[^/]+$/, title: 'Edit User', subtitle: 'Update team member details', backPath: '/users' },
  { match: /^\/users$/, title: 'Users', subtitle: 'Manage team members and accounts' },
  { match: /^\/customers\/create$/, title: 'Create Customer', subtitle: 'Add a new customer record', backPath: '/customers' },
  { match: /^\/customers\/edit\/[^/]+$/, title: 'Edit Customer', subtitle: 'Update customer details', backPath: '/customers' },
  { match: /^\/customers$/, title: 'Customers', subtitle: 'Manage customer records' },
  { match: /^\/guidance\/create$/, title: 'Create Guidance', subtitle: 'Add a new guidance record', backPath: '/guidance' },
  { match: /^\/guidance\/edit\/[^/]+$/, title: 'Edit Guidance', subtitle: 'Update guidance details', backPath: '/guidance' },
  { match: /^\/guidance$/, title: 'Guidance', subtitle: 'Manage app guidance content' },
  { match: /^\/role\/create$/, title: 'Create Role', subtitle: 'Define a new permission set', backPath: '/role' },
  { match: /^\/role\/edit\/[^/]+$/, title: 'Edit Role', subtitle: 'Adjust role access and permissions', backPath: '/role' },
  { match: /^\/role$/, title: 'Roles', subtitle: 'Control access and permissions' },
  { match: /^\/catalogs\/create$/, title: 'Create Catalog', subtitle: 'Add a new catalog entry', backPath: '/catalogs' },
  { match: /^\/catalogs\/edit\/[^/]+$/, title: 'Edit Catalog', subtitle: 'Update your catalog structure', backPath: '/catalogs' },
  { match: /^\/catalogs$/, title: 'Catalog', subtitle: 'Organize your product collections' },
  { match: /^\/products\/properties\/create$/, title: 'Create Product Property', subtitle: 'Add a new structured attribute', backPath: '/products/properties' },
  { match: /^\/products\/properties\/edit\/[^/]+$/, title: 'Edit Product Property', subtitle: 'Update structured attribute settings', backPath: '/products/properties' },
  { match: /^\/products\/properties$/, title: 'Product Properties', subtitle: 'Control structured attributes' },
  { match: /^\/products\/coverages\/create$/, title: 'Create Product Coverage', subtitle: 'Add a new coverage option', backPath: '/products/coverages' },
  { match: /^\/products\/coverages\/edit\/[^/]+$/, title: 'Edit Product Coverage', subtitle: 'Update coverage details', backPath: '/products/coverages' },
  { match: /^\/products\/coverages$/, title: 'Product Coverage', subtitle: 'Configure coverage details' },
  { match: /^\/products\/create$/, title: 'Create Product', subtitle: 'Add a new inventory listing', backPath: '/products' },
  { match: /^\/products\/edit\/[^/]+$/, title: 'Edit Product', subtitle: 'Update inventory details and pricing', backPath: '/products' },
  { match: /^\/products$/, title: 'Products', subtitle: 'Manage active inventory' },
  { match: /^\/promotions\/create$/, title: 'Create Promotion', subtitle: 'Publish a new offer', backPath: '/promotions' },
  { match: /^\/promotions\/edit\/[^/]+$/, title: 'Edit Promotion', subtitle: 'Update campaign content', backPath: '/promotions' },
  { match: /^\/promotions$/, title: 'Promotions', subtitle: 'Publish offers and updates' },
  { match: /^\/partners\/create$/, title: 'Create Partner', subtitle: 'Add a new partner profile', backPath: '/partners' },
  { match: /^\/partners\/edit\/[^/]+$/, title: 'Edit Partner', subtitle: 'Update partner information', backPath: '/partners' },
  { match: /^\/partners$/, title: 'Partners', subtitle: 'Maintain partner records' },
  { match: /^\/testimonials\/create$/, title: 'Create Testimonial', subtitle: 'Add a new testimonial entry', backPath: '/testimonials' },
  { match: /^\/testimonials\/edit\/[^/]+$/, title: 'Edit Testimonial', subtitle: 'Update testimonial content', backPath: '/testimonials' },
  { match: /^\/testimonials$/, title: 'Testimonials', subtitle: 'Curate user trust signals' },
  { match: /^\/activities\/auth$/, title: 'Activity Authorization', subtitle: 'Review authentication activity', backPath: '/activities' },
  { match: /^\/activities$/, title: 'Activities', subtitle: 'Inspect activity history and audits' },
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
          {/* <span className="dashboard-header__eyebrow">{today}</span> */}
          <h1>{pageMeta.title}</h1>
          <p>{pageMeta.subtitle}</p>
        </div>
      </div>
      <div className="header__right dashboard-header__right">
        <div className="inputBox dashboard-languageBox">
          <label htmlFor="language-switcher" className="sr-only">Language</label>
          {/* <span className="dashboard-languageBox__flag" aria-hidden="true">
            {languageFlags[mainLanguage] ?? languageFlags.en}
          </span> */}
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
