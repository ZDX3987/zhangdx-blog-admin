import Vue from 'vue'
import Router from 'vue-router'
import Category from "../components/category/Category";
import Login from "../components/Login";
import Index from "../components/index/Index";
import UserCenter from "../components/usercenter/UserCenter";
import ContentSettings from "../components/settings/content/ContentSettings";
import Home from "../components/home/Home";
import topic from "./topic";
import article from "./article";

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
      redirect: {name: 'Home'},
      component: Index,
      meta: {
        title: '首页'
      },
      children: [
        {
          path: '/index',
          name: 'Home',
          component: Home,
          meta: {
            title: '首页'
          },
        },
        {
          path: '/user-center',
          name: 'UserCenter',
          component: UserCenter,
          meta: {
            title: '个人中心'
          }
        },
          ...article,
          ...topic,
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
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
