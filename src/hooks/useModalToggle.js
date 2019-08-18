import { useState, useEffect, useRef } from 'react';

const useModalToggle = () => {
  const [open, toggleOpen] = useState(false)
  const modalRef = useRef(null);
  
  useEffect(() => {
    const clearClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        console.log(modalRef.current, e.target)
        toggleOpen(false);
      }
    };
  
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
