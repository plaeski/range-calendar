import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import useModalToggle from '../../hooks/useModalToggle';
import Button from '../Button';
import Days from './Days';
import Months from './Months';
import Years from './Years';
import { DAY, MONTH, YEAR } from './constants';
import './Calendar.scss';

const formats = {
  [DAY]: 'MMM DD, YYYY',
  [MONTH]: 'MMM YYYY',
  [YEAR]: 'YYYY',
};

const controls = [['Day', DAY], ['Month', MONTH], ['Year', YEAR]];

const BasicCalendar = (props) => {
  const [currentDate, setCurrentDate] = useState(moment().startOf('day'));
  const { open, toggleOpen, ref } = useModalToggle();
  const [activeCalendar, setActiveCalendar] = useState(props.type)
  const calendarControls = props.type === MONTH ? controls.slice(1) : controls;
  
  return (
    <div
      className="calendar"
      ref={ref}
      onFocus={() => toggleOpen(true)}
    >
      <input
        value={currentDate.format(formats[props.type])}
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
        {props.type !== YEAR && (
          <div className="calendar__type-control">
            {calendarControls.map(([label, value]) => (
              <Button
                className={classNames('calendar__type', { "calendar__type--active": activeCalendar === value })}
                onClick={() => setActiveCalendar(value)}
              >
                { label }
              </Button>
            ))}
          </div>
        )}

        <div className="calendar__content">
          {activeCalendar === DAY && (
            <Days
              date={currentDate}
              onChange={(val) => {
                setCurrentDate(moment.unix(val))
                props.type === DAY && toggleOpen(false);
              }}
            />
          )}

          {activeCalendar === MONTH && (
            <Months
              date={currentDate}
              onChange={val => {
                setCurrentDate(moment(currentDate).month(moment.unix(val).month()));
                props.type === MONTH ? toggleOpen(false) : setActiveCalendar(DAY);
              }}
            />
          )}

          {activeCalendar === YEAR && (
            <Years
              date={currentDate}
              onChange={val => {
                setCurrentDate(moment(currentDate).year(moment.unix(val).year()));
                props.type === YEAR ? toggleOpen(false) : setActiveCalendar(MONTH);
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
};

BasicCalendar.propTypes = {
  type: PropTypes.oneOf([DAY, MONTH, YEAR]),
}

BasicCalendar.defaultProps = {
  type: DAY
}

export default BasicCalendar;
