import UpdateLogList from '../components/settings/content/update-log/UpdateLogList';

export default [
    {
        path: '/settings/update-log',
        name: 'UpdateLog',
        component: () => import('../components/settings/content/update-log/UpdateLog'),
        redirect: {name: 'UpdateLogList'},
        children: [
            {
                path: 'list',
                name: 'UpdateLogList',
                component: () => import('../components/settings/content/update-log/UpdateLogList'),
                meta: {
                    title: '日志列表'
                }
            },
            {
                path: 'add',
                name: 'AddUpdateLogDetail',
                component: () => import('../components/settings/content/update-log/UpdateLogDetail'),
                meta: {
                    title: '新增日志'
                }
            },
            {
                path: 'modify',
                name: 'ModifyUpdateLogDetail',
                component: () => import('../components/settings/content/update-log/UpdateLogDetail'),
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
        component: () => import('../components/settings/content/FriendshipLinkSettings'),
        meta: {
            title: '友链设置'
        }
    }
]