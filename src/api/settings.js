import http from '../http/index'
import articleapi from "./article";

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
  }
}

export default settingsapi
