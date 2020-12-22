import request from 'umi-request';

//let currentUserURL = '/api/currentUser';
let currentUserURL = 'https://drfserver.pythonanywhere.com/antd/';



export async function queryCurrent() {
  return request(currentUserURL);
}

export async function queryFakeList(params: { count: number }) {
  return request('/api/fake_list', {
    params,
  });
}
