import http from '../http/index'

const articleapi = {
  saveArticle(form) {
    return http.post('/api/article/article', form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  getArticleByPage(formData) {
    return http.post('/api/article/articles', formData);
  },
  getArticleById(id) {
    return http.get('/api/article/article/' + id);
  },
  toCheckArticle(id) {
    return http.post('/api/article/check-article/' + id);
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
  }
}

export default articleapi
