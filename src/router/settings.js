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
        path: '/content',
        name: 'Content',
        component: () => import('../views/content/Content'),
        redirect: {name: 'ContentList'},
        children: [
            {
                path: 'list',
                name: 'ContentList',
                component: () => import('../views/content/ContentList'),
                meta: {
                    title: '页面内容列表'
                }
            },
            {
                path: 'add',
                name: 'AddContentDetail',
                component: () => import('../views/content/ContentEdit'),
                meta: {
                    title: '新增页面内容'
                }
            },
            {
                path: 'modify',
                name: 'ModifyContentDetail',
                component: () => import('../views/content/ContentEdit'),
                meta: {
                    title: '修改页面内容'
                }
            }
        ],
        meta: {
            title: '页面内容管理'
        }
    },
    {
        path: '/settings/friend-links',
        name: 'FriendshipLinks',
        component: () => import('../views/settings/FriendshipLinkSettings'),
        meta: {
            title: '友链设置'
        }
    },
    {
        path: '/settings/sys-user',
        name: 'SysUserSetting',
        component: () => import('../views/settings/SysUserSetting'),
        meta: {
            title: '系统用户设置'
        }
    },
    {
        path: '/settings/system-control',
        name: 'SystemControl',
        component: () => import('../views/systemcontrol/SystemControl'),
        meta: {
            title: '系统数据管理'
        }
    }
]