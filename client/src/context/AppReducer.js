const AppReducer = (state, action) => {
  switch (action.type) {
    case 'GET_LISTS':
      return {
        ...state,
        loading: false,
        lists: action.payload,
      };

    case 'LIST_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    case 'ADD_TODO':
      return {
        ...state,
        todos: {
          ...state.todos,
          items: [...state.todos.items, action.payload],
        },
      };

    case 'OPEN_LIST':
      return {
        ...state,
        todos: action.payload,
        activeList: action.payload._id,
      };

    case 'COMPLETE_TODO':
      return {
        ...state,
        todos: {
          ...state.todos,
          items: state.todos.items.map((todo) =>
            todo._id === action.payload
              ? { ...todo, complete: !todo.complete }
              : todo
          ),
          // finished: state.todos.items.filter((todo) => todo.complete).length,
        },
      };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: {
          ...state.todos,
          items: state.todos.items.filter(
            (todo) => todo._id !== action.payload
          ),
        },
      };

    case 'CREATE_LIST':
      return {
        ...state,
        lists:
          state.lists.length > 0
            ? [action.payload, ...state.lists]
            : (state.lists = [action.payload]),
      };

    case 'DELETE_LIST':
      return {
        ...state,
        // todos: state.todos._id === action.payload && {},
        lists: state.lists.filter((list) => list._id !== action.payload),
      };

    case 'TO_DASH':
      return {
        ...state,
        lists:
          state.lists.length > 0
            ? state.lists.map((list) =>
                list._id === action.payload._id ? (list = action.payload) : list
              )
            : (state.lists = [action.payload]),
      };

    case 'SHOW_CREATE':
      return {
        ...state,
        showCreate: (state.showCreate = action.payload),
      };

    default:
      return state;
  }
};

export default AppReducer;
