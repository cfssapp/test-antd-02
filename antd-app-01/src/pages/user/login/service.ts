import request from 'umi-request';
//import request from '@/utils/request';

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

//let drfURL = '/api/login/account';
let drfURL = 'https://drfserver.pythonanywhere.com/user/login/';

export async function fakeAccountLogin(params: LoginParamsType) {
  return request(drfURL, {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}


