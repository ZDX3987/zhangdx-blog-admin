<template>
  <div class="login-page">
    <Bg/>
    <el-row type="flex" justify="center">
      <el-col :xl="8" :lg="12" :md="16" :sm="18" :xs="20">
        <div class="login-dialog">
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
                <el-button class="login_btn"
                           :loading="login_loading"
                           :disabled="login_loading"
                           type="primary"
                           @click="login('form')"
                >登录
                </el-button>
              </el-form-item>
            </el-form>
            <el-link class="regist-link" type="success" :underline="false">
              <router-link :to="{name: 'Regist'}">注册</router-link>
            </el-link>&nbsp;&nbsp;|&nbsp;&nbsp;
            <el-link class="regist-link" type="success" :underline="false">
              <router-link :to="{name: 'Regist'}">忘记密码</router-link>
            </el-link>
          </div>
          <div class="login_social_icon">
            <span class="login-type-item m-3" v-for="type of loginType" :key="type.type" :class="type.icon"
                  :title="type.text"
                  :style="{color:type.color}" @click="launchLogin(type.type)"></span>
          </div>
          <div>
            <p class="agreement-info mt-3 mb-0">授权登录即表示同意获取用户信息注册本系统账号</p>
          </div>
        </div>
      </el-col>
    </el-row>
    <CopyRight/>
  </div>
</template>

<script>
import Bg from "../components/layout/Bg";
import CopyRight from '../components/common/CopyRight';

export default {
  name: "Login",
  components: {
    Bg,
    CopyRight
  },
  data() {
    return {
      loginParam: {
        username: "",
        password: ""
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
      login_loading: false,
      loginType: [
        {type: 'QQ', icon: 'iconfont iconQQ', color: 'rgb(94,164,210)', text: 'QQ'},
        {type: 'gitee', icon: 'iconfont iconmayun', color: 'rgb(178,53,37)', text: '码云'},
        {type: 'GITHUB', icon: 'iconfont iconhuaban881', color: 'rgb(51,51,51)', text: 'Github'},
      ]
    };
  },
  created() {
    this.enterLogin();
  },
  methods: {
    login(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.login_loading = true;
          this.$api.user.login(this.loginParam).then(res => {
            this.login_loading = false;
            this.$message.success(res.msg + '，欢迎！' + this.loginParam.username);
            this.$router.push({name: 'Home'});
          }).catch(error => this.login_loading = false);
        }
      });
    },
    enterLogin() {
      document.onkeydown = e => {
        if (e.keyCode === 13) {
          this.login('form');
        }
      }
    },
    launchLogin(type) {
      // 解决Safari无法打卡新窗口问题
      let newWindow = window.open('', '_blank', "width=1000,height=600,menubar=yes,location=yes,resizable=yes,scrollbars=true,status=true");
      this.$api.oauthApi.login(type, 'LOGIN', -1).then(res => {
        newWindow.location = res.data;
      }).catch(error => this.$message.error(error));
    },
    close() {
      this.$store.commit('showLoginDialog', false);
    }
  }
};
</script>

<style scoped>
.login-page {
  text-align: center;
  height: 100vh;
}

.login-dialog {
  max-height: 42vh;
  background-color: rgba(239, 241, 244, 0.2);
  position: relative;
  top: 25vh;
  padding: 2rem 5rem;
  border-radius: 5px;
}

.login-title {
  color: rgb(176, 183, 189);
}

.login-content {
  padding-top: 6%;
  margin-bottom: 2rem;
}

.login_btn {
  width: 100%;
}

.el-input {
  font-size: 110%;
}

.el-input >>> input {
  background-color: rgb(69, 61, 83);
  border: 1px solid rgb(58, 95, 119);
  height: 50px;
  color: #fff;
}

.regist-link a {
  color: #fff;
  text-decoration: none;
}

.login_social_icon {

}

.login-type-item {
  font-size: 30px;
  margin: 0 1rem;
}


.agreement-info {
  color: #8c939d;
}
</style>
