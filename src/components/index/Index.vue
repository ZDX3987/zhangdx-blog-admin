<template>
  <div class="index-content">
    <el-container>
      <el-aside width="220px">
        <Nav />
      </el-aside>
      <el-main>
        <Title />
        <router-view class="router-main" v-wechat-title='$route.meta.title  + " - ZHANGDX的博客"'></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Nav from "../layout/Nav";
import Title from "../layout/Title";
export default {
  name: "Index",
  components: {
    Nav,
    Title,
  },
};
</script>

<style scoped>
.index-content {
  background-color: #eff1f4;
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-main {
  padding: 0;
}
.router-main {
  width: 98%;
  margin: 0 auto;
  margin-top: 20px;
}
.el-aside {
  display: block;
  position: relative;
  height: 100%;
}
</style>