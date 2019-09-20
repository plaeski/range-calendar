import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import { createDateEntries, handleDateDecrease, handleDateIncrease } from './dateUtils';
import Button from '../../Button';

const generateHeader = [...Array(7).keys()].map(i => (
  <div key={i} className="grid-item">
    {moment().day(i).format('ddd')}
  </div>
));

const DateGrid = ({ selectedDate, currentMonth, conditionalClasses, handleClick, handleHover }) => {
  const [monthOffset, setMonthOffset] = useState(0);
  const [focused, setFocus] = useState(parseInt(selectedDate) || 1)
  useEffect(() => setMonthOffset(0), [currentMonth]);
  const dateGrid = useRef(null);

  const updateFocusAndMonth = ({ offset, focus }) => {
    offset && setMonthOffset(monthOffset + offset);
    focus && setFocus(focus);
  }

  const offsetMonth = moment(currentMonth).add(monthOffset, 'months');
  const days = createDateEntries(offsetMonth.daysInMonth(), offsetMonth.day())

  const handleKeyDown = ({ keyCode }) => {
    const startOfCurrentMonth = moment(offsetMonth).startOf('month');
    const endOfCurrentMonth = moment(offsetMonth).endOf('month');
    if (keyCode === 39) {
      updateFocusAndMonth(handleDateIncrease(offsetMonth, focused, endOfCurrentMonth, 1));
    } else if (keyCode === 40) {
      updateFocusAndMonth(handleDateIncrease(offsetMonth, focused, endOfCurrentMonth, 7));
    } else if (keyCode === 37) {
      updateFocusAndMonth(handleDateDecrease(offsetMonth, focused, startOfCurrentMonth, 1));
    } else if (keyCode === 38) {
      updateFocusAndMonth(handleDateDecrease(offsetMonth, focused, startOfCurrentMonth, 7));
    }
  }

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
      <div ref={dateGrid} className="calendar-grid date-grid">
        {generateHeader}
        {days.map((day) => {
          const dayValue = day === '' ?
            '' : offsetMonth.date(day).startOf('day')
          const dayTimestamp = day === '' ? '' : dayValue.unix();
          const tabIndex = dayTimestamp === '' ? -1 : (focused === day ? 0 : -1)

          return (
            <Button
              focused={focused === day}
              onClick={() => handleClick(dayTimestamp)}
              onMouseOver={() => handleHover(dayTimestamp)}
              onFocus={() => handleHover(dayTimestamp)}
              onKeyDown={handleKeyDown}
              tabIndex={tabIndex}
              id={`calendar-option-${dayTimestamp}`}
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
        }
      )}
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
