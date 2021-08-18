import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      auth: true,
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
    component: Login,
  },
];
