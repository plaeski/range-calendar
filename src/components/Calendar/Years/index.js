import React from 'react';
import moment from 'moment';
import Years from './Years';
import withRange from '../withRange';

const YearRange = withRange(Years, 'year');

const Year = (props) => {
  if (props.useRange) {
    const currentStart = props.currentRange.length ? props.currentRange[0] : moment().startOf('year');
    return <YearRange date={currentStart} {...props} />
  }
  return <Years
    {...props}
    handleClick={props.onChange}
    conditionalClasses={unix => ({
      'grid-item--active': unix === moment(props.date).startOf('year').unix()
    })}
  />
}

export default Year;