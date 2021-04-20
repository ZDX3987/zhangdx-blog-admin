<template>
  <div class="content-settings">
    <el-tabs tab-position="left" type="border-card">
      <el-tab-pane label="更新日志">
        <update-log/>
      </el-tab-pane>
      <el-tab-pane label="友链设置">
        <friendship-link-settings/>
      </el-tab-pane>
      <el-tab-pane label="分享设置">分享设置</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import FriendshipLinkSettings from "./FriendshipLinkSettings";
import UpdateLog from "./UpdateLog";

export default {
  name: "ContentSettings",
  components: {
    UpdateLog,
    FriendshipLinkSettings
  }
}
</script>

<style scoped>
.content-settings {
  background-color: #FFF;
}

.el-tabs {
  height: 90vh;
}
</style>
