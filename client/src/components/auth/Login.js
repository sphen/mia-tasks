import { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { AuthContext } from '../../context/AuthState';
import { Alert } from '../Alert';

const Login = ({ setLog }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [alert, setAlert] = useState('');
  const { error, login, isAuthenticated } = useContext(AuthContext);
  const history = useHistory();

  const logUser = async (currentUser) => {
    await login(currentUser);
  };

  const submitUser = (e) => {
    e.preventDefault();
    const currentUser = {
      email: email,
      password: pass,
    };
    !email
      ? setAlert('please enter the email associated with your account')
      : !pass
      ? setAlert('please enter your password')
      : logUser(currentUser);
  };

  useEffect(() => {
    error && setAlert(error.msg);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    isAuthenticated && history.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <form className='reg-form'>
      <div className='reg-form-group'>
        {alert ? (
          <CSSTransition
            in={true}
            appear={true}
            timeout={500}
            classNames='alert'
          >
            <Alert alert={alert} setAlert={setAlert} />
          </CSSTransition>
        ) : (
          ''
        )}
        <label htmlFor='email' className='auth-label'>
          Your Email
        </label>
        <input
          type='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onSubmit={submitUser}
          className='log-input'
          placeholder='Email'
        ></input>

        <label htmlFor='password' className='auth-label'>
          Your Password
        </label>
        <input
          type='password'
          name='password'
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          onSubmit={submitUser}
          className='log-input'
          placeholder='Password'
        ></input>
      </div>
      <button className='btn login-btn' onClick={submitUser}>
        Log In
      </button>
      <p className='log-reg-link'>
        Need an account?{' '}
        <Link className='reg-link' to='#' onClick={setLog}>
          Register Here
        </Link>
      </p>
    </form>
  );
};

export default Login;
