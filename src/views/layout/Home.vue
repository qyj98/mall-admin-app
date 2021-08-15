<template>
  <div class="home">
    <div class="menu">
      <a-menu
        :default-selected-keys="['1']"
        :default-open-keys="['sub1']"
        mode="inline"
        theme="dark"
        :inline-collapsed="collapsed"
      >
        <a-menu-item key="1">
          <a-icon type="pie-chart" />
          <span>Option 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="desktop" />
          <span>Option 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="inbox" />
          <span>Option 3</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title"
            ><a-icon type="mail" /><span>Navigation One</span></span
          >
          <a-menu-item key="5"> Option 5 </a-menu-item>
          <a-menu-item key="6"> Option 6 </a-menu-item>
          <a-menu-item key="7"> Option 7 </a-menu-item>
          <a-menu-item key="8"> Option 8 </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"
            ><a-icon type="appstore" /><span>Navigation Two</span></span
          >
          <a-menu-item key="9"> Option 9 </a-menu-item>
          <a-menu-item key="10"> Option 10 </a-menu-item>
          <a-sub-menu key="sub3" title="Submenu">
            <a-menu-item key="11"> Option 11 </a-menu-item>
            <a-menu-item key="12"> Option 12 </a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
      </a-menu>
    </div>
    <div class="main" :class="{ 'menu-fold': collapsed }">
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
          <li>退出</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  .menu {
    width: 180px;
    position: fixed;
    height: 100%;
    flex: 0 0 auto;
    ul {
      height: 100%;
    }
  }
  .main {
    flex: 1 1 auto;
    margin-left: 180px;
    border: 1px solid #eee;
    height: 50px;
    line-height: 50px;
    transition: margin-left 0.3s;
    .collapse {
      display: flex;
      justify-content: space-between;
      .left-collapse {
        display: flex;
        button {
          margin: 10px 10px;
        }
        .ant-breadcrumb {
          height: 50px;
          line-height: 50px;
        }
      }
      .userInfo {
        margin-right: 30px;
        padding: 0;
        li {
          cursor: pointer;
          text-align: center;
          i {
            padding-left: 10px;
          }
        }
        li:not(:first-child) {
          display: none;
          &:hover {
            background: #eee;
          }
        }
        &:hover {
          li {
            display: block;
          }
        }
      }
    }
    &.menu-fold {
      margin-left: 80px;
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>
