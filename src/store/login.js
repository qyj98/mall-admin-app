import login from '../api/login';

export default {
  namespaced: true,
  state: {
    user: {},
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    async userLogin(ctx, payload) {
      if (ctx.state.user.length) {
        return false;
      }
      const user = await login(payload);
      ctx.commit('setUser', user);
      return user;
    },
  },
};
