import './App.css';
import { Header } from './components/Header';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { AddTask } from './components/AddTask';
import { TaskList } from './components/TaskList';
import Dashboard from './components/Dashboard';
import { Footer } from './components/Footer';
import { ToDoProvider } from './context/ToDoState';
import { useState } from 'react';
import AddList from './components/AddList';

function App() {
  const [showCreate, setShowNew] = useState(false);
  const [direct, setDirect] = useState(false);

  return (
    <Router>
      <ToDoProvider>
        <Header />
        <div className='container'>
          <Route
            path='/'
            exact
            render={() =>
              showCreate ? (
                <AddList
                  onShow={() => setShowNew(!showCreate)}
                  onCreate={() => setDirect(true)}
                />
              ) : (
                <Dashboard onCreate={() => setDirect(true)} />
              )
            }
          />
          <Route
            path='/tasklist'
            render={() =>
              !direct ? (
                <Redirect to='/' />
              ) : showCreate ? (
                <AddList
                  onShow={() => setShowNew(!showCreate)}
                  onCreate={() => setDirect(true)}
                />
              ) : (
                <>
                  <AddTask />
                  <TaskList />
                </>
              )
            }
          />
        </div>
        <Footer
          onShow={() => setShowNew(!showCreate)}
          show={showCreate ? true : false}
        />
      </ToDoProvider>
    </Router>
  );
}

export default App;
