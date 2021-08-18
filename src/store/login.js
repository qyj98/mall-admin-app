import { getUserCookie, setUserCookie, removeUserCookie } from '@/utills/userCookie';

export default {
  namespaced: true,
  state: {
    user: getUserCookie(),
    isLogin: false,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setLogOut(state) {
      state.user = {};
    },
    setIsLogin(state, payload) {
      state.isLogin = payload;
    },
  },
  actions: {
    async userLogin(ctx, payload) {
      setUserCookie(payload);
      ctx.commit('setUser', payload);
      ctx.commit('setIsLogin', true);
    },
    async userLogOut(ctx) {
      removeUserCookie();
      ctx.commit('setLogOut');
      ctx.commit('setIsLogin', false);
    },
  },
};
