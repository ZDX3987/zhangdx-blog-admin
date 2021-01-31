<template>
  <div class="index-content">
    <el-container>
      <Nav :isCollapse="isCollapse"/>
      <el-main>
        <Title @menuCollapse="menuCollapse"/>
        <router-view
          class="router-main"
          v-wechat-title="$route.meta.title + ' - ZHANGDX的博客'"
        ></router-view>
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
  data() {
    return {
      isCollapse: false
    }
  },
  methods: {
    menuCollapse(isCollapse) {
      this.isCollapse = isCollapse;
    }
  }
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
  width: 80%;
  padding: 0;
}

.router-main {
  width: 98%;
  margin: 20px auto;
}

.el-aside {
  display: block;
  position: relative;
  height: 100%;
}
</style>
