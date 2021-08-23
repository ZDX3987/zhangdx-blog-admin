<template>
  <div>
    <div class="error-content">
      <el-image :src="imgUrl" fit="cover"></el-image>
      <p>啊~哦~ 您要查看的页面不存在或已删除！</p>
      <p>请检查您输入的网址是否正确，或者点击链接继续浏览空间</p>
      <button class="back-btn" @click="back()">返回首页</button>
      <CopyRight />
    </div>
  </div>
</template>

<script>
import CopyRight from "../../components/common/CopyRight";
export default {
  name: "Error",
  data() {
    return {
      imgUrl: "https://file.zhangdx.cn/notfound.gif",
    };
  },
  components: {
    CopyRight,
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.error-content {
  margin: 0 auto;
  width: 40%;
  text-align: center;
}
p:nth-of-type(1) {
  font-size: 24px;
}
p:nth-of-type(2) {
  font-size: 14px;
  margin-bottom: 30px;
}
.back-btn {
  width: 200px;
  height: 50px;
  background-color: #55bd66;
  border-radius: 50px;
  font-size: 18px;
  color: #fff;
  transition: all 0.5s;
  border: none;
  margin-bottom: 60px;
  outline:none;
  cursor: pointer;
}
.back-btn:hover {
  border: 1px solid #666;
  background-color: #FFF;
  color: #666;

}
</style>
