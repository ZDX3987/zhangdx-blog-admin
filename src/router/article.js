import ArticleList from "../components/article/ArticleList";
import ArticlePreview from "../components/article/ArticlePreview";
import PublishArticle from "../components/article/PublishArticle";
import DraftBox from "../components/article/DraftBox";

export default [
    {
        path: '/article/list',
        name: 'ArticleList',
        component: ArticleList,
        meta: {
            title: '文章列表'
        }
    },
    {
        path: '/article/:id',
        name: 'ArticlePreview',
        component: ArticlePreview,
        meta: {
            title: '文章预览'
        }
    },
    {
        path: '/article/publish',
        name: 'PublishArticle',
        component: PublishArticle,
        meta: {
            title: '新建文章'
        }
    },
    {
        path: '/article/draftbox',
        name: 'DraftBox',
        component: DraftBox,
        meta: {
            title: '草稿箱'
        }
    }
]
