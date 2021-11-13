<template>
  <el-row :gutter="12">
    <el-col :span="8">
      <el-card shadow="hover">
        在线人数：{{ onlineCountInfo.onlineCount }}
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="hover">
        连接人数：{{ onlineCountInfo.connectCount }}
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="hover">
        从不显示
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "SysUserBaseInfo",
  props: {
    onlineCountInfo: {}
  }
}
</script>

<style scoped>

</style>