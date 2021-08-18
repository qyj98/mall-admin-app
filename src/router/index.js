import VueRouter from 'vue-router';
import Vue from 'vue';
import routes from './routers';
import store from '@/store';

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
});

router.beforeResolve((to, from, next) => {
  if (to.meta.auth) {
    const users = store.state.login.user;
    if (users.username && users.appkey && users.email && users.role) {
      return next();
    }
    return next('/login');
  }
  return next();
});

export default router;
