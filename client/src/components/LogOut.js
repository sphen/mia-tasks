import { Link } from 'react-router-dom';

export const LogOut = () => {
  const coming = () => {
    alert('login/logout functionality coming soon');
  };
  return (
    <>
      <Link to='/' className='btn log-btn' onClick={coming}>
        log out
      </Link>
    </>
  );
};
