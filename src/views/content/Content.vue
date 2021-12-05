<template>
  <div class="content">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Content"
}
</script>

<style scoped>
.content {
  background-color: #FFF;
  min-height: 92vh;
}
</style>