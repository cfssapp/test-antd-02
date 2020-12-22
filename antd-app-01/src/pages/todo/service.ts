// import request from 'umi-request';
import request from '@/utils/request';
import { ToDoListItemDataType } from './data.d';

interface ParamsType extends Partial<ToDoListItemDataType> {
    // count?: number;
  }

//let drfURL = '/api/todo_list';
//let drfURL = 'https://drfserver.pythonanywhere.com/api/article/';
let drfURL = 'https://drfserver.pythonanywhere.com/antd/todo-list/';

export async function queryToDoList(params: ParamsType) {
    return request(drfURL, {
        params,
    });
}

export async function addToDoList(params: ParamsType) {
  const { ...restParams } = params;
  return request(drfURL, {
    method: 'POST',
    
    params: {

    },
    data: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateToDoList(params: ParamsType) {
  const { ...restParams } = params;
  return request(drfURL, {
    method: 'POST',
    params: {

    },
    data: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function removeToDoList(params: ParamsType) {
  const { ...restParams } = params;
  return request(drfURL, {
    method: 'POST',
    params: {

    },
    data: {
      ...restParams,
      method: 'delete',
    },
  });
}



