import React from 'react';
import { Field } from 'formik';

const StatusToggle = ({
  name,
  label,
  description,
  id,
  value = "1",
  checkedLabel = "Enable",
}) => {
  const inputId = id || `${name}-toggle`;

  return (
    <section className="user-create-page__section user-create-page__section--toggle">
      <div className="user-create-page__toggleRow">
        <div>
          <h3>{label}</h3>
          {description ? <p>{description}</p> : null}
        </div>
        <label className="user-create-page__switch" htmlFor={inputId}>
          <Field name={name} id={inputId} type="checkbox" value={value} className="sr-only peer" />
          <span className="user-create-page__switchTrack"></span>
          <span className="user-create-page__switchLabel">{checkedLabel}</span>
        </label>
      </div>
    </section>
  );
};

export default StatusToggle;
