import Vue from 'vue'
import Router from 'vue-router'

import Index from './views/index'
import Home from './views/Home'
import InfoShow from './views/InfoShow'
import FundList from './views/FundList'
import Register from './views/Register'
import Login from './views/Login'
import Error from './views/404'

Vue.use(Router);

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect:"/index"
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children:[
        {
          path: '',
          component: Home
        },
        {
          path: '/home',
          name: 'home',
          component: Home,
        },
        {
          path: '/infoshow',
          name: 'infoshow',
          component: InfoShow
        },
        {
          path: '/fundlist',
          name: 'fundlist',
          component: FundList
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      name: 'error',
      component: Error
    }
  ]
});
// 实现路由守卫
router.beforeEach((to,from,next)=>{
  const isLogin = localStorage.userToken ? true : false;
  if (to.path === '/login' || to.path === '/register') {
    // 判断当前路由是否处于登录注册页面
    next();
  } else {
    // 判断localStorage是否存在token，不存在跳转到登录页面
    isLogin ? next() : next('/login');
  }
});

export default router;
