import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ToDoContext } from '../context/ToDoState';

export const MyLists = () => {
  const { todos, toDash } = useContext(ToDoContext);

  return (
    <>
      <Link to='/' className='btn my-lists' onClick={() => toDash(todos)}>
        dashboard
      </Link>
    </>
  );
};
