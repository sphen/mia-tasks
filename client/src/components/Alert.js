export const Alert = ({ alert, setAlert }) => {
  const clearAlert = (e) => {
    e.preventDefault();
    setAlert('');
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
