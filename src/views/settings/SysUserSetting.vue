<template>
  <div class="sys-user-view">
    <div class="sys-user-route">
      <sys-user-base-info :online-count-info="onlineCountInfo"/>
    </div>
  </div>
</template>

<script>
import SysUserBaseInfo from '../../components/sysuser/SysUserBaseInfo';

export default {
  name: "SysUserSetting",
  data() {
    return {
      onlineCountInfo: {},
    }
  },
  components: {
    SysUserBaseInfo
  },
  created() {
    this.$api.settings.getOnlineCount().then(res => {
      this.onlineCountInfo = res.data;
    }).catch(error => this.$message.error("在线人数查询失败"))
  }
}
</script>

<style scoped>
.sys-user-view {
  background-color: #FFF;
  min-height: 90vh;
}

.sys-user-route {
  margin: 20px;
  padding-top: 20px;
}
</style>