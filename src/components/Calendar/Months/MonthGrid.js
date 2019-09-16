import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import Button from '../../Button';

const MonthGrid = ({ date, handleClick, handleHover, conditionalClasses, ...props }) => {
  const [monthOffset, setMonthOffset] = useState(0);
  useEffect(() => setMonthOffset(0), [date]);

  const months = [...Array(12).keys()].map(i => ({
    label: moment().month(i).format('MMM'),
    value: i,
  }));

  return (
    <>
      <div className="grid-header">
        <button onClick={() => setMonthOffset(monthOffset - 1)}>
          <i className="material-icons">keyboard_arrow_left</i>
        </button>
        <p className="grid-summary">{moment(date).add(monthOffset, 'year').format('YYYY')}</p>
        <button onClick={() => setMonthOffset(monthOffset + 1)}>
          <i className="material-icons">keyboard_arrow_right</i>
        </button>
      </div>
      <div className="calendar-grid month-grid">
        {months.map(({ label, value }) => {
          const monthValue = moment(date).add(monthOffset, 'year').month(value).startOf('month').unix()
          return (
            <Button
              className={classNames(
                "grid-item",
                'date-option',
                conditionalClasses(monthValue),
              )}
              id={`calendar-option-${monthValue}`}
              onMouseOver={() => handleHover(monthValue)}
              onFocus={() => handleHover(monthValue)}
              onClick={() => handleClick(monthValue)}
            >
              {label}
            </Button>
          )
        })}
      </div>
    </>
  )
}

MonthGrid.defaultProps = {
  handleHover: () => null,
  conditionalClasses: () => ({}),
}

MonthGrid.propTypes = {
  handleHover: PropTypes.func,
  conditionalClasses: PropTypes.func,
}

export default MonthGrid;