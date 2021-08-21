<template>
  <a-menu
    :default-selected-keys="[selectedKeys]"
    :default-open-keys="[openKeys]"
    :selectedKeys="[selectedKeys]"
    mode="inline"
    theme="dark"
    :inline-collapsed="collapsed"
  >
    <a-sub-menu v-for="route in menuRoutes" :key="route.name">
      <span slot="title">
        <a-icon :type="route.meta.icon" />
        <span>{{ route.meta.title }}</span>
      </span>
      <a-menu-item v-for="child in route.children" :key="child.name">
        <router-link :to="{ name: child.name }">
          <a-icon :type="child.meta.icon" /> {{ child.meta.title }}
        </router-link>
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      selectedKeys: '', // 默认选中的菜单
      openKeys: '', // 默认展开的菜单
    };
  },
  computed: {
    ...mapState('menu', ['collapsed', 'menuRoutes']),
  },
  // 拿到当前页的路由信息，刷新后还是菜单还是选中在当前页菜单
  created() {
    this.selectedKeys = this.$router.currentRoute.matched[1]
      ? this.$router.currentRoute.matched[1].name
      : '';
    this.openKeys = this.$router.currentRoute.matched[0].name;
  },
  watch: {
    $route() {
      // console.log('路由改变了');
      const name = this.$router.currentRoute.matched[1]
        ? this.$router.currentRoute.matched[1].name
        : '';
      this.selectedKeys = name;
    },
  },
};
</script>
