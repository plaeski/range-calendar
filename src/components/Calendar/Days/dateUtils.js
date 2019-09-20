import moment from 'moment';

const createDateEntries = (totalDays, dayOffset) => {
  let days = [...Array(totalDays).keys()].map(i => i + 1);

  if (dayOffset > 0) {
    const placeholders = [...Array(dayOffset).keys()].map(() => '');
    days = [...placeholders, ...days];
  }

  return days;
}

const handleDateIncrease = (current, focused, endOfMonth, numberOfDays) => {
  const newDate = moment(current).date(focused + numberOfDays);
  if (endOfMonth.unix() < newDate.unix()) {
    return {
      offset: 1,
      focus: newDate.date(),
    }
  }
  return { focus: focused + numberOfDays}
}

const handleDateDecrease = (current, focused, startOfMonth, numberOfDays) => {
  const newDate = moment(current).date(focused - numberOfDays);

  if (startOfMonth.unix() > newDate.unix()) {
    return {
      offset: -1,
      focus: newDate.date(),
    }
  } else {
    return { focus: focused - numberOfDays }
  }
};

export { createDateEntries, handleDateDecrease, handleDateIncrease };