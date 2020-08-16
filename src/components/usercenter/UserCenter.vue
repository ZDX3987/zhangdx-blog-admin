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
              @click="dialogFormVisible=true"
              style="float: right;"
            >修改资料</el-link>
          </div>
          <div class="info-content">
            <el-image class="mid-avatar" :src="avatar" fit="fill">
              <div slot="placeholder" class="image-slot">
                加载中
                <span class="dot">...</span>
              </div>
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
            <h3>{{userInfo.nickname}}</h3>
            <p>{{userInfo.authorities}}</p>
          </div>
          <div class="modify-content">
            <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
              <el-form :model="userInfo">
                <el-form-item label="活动名称" label-width="80px">
                  <el-input v-model="userInfo.username" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
              </div>
            </el-dialog>
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
      dialogTableVisible: false,
      dialogFormVisible: false,
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
  },
};
</script>

<style scope>
.user-base-info {
  width: 95%;
  margin-left: 5%;
  background-color: #fff;
}
.info-content {
  text-align: center;
}
.mid-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  text-align: center;
}
</style>