<template>
  <el-card shadow="never">
    <div slot="header" class="clearfix">
      <span>注册用户</span>
      <div class="data-picker">
        <el-date-picker size="mini" v-model="defaultDate" type="date" :editable="false"
                        format="yyyy 年 MM 月 dd 日"
                        :picker-options="datePickerOptions" @change="changeDateQuery"></el-date-picker>
      </div>
    </div>

    <span class="float-right">昨日 12</span>
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
      }
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
      console.log(queryDate)
      this.$api.user.getNewestRegister(moment(queryDate).format()).then(res => {
      });
    }
  }
}
</script>

<style scoped>
.data-picker {
  float: right;
}
</style>