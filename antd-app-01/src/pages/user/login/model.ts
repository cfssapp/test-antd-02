import { Effect, history, Reducer } from 'umi';
import { message } from 'antd';
import { parse } from 'qs';
import { fakeAccountLogin, getFakeCaptcha } from './service';

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

export function setAuthority(authority: string | string[]) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
  // hard code
  // reload Authorized component
  try {
    if ((window as any).reloadAuthorized) {
      (window as any).reloadAuthorized();
    }
  } catch (error) {
    // do not need do anything
  }

  return authority;
}

export interface StateType {
  status?: true | false;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    getCaptcha: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'userAndlogin',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      console.log(payload);
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
          
      // Login successfully
      if (response.is_active === true) {
        message.success('登录成功！');
        
        location.href = '/';
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      console.log(payload);
      // setAuthority(payload.currentAuthority);
      
      localStorage.setItem('access_token', payload.access);
      localStorage.setItem('refresh_token', payload.refresh);

      setAuthority(payload.user_name);
      return {
        ...state,
        status: payload.is_active,
      };
    },
  },
};

export default Model;
