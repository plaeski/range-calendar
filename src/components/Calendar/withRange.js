import React from 'react';
import useDateRangeWithEvents from '../../hooks/useDateRangeWithEvents';

const withRange = (RangeCalendar, interval) => {
  return (props) => {
    const defaultRange = props.currentRange.map(date => date.startOf(interval).unix());
    const {
      onClick: rangeOnClick,
      onHover: rangeOnHover,
      inRange,
      sortedRange,
    } = useDateRangeWithEvents(defaultRange);
    
    const handleClick = (day) => rangeOnClick(day, props.onChange);
    
    const handleHover = (day) => rangeOnHover(day);
    
    const conditionalClasses = (day) => ({
      'date-option--in-range': inRange(day),
      'date-option--range-start': sortedRange[0] === day,
      'date-option--range-end': sortedRange[1] === day,
    });

    return (
      <RangeCalendar
        handleClick={handleClick}
        handleHover={handleHover}
        conditionalClasses={conditionalClasses}
        {...props}
      />
    )
  }
}

export default withRange;