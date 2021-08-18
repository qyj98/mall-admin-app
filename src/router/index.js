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
    meta: { title: '商品' },
    children: [
      {
        path: 'list',
        name: 'ProductList',
        meta: {
          title: '商品列表',
        },
        component: () => import('@/views/page/productList.vue'),
      }, {
        path: 'add',
        name: 'ProductAdd',
        meta: {
          title: '添加商品',
        },
        component: () => import('@/views/page/productAdd.vue'),
      }, {
        path: 'category',
        name: 'Category',
        meta: {
          title: '类目管理',
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
    meta: {
      title: '首页',
    },
    children: [{ /* //! 该路由下还有子路由 */
      path: 'index',
      name: 'Index',
      meta: {
        title: '统计',
      },
      component: () => import('../views/page/index.vue'),
    }],
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
    },
    component: Login,
  },
];
const router = new VueRouter({
  routes,
});
const isAddRoutes = false;
router.beforeResolve((to, from, next) => {
  if (to.path !== '/login') {
    const users = store.state.login.user;
    if (users.username && users.appkey && users.email && users.role) {
      if (!isAddRoutes) {
        // 传递静态路由列表进行校验 获取校验后的路由菜单
        const menuRoutes = getMenuRoutes(store.state.login.user.role, asyncRoutes);
        // console.log(routes.concat(menuRoutes));
        // 将校验后的动态路由菜单与静态路由拼接并保存至仓库中
        store.dispatch('menu/setMenuRoutes', routes.concat(menuRoutes));
      }
      return next();
    }
    return next('/login');
  }
  return next();
});

export default router;
