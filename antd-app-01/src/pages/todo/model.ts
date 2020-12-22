import { queryToDoList, removeToDoList, updateToDoList, addToDoList } from './service';
import { Effect, Reducer } from 'umi';
import { ToDoListItemDataType } from './data.d';




export interface StateType {
  todoList: ToDoListItemDataType[];
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    submit: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
    appendList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'listAndtodoList',
  state: {
    todoList: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryToDoList, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    *submit({ payload }, { call, put }) {
      let callback;  
      callback = addToDoList;
      const response = yield call(callback, payload); // post
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
  },
  reducers: {
    queryList(state, action) {
      // console.log(action);
      return {
        ...state,
        todoList: action.payload,
      };
    },
    appendList(state = { todoList: [] }, action) {
      return {
        ...state,
        todoList: state.todoList.concat(action.payload),
      };
    },
  },
};

export default Model;