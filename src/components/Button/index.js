import React from 'react';

const Button = ({ onClick, children, ...props }) => {
  const onKeyUp = (e) => e.key === 'Enter' && onClick(e)

  return (
    <button
      onClick={onClick}
      onKeyUp={onKeyUp}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button;
