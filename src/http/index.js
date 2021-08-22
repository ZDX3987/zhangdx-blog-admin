import axios from 'axios'
import Router from '../router/index'
import {Message} from 'element-ui'
import {getStorageItem, removeStorageItem, setStorageItem} from "../util/storage-unit";

let requestNum = 0;
let message = null;

const errorHandle = (status, data) => {
  switch (status) {
    case 401:
      message = Message({
        message: data.msg,
        type: 'warning'
      });
      removeToken();
      Router.push({name: 'Login'});
      break;
    case 403:
      //localStorage.removeItem("Authorization");
      message = Message({
        message: data.msg,
        type: 'warning'
      });
      Router.push({name: 'Login'});
      break;
    case 500:
      message = Message({
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
    requestNum++;
    return config;
  },
  error => {
    requestNum = 0;
    return Promise.error(error);
  }
)

service.interceptors.response.use(
  response => {
    storageToken(response);
    requestNum--;
    return Promise.resolve(response.data);
  },

  error => {
    const {response} = error;
    if (response) {
      if (message && requestNum <= 0) {
        message.closeAll();
      }
      // 请求发出，后台返回错误
      errorHandle(response.status, response.data);
      requestNum = 0;
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
