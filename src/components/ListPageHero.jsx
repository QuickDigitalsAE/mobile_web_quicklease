import React from "react";

const ListPageHero = ({ title, count, subtitle, action, stats = [] }) => {
  return (
    <section className="users-table-page__hero">
      <div className="users-table-page__heroHead">
        <div>
          <h6 className="users-table-page__heroTitle font-Mluvka capitalize">
            <span>{count}</span> {title}
          </h6>
          {subtitle && <p className="users-table-page__subtitle">{subtitle}</p>}
        </div>
        {action ? <div className="users-table-page__heroAction">{action}</div> : null}
      </div>

      {stats.length > 0 ? (
        <div className="users-table-page__heroStats">
          {stats.map((item) => (
            <article key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default ListPageHero;
