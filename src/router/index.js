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
      path: '/index',
      name: 'Index',
      component: Index,
      meta: {
        title: '首页'
      },
      children: [
        {
          path: '/user-center',
          name: 'UserCenter',
          component: UserCenter,
          meta: {
            title: '个人中心'
          }
        },
        {
          path: '/article-list',
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
          path: '/publish',
          name: 'PublishArticle',
          component: PublishArticle,
          meta: {
            title: '新建文章'
          }
        },
        {
          path: '/draftbox',
          name: 'DraftBox',
          component: DraftBox,
          meta: {
            title: '草稿箱'
          }
        },
        {
          path: '/category',
          name: 'Category',
          component: Category,
          meta: {
            title: '分类标签管理'
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
