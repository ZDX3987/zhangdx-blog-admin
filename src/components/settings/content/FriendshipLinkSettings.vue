<template>

  <div class="friend-content">
    <el-row>
      <el-col>
        <el-button-group class="btn-group">
          <el-button type="primary" size="small" @click="addLink()">新建友链</el-button>
        </el-button-group>
      </el-col>
    </el-row>
    <el-table :data="friendshipLinks" v-loading="loading" header-row-class-name="table-header">
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="linkName" label="名称" width="280" align="center"></el-table-column>
      <el-table-column prop="linkUrl" label="地址" width="380" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="editLink(scope.$index, scope.row)">编辑</el-button>
          <el-popconfirm
              confirmButtonText='好的'
              cancelButtonText='不用了'
              icon="el-icon-info"
              title="确定删除这个友链吗？"
              @onConfirm="deleteLink(scope.$index, scope.row)"
          >
            <el-button size="mini" type="danger" slot="reference">删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog class="category-dialog" title="新建友链"
               :visible.sync="dialogFormVisible"
               :close-on-click-modal="false"
               :destroy-on-close="true">
      <el-form :model="linkForm" :rules="linkRules" ref="linkForm">
        <el-form-item label="名称" prop="linkName" label-width="100px">
          <el-input v-model="linkForm.linkName"></el-input>
        </el-form-item>
        <el-form-item label="地址" label-width="100px">
          <el-input v-model="linkForm.linkUrl"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitLink('linkForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "FriendshipLinkSettings",
  data() {
    return {
      friendshipLinks: [],
      total: 4,
      loading: false,
      dialogFormVisible: false,
      linkForm: {
        id: null,
        linkName: '',
        linkUrl: ''
      },
      linkRules: {
        linkName: [{required: true, message: '请输入名称', trigger: 'blur'}]
      }
    }
  },
  created() {
    this.query();
  },
  methods: {
    query() {
      this.loading = true;
      this.$api.settings.getAllFriendshipLink().then(res => {
        this.friendshipLinks = res.data;
        this.loading = false;
      }).catch(error => this.$message.error(error.msg));
    },
    addLink() {
      this.dialogFormVisible = true;
    },
    editLink(index, row) {
      this.linkForm = row;
      this.dialogFormVisible = true;
    },
    deleteLink(index, row) {
      this.$api.settings.deleteFriendshipLink(row.id).then(res => {
        this.$message.success(res.msg);
        this.query();
      }).catch(error => this.$message.error(error.msg))
    },
    submitLink(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.settings.saveOrUpdateFriendshipLink(this.linkForm).then(res => {
            this.$message.success(res.msg);
            this.dialogFormVisible = false;
            this.query();
          }).catch(error => this.$message.error(error.msg));
        }
      });
    }
  }
}
</script>

<style scoped>
.friend-content {
  background-color: #FFF;
}
</style>
