<template>
  <div>
    <footer class="copyright">
      <p>
        <a href="http://beian.miit.gov.cn">豫 ICP 备 20019985 - 2 号</a>
        Copyright © {{ currentYear }} 版权所有 ZDX_3987
      </p>
    </footer>
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
  position: absolute;
  text-align: center;
  height: 30px;
  left: 0;
  right: 0;
  bottom: 5vh;
}

/*@media screen and (max-width: 1366px) {*/
/*  .copyright {*/
/*    position: relative;*/
/*    text-align: center;*/
/*    height: 30px;*/
/*    clear: both;*/
/*  }*/
/*}*/
/*@media screen and (min-width: 1367px) {*/
/*  .copyright {*/
/*    position: absolute;*/
/*    height: 30px;*/
/*    bottom: 30px;*/
/*    left: 0; right: 0;*/
/*    text-align: center;*/
/*  }*/
/*}*/

.copyright a {
  color: rgb(176, 183, 189);
  text-decoration: none;
}
</style>
