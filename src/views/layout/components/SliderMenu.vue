<template>
  <div class="collapse">
    <div class="left-collapse">
      <a-button type="primary" @click="toggleCollapsed">
        <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
      </a-button>
      <div class="breadcrumb">
        <a-breadcrumb>
          <a-breadcrumb-item>首页</a-breadcrumb-item>
          <a-breadcrumb-item><a href="">统计</a></a-breadcrumb-item>
        </a-breadcrumb>
      </div>
    </div>
    <ul class="userInfo">
      <li>欢迎覃尤杰 <a-icon type="down" /></li>
      <li @click="handleClick">退出</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('menu/changeCollapse');
    },
    handleClick() {
      this.$router.push({
        name: 'Login',
      });
    },
  },
  computed: {
    ...mapState('menu', ['collapsed']),
  },
};
</script>
