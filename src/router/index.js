import Vue from 'vue'
import Router from 'vue-router'
import Category from "../views/category/Category";
import Login from "../views/Login";
import Index from "../views/Index";
import UserCenter from "../views/UserCenter";
import Home from "../views/home/Home";
import topic from "./topic";
import article from "./article";
import {getStorageItem} from "../util/storage-unit";
import {Message} from 'element-ui'
import Regist from "../views/Regist";
import settings from "./settings";

Vue.use(Router)

const router = new Router({
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
        {
            path: '/regist',
            name: 'Regist',
            component: () => import('../views/Regist'),
            meta: {
                title: '注册'
            }
        },
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
                    component: () => import('../views/UserCenter'),
                    meta: {
                        title: '个人中心'
                    }
                },
                ...article,
                ...topic,
                ...settings,
                {
                    path: '/category',
                    name: 'Category',
                    component: () => import('../views/category/Category'),
                    meta: {
                        title: '分类标签管理'
                    }
                },

            ]
        },
        {
            path: '/receive_token',
            name: 'ReceiveToken',
            component: () => import('../views/ReceiveToken'),
            meta: {
                title: '授权登录'
            }
        },
        {
            path: '/error',
            name: 'Error',
            component: () => import('../views/common/Error'),
            meta: {
                title: '页面找不到了'
            }
        }
    ]
});

export default router;


router.beforeEach((to, from, next) => {
    let token = getStorageItem("Authorization");
    if (to.name === 'Login' || to.name === 'Regist' || to.name === 'ReceiveToken') {
        if (token) {
            router.push({name: 'Home'});
        } else {
            next();
        }
    } else {
        if (token) {
            next();
        } else {
            Message({
                message: '您还没有登录',
                type: 'warning'
            });
            router.push({name: 'Login'});
        }
    }
})

