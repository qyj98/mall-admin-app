<template>
  <a-menu
    :default-selected-keys="[selectedKeys]"
    :default-open-keys="[openKeys]"
    :selectedKeys="[currentKeys]"
    mode="inline"
    theme="dark"
    :inline-collapsed="collapsed"
  >
    <template v-for="route in menuRoutes">
      <a-sub-menu v-if="!route.meta.hidden" :key="route.name">
        <span slot="title">
          <a-icon :type="route.meta.icon" />
          <span>{{ route.meta.title }}</span>
        </span>
        <template v-for="child in route.children">
          <a-menu-item v-if="!child.meta.hidden" :key="child.name">
            <router-link :to="{ name: child.name }">
              <a-icon :type="child.meta.icon" /> {{ child.meta.title }}
            </router-link>
          </a-menu-item>
        </template>
      </a-sub-menu>
    </template>
  </a-menu>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      selectedKeys: '', // 默认选中的菜单
      openKeys: '', // 默认展开的菜单
      currentKeys: '',
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
    this.currentKeys = this.selectedKeys;
  },
  watch: {
    $route() {
      // console.log('路由改变了');
      const name = this.$router.currentRoute.matched[1]
        ? this.$router.currentRoute.matched[1].name
        : '';
      this.currentKeys = name;
    },
  },
};
</script>
