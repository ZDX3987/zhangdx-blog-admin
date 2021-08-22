<template>
  <div class="article-form">
    <el-row>
      <el-col :span="22">
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
      </el-col>
      <el-col :span="2">
        <el-upload action="/" :on-change="importMD" accept="md" :auto-upload="false" :show-file-list="false">
          <el-button type="primary" size="small">导入MarkDown</el-button>
        </el-upload>
      </el-col>
    </el-row>
    <div id="vditor"></div>
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
</template>

<script>
import Vditor from 'vditor'
import "vditor/dist/index.css"
import {getFileNameByUrl} from "../../util/file-util";
import {getTextFromHtml} from "../../util/html-util";

export default {
  name: "VditorPublish",
  data() {
    return {
      articleInfo: {
        id: '',
        title: "",
        text: "",
        coverImg: "",
        status: 0,
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
      fileList: [],
      contentEditor: ''
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
    this.initVditor();
  },
  methods: {
    initVditor() {
      let that = this;
      this.contentEditor = new Vditor('vditor', {
        minHeight: 500,
        placeholder: '请在此处输入内容...',
        counter: {enable: true, type: "text"},
        cache: {
          enable: false,
        },
        mode: 'sv',
        blur: (mdValue) => {
          if (mdValue === '\n' || that.articleInfo.id) {
            return;
          }
          that.saveDraftArticle(that, () => that.contentEditor.setValue(that.articleInfo.text, true));
        },
        upload: {
          url: '/api/article/article/upload',
          handler(files) {
            if (that.articleInfo.id) {
              that.handleCustomUploadFile(that, files)
            } else {
              that.saveDraftArticle(that, () => that.handleCustomUploadFile(that, files));
            }
          },
          format(files, responseText) {
            let responseParse = JSON.parse(responseText)
            let result = {
              "msg": responseParse.msg,
              "code": 0,
              "data": {
                "errFiles": [],
                "succMap": {
                  [files[0].name]: responseParse.data
                }
              }
            }
            return JSON.stringify(result);
          }
        }
      });
    },
    dateFormat(date) {
      return this.$options.filters['dateFormat'](date, 'yyyyMMddhhmmss')
    },
    setUpdateData() {
      this.articleInfo = this.updateArticle;
      if (this.updateArticle.coverImg) {
        this.fileList.push({name: getFileNameByUrl(this.updateArticle.coverImg), url: this.updateArticle.coverImg});
      }
      this.contentEditor.setValue(this.updateArticle.text);
    },
    saveToAudit() {
      this.$refs['articleForm'].validate((valid) => {
        if (valid && this.validArticle()) {
          this.saveRealArticle(1);
        }
      });
    },
    saveDraftArticle(that, callBack) {
      that.articleInfo.coverImg = that.fileList[0] ? that.fileList[0].name : '';
      that.articleInfo.status = 0;
      that.articleInfo.digest = that.genArticleDigest(that.contentEditor.getHTML(), 100);
      that.articleInfo.text = that.contentEditor.getValue();
      that.$api.article.saveDraftArticle(that.articleInfo).then(res => {
        that.articleInfo = res.data;
        callBack();
        that.$message.success('已自动保存到草稿箱');
      }).catch(error => that.$message.error('自动保存失败'));
    },
    handleCustomUploadFile(that, files) {
      that.$api.article.uploadArticleFile(files[0], that.articleInfo.id).then(uploadRes => {
        let name = files[0] && files[0].name;
        let path = uploadRes.data;
        let succFileText = "";
        if (that.contentEditor && that.contentEditor.getCurrentMode() === "wysiwyg") {
          succFileText += `<img alt=${name} src="${path}">`;
        } else {
          succFileText += `![${name}](${path})`;
        }
        that.contentEditor.insertValue(succFileText);
        that.contentEditor.tip('上传成功');
      }).catch(error => that.contentEditor.tip('上传失败'));
    },
    saveRealArticle(articleStatus) {
      this.articleInfo.coverImg = this.fileList[0] ? this.fileList[0].name : '';
      this.articleInfo.status = articleStatus;
      this.articleInfo.digest = this.genArticleDigest(this.contentEditor.getHTML(), 100);
      this.articleInfo.text = this.contentEditor.getValue();
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
    validArticle() {
      if ((this.articleInfo.text = this.contentEditor.getValue()) === '') {
        this.$message.error("请输入文章内容");
        return false;
      }
      if (this.articleInfo.categories.length === 0) {
        this.$message.error("请选择文章分类标签");
        return false;
      }
      if (!this.articleInfo.id) {
        this.$message.error("正在保存草稿，请稍后在试");
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
    genArticleDigest(text, length) {
      text = getTextFromHtml(text);
      return text ? text.substring(0, length) : '';
    },
    importMD(file) {
      if (!file.name.endsWith('.md')) {
        this.$message.warning('只能导入Markdown文件')
        return;
      }
      let fileReader = new FileReader();
      fileReader.readAsText(file.raw);
      fileReader.onload = (e) => {
        this.contentEditor.setValue(e.target.result, true);
      }
    }
  }
}
</script>

<style scoped>
.article-form {
  height: 100%;
}

.title-input {
  width: 50%;
}

#vditor {
  margin-bottom: 20px;
  height: 55vh;
}

.article-cate-list {
  margin-right: 10px;
}
</style>
