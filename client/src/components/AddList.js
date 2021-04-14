import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ToDoContext } from '../context/ToDoState';
import { Alert } from './Alert';
import Plus from '../svg/Plus';

const AddList = ({ onShow, onCreate }) => {
  const [text, setText] = useState('');
  const [alert, setAlert] = useState('');
  const { createList } = useContext(ToDoContext);
  const { openList } = useContext(ToDoContext);
  const history = useHistory();

  const create = (newList) => {
    createList(newList);
    openList(newList);
    onCreate();
    history.push('/');
    onShow();
  };
  // const submitList = (event) => {
  //   event.preventDefault();
  //   const newList = {
  //     id: Math.floor(Math.random() * 100000000),
  //     title: text,
  //     items: [],
  //   };
  //   !text ? alert('please add a list title') : create(newList);
  //   setText('');
  // };

  const submitList = (e) => {
    e.preventDefault();
    const newList = {
      id: Math.floor(Math.random() * 100000000),
      title: text,
      items: [],
      finished: 0,
    };
    !text ? setAlert('please add a list title') : create(newList);
    setText('');
  };

  return (
    <div className='card list'>
      <form className='list-form'>
        <div className='add-todo'>
          <h1 className='title'>Enter a name for your list:</h1>
          <TransitionGroup component='div' className='add-task'>
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
            <input
              type='text'
              value={text}
              onChange={(e) => setText(e.target.value)}
              onSubmit={submitList}
              className='todo-input'
              placeholder='add a list title'
              autoFocus
            ></input>
            <button className='new-list-btn' onClick={submitList}>
              <Plus />
            </button>
          </TransitionGroup>
        </div>
        <button className='btn new-todo' onClick={submitList}>
          Create List
        </button>
      </form>
    </div>
  );
};

export default AddList;
