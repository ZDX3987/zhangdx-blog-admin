<template>
  <div>
    <div class="article-form">
      <el-form ref="articleForm" :model="articleInfo" :rules="articleRules" label-width="80px">
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
              accept="image/*,"
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
      <div id="editor" class="my-editor"></div>
      <el-tooltip class="item" effect="dark" content="提交至管理员审核" placement="top-start">
        <el-button :disabled="!articleInfo.id" type="primary" @click="saveToAudit">发布</el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="保存至草稿箱" placement="top-end" v-if="operate!=='update'">
        <el-button :disabled="!articleInfo.id" @click="saveRealArticle(0)">保存</el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="保存本次修改" placement="top-end" v-if="operate==='update'">
        <el-button @click="saveRealArticle(articleInfo.status)">保存</el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import Editor from "wangeditor";
import {getFileNameByUrl} from "../../util/file-util";

export default {
  name: "EditorPublish",
  data() {
    return {
      editor: null,
      articleInfo: {
        id: '',
        title: "",
        text: "",
        coverImg: "",
        status: "",
        categories: [],
        source: 1, // 文章来源：富文本编辑器
        digest: ''
      },
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      articleRules: {
        title: [{required: true, message: "请输入文章标题", trigger: "blur"}],
      },
      fileList: [],
    };
  },
  props: [
    'operate',
    'articleSource',
    'updateArticle'
  ],
  watch: {
    updateArticle: function (newArticle) {
      this.updateArticle = newArticle;
      this.setUpdateData();
    }
  },
  mounted() {
    this.initEditor();
  },
  methods: {
    setUpdateData() {
      this.articleInfo = this.updateArticle;
      if (this.updateArticle.coverImg) {
        this.fileList.push({name: getFileNameByUrl(this.updateArticle.coverImg), url: this.updateArticle.coverImg});
      }
      this.editor.txt.html(this.updateArticle.text);
    },
    validArticle() {
      if (this.editor.txt.text() === "") {
        this.$message.error("请输入文章内容");
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
    initEditor() {
      this.editor = new Editor("#editor");
      this.editor.config.onchange = (html) => this.editorContent = html;
      this.editor.config.onblur = (newHtml) => {
        if (newHtml === '' || this.articleInfo.id) {
          return;
        }
        this.saveDraftArticle(() => {
        });
      }
      this.editor.config.zIndex = 1;
      this.editor.config.customUploadImg = (resultFiles, insertImgFn) => {
        if (this.articleInfo.id) {
          this.handleUploadFile(resultFiles[0], insertImgFn);
        } else {
          this.saveDraftArticle(() => this.handleUploadFile(resultFiles[0], insertImgFn));
        }
      }
      this.editor.config.pasteFilterStyle = false;
      this.editor.create();
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
    genArticleDigest(text, length) {
      return text ? text.substring(0, length) : '';
    },
    dateFormat(date) {
      return this.$options.filters['dateFormat'](date, 'yyyyMMddhhmmss')
    },
    saveToAudit() {
      this.$refs['articleForm'].validate((valid) => {
        if (valid && this.validArticle()) {
          this.saveRealArticle(1);
        }
      });
    },
    saveRealArticle(articleStatus) {
      this.articleInfo.text = this.editor.txt.html();
      this.articleInfo.coverImg = this.fileList[0] ? this.fileList[0].name : '';
      this.articleInfo.status = articleStatus;
      this.articleInfo.digest = this.genArticleDigest(this.editor.txt.text(), 100);
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
    },
    saveDraftArticle(callBack) {
      this.articleInfo.text = this.editor.txt.html();
      this.articleInfo.coverImg = this.fileList[0] ? this.fileList[0].name : '';
      this.articleInfo.status = 0;
      this.articleInfo.digest = this.genArticleDigest(this.editor.txt.text(), 100);
      this.$api.article.saveDraftArticle(this.articleInfo).then(res => {
        this.articleInfo = res.data;
        callBack();
        this.$message.success('已自动保存到草稿箱');
      }).catch(error => this.$message.error('自动保存失败'));
    },
    handleUploadFile(file, callBack) {
      this.$api.article.uploadArticleFile(file, this.articleInfo.id).then(uploadRes => {
        let path = uploadRes.data;
        callBack(path);
      }).catch(error => this.$message.error('上传失败'));
    }
  },
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
