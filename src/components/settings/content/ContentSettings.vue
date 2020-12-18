<template>
  <div class="content-settings">
    <el-tabs tab-position="left" type="border-card">
      <el-tab-pane label="菜单设置">
        <MenuSettings/>
      </el-tab-pane>
      <el-tab-pane label="友链设置">友链设置</el-tab-pane>
      <el-tab-pane label="分享设置">分享设置</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import MenuSettings from "./MenuSettings";

export default {
  name: "ContentSettings",
  components: {
    MenuSettings
  }
}
</script>

<style scoped>
.content-settings {
  background-color: #FFF;
}

.el-tabs {
  height: 500px;
}
</style>
