import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import Button from '../Button';

const Months = ({ date, onChange }) => {
  const months = [...Array(12).keys()].map(i => ({
    label: moment().month(i).format('MMM'),
    value: i,
  }));

  return (
    <>
      <p className="grid-summary">{date.format('YYYY')}</p>
      <div className="calendar-grid month-grid">
        {months.map(({ label, value }) => (
          <Button
            className={classNames(
              "grid-item",
              'date-option',
              { 'grid-item--active': date.month() === value}
            )}
            onClick={() => onChange(value)}
          >
            {label}
          </Button>
        ))}
      </div>
    </>
  )
}

export default Months;