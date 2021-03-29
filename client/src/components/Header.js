import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header>
      <Link to='/'>
        <h2 className='site-logo'>Mia Tasks</h2>
      </Link>
    </header>
  );
};
