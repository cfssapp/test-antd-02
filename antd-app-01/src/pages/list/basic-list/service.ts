import request from 'umi-request';
import { BasicListItemDataType } from './data.d';

interface ParamsType extends Partial<BasicListItemDataType> {
  count?: number;
}

let drfURL = '/api/fake_list';
//let drfURL = 'https://drfserver.pythonanywhere.com/api/basic-list/';

export async function queryFakeList(params: ParamsType) {
  return request(drfURL, {
    params,
  });
}

export async function removeFakeList(params: ParamsType) {
  const { count = 5, ...restParams } = params;
  return request(drfURL, {
    method: 'POST',
    params: {
      count,
    },
    data: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params: ParamsType) {
  const { count = 5, ...restParams } = params;
  return request(drfURL, {
    method: 'POST',
    params: {
      count,
    },
    data: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params: ParamsType) {
  const { count = 5, ...restParams } = params;
  return request(drfURL, {
    method: 'POST',
    params: {
      count,
    },
    data: {
      ...restParams,
      method: 'update',
    },
  });
}
