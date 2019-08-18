import React from 'react';
import BasicCalendar from './BasicCalendar';
import RangeCalendar from './RangeCalendar';
import './Calendar.scss';

const Calendar = ({ range, ...props }) => {
  if (range) {
    return <RangeCalendar {...props} />
  }

  return <BasicCalendar {...props} />
};

export default Calendar;
