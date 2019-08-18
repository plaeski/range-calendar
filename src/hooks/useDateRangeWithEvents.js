import useDateRange from './useDateRange';

const useDateRangeWithEvents = (currentRange) => {
  const { range, setStart, setEnd, clearRange } = useDateRange(currentRange);

  const stillDefault = currentRange[0] === range[0] && currentRange[1] === range[1];

  const onClick = (day, callback) => {
    if (stillDefault) {
      setStart(day);
    } else if (!range.length) {
      setStart(day);
    } else if (range.length === 2) {
      callback(range);
      clearRange();
    }
  }

  const onHover = (day) => {
    if (!stillDefault) {
      setEnd(day)
    }
  }

  const inRange = value => range.length === 2 && range[0] <= value && range[1] >= value;

  return { range, onClick, onHover, inRange };
}

export default useDateRangeWithEvents;
