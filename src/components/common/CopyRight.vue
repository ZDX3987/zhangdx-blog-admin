<template>
  <div>
    <div class="copyright">
      <p>
        <a href="http://beian.miit.gov.cn">豫 ICP 备 20019985 号</a>
        Copyright © {{ currentYear }} 版权所有 ZDX_3987
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CopyRight",
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped>
.copyright {
  color: rgb(176, 183, 189);
  font-size: 14px;
}
.copyright a {
  color: rgb(176, 183, 189);
  text-decoration: none;
}
</style>