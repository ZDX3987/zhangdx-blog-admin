<template>
  <div>
    <div class="title-content">
      <el-row>
        <el-col :span="14">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="10">
          <div class="right-content">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <el-avatar
                  :size="40"
                  icon="el-icon-user-solid"
                  @error="avatarErrorHandler"
                  :title="userInfo.username"
                >
                  <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                </el-avatar>
                <i class="fa fa-caret-down"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="fa fa-user-o">个人中心</el-dropdown-item>
                <el-dropdown-item divided icon="fa fa-edit">写文章</el-dropdown-item>
                <el-dropdown-item>草稿箱</el-dropdown-item>
                <el-dropdown-item divided icon="fa fa-sign-out">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Title",
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      userInfo: {},
    };
  },
  created() {
    this.$api.user
      .getCurrUser()
      .then((res) => {
        this.userInfo = res.data;
      })
      .catch((error) => {});
  },
  methods: {
    avatarErrorHandler() {
      return true;
    },
  },
};
</script>

<style>
.title-content {
  background-color: #fff;
  width: 100%;
  height: 50px;
}
.title-content .el-breadcrumb {
  line-height: 50px;
}
.right-content {
  height: 50px;
  padding: 5px 0;
}
.el-breadcrumb {
  padding-left: 5%;
}
.el-dropdown-link {
}
</style>