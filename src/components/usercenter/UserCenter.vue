<template>
  <div>
    <el-row>
      <el-col :span="8">
        <div class="user-base-info">
          <el-image style="width: 100px; height: 100px" :src="userInfo.avatar" fit="fill">
            <div slot="placeholder" class="image-slot">
              加载中
              <span class="dot">...</span>
            </div>
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <h3>{{userInfo.username}}</h3>
          <p>您已到来{{calDaysOfDate(userInfo.createTime)}}天</p>
        </div>
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
    };
  },
  created: function () {
    this.userInfo = this.$route.params;
  },
  methods: {
      calDaysOfDate(date) {
          return calDaysOfDate(date)
      }
  },
};
</script>

<style>
.user-base-info {
  width: 95%;
  margin-left: 5%;
  background-color: #fff;
}
</style>