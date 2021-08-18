import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { auth: true },
    children: [], /* //! 该路由下还有子路由 */
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];
