import request from 'umi-request';

//let baseURL = '/api/currentUser';
let baseURL = 'https://drfserver.pythonanywhere.com/antd/';

export async function queryCurrent() {
  return request(baseURL);
}

export async function queryProvince() {
  return request('/api/geographic/province');
}

export async function queryCity(province: string) {
  return request(`/api/geographic/city/${province}`);
}

export async function query() {
  return request('/api/users');
}
