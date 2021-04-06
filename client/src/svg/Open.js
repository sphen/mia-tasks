const Open = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    >
      <line x1='7' y1='17' x2='17' y2='7' />
      <polyline points='7 7 17 7 17 17' />
    </svg>
  );
};

export default Open;
