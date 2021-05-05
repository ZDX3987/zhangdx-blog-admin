<template>
  <div class="update-log-detail">
    <el-row>
      <el-col :span="6">
        <el-form ref="form" :rules="rules" :model="updateLogForm" label-width="80px" label-position="left">
          <el-form-item label="标题" prop="title">
            <el-input v-model="updateLogForm.title"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="updateLogForm.status" placeholder="请选择状态">
              <el-option v-for="status in updateLogStatus" :key="status.code" :label="status.text"
                         :value="status.code"></el-option>
            </el-select>
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
      <el-button type="primary" @click="saveUpdateLog('form')">保存</el-button>
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
        id: null,
        title: '',
        content: '',
        status: 1,
        createDate: null,
        updateDate: null
      },
      rules: {
        title: [{required: true, message: '请输入标题', trigger: 'blur'}],
        status: [{required: true, message: '请选择活动区域', trigger: 'change'}]
      },
      editor: '',
      updateLogStatus: [
        {code: 0, text: '已废弃'},
        {code: 1, text: '已规划'},
        {code: 2, text: '测试中'},
        {code: 3, text: '已上线'}
      ]
    }
  },
  mounted() {
    this.initEditor();
  },
  methods: {
    initEditor() {
      let that = this;
      this.editor = new Vditor('updateLogEditor', {
        minHeight: 600,
        placeholder: '请在此处输入内容...',
        counter: {enable: true, type: "text"},
        cache: {
          enable: false,
        },
        mode: 'sv',
        after() {
          that.setUpdateLogDetail();
        }
      });
    },
    saveUpdateLog(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false;
        }
        this.updateLogForm.content = this.editor.getValue();
        this.$api.settings.saveUpdateLog(this.updateLogForm).then(res => {
          this.$message.success(res.msg);
          this.$router.push({name: 'UpdateLogList'});
        }).catch(error => this.$message.error(error.msg))
      });
    },
    resetForm(formName) {
      this.updateLogForm.title = '';
      this.editor.setValue('', true);
    },
    setUpdateLogDetail() {
      this.operate = this.$route.params['operate'];
      if (this.operate !== 'update') {
        return;
      }
      this.updateLogForm = this.$route.params['updateLog'];
      this.editor.setValue(this.updateLogForm.content);
    }
  }
}
</script>

<style scoped>
.update-log-detail {
}

#updateLogEditor {
  margin-top: 50px;
}

.update-log-btn {
  margin-top: 20px;
}
</style>