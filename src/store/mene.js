export default {
  namespaced: true,
  state: {
    collapsed: false,
  },
  mutations: {
    changeCollapse(state) {
      state.collapsed = !state.collapsed;
    },
  },
  actions: {
    changeCollapse(ctx) {
      ctx.commit('changeCollapse');
      // console.log(ctx.state.collapsed);
    },
  },
};
