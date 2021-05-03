<template>
<div class="update-log-detail">
  <el-row>
    <el-col :span="12">
      <el-form ref="form" :rules="rules" :model="updateLogForm" label-width="80px" label-position="left">
        <el-form-item label="标题" prop="title">
          <el-input v-model="updateLogForm.title"></el-input>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="16">
      <div id="updateLogEditor"></div>
    </el-col>
  </el-row>
  <div class="update-log-btn">
    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </div>
</div>
</template>

<script>
import Vditor from 'vditor';
import "vditor/dist/index.css";

export default {
  name: "UpdateLogDetail",
  data() {
    return {
      operate: '',
      updateLogForm: {
        title: ''
      },
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }]
      },
      editor: ''
    }
  },
  mounted() {
    this.initEditor();
  },
  methods: {
    initEditor() {
      this.editor = new Vditor('updateLogEditor', {
        minHeight: 600,
        placeholder: '请在此处输入内容...',
        counter: {enable: true, type: "text"},
        cache: {
          enable: false,
        },
        mode: 'sv',
      });
    }
  }
}
</script>

<style scoped>
.update-log-detail {
  padding: 20px;
}
#updateLogEditor {
  margin-top: 50px;
}
.update-log-btn {
  margin-top: 20px;
}
</style>