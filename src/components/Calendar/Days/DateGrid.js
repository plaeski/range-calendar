import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import Button from '../../Button';

const createDateEntries = (totalDays, dayOffset) => {
  let days = [...Array(totalDays).keys()].map(i => i + 1);

  if (dayOffset > 0) {
    const placeholders = [...Array(dayOffset).keys()].map(() => '');
    days = [...placeholders, ...days];
  }

  return days;
}

const generateHeader = [...Array(7).keys()].map(i => (
  <div key={i} className="grid-item" tabIndex="-1">
    {moment().day(i).format('ddd')}
  </div>
));

const DateGrid = ({ currentMonth, conditionalClasses, handleClick, handleHover }) => {
  const [monthOffset, setMonthOffset] = useState(0);
  useEffect(() => setMonthOffset(0), [currentMonth]);

  const offsetMonth = moment(currentMonth).add(monthOffset, 'months');
  const days = createDateEntries(offsetMonth.daysInMonth(), offsetMonth.day())

  return (
    <>
      <div className="grid-header">
        <button onClick={() => setMonthOffset(monthOffset - 1)}>
          <i className="material-icons">keyboard_arrow_left</i>
        </button>
        <p className="grid-summary">{offsetMonth.format('MMMM YYYY')}</p>
        <button onClick={() => setMonthOffset(monthOffset + 1)}>
          <i className="material-icons">keyboard_arrow_right</i>
        </button>
      </div>
      <div className="calendar-grid date-grid">
        {generateHeader}
        {days.map(day => {
          const dayValue = day === '' ?
            '' : offsetMonth.date(day).startOf('day')
          const dayTimestamp = day === '' ? '' : dayValue.unix();
          return (
            <Button
              onClick={() => handleClick(dayTimestamp)}
              onMouseOver={() => handleHover(dayTimestamp)}
              onFocus={() => handleHover(dayTimestamp)}
              tabIndex={dayTimestamp === '' ? -1 : null}
              className={classNames(
                "grid-item",
                {
                  ...conditionalClasses(dayTimestamp),
                  'date-option': dayTimestamp !== '',
                  'placeholder': dayTimestamp === '',
                }
              )}
              >
              {dayValue && dayValue.format('DD')}
            </Button>  
          )
        })}
      </div>
    </>
  );
};

DateGrid.defaultProps = {
  handleHover: () => null,
  conditionalClasses: () => ({}),
}

DateGrid.propTypes = {
  handleHover: PropTypes.func,
  conditionalClasses: PropTypes.func,
}
export default DateGrid;
