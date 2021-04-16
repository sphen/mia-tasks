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
    <>
      <Link
        className='list-item todo show'
        onClick={(e) => {
          setting && e.preventDefault();
          openList(list);
          onCreate();
        }}
        to='/tasklist'
        style={{ cursor: setting && 'default' }}
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
      </Link>
    </>
  );
};
