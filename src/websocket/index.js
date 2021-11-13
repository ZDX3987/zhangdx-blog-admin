import {Notification} from 'element-ui';

let websocket = null;
let host = process.env.NODE_ENV === 'development' ? 'ws://localhost:8888' : 'wss://www.zhangdx.cn';
let url = host + '/websocket/admin/';

export function initWebSocket(username) {
    websocket = new WebSocket(url + username);
    websocket.onopen = () => {
        console.log('链接成功')
    }
    websocket.error = () => {
        console.log('链接失败')
    }
    websocket.onmessage = (message) => {
        Notification.success(message.data)
    }
}

export function closeWebSocket() {
    if (!websocket) {
        return;
    }
    websocket.close();
}