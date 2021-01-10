import Vue from 'vue'
import Router from 'vue-router'
import Category from "../components/category/Category";
import Login from "../components/Login";
import Regist from "../components/Regist";
import Index from "../components/index/Index";
import UserCenter from "../components/usercenter/UserCenter";
import ArticlePreview from "../components/article/ArticlePreview";
import PublishArticle from "../components/article/PublishArticle";
import ArticleList from "../components/article/ArticleList";
import DraftBox from "../components/article/DraftBox"
import ContentSettings from "../components/settings/content/ContentSettings";
import Home from "../components/home/Home";
import TopicList from "../components/topic/TopicList";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录'
      }
    },
    // {
    //   path: '/regist',
    //   name: 'Regist',
    //   component: Regist,
    //   meta: {
    //     title: '注册'
    //   }
    // },
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        title: '首页'
      },
      children: [
        {
          path: '/index',
          name: 'Home',
          component: Home
        },
        {
          path: '/user-center',
          name: 'UserCenter',
          component: UserCenter,
          meta: {
            title: '个人中心'
          }
        },
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
        },
        {
          path: '/article/topic',
          name: 'TopicList',
          component: TopicList,
          meta: {
            title: '专题列表'
          }
        },
        {
          path: '/category',
          name: 'Category',
          component: Category,
          meta: {
            title: '分类标签管理'
          }
        },
        {
          path: '/settings/content',
          name: 'ContentSettings',
          component: ContentSettings,
          meta: {
            title: '内容设置'
          }
        }
      ]
    },
    {
      path: '/error',
      name: 'Error',
      component: Error,
      meta: {
        title: '页面找不到了'
      }
    }
  ]
})
