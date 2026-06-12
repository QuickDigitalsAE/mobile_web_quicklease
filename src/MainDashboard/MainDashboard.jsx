import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FiActivity,
  FiBell,
  FiBookOpen,
  FiBox,
  FiGrid,
  FiMessageSquare,
  FiShield,
  FiStar,
  FiUsers,
} from "react-icons/fi";

const moduleCards = [
  { key: "Users", title: "Users", hint: "Accounts and operators", icon: <FiUsers />, to: "/users" },
  { key: "Roles", title: "Roles", hint: "Permissions and access", icon: <FiShield />, to: "/role" },
  { key: "Booking", title: "Bookings", hint: "Reservations workflow", icon: <FiBookOpen />, to: "/booking" },
  { key: "Enquiry", title: "Inquiries", hint: "Leads and contact requests", icon: <FiMessageSquare />, to: "/lead" },
  { key: "Products", title: "Products", hint: "Inventory and listings", icon: <FiBox />, to: "/products" },
  { key: "ProductProperties", title: "Product Properties", hint: "Specs and attributes", icon: <FiGrid />, to: "/products/properties" },
  { key: "ProductCoverages", title: "Product Coverage", hint: "Protection and plans", icon: <FiGrid />, to: "/products/coverages" },
  { key: "Catalogs", title: "Catalog", hint: "Collections and categories", icon: <FiBookOpen />, to: "/catalogs" },
  { key: "Promotions", title: "Promotions", hint: "Offers and campaigns", icon: <FiBell />, to: "/promotions" },
  { key: "Partners", title: "Partners", hint: "Partner profiles", icon: <FiUsers />, to: "/partners" },
  { key: "Testimonials", title: "Testimonials", hint: "Social proof content", icon: <FiStar />, to: "/testimonials" },
  { key: "Activities", title: "Activities", hint: "Audit and activity logs", icon: <FiActivity />, to: "/activities" },
];

const MainDashboard = ({ permission, userdata }) => {
  const visibleModules = useMemo(
    () => moduleCards.filter((item) => permission?.[item.key]),
    [permission]
  );

  return (
    <section className="dashboard-home">
      <div className="dashboard-home__hero">
        <div>
          <span className="dashboard-home__eyebrow">Operations Overview</span>
          <h1>Compact control panel for daily management</h1>
          <p>
            Review active areas, move into modules quickly, and keep routine admin
            work focused without visual clutter.
          </p>
        </div>
      </div>

      <div className="dashboard-home__stats">
        <article>
          <span>Enabled modules</span>
          <strong>{visibleModules.length}</strong>
          <p>Based on your current permissions</p>
        </article>
        <article>
          <span>Workspace</span>
          <strong>Minimal</strong>
          <p>Optimized for dense admin workflows</p>
        </article>
        <article>
          <span>Focus mode</span>
          <strong>Compact UI</strong>
          <p>Cleaner spacing across forms and lists</p>
        </article>
      </div>

      <div className="dashboard-home__modules">
        {visibleModules.map((item) => (
          <Link key={item.key} to={item.to} className="dashboard-home__module" aria-label={`Open ${item.title}`}>
            <div className="dashboard-home__moduleIcon">{item.icon}</div>
            <div>
              <h2>{item.title}</h2>
              <p>{item.hint}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MainDashboard;
