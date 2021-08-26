<template>
  <div class="home-content">
    <el-row :gutter="20">
      <el-col :span="8">
        <new-user-card :register-list="registerList" @dateChange="queryDateChange($event)"/>
      </el-col>
      <el-col :span="16">
        <new-article-card :data-growth-list="dataGrowthList"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import NewUserCard from '../../components/home/NewUserCard';
import NewArticleCard from '../../components/home/NewArticleCard';
import moment from 'moment';

export default {
  name: "Home",
  data() {
    return {
      registerList: [],
      dataGrowthList: [],
    }
  },
  components: {
    NewUserCard,
    NewArticleCard
  },
  created() {
    this.queryData(new Date());
  },
  methods: {
    queryData(queryDate) {
      let dateStr = moment(queryDate).format();
      let newRegisterHttp = this.$api.user.getNewestRegister(dateStr);
      let dataGrowthHttp = this.$api.dataCenter.getDataGrowth(dateStr);
      Promise.all([newRegisterHttp, dataGrowthHttp]).then(res => {
        this.registerList = res[0].data;
        this.dataGrowthList = res[1].data;
      }).catch(error => this.$message.error(error));
    },
    queryDateChange(newDate) {
      console.log(newDate)
      this.queryData(newDate);
    }
  }
}
</script>

<style scoped>
.home-content {
  height: 90vh;
}
</style>
