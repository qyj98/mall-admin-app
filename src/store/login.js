import { getUserCookie, setUserCookie, removeUserCookie } from '@/utills/userCookie';

export default {
  namespaced: true,
  state: {
    user: getUserCookie(),
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setLogOut(state) {
      state.user = {};
    },
  },
  actions: {
    async userLogin(ctx, payload) {
      setUserCookie(payload);
      ctx.commit('setUser', payload);
    },
    async userLogOut(ctx) {
      removeUserCookie();
      ctx.commit('setLogOut');
    },
  },
};
