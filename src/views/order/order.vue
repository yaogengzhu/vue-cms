<template>
  <div class="order">
    <!-- 导航部分 -->
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path: '/index/orders'}">订单管理</el-breadcrumb-item>
          <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!-- 订单查询按钮 -->
    <el-row>
      <el-col :span="24">
        <el-input placeholder="请输入内容" v-model="query" class="query-input" @keyup.enter.native="queryOrder">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button type="primary" icon="el-icon-search" @click="queryOrder">搜索</el-button>
      </el-col>
    </el-row>
    <!--表格部分 -->
    <template>
      <el-table :data="orderList" border stripe style="width: 100%">
        <el-table-column prop="user_id" label="用户ID" width="180"></el-table-column>
        <el-table-column prop="pay_status" label="支付状态" width="180"></el-table-column>
        <el-table-column prop="is_send" label="	是否发货"></el-table-column>
        <el-table-column prop="order_fapiao_title" label="个人/公司"></el-table-column>
        <el-table-column prop="order_fapiao_company" label="公司名称"></el-table-column>
        <el-table-column prop="order_fapiao_content" label="发票内容"></el-table-column>
        <el-table-column prop="consignee_addr" label="发货地址"></el-table-column>
      </el-table>
    </template>
    <!-- 分页部分 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
// 导入获取订单列表的api
import { getOrderList } from "../../api/index.js";
export default {
  data() {
    return {
      orderList: [], // 订单数据源
      query: "", // 查询数据的关键字
      pagenum: 1, // 查询页码数 ，默认为1
      pagesize: 10, // 查询每页多少条，默认为10
      total: 0 // 数据总共的条数默认为0
    };
  },
  methods: {
    //订单列表数据初始化
    initData() {
      //发起数据请求
      getOrderList({
        params: {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      }).then(res => {
        // console.log(res);
        if (res.meta.status === 200) {
          this.orderList = res.data.goods;
          this.total = res.data.total;
        }
      });
    },
    // 分页数据处理的两个方式
    handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`);
      // 让设置的pagesize = val
      this.pagesize = val;
      //重新调用函数
      this.initData();
    },
    handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.initData();
    },
    // 根据关键字查询订单数
    queryOrder(){
        console.log('ok');
        //调用数据初始化
        this.initData();    
    }
  },
  //created 在vue实例化之后获取数据
  created() {
    //调用数据初始化api
    this.initData();
  }
};
</script>

<style lang="scss" scoped>
.order {
  .query-input {
    width: 300px;
    margin: 5px 10px 15px 0;
  }
}
</style>