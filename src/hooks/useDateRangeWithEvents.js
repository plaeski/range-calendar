import useDateRange from './useDateRange';

const useDateRangeWithEvents = (currentRange) => {
  const { range, setStart, setEnd } = useDateRange(currentRange);

  console.log(currentRange, range)
  const stillDefault = currentRange[0] === range[0] && currentRange[1] === range[1];

  const onClick = (day, callback) => {
    if (stillDefault) {
      setStart(day);
    } else if (!range.length) {
      setStart(day);
    } else if (range.length === 2) {
      callback(range);
    }
  }

  const onHover = (day) => {
    if (!stillDefault) {
      setEnd(day)
    }
  }

  const sortedRange = [...range].sort((a, b) => a - b);

  const inRange = value => (
    range.length === 2 &&
    sortedRange[0] <= value &&
    sortedRange[1] >= value
  );

  return { range, sortedRange, onClick, onHover, inRange };
}

export default useDateRangeWithEvents;
