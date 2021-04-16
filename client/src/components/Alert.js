import { useContext } from 'react';
import { AuthContext } from '../context/AuthState';

export const Alert = ({ alert, setAlert }) => {
  const { clearErrors } = useContext(AuthContext);
  const clearAlert = (e) => {
    e.preventDefault();
    setAlert('');
    clearErrors();
  };
  return (
    <div className='alert'>
      <p>{alert ? alert : 'default alert text'}</p>
      <span className='alertclosebtn' onClick={clearAlert}>
        &times;
      </span>
    </div>
  );
};
