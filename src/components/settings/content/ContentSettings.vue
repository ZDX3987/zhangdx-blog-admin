<template>
  <div class="content-settings">
    <el-tabs tab-position="left" type="border-card">
      <el-tab-pane label="菜单设置">
        <MenuSettings/>
      </el-tab-pane>
      <el-tab-pane label="友链设置">
        <FriendshipLinkSettings/>
      </el-tab-pane>
      <el-tab-pane label="分享设置">分享设置</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import MenuSettings from "./MenuSettings";
import FriendshipLinkSettings from "./FriendshipLinkSettings";

export default {
  name: "ContentSettings",
  components: {
    MenuSettings,
    FriendshipLinkSettings
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
