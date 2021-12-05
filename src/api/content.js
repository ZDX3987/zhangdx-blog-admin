import http from '../http/index';

let url = '/api/content'

export default {
    saveOrUpdateContent(contentForm) {
        return http.post(url, contentForm, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },

    getAllContentByPage(pageIndex, pageSize) {
        let params = {
            pageIndex,
            pageSize
        }
        return http.get(url + '/page', {params: params});
    },

    getContentById(contentId) {
        return http.get(url + '/' + contentId);
    },

    deleteContent(contentId) {
        return http.delete(url + '/' + contentId);
    }
}