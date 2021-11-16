import http from '@/http/index'

let url = '/api/user'

const userapi = {
    login(params) {
        return http.post('/api/login', params, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        });
    },

    regist(params) {
        return http.post('/api/regist/u', params);
    },
    logout() {
        return http.get('/api/logout');
    },
    getCurrUser() {
        return http.get(url + '/curruser');
    },
    updateUserInfo(userInfo) {
        return http.post(url + '/user', userInfo);
    },
    uploadAvatar(file) {
        return http.post(url + '/avatar', file, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    checkBetaCode(params) {
        return http.get('/api/regist/beta_code', {params: params});
    },

    getNewestRegister(queryDate) {
        let formData = {
            queryDate: queryDate
        };
        return http.get(url + '/newest-register', {params: formData});
    },

    getSysUserByPage(currentPage, pageSize) {
        let formData = {
            currentPage,
            pageSize
        };
        return http.get(url + '/sys-user-page', {params: formData});
    }
}
export default userapi
