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

  async function getLists() {
    try {
      const res = await axios.get('api/todos');

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
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(`/api/todos/${id}`, todo, config);
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

  // function addToDo(todo) {
  //   dispatch({
  //     type: 'ADD_TODO',
  //     payload: todo,
  //   });
  // }

  async function completeToDo(id, itemId) {
    try {
      await axios.post(`/api/todos/${id}/${itemId}/setcomplete`);
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

  // function completeToDo(id) {
  //   dispatch({
  //     type: 'COMPLETE_TODO',
  //     payload: id,
  //   });
  // }

  async function deleteToDo(id, itemId) {
    try {
      await axios.delete(`/api/todos/${id}/${itemId}`);
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

  // function deleteToDo(id) {
  //   dispatch({
  //     type: 'DELETE_TODO',
  //     payload: id,
  //   });
  // }

  function openList(list) {
    dispatch({
      type: 'OPEN_LIST',
      payload: list,
    });
  }

  async function createList(list) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/todos', list, config);
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

  // function createList(list) {
  //   dispatch({
  //     type: 'CREATE_LIST',
  //     payload: list,
  //   });
  // }

  async function deleteList(id) {
    try {
      await axios.delete(`/api/todos/${id}`);
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

  // function deleteList(id) {
  //   dispatch({
  //     type: 'DELETE_LIST',
  //     payload: id,
  //   });
  // }

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
