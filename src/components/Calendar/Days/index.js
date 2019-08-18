import React from 'react';
import moment from 'moment';
import RangeDays from './RangeDays';
import DateGrid from './DateGrid';

const createDateEntries = (totalDays, dayOffset) => {
  let days = [...Array(totalDays).keys()].map(i => i + 1);

  if (dayOffset > 0) {
    const placeholders = [...Array(dayOffset).keys()].map(() => '');
    days = [...placeholders, ...days];
  }

  return days;
}

const Days = ({ month, date, useRange, currentRange, onChange }) => {
  const currentMonth = moment().month(month).startOf('month');
  const days = createDateEntries(currentMonth.daysInMonth(), currentMonth.day())
  if (useRange) {
    return (
      <RangeDays
        days={days}
        currentMonth={currentMonth}
        currentRange={currentRange}
        onChange={onChange}
      />
    );
  }

  return (
    <DateGrid
      days={days}
      currentMonth={currentMonth}
      handleClick={onChange}
      conditionalClasses={day => ({ 'grid-item--active': day === date })}
    />
  );
}

export default Days;