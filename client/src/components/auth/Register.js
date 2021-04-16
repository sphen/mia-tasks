import { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { AuthContext } from '../../context/AuthState';

import { Alert } from '../Alert';

const Register = ({ setLog }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [alert, setAlert] = useState('');
  const { error, isAuthenticated, register } = useContext(AuthContext);
  const history = useHistory();

  const create = async (newUser) => {
    await register(newUser);
    setAlert(null);
  };

  const submitUser = (e) => {
    e.preventDefault();
    const newUser = {
      name: name,
      email: email,
      password: pass,
    };
    !name
      ? setAlert('please enter your name')
      : !email
      ? setAlert('please enter your email')
      : !pass
      ? setAlert('please enter a strong password')
      : create(newUser);
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
      <TransitionGroup component='div' className='reg-form-group'>
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
        <label htmlFor='name' className='label auth-label'>
          Name
        </label>
        <input
          type='text'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          onSubmit={submitUser}
          className='auth-input reg-input'
          required
        ></input>
        <label htmlFor='email' className='label auth-label'>
          Email
        </label>
        <input
          type='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onSubmit={submitUser}
          className='auth-input reg-input'
          required
        ></input>

        <label htmlFor='password' className='label auth-label'>
          Password
        </label>
        <input
          type='password'
          name='password'
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          onSubmit={submitUser}
          className='auth-input reg-input'
          placeholder='6+ characters'
          required
        ></input>
      </TransitionGroup>
      <button className='btn register-btn' onClick={submitUser}>
        Register
      </button>
      <p className='log-reg-link'>
        Already registered?{' '}
        <Link className='log-link' to='#' onClick={setLog}>
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default Register;
