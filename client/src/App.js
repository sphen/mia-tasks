import './App.css';
import { Header } from './components/Header';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { AddTask } from './components/AddTask';
import { TaskList } from './components/TaskList';
import Dashboard from './components/Dashboard';
import { Footer } from './components/Footer';
import { AuthProvider } from './context/AuthState';
import { ToDoProvider } from './context/ToDoState';
import { useState } from 'react';
import AddList from './components/AddList';
import AuthPage from './components/auth/AuthPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [showCreate, setShowNew] = useState(false);
  const [direct, setDirect] = useState(false);

  return (
    <Router>
      <AuthProvider>
        <ToDoProvider>
          <>
            <Header />
            <Switch>
              <PrivateRoute
                path='/'
                exact
                render={() => (
                  <>
                    <div className='container'>
                      {showCreate ? (
                        <AddList
                          onShow={() => setShowNew(!showCreate)}
                          onCreate={() => setDirect(true)}
                        />
                      ) : (
                        <Dashboard onCreate={() => setDirect(true)} />
                      )}
                    </div>
                    <Footer
                      onShow={() => setShowNew(!showCreate)}
                      show={showCreate ? true : false}
                    />
                  </>
                )}
              />
              <Route
                path='/tasklist'
                render={() =>
                  !direct ? (
                    <Redirect to='/' />
                  ) : (
                    <>
                      <div className='container'>
                        {showCreate ? (
                          <AddList
                            onShow={() => setShowNew(!showCreate)}
                            onCreate={() => setDirect(true)}
                          />
                        ) : (
                          <>
                            <AddTask />
                            <TaskList />
                          </>
                        )}
                      </div>
                      <Footer
                        onShow={() => setShowNew(!showCreate)}
                        show={showCreate ? true : false}
                      />
                    </>
                  )
                }
              />
              <Route path='/auth' render={() => <AuthPage />} />
            </Switch>
          </>
        </ToDoProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
