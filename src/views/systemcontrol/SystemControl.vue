<template>
  <div class="control-content">
    <el-button type="primary" @click="restoreSearchArticleData">重置搜索引擎中数据</el-button>
  </div>
</template>

<script>
export default {
  name: "SystemControl",
  methods: {
    restoreSearchArticleData() {
      this.$api.systemControl.restoreSearchArticleData().then(res => this.$message.success(res.msg))
          .catch(error => this.$message.error(error));
    }
  }
}
</script>

<style scoped>
.control-content {
  height: 90vh;
  background-color: #FFF;
}
</style>