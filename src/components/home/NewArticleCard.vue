<template>
  <el-card shadow="never">
    <div slot="header" class="clearfix">
      <span>文章数据</span>
    </div>
    <el-row :gutter="20">
      <el-col v-for="i in 6" :span="4">
        <div class="article-data-item">
          <span class="label-text">测试</span>
          <div class="data-count">12</div>
          <div class="compare-count">较昨日 4</div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: "NewArticleCard"
}
</script>

<style scoped>
.article-data-item {
  background-color: rgb(246, 246, 246);
  height: 100px;
  padding: 10px 10px;
}

.label-text {
  font-size: 15px;
  line-height: 30px;
}

.data-count {
  font-size: 36px;
  line-height: 50px;
  font-weight: 600;
}

.compare-count {
  font-size: 12px;
  line-height: 20px;
}
</style>