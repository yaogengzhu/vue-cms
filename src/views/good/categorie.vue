<template>
  <div class="categorie">
    <!-- 导航部分 -->
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path: '/index/categories'}">商品管理</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path: '/index/categories'}">商品分类</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!-- 添加商品 -->
    <el-button type="primary" plain @click="addCategories">添加分类</el-button>
    <!-- 表格部分 -->
    <tree-grid
      class="treeGrid"
      v-loading="loading"
      :treeStructure="true"
      :columns="columns"
      :data-source="dataSource"
      @deleteCate="deleteCategory"
      @editCate="editCategory"
    ></tree-grid>

    <!-- 分页器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 添加分类 -->
    <el-dialog title="添加分类" :visible.sync="addDialogFormVisible">
      <el-form :model="dataform" :rules="rules" ref="dataform">
        <el-form-item label="分类名称" label-width="80px" prop="cat_name">
          <el-input v-model="dataform.cat_name" autocomplete="off" width="150"></el-input>
        </el-form-item>

        <el-form-item label="二级分类" label-width="80px">
          <el-cascader
            :options="options"
            :props="props"
            v-model="selectedOptions"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate('dataform')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入vue组件
import treeGrid from "../../components/TreeGrid/TreeGrid";
import { getGoods, addCate, deleteCate } from "../../api/index.js";
export default {
  data() {
    return {
      loading: true,
      total: 1,
      pagesize: 5,
      pagenum: 1,
      dataSource: [],
      columns: [
        // 表格分类的数据
        {
          text: "分类名称",
          dataIndex: "cat_name",
          width: ""
        },
        {
          text: "是否有效",
          dataIndex: "cat_deleted",
          width: ""
        },
        {
          text: "排序",
          dataIndex: "cat_level",
          width: ""
        }
      ],
      addDialogFormVisible: false, //添加分类的显影
      dataform: {
        cat_name: "", //分类名称
        cat_pid: 0, // 分类父ID
        cat_level: 0 // 分类层级
      }, // dataform数据
      options: [], // 可选项数据源
      selectedOptions: [], // 选择之后的数据
      props: {
        // 需要配置数据源选项
        value: "cat_id",
        label: "cat_name"
      },
      // 添加分类表单的校验规则
      rules: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.inintDate();
  },
  methods: {
    //   初始化数据
    inintDate() {
      this.loading = true;
      getGoods({
        type: [1, 2, 3],
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }).then(res => {
        console.log(res);
        if (res.meta.status === 200) {
          this.dataSource = res.data.result;
          this.total = res.data.total;
          this.loading = false;
        }
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.inintDate();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.inintDate();
    }, //删除分类
    deleteCategory(cid) {
      console.log(cid);
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 调用删除分类接口
          deleteCate(cid).then(res => {
            // console.log(res);
            if (res.meta.status === 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              //重新加载数据
              this.inintDate();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    editCategory(cid) {
      console.log(cid);
    },
    handleChange(value) {
      console.log(value);
    }, // 添加分类
    addCategories() {
      this.addDialogFormVisible = true;
      // 请求数据
      getGoods({ type: "2" }).then(res => {
        if (res.meta.status === 200) {
          this.options = res.data;
        }
      });
    }, // 添加分类之后确定提交
    addCate(ruleForm) {
      this.$refs[ruleForm].validate(avlid => {
        if (avlid) {
          // 判断选择之后数据数组的长度来决定分类的父级id 和层级
          if (this.selectedOptions.length === 0) {
            this.cat_pid = 0;
            this.cat_level = 0;
          } else if (this.selectedOptions.length === 1) {
            this.cat_pid = this.selectedOptions[
              this.selectedOptions.length - 1
            ];
            this.cat_level = 1;
          } else {
            this.cat_pid = this.selectedOptions[
              this.selectedOptions.length - 1
            ];
            this.cat_level = 2;
          }
        }

        //  判断成功之后，发起向后台数据的请求
        console.log(this.dataform);
        addCate(this.dataform).then(res => {
          console.log(res);
        });
        // 请求之后，关闭对话框 并且重新初始化数据
        this.addDialogFormVisible = false;
        this.inintDate();
      });
    }
  },
  components: {
    treeGrid // 挂载组件
  }
};
</script>

<style lang="scss" scoped>
.categorie {
  .el-breadcrumb {
    background-color: rgb(158, 159, 246);
    height: 50px;
    line-height: 50px;
    color: #fff;
    padding-left: 10px;
    margin-bottom: 10px;
  }
  .treeGrid {
    margin: 5px 0;
    height: 500px;
    overflow: auto;
  }
}
</style>