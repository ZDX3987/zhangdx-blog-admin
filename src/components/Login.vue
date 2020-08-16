<template>
  <div class="login-page">
    <Bg />
    <el-row>
      <el-col :span="10" :offset="7">
        <h1 class="login-title">登录</h1>
        <div class="login-content">
          <el-form ref="form" :model="loginParam" :rules="rules">
            <el-form-item prop="username">
              <el-input
                v-model="loginParam.username"
                prefix-icon="fa fa-user"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="loginParam.password"
                prefix-icon="fa fa-lock"
                show-password
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                :loading="login_loading"
                :disabled="login_loading"
                type="primary"
                @click="login('form')"
              >登录</el-button>
            </el-form-item>
          </el-form>
          <el-link class="regist-link" type="success" :underline="false">
            <router-link :to="{name: 'Regist'}">注册</router-link>
          </el-link>&nbsp;&nbsp;|&nbsp;&nbsp;
          <el-link class="regist-link" type="success" :underline="false">
            <router-link :to="{name: 'Regist'}">忘记密码</router-link>
          </el-link>
        </div>
        <div class="copyright">
          <p>
            <a href="http://beian.miit.gov.cn">豫 ICP 备 20019985 号</a>
            Copyright © 2020 版权所有 ZDX_3987
          </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Bg from "./layout/Bg";
export default {
  name: "Login",
  components: {
    Bg
  },
  data() {
    return {
      loginParam: {
        username: "zdx",
        password: "123456"
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      },
      login_loading: false
    };
  },
  methods: {
    login(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.login_loading = true;
          this.$api.user.login(this.loginParam).then(res => {
              this.login_loading = false;
              this.$message.success(res.msg + '，欢迎！' + this.loginParam.username);
              this.$router.push({name: 'Index'});
          }).catch(error => this.login_loading = false);
          
        }
      });
    }
  }
};
</script>

<style scope>
.login-page {
  text-align: center;
}
.login-title {
  margin-top: 100px;
  color: rgb(176, 183, 189);
}
.login-content {
  padding-top: 50px;
}

.el-input {
  font-size: 110%;
}
.el-input input {
  background-color: rgb(0, 30, 66);
  border: 1px solid rgb(58, 95, 119);
  height: 50px;
  color: #fff;
}
.el-button {
  width: 100%;
}
.regist-link a {
  color: #fff;
  text-decoration: none;
}
.copyright {
  margin-top: 130px;
  color: rgb(176, 183, 189);
  font-size: 14px;
}
.copyright a {
    color: rgb(176, 183, 189);
    text-decoration: none;
}
</style>