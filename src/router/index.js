import VueRouter from 'vue-router';
import Vue from 'vue';
import store from '@/store';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';
import getMenuRoutes from '../utills/permission';

Vue.use(VueRouter);
// 动态路由
const asyncRoutes = [
  {
    path: '/product',
    name: 'Product',
    component: Home,
    meta: { title: '商品', hidden: false, icon: 'table' },
    children: [
      {
        path: 'list',
        name: 'ProductList',
        meta: {
          title: '商品列表',
          hidden: false,
          icon: 'bars',
        },
        component: () => import('@/views/page/productList.vue'),
      }, {
        path: 'add',
        name: 'ProductAdd',
        meta: {
          title: '添加商品',
          hidden: false,
          icon: 'file-add',
        },
        component: () => import('@/views/page/productAdd.vue'),
      }, {
        path: 'category',
        name: 'Category',
        meta: {
          title: '类目管理',
          hidden: false,
          icon: 'table',
        },
        component: () => import('@/views/page/category.vue'),
      },
    ],
  },
];
// 静态路由
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: { // ?路由重定向，
      name: 'Index',
    },
    meta: {
      title: '首页',
      hidden: false,
      icon: 'home',
    },
    children: [{ /* //! 该路由下还有子路由 */
      path: 'index',
      name: 'Index',
      meta: {
        title: '统计',
        hidden: false,
        icon: 'number',
      },
      component: () => import('../views/page/index.vue'),
    }],
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      hidden: true,
    },
    component: Login,
  },
];
const router = new VueRouter({
  routes,
});
// ?防止仓库重复存储校验后的路由
let isAddRoutes = false;
// 导航守卫
router.beforeResolve((to, from, next) => {
  if (to.path !== '/login') {
    const users = store.state.login.user;
    if (users.username && users.appkey && users.email && users.role) {
      if (!isAddRoutes) {
        // 动态路由菜单与静态路由合并进行校验 获取校验后的路由菜单保存至仓库中
        const allRoutes = routes.concat(asyncRoutes);
        const menuRoutes = getMenuRoutes(store.state.login.user.role, allRoutes);
        // 获取校验后的动态路由列表添加到VueRouter中
        const asyncRouteList = getMenuRoutes(store.state.login.user.role, asyncRoutes);
        // ?将校验后的路由列表保存至仓库中,并且保存完成以后才允许添加动态路由并切换页面，防止通过地址栏访问页面时还没有给仓库添加数据，无法提供给页面
        store.dispatch('menu/setMenuRoutes', menuRoutes).then(() => {
          router.addRoutes(asyncRouteList);
          next();
          // 将动态路由列表添加到VueRouter中
        });
        isAddRoutes = true;// ?如果不添加会导致重复addRoutes，从而导致路由name重复报警告
      }
      return next();
    }
    return next('/login');
  }
  return next();
});

export default router;
