import { useState } from 'react';
import Login from './Login';
import Register from './Register';

const AuthPage = () => {
  const [logPage, setLogPage] = useState(false);

  return (
    <div className='container'>
      <div className='card'>
        <div className='todo-dash'>
          <div className='title'>
            <h1>Sign Up/Sign In</h1>
          </div>
        </div>
        {!logPage ? (
          <Register setLog={() => setLogPage(!logPage)} />
        ) : (
          <Login setLog={() => setLogPage(!logPage)} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
