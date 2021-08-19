<template>
  <div class="collapse">
    <div class="left-collapse">
      <a-button type="primary" @click="toggleCollapsed">
        <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
      </a-button>
      <div class="breadcrumb">
        <a-breadcrumb>
          <a-breadcrumb-item>{{ breadcrumbs[0] }}</a-breadcrumb-item>
          <a-breadcrumb-item
            ><router-link :to="{ name: breadcrumbs[2] }">{{
              breadcrumbs[1]
            }}</router-link></a-breadcrumb-item
          >
        </a-breadcrumb>
      </div>
    </div>
    <ul class="userInfo">
      <li>欢迎{{ user.username }} <a-icon type="down" /></li>
      <li @click="handleClick">退出</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      breadcrumbs: [],
    };
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('menu/changeCollapse');
    },
    handleClick() {
      this.$store.dispatch('login/userLogOut');
      this.$router.push({
        name: 'Login',
      });
    },
    // 获取当前路由title信息和需要的name信息，渲染面包屑
    getBreadcrumbs() {
      const nav1 = this.$router.currentRoute.matched[0].meta.title;
      const nav2 = this.$router.currentRoute.matched[1]
        ? this.$router.currentRoute.matched[1].meta.title
        : '';
      const nav2Link = this.$router.currentRoute.matched[1]
        ? this.$router.currentRoute.matched[1].name
        : '';
      const navs = [nav1, nav2, nav2Link];
      return navs;
    },
  },
  computed: {
    ...mapState('menu', ['collapsed']),
    ...mapState('login', ['user']),
  },
  created() { // ?生成v-node是就获取当前路由信息，防止刷新后无法面包屑拿不到数据
    this.breadcrumbs = this.getBreadcrumbs();
  },
  // ?由于是无刷新跳转，需要监听路有变化，重新获取当前路由信息，渲染面包屑
  watch: {
    $route() {
      // console.log('路由变化了');
      this.breadcrumbs = this.getBreadcrumbs();
    },
  },
};
</script>
