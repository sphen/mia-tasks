import { useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ToDoContext } from '../context/ToDoState';
import { Task } from './Task';

export const TaskList = () => {
  const { todos } = useContext(ToDoContext);
  const complete = todos.items
    ? todos.items.filter((todo) => todo.complete === true)
    : {};
  const incomplete = todos.items
    ? todos.items.filter((todo) => todo.complete === false)
    : {};

  return (
    <div className='card list'>
      <h2 id='todo-title'>To Do</h2>

      <div className='todo-container add-to-list fade'>
        <TransitionGroup component='ul' className='todo-list' id='todo-list'>
          {incomplete.length > 0
            ? incomplete.map((todo) => (
                <CSSTransition
                  key={todo._id}
                  in={true}
                  appear={!todo.complete}
                  timeout={500}
                  classNames='fade'
                >
                  <Task key={todo._id} todo={todo} />
                </CSSTransition>
              ))
            : ''}
        </TransitionGroup>

        {incomplete.length > 0 ? (
          ''
        ) : (
          <CSSTransition
            in={true}
            appear={true}
            timeout={500}
            classNames='fade'
          >
            <p className='list-placeholder'>add tasks to get started</p>
          </CSSTransition>
        )}
      </div>

      <h2 id='todo-title'>Completed</h2>
      <div className='completed-todo fade' id='completed-todo'>
        <TransitionGroup
          component='ul'
          className='completed-list'
          id='completed-list'
        >
          {complete.length > 0
            ? complete.map((todo) => (
                <CSSTransition
                  key={todo._id}
                  in={true}
                  appear={todo.complete}
                  timeout={500}
                  classNames='fade'
                >
                  <Task key={todo._id} todo={todo} />
                </CSSTransition>
              ))
            : ''}
        </TransitionGroup>
        {complete.length > 0 ? (
          ''
        ) : (
          <CSSTransition
            in={true}
            appear={true}
            timeout={500}
            classNames='fade'
          >
            <p className='list-placeholder'>completed tasks go here</p>
          </CSSTransition>
        )}
      </div>
    </div>
  );
};
