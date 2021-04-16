import { Link } from 'react-router-dom';

export const LogIn = () => {
  const coming = () => {
    alert('login/logout functionality coming soon');
  };
  return (
    <>
      <Link to='/' className='btn log-btn' onClick={coming}>
        Log In
      </Link>
    </>
  );
};
