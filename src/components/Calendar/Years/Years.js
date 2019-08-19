import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../../Button';

const Years = ({ date, conditionalClasses, handleClick, handleHover }) => {
  const selectedYear = date.year();
  const startOfRange = Math.floor(selectedYear / 12) * 12;
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
              {
                'grid-item--active': selectedYear === year,
                ...conditionalClasses(year),
              }
            )}
            onClick={() => handleClick(year)}
            onMouseOver={() => handleHover(year)}
            onFocus={() => handleHover(year)}
          >
            {year}
          </Button>
        ))}
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