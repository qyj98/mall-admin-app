import Vue from 'vue';
import Vuex from 'vuex';
import menu from './mene';
import login from './login';
import search from './search';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    menu,
    login,
    search,
  },
});
