import Vue from 'vue';
import VCharts from 'v-charts';
import App from './App.vue';
import router from './router';
import store from './store';
import './eventBus';
import './plugins/ant-design-vue';
import './assets/reset.less';

// 测试接口
// import * as api from './api/product';

// api.getCategory().then((r) => {
//   console.log(r);
// });

Vue.use(VCharts);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
