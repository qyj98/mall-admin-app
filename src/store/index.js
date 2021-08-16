import Vue from 'vue';
import Vuex from 'vuex';
import menu from './mene';
import login from './login';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    menu,
    login,
  },
});
