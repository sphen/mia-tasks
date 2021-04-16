import { useContext, useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ToDoContext } from '../context/ToDoState';
import { List } from '../components/List';
import Settings from '../svg/Settings';
import { AuthContext } from '../context/AuthState';

const Dashboard = ({ onCreate }) => {
  const { lists, getLists } = useContext(ToDoContext);
  const { loadUser } = useContext(AuthContext);
  const [setting, setSetting] = useState(false);

  // console.log(lists);

  useEffect(() => {
    getLists();
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='card'>
      <div className='todo-dash'>
        <div className='title'>
          <h1 className='page-title'>Dashboard</h1>
          <button
            className='settings-btn'
            onClick={() => {
              setSetting(!setting);
            }}
          >
            <Settings />
          </button>
        </div>

        <TransitionGroup component='ul' className='list-of-lists'>
          {lists
            ? lists.map((list) => (
                <CSSTransition
                  key={list._id}
                  in={true}
                  appear={true}
                  timeout={500}
                  classNames='fade'
                >
                  <List
                    key={list._id}
                    list={list}
                    onCreate={onCreate}
                    setting={setting}
                  />
                </CSSTransition>
              ))
            : ''}
        </TransitionGroup>

        {lists.length > 0 ? (
          ''
        ) : (
          <CSSTransition
            in={true}
            appear={true}
            timeout={500}
            classNames='fade'
          >
            <p className='dash-placeholder'>create a list to get started</p>
          </CSSTransition>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
