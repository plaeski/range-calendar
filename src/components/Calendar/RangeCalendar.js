import React, { useState } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import useModalToggle from '../../hooks/useModalToggle';
import Button from '../Button';
import Days from './Days';
import Months from './Months';
import Years from './Years';
import { DAY, MONTH, YEAR } from './constants';
import './Calendar.scss';

const getInputValue = (range) => {
  if (range.length) {
    return `${range[0].format('MMM DD, YYYY')} - ${range[1].format('MMM DD, YYYY')}`
  }
  return 'Select a date range';
}

const RangeCalendar = (props) => {
  const [range, setCurrentRange] = useState([
    moment().startOf('day'),
    moment().endOf('day'),
  ]);

  const { open, toggleOpen, ref } = useModalToggle();
  const [activeCalendar, setActiveCalendar] = useState(DAY)

  return (
    <div
      className="calendar"
      ref={ref}
      onFocus={() => toggleOpen(true)}
    >
      <input
        value={getInputValue(range)}
        id="calendar__input"
        onClick={() => (!open && toggleOpen(true))}
      />
      <div
        id="calendar-container"
        className={classNames(
          'calendar__container',
          {
            'calendar__container--active': open
          },
        )}
      >
        <div className="calendar__type-control">
          {[['Day', DAY], ['Month', MONTH], ['Year', YEAR]].map(([label, value]) => (
            <Button
              className={classNames('calendar__type', { "calendar__type--active": activeCalendar === value })}
              onClick={() => setActiveCalendar(value)}
            >
              { label }
            </Button>
          ))}
        </div>
        <div className="calendar__content">
          {activeCalendar === DAY && (
            <Days
              currentRange={range}
              onChange={([start, end]) => {
                setCurrentRange([
                  moment.unix(start).startOf('day'),
                  moment.unix(end).endOf('day'),
                ])
                toggleOpen(false);
              }}
              useRange
            />
          )}
          {activeCalendar === MONTH && (
            <Months
              currentRange={range}
              onChange={([start, end]) => {
                setCurrentRange([
                  moment.unix(start).startOf('month'),
                  moment.unix(end).endOf('month'),
                ])
                toggleOpen(false);
              }}
              useRange
            />
          )}
          {activeCalendar === YEAR && (
            <Years
              currentRange={range}
              onChange={([start, end]) => {
                setCurrentRange([
                  moment.unix(start).startOf('year'),
                  moment.unix(end).endOf('year'),
                ])
                toggleOpen(false);
              }}
              useRange
            />
          )}
        </div>
      </div>
    </div>
  )
};

export default RangeCalendar;