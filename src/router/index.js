import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Regist from '@/components/Regist'
import Index from '@/components/index/Index'
import Error from '@/components/common/Error'
import UserCenter from '@/components/usercenter/UserCenter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/regist',
      name: 'Regist',
      component: Regist
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/user-center',
          name: 'UserCenter',
          component: UserCenter
        }
      ]
    },
    {
      path: '/error',
      name: 'Error',
      component: Error
    }
  ]
})
