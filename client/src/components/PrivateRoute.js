import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthState';

export default function PrivateRoute({ render: Render, ...rest }) {
  const { token } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        return token ? <Render {...props} /> : <Redirect to='/auth' />;
      }}
    ></Route>
  );
}
