<template>
  <div class="main">
    <el-container>
      <!-- 侧边栏导航 -->
      <el-aside width="auto">
        <div class="logo">LOGO</div>
        <el-menu
          :unique-opened="true"
          :router="true"
          class="aside-nav-bar"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="isCollapse"
        >
          <el-submenu :index="list.path" v-for="list in menuList" :key="list.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ list.authName }}</span>
            </template>
            <el-menu-item :index="secondList.path" v-for="secondList in list.children" :key="secondList.id">
              <i class="el-icon-menu"></i>
              <span slot="title">{{ secondList.authName }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 头部bufen -->
        <el-header>
          <i class="myicon myicon-menu button-icon" @click="changeCollapse"></i>
          <div class="text">基于vue开发的后台管理系统</div>
          <div>
            <!-- $store.getters.username  是直接通过属性访问-->
            <span class="user-name">用户:{{$store.getters.username}}</span>
            <el-button type="text" @click="clearUser">退出</el-button>
          </div>
          <!-- 主体部分 -->
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
  

<script>
import { getMenu } from "../api/index.js";
export default {
  data() {
    return {
      menuList: [], // 存放菜单数组
      isCollapse: false
    };
  },
  methods: {
    handleOpen() {},
    handleClose() {},
    // 折叠事件

    changeCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    clearUser() {
      // 清除本地缓存的token 和 username
      // 重定向到登录页
      localStorage.clear();
      this.$router.push({ path: "/login" });
    }
  },
  created() {
    // 在页面创建之前，获取所有的菜单列表
    getMenu().then(res => {
      if (res.meta.status === 200) {
        this.menuList = res.data;
      } else {
        this.$message({
          type: "danger",
          message: "数据获取失败，请与管理员联系"
        });
      }
    });
  }
};
</script>

<style lang="scss" scoped >
.main {
  width: 100%;
  height: 100%;
  // 左侧
  .el-container {
    width: 100%;
    height: 100%;
    .el-aside {
      height: 100%;
      background-color: rgb(84, 92, 100);
      .logo {
        height: 60px;
        width: 100%;
        background-color:rgb(84, 92, 100);;
        color: #fff;
        font-size: 20px;
        font-weight: 1000;
        line-height: 60px;
        text-align: center;
      }
      .aside-nav-bar:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
        border: none;
      }
    }

    .el-header {
      background-color: rgb(84, 92, 100);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .text {
        font-size: 28px;
        color: #fff;
      }
      .button-icon {
        font-size: 30px;
        color: #fff;
        cursor: pointer;
      }
      .user-name {
        font-size: 14px;
        color: #fff;
        margin-right: 15px;
      }
    }
  }
}
</style>