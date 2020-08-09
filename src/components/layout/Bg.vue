<template>
  <div class="hp-bg" :style="bg_img[0]"></div>
</template>

<script>
export default {
  name: "Bg",
  data() {
    return {
      bg_img: ["background-image: url('/static/images/hp-bg.jpg');"]
    };
  }
};
</script>

<style>
.hp-bg {
  background-size: cover;
  width: 100%;
  height: 800px;
  position: fixed;
  top: -50px;
  left: 0;
  z-index: -100;
}
</style>