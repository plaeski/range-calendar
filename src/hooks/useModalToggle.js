import { useState, useEffect, useRef } from 'react';

const useModalToggle = () => {
  const [open, toggleOpen] = useState(false)
  const modalRef = useRef(null);
  
  const clearClick = (e) => {
    const calendarOptionClick = e.target && e.target.id.includes('calendar-option');
    if (modalRef.current && !modalRef.current.contains(e.target) && !calendarOptionClick) {
      toggleOpen(false);
    }
  };

  useEffect(() => {
    const clearFocus = (e) => e.key === 'Tab' && clearClick(e);

    document.addEventListener('keypress', clearFocus)
    document.addEventListener('click', clearClick);
    return () => {
      document.removeEventListener('click', clearClick);
      document.removeEventListener('keypress', clearFocus)
    };
  }, [])

  return { open, toggleOpen, ref: modalRef }
}

export default useModalToggle;
