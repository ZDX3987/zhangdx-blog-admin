import UpdateLogDetail from '../components/settings/content/update-log/UpdateLogDetail';
import FriendshipLinkSettings from '../components/settings/content/FriendshipLinkSettings';
import UpdateLogList from '../components/settings/content/update-log/UpdateLogList';
import UpdateLog from '../components/settings/content/update-log/UpdateLog';

export default [
    {
        path: '/settings/update-log',
        name: 'UpdateLog',
        component: UpdateLog,
        redirect: {name: 'UpdateLogList'},
        children: [
            {
                path: 'list',
                name: 'UpdateLogList',
                component: UpdateLogList,
                meta: {
                    title: '日志列表'
                }
            },
            {
                path: 'add',
                name: 'AddUpdateLogDetail',
                component: UpdateLogDetail,
                meta: {
                    title: '新增日志'
                }
            },
            {
                path: 'modify',
                name: 'ModifyUpdateLogDetail',
                component: UpdateLogDetail,
                meta: {
                    title: '修改日志'
                }
            }
        ],
        meta: {
            title: '更新日志'
        }
    },
    {
        path: '/settings/friend-links',
        name: 'FriendshipLinks',
        component: FriendshipLinkSettings,
        meta: {
            title: '友链设置'
        }
    }
]