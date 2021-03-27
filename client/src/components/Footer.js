import { Link, useLocation } from 'react-router-dom';
import { LogOut } from './LogOut';
import { MyLists } from '../components/MyLists';

export const Footer = ({ onShow, show }) => {
  const location = useLocation();
  return (
    <footer>
      {location.pathname === '/' ? <LogOut /> : <MyLists />}

      <Link
        className={show ? 'btn back' : 'btn new-todo'}
        onClick={onShow}
        to=''
      >
        {show ? 'back' : 'new list'}
      </Link>

      {/* <NewList onShow={onShow} /> */}
    </footer>
  );
};
