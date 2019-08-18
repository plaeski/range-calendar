import React from 'react';
import classNames from 'classnames';
import Button from '../Button';

const Years = ({ currentYear, onChange }) => {
  const startOfRange = Math.floor(currentYear / 12) * 12;
  const displayYears = [...Array(12).keys()].map(i => startOfRange + i);
  return (
    <>
      <p className="grid-summary">{displayYears[0]} - {displayYears[11]}</p>
      <div className="calendar-grid year-grid">
        {displayYears.map(year =>(
          <Button
            className={classNames(
              "grid-item",
              'date-option',
              { 'grid-item--active': currentYear === year}
            )}
            onClick={() => onChange(year)}
          >
            {year}
          </Button>
        ))}
      </div>
    </>
  )
}

export default Years;