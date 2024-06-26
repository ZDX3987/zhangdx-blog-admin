<template>
  <div>
    <div class="article-form">
      <el-form ref="form" :model="articleInfo" :rules="articleRules" label-width="80px">
        <el-form-item prop="title" label="文章标题">
          <el-input v-model="articleInfo.title" class="title-input"></el-input>
        </el-form-item>
        <el-form-item label="文章封面">
          <el-upload
            action="#"
            list-type="picture-card"
            ref="upload"
            :auto-upload="false"
            :limit="1"
            :file-list="fileList"
            :on-change="handleChange"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt/>
              <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                    >
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                    >
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt/>
          </el-dialog>
        </el-form-item>
        <el-form-item label="文章标签">
          <el-tag class="article-cate-list"
                  v-for="cate in articleInfo.categories"
                  :key="cate.id"
                  closable
                  :type="cate.type"
                  @close="spliceCate(cate)">
            {{ cate.cateName }}
          </el-tag>
          <el-button type="primary" size="small" @click="openCateDialog">添加标签</el-button>
        </el-form-item>
      </el-form>
      <mavon-editor id="markdown" class="my-editor"
                    @change="markdownChange"></mavon-editor>
      <el-tooltip class="item" effect="dark" content="提交至管理员审核" placement="top-start">
        <el-button type="primary" @click="save('form', 1)">发布</el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="保存至草稿箱" placement="top-end">
        <el-button @click="save('form', 0)">保存</el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import {mavonEditor} from "mavon-editor";
import "mavon-editor/dist/css/index.css";

export default {
  name: "MarkdownPublish",
  components: {mavonEditor},
  data() {
    return {
      editor: null,
      articleInfo: {
        title: "",
        text: "",
        coverImg: "",
        status: "",
        categories: [],
        source: 2, // 文章来源：markdown编辑器
        digest: ''
      },
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      articleRules: {
        title: [{required: true, message: "请输入文章标题", trigger: "blur"}],
      },
      fileList: []
    };
  },
  props: [
    'operate',
    'articleSource'
  ],
  methods: {
    save(form, articleStatus) {
      this.$refs[form].validate((valid) => {
        if (valid && this.validArticle()) {
          this.articleInfo.coverImg = this.fileList[0].name;
          this.articleInfo.status = articleStatus;
          let form = new FormData();
          let file = this.fileList[0] ? this.fileList[0].raw : null;
          this.$api.article
              .updateArticle(file, this.articleInfo)
            .then(
              (res) => {
                this.$message.success(res.msg);
                this.$router.push({name: 'ArticleList'});
              },
              (error) => this.$message.success(error.msg)
            );
        }
      });
    },
    validArticle() {
      if (this.articleInfo.text === "") {
        this.$message.error("请输入文章内容");
        return false;
      }
      if (this.fileList.length === 0) {
        this.$message.error("请上传文章封面图片");
        return false;
      }
      if (this.articleInfo.categories.length === 0) {
        this.$message.error("请选择文章分类标签");
        return false;
      }
      return true;
    },
    handleRemove(file) {
      this.$refs.upload.clearFiles();
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChange(file, fileList) {
      this.fileList = fileList;
    },
    openCateDialog() {
      this.$emit('openCateDialog');
    },
    onSelectCate(row) {
      if (this.articleInfo.categories.includes(row)) {
        this.$message.warning('该标签已添加，不能重复添加');
        return;
      }
      this.articleInfo.categories.push(row);
    },
    spliceCate(cate) {
      this.articleInfo.categories.splice(this.articleInfo.categories.indexOf(cate), 1);
    },
    markdownChange(markdown, html) {
      this.articleInfo.text = html;
      this.articleInfo.digest = this.genArticleDigest(markdown, 100);
    },
    genArticleDigest(text, length) {
      return text ? text.substring(0, length) : '';
    }
  }
}
</script>

<style scoped>
.title-input {
  width: 50%;
}

.my-editor {
  margin-bottom: 20px;
}

.article-cate-list {
  margin-right: 10px;
}
</style>
