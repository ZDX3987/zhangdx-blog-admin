<template>
  <div class="home-content">
    <el-row :gutter="20">
      <el-col :span="8">
        <new-user-card/>
      </el-col>
      <el-col :span="16">
        <new-article-card/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import NewUserCard from '../../components/home/NewUserCard';
import NewArticleCard from '../../components/home/NewArticleCard';

export default {
  name: "Home",
  data() {
    return {}
  },
  components: {
    NewUserCard,
    NewArticleCard
  }
}
</script>

<style scoped>
.home-content {
  height: 90vh;
}
</style>
