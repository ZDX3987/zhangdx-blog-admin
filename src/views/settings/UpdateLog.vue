<template>
  <div class="update-log">
    <router-view class="update-log-view"></router-view>
  </div>
</template>

<script>
export default {
  name: "UpdateLog"
}
</script>

<style scoped>
.update-log {
  background-color: #FFF;
  min-height: 90vh;
}
.update-log-view {
  margin: 20px;
  padding-top: 20px;
}
</style>