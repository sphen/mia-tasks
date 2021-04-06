const Plus = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    >
      <circle cx='12' cy='12' r='10' />
      <line x1='12' y1='8' x2='12' y2='16' />
      <line x1='8' y1='12' x2='16' y2='12' />
    </svg>
  );
};

export default Plus;
