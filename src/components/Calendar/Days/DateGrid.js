import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import Button from '../../Button';

const generateHeader = [...Array(7).keys()].map(i => (
  <div key={i} className="grid-item" tabIndex="-1">
    {moment().day(i).format('ddd')}
  </div>
));

const DateGrid = ({ currentMonth, days, conditionalClasses, handleClick, handleHover }) => (
  <>
    <p className="grid-summary">{currentMonth.format('MMMM YYYY')}</p>
    <div className="calendar-grid date-grid">
      {generateHeader}
      {days.map(day => (
        <Button
          onClick={() => handleClick(day)}
          onMouseOver={() => handleHover(day)}
          onFocus={() => handleHover(day)}
          tabIndex={day === '' ? -1 : null}
          className={classNames(
            "grid-item",
            {
              ...conditionalClasses(day),
              'date-option': day !== '',
              'placeholder': day === '',
            }
          )}
          >
          {day}
        </Button>  
      ))}
    </div>
  </>
);

DateGrid.defaultProps = {
  handleHover: () => null,
  conditionalClasses: () => ({}),
}

DateGrid.propTypes = {
  handleHover: PropTypes.func,
  conditionalClasses: PropTypes.func,
}
export default DateGrid;
