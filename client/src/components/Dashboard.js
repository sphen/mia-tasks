import { useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ToDoContext } from '../context/ToDoState';
import { List } from '../components/List';

const Dashboard = ({ onCreate }) => {
  const { lists, getLists } = useContext(ToDoContext);

  console.log(lists);

  useEffect(() => {
    getLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='card'>
      <div className='todo-dash'>
        <h1 className='title'>Dashboard</h1>
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
                  <List key={list._id} list={list} onCreate={onCreate} />
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
