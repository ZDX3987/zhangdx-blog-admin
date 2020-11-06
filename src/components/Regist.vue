<template>
  <div>
    <Bg />
    <div class="regist-page">
      <el-row>
        <el-col :span="10" :offset="7">
          <h1 class="regist-title">注册</h1>
          <div class="regist-content">
            <el-form ref="form" :rules="rules" :model="registUserParam">
              <el-form-item prop="username">
                <el-input
                  v-model="registUserParam.username"
                  placeholder="请输入用户名"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-input
                  v-model="registUserParam.nickname"
                  placeholder="请输入昵称"
                ></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  v-model="registUserParam.password"
                  placeholder="请输入密码"
                  show-password
                ></el-input>
              </el-form-item>
              <el-form-item prop="repassword">
                <el-input
                  v-model="registUserParam.repassword"
                  placeholder="请再次输入密码"
                  show-password
                ></el-input>
              </el-form-item>
              <el-form-item prop="email">
                <el-input
                  v-model="registUserParam.email"
                  placeholder="请输入邮箱"
                ></el-input>
              </el-form-item>
              <el-form-item prop="checkCode">
                <el-row>
                  <el-col :span="16">
                    <el-input
                      v-model="registUserParam.checkCode"
                      placeholder="请输入验证码"
                    ></el-input>
                  </el-col>
                  <el-col :span="8">
                    <el-button
                      v-if="checkcode_btn_clicked"
                      class="code-btn"
                      v-t="{path: 'regist_text.btn_checkcode_active', args: {expire:checkCode_expire}}"
                      type="primary"
                      :disabled="checkcode_btn_clicked"
                    ></el-button>
                    <el-button
                      class="code-btn"
                      type="primary"
                      v-show="!checkcode_btn_clicked"
                      @click="getCheckCode"
                    >验证码</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-checkbox v-model="agreementCheck" class="check-info">
                  我同意
                  <el-link type="primary" :underline="false">协议名</el-link>
                </el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-button
                  @click="regist('form')"
                  :disabled="!agreementCheck"
                  type="primary"
                >注册</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
    <CopyRight />
  </div>
</template>

<script>
import Bg from "./layout/Bg";
import CopyRight from './common/CopyRight';
export default {
  name: "Regist",
  components: {
    Bg,
    CopyRight
  },
  data() {
    var repassword = (rule, value, callback) => {
      if (value != this.registUserParam.password) {
        callback(new Error('两次输入的密码不一致！'));
      } else {
        callback();
      }
    };
    return {
      checkCode_expire: 10,
      registUserParam: {
        username: "",
        password: "",
        repassword: "",
        nickname: "",
        email: "",
        checkCode: ""
      },
      agreementCheck: false,
      checkcode_btn_clicked: false,
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: "blur"
          },
          {
            min: 6,
            max: 10,
            message: '密码长度在6到10个字符',
            trigger: "blur"
          }
        ],
        repassword: [
          {
            required: true,
            message: '请再次输入密码',
            trigger: "blur"
          },
          { validator: repassword, trigger: "blur" }
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱',
            trigger: "blur"
          }
        ],
        checkCode: [
          {
            required: true,
            message: '请输入验证码',
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    getCheckCode() {
      this.checkcode_btn_clicked = true;
      var interval = setInterval(() => {
        if (this.checkCode_expire-- === 0) {
          clearInterval(interval);
          this.checkcode_btn_clicked = false;
          this.checkCode_expire = 10;
        }
      }, 1000);
    },
    regist(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$api.user.regist(this.registUserParam).then(res => {
            this.$message.success(res.data.msg)
          }).catch(error => {});
        }
      });
    }
  }
};
</script>

<style scoped>
.regist-page {
  text-align: center;
  margin: 0 auto;
  height: 100%;
}
.regist-title {
  margin-top: 20px;
  color: rgb(176, 183, 189);
}
.regist-content {
  padding-top: 8%;
  margin-bottom: 5%;
}
.el-input {
  font-size: 100%;
}
.el-input >>> input {
  background-color: rgb(0, 30, 66);
  border: 1px solid rgb(58, 95, 119);
  height: 45px;
  color: #fff;
}
.el-button {
  width: 100%;
  height: 45px;
}
.code-btn {
  line-height: 100%;
}
.check-info {
  color: #000;
}
</style>
