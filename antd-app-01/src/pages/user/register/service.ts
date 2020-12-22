import request from 'umi-request';
import { UserRegisterParams } from './index';

//let baseUrl = "/api/register";
let baseUrl = "https://drfserver.pythonanywhere.com/user/register/";

export async function fakeRegister(params: UserRegisterParams) {
  return request(baseUrl, {
    method: 'POST',
    data: params,
  });
}
