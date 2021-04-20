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
import {getStorageItem} from "../util/storage-unit";
import {Message} from 'element-ui'
import Regist from "../components/Regist";
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
            component: Regist,
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
                    component: UserCenter,
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
                    component: Category,
                    meta: {
                        title: '分类标签管理'
                    }
                },

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
});

export default router;


router.beforeEach((to, from, next) => {
    let token = getStorageItem("Authorization");
    if (to.name === 'Login' || to.name === 'Regist') {
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

