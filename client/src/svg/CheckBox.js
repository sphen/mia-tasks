import React from 'react';

const CheckBox = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    >
      <circle xmlns='http://www.w3.org/2000/svg' cx='12' cy='12' r='10' />
    </svg>
  );
};

export default CheckBox;
