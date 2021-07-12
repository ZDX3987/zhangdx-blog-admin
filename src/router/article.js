export default [
    {
        path: '/article/list',
        name: 'ArticleList',
        component: () => import('../components/article/ArticleList'),
        meta: {
            title: '文章列表'
        }
    },
    {
        path: '/article/publish',
        name: 'PublishArticle',
        component: () => import('../components/article/PublishArticle'),
        meta: {
            title: '新建文章'
        }
    },
    {
        path: '/article/draftbox',
        name: 'DraftBox',
        component: () => import('../components/article/DraftBox'),
        meta: {
            title: '草稿箱'
        }
    },
    // 含有通配符的路由要放在最下面，否则前面符合该条件的特定路由也会拦截
    {
        path: '/article/:id',
        name: 'ArticlePreview',
        component: () => import('../components/article/ArticlePreview'),
        meta: {
            title: '文章预览'
        }
    },
]
