import http from '@/http/index'

const articleapi = {
    saveArticle(form) {
        return http.post('/api/article/article', form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}

export default articleapi