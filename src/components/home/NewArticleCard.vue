<template>
  <el-card shadow="never" class="new-article-card">
    <div slot="header" class="clearfix">
      <span>文章数据</span>
    </div>
    <el-row :gutter="20">
      <el-col v-for="item in dataGrowthList" :key="item.title" :lg="6" :md="8" :sm="12">
        <div class="article-data-item">
          <span class="label-text">{{ item.title }}</span>
          <div class="data-count">{{ item.growthNum }}</div>
          <div class="compare-count">较昨日
            <span :class="item.compareNum ? 'compare-count-span' : ''">{{ item.compareNum }}</span>&nbsp;
            <span v-if="item.compareNum" class="fa fa-long-arrow-up"></span>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: "NewArticleCard",
  data() {
    return {}
  },
  props: {
    dataGrowthList: Array
  }
}
</script>

<style scoped>
.new-article-card {
  height: 240px;
}

.article-data-item {
  background-color: rgb(246, 246, 246);
  height: 120px;
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

.compare-count-span {
  color: #007dff;
}
</style>