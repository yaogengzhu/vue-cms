<template  >
  <div class="right">
    <!-- 导航部分 -->
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path: '/index/right'}">权限管理</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path: '/index/right'}">权限列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!-- 表格部分 -->
    <el-table :data="rightList" border style="width: 50%" v-loading="loading">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="authName" label="权限管理"></el-table-column>
      <el-table-column label="权限">
        <template slot-scope="scope">
          <span>{{ scope.row.level | transformNumber }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getRights } from "../../api/index.js";
export default {
  data() {
    return {
      loading: true,
      rightList: [] // 权限列表数据存储
    };
  },
  created() {
    // 获取权限列表
    getRights({ type: "list" }).then(res => {
      console.log(res);
      this.loading = true;
      if (res.meta.status === 200) {
        this.rightList = res.data;
        this.loading = false;
      }
    });
  },
  filters: {
    transformNumber: data => {
        if (data =='0') {
            return '一级'
        } else if (data == '1'){
            return '二级'
        } else{
            return '三级 '
        }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  background-color: rgb(158, 159, 246);
  height: 50px;
  line-height: 50px;
  color: #fff;
  padding-left: 10px;
}
</style>