<template>
  <div class="index-content">
    <el-container>
      <el-aside width="220px">
        <Nav />
      </el-aside>
      <el-main>
        <Title />
        <router-view></router-view>
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
.el-aside {
  display: block;
  position: relative;
  height: 100%;
}
</style>