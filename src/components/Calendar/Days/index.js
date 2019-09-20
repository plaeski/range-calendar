import React from 'react';
import moment from 'moment';
import DateGrid from './DateGrid';
import withRange from '../withRange';

const RangeDays = withRange(DateGrid, 'date');

const Days = ({ date, useRange, currentRange, onChange }) => {
  if (useRange) {
    const currentStart = currentRange.length ? moment(currentRange[0]) : moment();
    const currentMonth = moment(currentStart).startOf('month');
  
    return (
      <RangeDays
        currentMonth={currentMonth}
        currentRange={currentRange}
        onChange={onChange}
      />
    );
  }

  const currentMonth = moment(date).startOf('month');

  return (
    <DateGrid
      currentMonth={currentMonth}
      selectedDate={moment(date).format('DD')}
      handleClick={onChange}
      conditionalClasses={day => ({ 'grid-item--active': day === moment(date).unix() })}
    />
  );
}

export default Days;