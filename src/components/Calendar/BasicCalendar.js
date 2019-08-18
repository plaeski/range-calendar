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

const BasicCalendar = (props) => {
  const [currentDate, setCurrentDate] = useState(moment().startOf('day'));
  const { open, toggleOpen, ref } = useModalToggle();
  const [activeCalendar, setActiveCalendar] = useState(DAY)

  return (
    <div
      className="calendar"
      ref={ref}
      onFocus={() => toggleOpen(true)}
    >
      <input
        value={currentDate.format('MMM DD, YYYY')}
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
          <div className="content-header">
            <Button className="top-nav" onClick={() => setActiveCalendar(DAY)}>
              {currentDate.format('DD')}
            </Button>
            <Button className="top-nav" onClick={() => setActiveCalendar(MONTH)}>
              {currentDate.format('MMMM')}
            </Button>
            <Button className="top-nav" onClick={() => setActiveCalendar(YEAR)}>
              {currentDate.format('YYYY')}
            </Button>
          </div>
          {activeCalendar === DAY && (
            <Days
              month={currentDate.month()}
              date={currentDate.date()}
              onChange={val => setCurrentDate(moment(currentDate).date(val))}
            />
          )}
          {activeCalendar === MONTH && (
            <Months
              date={currentDate}
              onChange={val => setCurrentDate(moment(currentDate).month(val))}
            />
          )}
          {activeCalendar === YEAR && (
            <Years
              currentYear={currentDate.year()}
              onChange={val => setCurrentDate(moment(currentDate).year(val))}
            />
          )}
        </div>
      </div>
    </div>
  )
};

export default BasicCalendar;
