import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthState';

export const LogoutBtn = () => {
  const { logout } = useContext(AuthContext);
  return (
    <>
      <Link to='/' className='btn log-btn' onClick={logout}>
        Log Out
      </Link>
    </>
  );
};
