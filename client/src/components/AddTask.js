import { useState, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ToDoContext } from '../context/ToDoState';
import { Alert } from './Alert';
import Plus from '../svg/Plus';

export const AddTask = () => {
  const [text, setText] = useState('');
  const [alert, setAlert] = useState('');
  const { activeList, addToDo, todos } = useContext(ToDoContext);

  const create = (activeList, newToDo) => {
    addToDo(activeList, newToDo);
    setAlert(null);
  };

  const submitToDo = (e) => {
    e.preventDefault();
    const newToDo = {
      text,
      complete: false,
    };
    // console.log(activeList);
    !text ? setAlert('please add a task') : create(activeList, newToDo);
    setText('');
  };

  return (
    <div className='card list'>
      <h1 className='title page-title'>{todos.title}</h1>
      <form>
        <div className='add-todo'>
          <TransitionGroup component='div' className='add add-task'>
            {alert ? (
              <CSSTransition
                in={true}
                appear={true}
                timeout={500}
                classNames='alert'
              >
                <Alert alert={alert} setAlert={setAlert} />
              </CSSTransition>
            ) : (
              ''
            )}
            <label htmlFor='add-todo' className='label add-label'>
              Add Task:
            </label>
            <input
              type='text'
              value={text}
              onChange={(e) => setText(e.target.value)}
              onSubmit={submitToDo}
              className='todo-input'
              name='add-todo'
              placeholder='Add a task'
              autoFocus
            ></input>
            <button className='todo-button' onClick={submitToDo}>
              <Plus />
            </button>
          </TransitionGroup>
        </div>
      </form>
    </div>
  );
};
