<template>
  <div class="home" ref="container">
    <div class="menu">
      <LeftMenu />
    </div>
    <div class="main" :class="{ 'menu-fold': collapsed }">
      <SliderMenu />
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="less" >
@import url("~@/assets/home.less");
</style>

<script>
import { mapState } from 'vuex';
import LeftMenu from './components/LeftMenu.vue';
import SliderMenu from './components/SliderMenu.vue';

export default {
  components: { LeftMenu, SliderMenu },
  computed: {
    ...mapState('menu', ['collapsed']),
  },
  methods: {
    handleScrollToTop(disc) {
      this.$refs.container.scrollTop = disc;
    },
  },
  created() {
    this.$bus.$on('scrollToTop', this.handleScrollToTop);
  },
};
</script>
