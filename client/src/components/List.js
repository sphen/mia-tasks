import { useContext } from 'react';
import { ToDoContext } from '../context/ToDoState';
import { Link } from 'react-router-dom';
import Open from '../svg/Open';
import Trash from '../svg/Trash';

export const List = ({ list, onCreate }) => {
  const { openList, deleteList } = useContext(ToDoContext);
  const numItems = list.items ? list.items.length : '';
  const completed = list.items
    ? list.items.filter((todo) => todo.complete).length
    : '';
  console.log(list._id);
  return (
    <div className='todo show'>
      <Link
        className='open-list-btn'
        onClick={() => {
          openList(list);
          onCreate();
        }}
        to='/tasklist'
      >
        <Open />
      </Link>
      <Link
        className='todo-item'
        onClick={() => {
          openList(list);
          onCreate();
        }}
        to='/tasklist'
      >
        <p>{list.title} </p>

        <p className='list-count'>
          {completed}/{numItems} complete{' '}
          <progress id='completed' max={numItems} value={completed}></progress>
        </p>
      </Link>
      <button
        className='trash-btn'
        onClick={() => {
          deleteList(list._id);
        }}
      >
        <Trash />
      </button>
    </div>
  );
};
