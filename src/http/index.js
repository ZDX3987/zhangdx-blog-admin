import axios from 'axios'
import Router from '../router/index'
import {Message} from 'element-ui'
import {getStorageItem, removeStorageItem, setStorageItem} from "../util/storage-unit";

const errorHandle = (status, data) => {
  switch (status) {
    case 401:
      Message({
        message: data.msg,
        type: 'warning'
      });
      removeToken();
      Router.push({name: 'Login'});
      break;
    case 403:
      //localStorage.removeItem("Authorization");
      Message({
        message: data.msg,
        type: 'warning'
      });
      Router.push({name: 'Login'});
      break;
    case 500:
      Message({
        message: data.msg,
        type: 'error'
      });
      break;
    default:
      Router.push('/error');
      break;
  }
}

const service = axios.create({
  baseURL: '',
  timeout: 15000
});

service.interceptors.request.use(
  config => {
    const token = getStorageItem("Authorization");
    token && (config.headers.Authorization = token);
    return config;
  },
  error => {
    return Promise.error(error);
  }
)

service.interceptors.response.use(
  response => {
    storageToken(response);
    return Promise.resolve(response.data);
  },

  error => {
    const {response} = error;
    if (response) {
      // 请求发出，后台返回错误
      errorHandle(response.status, response.data);
      return Promise.reject(response.data);
    }
  }
)

function storageToken(response) {
  if (response.config.url === '/api/login') {
    let token = response.headers.authorization;
    if (token) {
      setStorageItem("Authorization", token);
    }
  }
}

function removeToken() {
  removeStorageItem("Authorization");
}

export default service;
