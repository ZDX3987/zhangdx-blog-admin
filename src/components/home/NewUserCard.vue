<template>
  <el-card shadow="never" class="new-user-card">
    <div slot="header" class="clearfix">
      <span>注册用户</span>
      <div class="date-picker">
        <el-date-picker size="mini" v-model="defaultDate" type="date" :editable="false"
                        format="yyyy 年 MM 月 dd 日" :clearable="false"
                        :picker-options="datePickerOptions" @change="changeDateQuery"></el-date-picker>
      </div>
    </div>
    <el-empty class="register-list-empty" v-if="registerList.length === 0" description="无新增用户"
              :image-size="80"></el-empty>
    <el-carousel v-else :interval="4000" type="card" height="120px" indicator-position="none">
      <el-carousel-item v-for="register in registerList" :key="register.id">
        <div class="register-item">
          <img :src="register.avatar" :alt="register.username">
          <h4>{{ register.nickname }}</h4>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div>昨日
      <span>{{ registerList.length }}</span>&nbsp;
      <span v-if="registerList.length > 0" class="fa fa-long-arrow-up"></span>
    </div>
  </el-card>
</template>

<script>
import {prevDate} from 'element-ui/src/utils/date-util';
import moment from 'moment';

export default {
  name: "NewUserCard",
  data() {
    return {
      defaultDate: prevDate(new Date()),
      datePickerOptions: {
        disabledDate: (currentDate) => {
          return currentDate > prevDate(new Date());
        }
      },
      registerList: []
    }
  },
  created() {
    this.query(this.defaultDate);
  },
  methods: {
    changeDateQuery(queryDate) {
      this.query(queryDate);
    },
    query(queryDate) {
      this.$api.user.getNewestRegister(moment(queryDate).format()).then(res => {
        this.registerList = res.data;
      });
    }
  }
}
</script>

<style scoped>
.new-user-card {
  height: 240px;
}

.date-picker {
  float: right;
}

.register-item {
  height: 120px;
  text-align: center;
}

.register-item img {
  object-fit: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.register-list-empty {
  padding: 0;
}
</style>