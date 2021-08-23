import UpdateLogList from '../views/settings/UpdateLogList';

export default [
    {
        path: '/settings/update-log',
        name: 'UpdateLog',
        component: () => import('../views/settings/UpdateLog'),
        redirect: {name: 'UpdateLogList'},
        children: [
            {
                path: 'list',
                name: 'UpdateLogList',
                component: () => import('../views/settings/UpdateLogList'),
                meta: {
                    title: '日志列表'
                }
            },
            {
                path: 'add',
                name: 'AddUpdateLogDetail',
                component: () => import('../views/settings/UpdateLogDetail'),
                meta: {
                    title: '新增日志'
                }
            },
            {
                path: 'modify',
                name: 'ModifyUpdateLogDetail',
                component: () => import('../views/settings/UpdateLogDetail'),
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
        component: () => import('../views/settings/FriendshipLinkSettings'),
        meta: {
            title: '友链设置'
        }
    }
]