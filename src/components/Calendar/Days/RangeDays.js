import React from 'react';
import DateGrid from './DateGrid';
import useDateRangeWithEvents from '../../../hooks/useDateRangeWithEvents';

const BasicDays = ({ currentRange, currentMonth, days, onChange }) => {
  const defaultRange = currentRange.map(date => date.date());
  const {
    onClick: rangeOnClick,
    onHover: rangeOnHover,
    inRange,
    range,
  } = useDateRangeWithEvents(defaultRange);

  const handleClick = (day) => rangeOnClick(day, onChange);

  const handleHover = (day) => rangeOnHover(day);

  return (
    <DateGrid
      days={days}
      currentMonth={currentMonth}
      handleClick={handleClick}
      handleHover={handleHover}
      conditionalClasses={day => ({
        'date-option--in-range': inRange(day),
        'date-option--range-start': range[0] === day,
        'date-option--range-end': range[1] === day,
      })}
    />
  );
}

export default BasicDays;