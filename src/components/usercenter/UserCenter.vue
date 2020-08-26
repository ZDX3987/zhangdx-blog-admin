<template>
  <div>
    <el-row>
      <el-col :span="8">
        <el-card class="user-base-info">
          <div slot="header">
            <span>陪伴您的{{calDaysOfDate(userInfo.createTime)}}天，继续努力！</span>
            <el-link
              :underline="false"
              type="primary"
              @click="isModifying=true"
              :disabled="isModifying"
              style="float: right;"
            >修改资料</el-link>
          </div>
          <div class="mid-avatar">
            <el-image v-if="!isModifying" :src="userInfo.avatar" fit="fill">
              <div slot="placeholder" class="image-slot">
                加载中
                <span class="dot">...</span>
              </div>
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
            <el-upload
              v-if="isModifying"
              class="avatar-uploader"
              action="#"
              :http-request="uploadAvatar"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar" />
              <i class="fa fa-camera avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div v-if="!isModifying" class="info-content">
            <h3>{{userInfo.nickname}}</h3>
            <p>{{userInfo.introduce}}</p>
          </div>
          <div v-if="isModifying" class="modify-content">
            <el-form :model="userInfo" label-position="left" size="small">
              <el-form-item label="昵称" label-width="80px">
                <el-input v-model="userInfo.nickname" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="个人介绍" label-width="80px">
                <el-input
                  maxlength="50"
                  show-word-limit
                  v-model="userInfo.introduce"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item class="modify-btn" size="small">
                <el-button type="primary" @click="modifySubmit">提交</el-button>
                <el-button @click="isModifying=false">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { calDaysOfDate } from "../../util/date-util.js";
export default {
  name: "UserCenter",
  data() {
    return {
      userInfo: {},
      isModifying: false,
      avatar:
        "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80",
    };
  },
  created: function () {
    this.userInfo = this.$route.params;
  },
  methods: {
    calDaysOfDate(date) {
      return calDaysOfDate(date);
    },
    handleAvatarSuccess(res, file) {
      this.avatar = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    uploadAvatar(http) {
      var form = new FormData();
      form.append("file", http.file);
      form.append("id", this.userInfo.id);
      this.$api.user.uploadAvatar(form).then(
        (res) => {
          this.userInfo.avatar = res;
        },
        (error) => {}
      );
    },
    modifySubmit() {
      this.$api.user.updateUserInfo(this.userInfo).then(
        (res) => {
          this.userInfo = res.data;
          this.isModifying = false;
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>

<style scoped>
.user-base-info {
  background-color: #fff;
}
.info-content {
  text-align: center;
}
.mid-avatar {
  text-align: center;
  margin-bottom: 20px;
}
.mid-avatar .el-image,
.avatar-uploader img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.avatar-uploader img {
  float: left;
  transition: all 0.5s;
}
.avatar-uploader i {
  font-size: 35px;
  color: #fff;
  width: 100px;
  height: 100px;
  line-height: 100px;
  display: block;
  float: left;
  margin-left: -100px;
  transition: all 0.5s;
  border-radius: 50%;
  opacity: 0;
}
.avatar-uploader i:hover {
  background-color: #000;
  opacity: 0.7;
}
.modify-btn {
  text-align: center;
}
</style>