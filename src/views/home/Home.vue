<template>
  <div class="home-content">
    <el-row>
      <el-col :span="8">
        <new-user-card/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import NewUserCard from '../../components/home/NewUserCard';

export default {
  name: "Home",
  data() {
    return {}
  },
  components: {
    NewUserCard
  }
}
</script>

<style scoped>
.home-content {
  height: 90vh;
}
</style>
