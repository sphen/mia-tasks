import { useState, useContext } from 'react';
import { ToDoContext } from '../context/ToDoState';
import Plus from '../svg/Plus';

export const AddTask = () => {
  const [text, setText] = useState('');
  const { activeList, addToDo, todos } = useContext(ToDoContext);

  const submitToDo = (e) => {
    e.preventDefault();
    const newToDo = {
      text,
      complete: false,
    };
    console.log(activeList);
    !text ? alert('please add a task') : addToDo(activeList, newToDo);
    setText('');
  };

  return (
    <div className='card list'>
      <form>
        <div className='add-todo'>
          <h1 className='title'>{todos.title}</h1>
          <div className='add-task'>
            <input
              type='text'
              value={text}
              onChange={(e) => setText(e.target.value)}
              onSubmit={submitToDo}
              className='todo-input'
              placeholder='add a task'
              autoFocus
            ></input>
            <button className='todo-button' onClick={submitToDo}>
              <Plus />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
