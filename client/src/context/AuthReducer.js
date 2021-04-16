const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'GET_ERRORS':
      return {
        ...state,
        error: action.payload,
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        error: null,
      };
    case 'USER_LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'AUTH_ERROR':
    case 'REGISTER_FAIL':
      localStorage.removeItem('token');
      return {
        ...state,
        error: action.payload,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'LOGIN_FAIL':
    case 'LOGOUT_SUCCESS':
      localStorage.removeItem('token');
      return {
        ...state,
        error: action.payload,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default AuthReducer;
