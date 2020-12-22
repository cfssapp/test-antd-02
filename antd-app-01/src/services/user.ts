import request from '@/utils/request';

//let currentUserURL = '/api/currentUser';
let currentUserURL = 'https://drfserver.pythonanywhere.com/user/current-user/1';

//let noticesURL = '/api/notices';
let noticesURL = 'https://drfserver.pythonanywhere.com/antd/notices-list/';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request(currentUserURL);
}

export async function queryNotices(): Promise<any> {
  return request(noticesURL);
}
