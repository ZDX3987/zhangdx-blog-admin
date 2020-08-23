import axios from 'axios'
import Router from '../router/index'
import { Message } from 'element-ui'

const errorHandle = (status, data) => {
    switch (status) {
        case 401:
            Message({
                message: data.msg,
                type: 'warning'
            });
            Router.push('/');
            break;
        case 403:
            //localStorage.removeItem("Authorization");
            Message({
                message: data.msg,
                type: 'warning'
            });
            Router.push('/');
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
        const token = sessionStorage.getItem("Authorization");
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
        const { response } = error;
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
            sessionStorage.setItem("Authorization", token);
        }
    }
}

export default service;