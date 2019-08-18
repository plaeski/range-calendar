import { useState } from 'react';

const useDateRange = (currentRange = []) => {
  const [range, updateRange] = useState(currentRange);

  const setStart = day => updateRange([day]);

  const setEnd = day => range.length && updateRange([range[0], day]);

  const clearRange = () => updateRange([]);

  return { range, setStart, setEnd, clearRange }
}

export default useDateRange;