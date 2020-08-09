import http from '@/http/index'

const userapi = {
    login(params) {
        return http.post('/api/login', params);
    },

    regist(params) {
        return http.post('/api/regist', params);
    },
    getCurrUser() {
        return http.get('/api/curruser');
    }
} 
export default userapi