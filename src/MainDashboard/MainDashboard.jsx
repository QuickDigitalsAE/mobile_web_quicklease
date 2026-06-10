import React, { useMemo } from "react";
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
  { key: "Users", title: "Users", hint: "Accounts and operators", icon: <FiUsers /> },
  { key: "Roles", title: "Roles", hint: "Permissions and access", icon: <FiShield /> },
  { key: "Booking", title: "Bookings", hint: "Reservations workflow", icon: <FiBookOpen /> },
  { key: "Enquiry", title: "Inquiries", hint: "Leads and contact requests", icon: <FiMessageSquare /> },
  { key: "Products", title: "Products", hint: "Inventory and listings", icon: <FiBox /> },
  { key: "ProductProperties", title: "Product Properties", hint: "Specs and attributes", icon: <FiGrid /> },
  { key: "ProductCoverages", title: "Product Coverage", hint: "Protection and plans", icon: <FiGrid /> },
  { key: "Catalogs", title: "Catalog", hint: "Collections and categories", icon: <FiBookOpen /> },
  { key: "Promotions", title: "Promotions", hint: "Offers and campaigns", icon: <FiBell /> },
  { key: "Partners", title: "Partners", hint: "Partner profiles", icon: <FiUsers /> },
  { key: "Testimonials", title: "Testimonials", hint: "Social proof content", icon: <FiStar /> },
  { key: "WebContents", title: "Mobile Content", hint: "App and web managed content", icon: <FiBell /> },
  { key: "Activities", title: "Activities Reviews", hint: "Audit and activity logs", icon: <FiActivity /> },
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
        <div className="dashboard-home__usercard">
          <span className="dashboard-home__avatar">
            {userdata?.name?.charAt?.(0) ?? "A"}
          </span>
          <div>
            <strong>{userdata?.name}</strong>
            <p>{userdata?.email}</p>
          </div>
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
          <article key={item.key} className="dashboard-home__module">
            <div className="dashboard-home__moduleIcon">{item.icon}</div>
            <div>
              <h2>{item.title}</h2>
              <p>{item.hint}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default MainDashboard;
