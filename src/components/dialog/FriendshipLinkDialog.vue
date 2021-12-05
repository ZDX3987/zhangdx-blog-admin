<template>
  <el-dialog title="申请友链" :visible.sync="dialogFormVisible" width="500px" @close="close"
             :close-on-click-modal="false" :destroy-on-close="true">
    <el-form :model="linkForm" :rules="linkRules" ref="linkForm">
      <el-form-item label="网站名称" :label-width="formLabelWidth" prop="linkName">
        <el-input v-model="linkForm.linkName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="网站地址" :label-width="formLabelWidth" prop="linkUrl">
        <el-input v-model="linkForm.linkUrl" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="网站描述" :label-width="formLabelWidth" prop="linkDesc">
        <el-input type="textarea" maxlength="100" show-word-limit v-model="linkForm.linkDesc"
                  autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submitLink">提 交</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "FriendshipLinkDialog",
  data() {
    let customValidateUrl = (rule, value, callback) => {
      if (!/^(?:http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/.test(value)) {
        callback(new Error('请输入正确的网址'));
      }
      callback();
    };
    return {
      dialogFormVisible: false,
      linkForm: {
        linkName: '',
        linkDesc: '',
        linkUrl: ''
      },
      formLabelWidth: '100px',
      linkRules: {
        linkName: {required: true, message: '请输入网站名称', trigger: 'blur'},
        linkDesc: {max: 100, message: '长度在 100 个字符', trigger: 'blur'},
        linkUrl: [
          {required: true, message: '请输入网站地址', trigger: 'blur'},
          {validator: customValidateUrl, trigger: 'blur'}
        ],
      },
    };
  },
  methods: {
    submitLink() {
      this.$refs.linkForm.validate((valid) => {
        if (!valid) {
          return;
        }
        this.$api.settings.saveOrUpdateFriendshipLink(this.linkForm)
            .then(res => {
              this.$message.success(res.msg);
              this.$emit("submit-success")
              this.close();
            })
            .catch(error => this.$message.error(error));
      });
    },
    open() {
      this.dialogFormVisible = true;
    },
    close() {
      this.linkForm = {
        linkName: '',
        linkDesc: '',
        linkUrl: ''
      }
      this.dialogFormVisible = false;
    }
  }
}
</script>

<style scoped>

</style>