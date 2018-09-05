import Vue from 'vue';
import Router from 'vue-router';
import paths from './paths';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getToken } from '@/libs/util';

Vue.use(Router);
const router =  new Router({
  base: '/',
  mode: 'hash',
  linkActiveClass: 'active',
  routes: paths
});

const LOGIN_PAGE_PATH = '/login';

// router gards
router.beforeEach((to, from, next) => {
  NProgress.start();
  const token = getToken();
  // console.log(token);
  // 未登录且要跳转的页面不是登录页
  if (!token && to.path !== LOGIN_PAGE_PATH) {
    next({
      replace: true,
      path: LOGIN_PAGE_PATH
    });
  } else if (!token && to.path === LOGIN_PAGE_PATH) {
    // 未登录且要跳转的是登录页
    next();
  } else if (token && to.path === LOGIN_PAGE_PATH) {
    // 已登录且跳转的是登录页
    next({
      replace: true,
      path: '/'
    });
  } else {
    // 此处应判断用户权限，根据权限判断是否可以访问对应的路由
    next();
  }
});

router.afterEach((to, from) => {
  // ...
  NProgress.done();
});

export default router;
