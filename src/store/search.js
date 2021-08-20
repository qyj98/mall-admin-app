export default {
  namespaced: true,
  state: {
    categoryObj: {},
  },
  mutations: {
    setCategoryObj(state, payload) {
      state.categoryObj = payload;
    },
  },
  actions: {
    setCategoryObj(ctx, payload) {
      // console.log(payload);
      ctx.commit('setCategoryObj', payload);
    },
  },
};
