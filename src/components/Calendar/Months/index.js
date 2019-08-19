import React from 'react';
import moment from 'moment';
import MonthGrid from './MonthGrid';
import withRange from '../withRange';

const MonthRange = withRange(MonthGrid, 'month');

const Month = (props) => {
  if (props.useRange) {
    const currentStart = props.currentRange.length ? props.currentRange[0] : moment().startOf('year');
    return <MonthRange date={currentStart} {...props} />
  }
  return <MonthGrid {...props} />
}

export default Month;