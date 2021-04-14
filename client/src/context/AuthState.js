import { createContext, useContext, useEffect, useReducer } from 'react';
import AuthReducer from './AuthReducer';
import axios from 'axios';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null,
  error: null,
};

// create context
export const AuthContext = createContext(initialState);

export function useAuth() {
  return useContext(AuthContext);
}

// provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // check for token

  function tokenConfig() {
    // get token
    const token = state.token;
    // headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // if token add to headers
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  }

  useEffect(() => {
    const token = state.token;
    // const token = localStorage.getItem('token');
    token && loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // check for and load user
  async function loadUser() {
    const token = state.token;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // if token add to headers
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    // get user
    try {
      const res = await axios.get('/api/auth/user', config);
      console.log(res);
      dispatch({
        type: 'USER_LOADED',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response.data.error,
      });
    }
  }

  // Register User
  async function register(user) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/users', user, config);
      console.log(res.data);
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'REGISTER_FAIL',
        payload: err.response.data,
      });
    }
  }

  // login

  async function login(user) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/auth', user, config);
      console.log(res.data);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'LOGIN_FAIL',
        payload: err.response.data,
      });
    }
  }

  // logout

  function logout() {
    dispatch({
      type: 'LOGOUT_SUCCESS',
    });
  }

  // clear errors
  function clearErrors() {
    dispatch({
      type: 'CLEAR_ERRORS',
    });
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
        user: state.user,
        error: state.error,
        clearErrors,
        dispatch,
        loadUser,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
