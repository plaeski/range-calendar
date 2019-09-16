import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import Button from '../../Button';

const Years = ({ date, conditionalClasses, handleClick, handleHover }) => {
  const [yearOffset, setYearOffset] = useState(0);
  useEffect(() => setYearOffset(0), [date]);

  const selectedYear = date.year();
  const startOfRange = Math.floor(selectedYear / 12) * 12;
  const displayYears = [...Array(12).keys()].map(i => startOfRange + i);

  return (
    <>
      <div className="grid-header">
        <button onClick={() => setYearOffset(yearOffset - 1)}>
          <i className="material-icons">keyboard_arrow_left</i>
        </button>
          <p className="grid-summary">{displayYears[0] + (yearOffset * 12)} - {displayYears[11] + (yearOffset * 12)}</p>
        <button onClick={() => setYearOffset(yearOffset + 1)}>
          <i className="material-icons">keyboard_arrow_right</i>
        </button>
      </div>
      <div className="calendar-grid year-grid">
        {displayYears.map(year => {
          const yearValue = moment(date).year(year).add(yearOffset * 12, 'year').startOf('year').unix()
          return (
            <Button
              className={classNames(
                "grid-item",
                'date-option',
                {
                  'grid-item--active': selectedYear === yearValue,
                  ...conditionalClasses(yearValue),
                }
              )}
              id={`calendar-option-${yearValue}`}
              onClick={() => handleClick(yearValue)}
              onMouseOver={() => handleHover(yearValue)}
              onFocus={() => handleHover(yearValue)}
            >
              {moment(date).year(year).add(yearOffset * 12, 'year').startOf('year').format('YYYY')}
            </Button>
          )
        })}
      </div>
    </>
  )
}

Years.defaultProps = {
  handleHover: () => null,
  conditionalClasses: () => ({}),
}

Years.propTypes = {
  handleHover: PropTypes.func,
  conditionalClasses: PropTypes.func,
}


export default Years;