<template>
  <div class="content-edit">
    <el-page-header @back="goBack" :content="$route.meta.title">
    </el-page-header>
    <el-divider/>
    <el-row>
      <el-col :span="8">
        <el-form :model="contentForm" :rules="contentFormRules" ref="contentForm" label-width="100px">
          <el-form-item label="名称" prop="name">
            <el-input v-model="contentForm.name"></el-input>
          </el-form-item>
          <el-form-item label="Html文档ID" prop="documentId">
            <el-input v-model="contentForm.documentId"></el-input>
          </el-form-item>
          <el-form-item label="路由" prop="router">
            <el-input v-model="contentForm.router"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div id="content-editor" class="content-editor"></div>
      </el-col>
    </el-row>
    <el-button-group class="btn-group">
      <el-button type="primary" @click="saveContent">保存</el-button>
    </el-button-group>
  </div>
</template>

<script>
import Editor from 'wangeditor';

export default {
  name: "ContentEdit",
  data() {
    return {
      operate: '',
      contentId: null,
      contentForm: {
        id: '',
        documentId: '',
        name: '',
        html: '',
        router: ''
      },
      contentFormRules: {
        name: {required: true, message: '请输入名称', trigger: 'blur'},
        documentId: {required: true, message: '请输入文档ID', trigger: 'blur'},
        router: {required: true, message: '请输入路由', trigger: 'blur'}
      },
      contentEditor: null
    }
  },
  mounted() {
    this.operate = this.$route.params.operate;
    if (this.operate === 'update') {
      this.contentId = this.$route.params.contentId;
      this.queryContent();
    }
    this.initEditor();
  },
  methods: {
    saveContent() {
      this.$refs.contentForm.validate((valid) => {
        if (!valid) {
          return;
        }
        this.contentForm.html = this.contentEditor.txt.html();
        this.$api.content.saveOrUpdateContent(this.contentForm).then(res => {
          this.$router.push({name: 'ContentList'});
          this.$message.success(res.msg);
        })
            .catch(error => this.$message.error(error));
      });
    },
    queryContent() {
      this.$api.content.getContentById(this.contentId).then(res => {
        this.contentForm = res.data;
        this.contentEditor.txt.html(res.data.html);
      })
          .catch(error => this.$message.error(error));
    },
    initEditor() {
      this.contentEditor = new Editor("#content-editor");
      this.contentEditor.config.zIndex = 1;
      this.contentEditor.config.pasteFilterStyle = false;
      this.contentEditor.create();
    },
    goBack() {
      this.$router.back();
    }
  }
}
</script>

<style scoped>
.content-edit {
  margin: 20px;
  padding-top: 20px;
}

.btn-group {
  margin-top: 20px;
}
</style>