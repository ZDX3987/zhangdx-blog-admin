import http from "../http";

export default {
    saveTopic(topic) {
        return http.put('/api/topic/topic', topic, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },
    getTopicByPage(formData) {
        console.log(formData)
        return http.get('/api/topic/topics', {params: formData})
    },
}