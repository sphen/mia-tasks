import { useContext } from 'react';
import { ToDoContext } from '../context/ToDoState';
import Check from '../svg/Check';
import CheckBox from '../svg/CheckBox';
import Trash from '../svg/Trash';

export const Task = ({ todo }) => {
  const { activeList, completeToDo, deleteToDo } = useContext(ToDoContext);

  return (
    <div className='todo show'>
      <button
        className='completed-btn'
        onClick={() => completeToDo(activeList, todo._id)}
      >
        {todo.complete ? <Check /> : <CheckBox />}
      </button>
      <li className='todo-item'>{todo.text}</li>
      <button
        className='trash-btn'
        onClick={() => deleteToDo(activeList, todo._id)}
      >
        <Trash />
      </button>
    </div>
  );
};
