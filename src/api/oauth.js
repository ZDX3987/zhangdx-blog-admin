import http from '../http';
import {getAuthorization} from '../util/storage-unit';

const url = '/api/client/oauth';
export default {

    login(type, method, sysUserId) {
        let params = {
            method: method,
            sysUserId: sysUserId
        }
        return http.get(url + '/login/' + type, {params: params});
    },

    getUserInfo() {
        return http.get('/api/user/curruser', {
            headers: {
                'Authorization': getAuthorization()
            }
        });
    },

    realLogin(username, accessToken) {
        let params = {
            username: username,
            password: accessToken
        };
        return http.post('/api/login', params, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        });
    },

    logout() {
        return http.get('/api/logout', {
            headers: {
                'Authorization': getAuthorization()
            }
        });
    },

    getSocialUserById(sysUserId) {
        return http.get('/api/user/social-users/' + sysUserId, {
            headers: {
                'Authorization': getAuthorization()
            }
        });
    }

}