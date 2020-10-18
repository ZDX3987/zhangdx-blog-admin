<template>
  <div>
    <div class="article-content">
      <el-row>
        <el-col :span="12">
          <h2 class="article-title">{{ articleDTO.title }}</h2>
          <el-row class="article-info">
            <el-col :span="8" class="article-date">
              <span class="fa fa-calendar-o"></span>
              {{ articleDTO.createDate | dateFormat("yyyy-MM-dd") }}
            </el-col>
            <el-col :span="12" class="article-author">
              <el-avatar
                :src="articleDTO.author.avatar"
                size="small"
              ></el-avatar>
              {{ articleDTO.author.username }}
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4" :offset="8">
          <el-popconfirm v-if="articleDTO.status === 1" title="确定通过该文章吗？" @onConfirm="checkArticle">
            <el-button type="primary" slot="reference" icon="fa fa-check-circle"
              >通过审核</el-button
            >
          </el-popconfirm>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-image
        class="article-coverImg"
        :src="articleDTO.coverImg"
        fit="scale-down"
      ></el-image>
      <div class="article-text" v-html="articleDTO.text"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticlePreview",
  data() {
    return {
      articleId: "",
      articleDTO: "",
    };
  },
  created() {
    this.articleId = this.$route.params.id;
    this.$api.article
      .getArticleById(this.articleId)
      .then((res) => {
        this.articleDTO = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
      checkArticle() {
          this.$api.article.toCheckArticle(this.articleDTO.id).then(res => {
              this.$message.success(res.msg);
          }).catch(error => this.$message.error(res.msg));
      }
  }
};
</script>

<style scoped>
.article-content {
  background-color: #fff;
  padding: 40px;
}
.article-title {
  margin: 0;
}
.article-info {
  margin-top: 20px;
  height: 40px;
  line-height: 40px;
  color: #999;
}
.article-author {
  line-height: 40px;
  height: 40px;
}
.article-coverImg {
  width: 30%;
}
</style>