import Vue from 'vue';
import Vuex from 'vuex';
import menu from './mene';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    menu,
  },
});
