import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('https://drfserver.pythonanywhere.com/api/task-list/');
}

export async function queryCurrent(): Promise<any> {
  return request('https://drfserver.pythonanywhere.com/api/task-list/');
}

export async function queryNotices(): Promise<any> {
  return request('https://drfserver.pythonanywhere.com/api/task-list/');
}
