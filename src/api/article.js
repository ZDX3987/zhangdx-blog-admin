import http from '../http/index'

export default {
    updateArticle(file, article) {
        let form = new FormData();
        form.append("file", file);
        form.append('articleJSON', JSON.stringify(article));
        return http.put('/api/article/article', form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    getArticleByPage(pageSize, pageIndex, queryStatus, sort, queryDate) {
        let formData = new FormData();
        formData.append("pageSize", pageSize);
        formData.append("pageIndex", pageIndex);
        formData.append("status", queryStatus);
        formData.append("sortType", sort);
        formData.append("queryType", 1);
        if (queryDate) {
            formData.append("startDate", queryDate[0] + ' 00:00:00');
            formData.append("endDate", queryDate[1] + ' 23:59:59');
        }
        return http.post('/api/article/articles', formData);
    },
    getArticleById(id) {
        return http.get('/api/article/article/' + id);
    },
    toCheckArticle(id, toStatus) {
        let formData = new FormData();
        formData.append("toStatus", toStatus);
        return http.put('/api/article/check-article/' + id, formData);
    },

    uploadArticleFile(file, articleId) {
        let params = new FormData();
        params.append('file', file);
        params.append('articleId', articleId);
        return http.post('/api/article/article/upload', params, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    getAllCategory(params) {
        return http.get('/api/category/categories', {params: params});
    },
    addCategory(category) {
        return http.put('/api/category/category', category, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },
    delArticle(articleId) {
        return http.delete('/api/article/article/' + articleId);
    },
    delCategory(cateId) {
        return http.delete('/api/category/category/' + cateId);
    },

    saveDraftArticle(articleInfo) {
        return http.post('/api/article/draft-article', articleInfo);
    },
    download(articleId) {
        return http.get('/api/article/download/' + articleId, {
            responseType: 'blob'
        });
    }
}
