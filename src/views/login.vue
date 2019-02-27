<template>
  <div class="login">
    <el-form ref="form" :model="form" class="container" :rules="rules">
      <div class="avatar">
        <img src="../assets/avatar.png" alt>
      </div>
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder=" 账号" prefix-icon="myicon myicon-user"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
           @keyup.enter.native="check('form')"
          type="password"
          v-model="form.password"
          placeholder="密码"
          prefix-icon="myicon myicon-key"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-button" @click="check('form')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 引入登录api
import { checkUser } from "../api/index.js";

export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    check(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          checkUser(this.form).then(res => {
            if (res.meta.status == 200) {
              // 当登录成功之后将username保存到vuex中去
              this.$store.commit("getUsername", res.data.username);
              // 存储本地token
              localStorage.setItem("mytoken", res.data.token);
              this.$router.push({ path: "index" });
            } else {
              this.$message({
                showClose: true,
                message: res.meta.msg,
                type: "error"
              });
            }
          });
        } else {
          console.log("登录失败");
        }
      });
    },
    add(){
      console.log('hello');
    }
  }
};
</script>


<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  // background-color: rgb(135, 147, 250);
  background: url(../assets/bg1.jpg) no-repeat ;
  background-size: cover;
  .container {
    padding: 50px 50px 0;
    width: 400px;
    height: 100px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    min-height: 200px;
    background-color: #fff;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: -60px;
      transform: translateX(-50%);
      background-color: red;
      z-index: 333;
      overflow: hidden;

      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .login-button {
      width: 100%;
    }
  }
}
</style>
