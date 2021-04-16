import { Link, useLocation } from 'react-router-dom';
import { LogoutBtn } from './auth/LogoutBtn';
import { MyLists } from '../components/MyLists';

export const Footer = ({ onShow, show }) => {
  const location = useLocation();
  return (
    <>
      <footer>
        {location.pathname === '/' ? <LogoutBtn /> : <MyLists />}

        <Link
          className={show ? 'btn back' : 'btn new-todo'}
          onClick={onShow}
          to=''
        >
          {show ? 'Back' : 'New list'}
        </Link>

        {/* <NewList onShow={onShow} /> */}
      </footer>
    </>
  );
};
