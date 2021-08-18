export default {
  namespaced: true,
  state: {
    // 导航的收放状态 false为展开  true为收起来
    collapsed: false,
    // 存储菜单的路由
    menuRoutes: [],
  },
  mutations: {
    changeCollapse(state) {
      state.collapsed = !state.collapsed;
    },
    setMenuRoutes(state, payload) {
      state.menuRoutes = payload;
    },
  },
  actions: {
    changeCollapse(ctx) {
      ctx.commit('changeCollapse');
      // console.log(ctx.state.collapsed);
    },
    setMenuRoutes(ctx, routes) {
      ctx.commit('setMenuRoutes', routes);
    },
  },
};
