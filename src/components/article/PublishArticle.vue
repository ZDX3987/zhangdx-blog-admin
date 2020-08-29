<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="富文本编辑器">
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
              >
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{file}">
                  <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
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
                      @click="handleDownload(file)"
                    >
                      <i class="el-icon-download"></i>
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
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
            </el-form-item>
          </el-form>
          <div id="editor" class="my-editor"></div>
          <el-tooltip class="item" effect="dark" content="提交至管理员审核" placement="top-start">
            <el-button type="primary" @click="publish('form')">发布</el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="保存至草稿箱" placement="top-end">
            <el-button>保存</el-button>
          </el-tooltip>
        </div>
      </el-tab-pane>
      <el-tab-pane label="MarkDown编辑器">配置管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Editor from "wangeditor";

export default {
  name: "Publish",
  data() {
    return {
      editor: null,
      articleInfo: {
        title: "",
        text: "",
        coverImg: "",
        authorId: "",
        status: "",
      },
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      articleRules: {
        title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
      },
      fileList: [],
    };
  },
  mounted() {
    this.editor = new Editor("#editor");
    this.editor.customConfig.onchange = (html) => {
      this.editorContent = html;
    };
    this.editor.customConfig.uploadImgServer = "/api/article/upload";
    this.editor.customConfig.uploadFileName = "file";
    this.editor.customConfig.zIndex = 1;
    this.editor.customConfig.pasteFilterStyle = false;
    this.editor.create();
  },
  methods: {
    handleRemove(file) {
      this.$refs.upload.clearFiles();
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    publish(form) {
      this.$refs[form].validate((valid) => {
        if (valid && this.validArticle()) {
          this.$message.success("发布成功");
        }
      });
    },
    validArticle() {
      if (this.editor.txt.text() == "") {
        this.$message.error("请输入文章内容");
        return false;
      }
      return true;
    },
  },
};
</script>

<style scoped>
.title-input {
  width: 50%;
}
.my-editor {
  margin-bottom: 20px;
}
</style>