import React, { useEffect, useRef } from 'react';

const Button = ({ onClick, children, ...props }) => {
  const onKeyUp = (e) => e.key === 'Enter' && onClick(e)
  useEffect(() => {
    if (props.focused) {
      buttonRef.current.focus();
    }
  }, [props.focused])
  const buttonRef = useRef(null);
  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onKeyUp={onKeyUp}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button;
