import http from '../http/index'

const settingsapi = {

    getAllFriendshipLink() {
        return http.get('/api/settings/friendship-links');
    },

    saveOrUpdateFriendshipLink(friendshipLink) {
        return http.post('/api/settings/friendship-link', friendshipLink, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },

    deleteFriendshipLink(linkId) {
        return http.delete('/api/settings/friendship-link/' + linkId);
    },

    // 日志相关

    saveUpdateLog(updateLog) {
        return http.post('/api/update-log/update-log', updateLog, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },

    getUpdateLogByPage(pageIndex, pageSize) {
        let params = {
            'pageIndex': pageIndex,
            'pageSize': pageSize
        }
        return http.get('/api/update-log/update-log', {params: params});
    },

    deleteUpdateLog(id) {
        return http.delete('/api/update-log/update-log/' + id);
    }
}

export default settingsapi
