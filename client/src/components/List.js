import { useContext } from 'react';
import { ToDoContext } from '../context/ToDoState';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import Open from '../svg/Open';
import Trash from '../svg/Trash';

export const List = ({ list, onCreate, setting }) => {
  const { openList, deleteList } = useContext(ToDoContext);
  const numItems = list.items ? list.items.length : '';
  const completed = list.items
    ? list.items.filter((todo) => todo.complete).length
    : '';
  console.log(list._id);
  return (
    <div className='todo-list'>
      <Link
        className='todo show'
        onClick={() => {
          openList(list);
          onCreate();
        }}
        to='/tasklist'
      >
        <figure className='open-list-btn'>
          <Open />
        </figure>
        <div
          className='todo-item'
          onClick={() => {
            openList(list);
            onCreate();
          }}
          to='/tasklist'
        >
          <p>{list.title}</p>
        </div>
        <p className='list-count'>
          {completed}/{numItems}
        </p>
        <progress
          className='completed'
          id='completed'
          max={numItems}
          value={completed}
        ></progress>
      </Link>
      <CSSTransition
        in={setting === true}
        appear={true}
        timeout={500}
        classNames='alert'
        unmountOnExit
      >
        <div className='delete-list'>
          <button
            className='trash-btn'
            onClick={() => {
              deleteList(list._id);
            }}
          >
            <Trash />
          </button>
        </div>
      </CSSTransition>
    </div>
  );
};

{
  /* <button
        className='trash-btn'
        onClick={() => {
          deleteList(list._id);
        }}
      >
        <Trash />
      </button> */
}
