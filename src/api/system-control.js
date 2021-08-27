import http from '../http/index';

const prefix = '/api/system/control';

export default {
    restoreSearchArticleData() {
        return http.post(prefix + '/es_article_data');
    }
}