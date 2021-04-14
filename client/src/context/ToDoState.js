import { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// initial state
const initialState = {
  todos: {},
  lists: [],
  error: null,
  loading: true,
  activeList: {},
};

// create context
export const ToDoContext = createContext(initialState);

// provider component
export const ToDoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function tokenConfig() {
    // get token
    const token = localStorage.getItem('token');
    // headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // if token add to headers
    if (token) {
      config.headers['x-auth-token'] = token;
    }

    return config;
  }

  async function getLists() {
    console.log(tokenConfig());
    try {
      const res = await axios.get('api/todos', tokenConfig());

      dispatch({
        type: 'GET_LISTS',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'LIST_ERROR',
        payload: err.response.data.error,
      });
    }
  }

  async function addToDo(id, todo) {
    try {
      const res = await axios.post(`/api/todos/${id}`, todo, tokenConfig());
      dispatch({
        type: 'ADD_TODO',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'LIST_ERROR',
        payload: err.response.data.error,
      });
    }
  }

  async function completeToDo(id, itemId) {
    try {
      console.log(tokenConfig());
      await axios.post(
        `/api/todos/${id}/${itemId}/setcomplete`,
        '',
        tokenConfig()
      );
      dispatch({
        type: 'COMPLETE_TODO',
        payload: itemId,
      });
    } catch (err) {
      dispatch({
        type: 'LIST_ERROR',
        payload: err.response.data.error,
      });
    }
  }

  async function deleteToDo(id, itemId) {
    try {
      await axios.delete(`/api/todos/${id}/${itemId}`, tokenConfig());
      dispatch({
        type: 'DELETE_TODO',
        payload: itemId,
      });
    } catch (err) {
      dispatch({
        type: 'LIST_ERROR',
        payload: err.response.data.error,
      });
    }
  }

  function openList(list) {
    dispatch({
      type: 'OPEN_LIST',
      payload: list,
    });
  }

  async function createList(list) {
    try {
      const res = await axios.post('/api/todos', list, tokenConfig());
      dispatch({
        type: 'CREATE_LIST',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'LIST_ERROR',
        payload: err.response.data.error,
      });
    }
  }

  async function deleteList(id) {
    try {
      await axios.delete(`/api/todos/${id}`, tokenConfig());
      dispatch({
        type: 'DELETE_LIST',
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: 'LIST_ERROR',
        payload: err.response.data.error,
      });
    }
  }

  function toDash(list) {
    dispatch({
      type: 'TO_DASH',
      payload: list,
    });
  }

  function showCreateList(bool) {
    dispatch({
      type: 'SHOW_CREATE',
      payload: bool,
    });
  }

  return (
    <ToDoContext.Provider
      value={{
        todos: state.todos,
        lists: state.lists,
        showCreate: state.showCreate,
        loading: state.loading,
        error: state.error,
        activeList: state.activeList,
        getLists,
        addToDo,
        completeToDo,
        deleteToDo,
        openList,
        createList,
        deleteList,
        toDash,
        showCreateList,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
};
