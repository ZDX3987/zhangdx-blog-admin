<template>
  <div class="index-content">
      <el-container>
          <el-aside width="220px">
            <Nav/>
          </el-aside>
          <el-main>
            <Title/>
          </el-main>
      </el-container>
  </div>
</template>

<script>
import Nav from '../layout/Nav'
import Title from '../layout/Title'
export default {
    name: 'Index',
    components: {
        Nav,
        Title,
    }
}
</script>

<style>
.index-content {
  background-color: #eff1f4;
}
.el-main {
  padding: 0;
}
</style>