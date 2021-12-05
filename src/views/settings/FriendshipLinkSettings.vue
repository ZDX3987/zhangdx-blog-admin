<template>
  <div class="friend-content">
    <div class="friend-link">
      <el-row>
        <el-col>
          <el-button-group class="btn-group">
            <el-button type="primary" size="small" @click="addLink()">新建友链</el-button>
          </el-button-group>
        </el-col>
      </el-row>
      <el-table :data="friendshipLinks" v-loading="loading" header-row-class-name="table-header">
        <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
        <el-table-column prop="linkName" label="网站名称" width="280" align="center"></el-table-column>
        <el-table-column label="网站地址" width="380" align="center">
          <template slot-scope="scope">
            <el-link target="_blank" :underline="false" :href="scope.row.linkUrl">{{ scope.row.linkUrl }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="linkDesc" label="网站描述" width="280" align="center"></el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template slot-scope="scope">
            <el-tag :type="showStatus(scope.row.status).type">{{ showStatus(scope.row.status).name }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editLink(scope.$index, scope.row)">编辑</el-button>
            <el-popconfirm
                confirmButtonText='好的'
                cancelButtonText='不用了'
                icon="el-icon-info"
                title="确定删除这个友链吗？"
                @confirm="deleteLink(scope.$index, scope.row)"
            >
              <el-button size="mini" type="danger" slot="reference">删除
              </el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <friendship-link-dialog ref="friendshipLinkDialog" @submit-success="query"/>
  </div>
</template>

<script>
import FriendshipLinkDialog from '../../components/dialog/FriendshipLinkDialog';
import {showCommonStatus} from '../../util/status-utils';

export default {
  name: "FriendshipLinkSettings",
  data() {
    return {
      friendshipLinks: [],
      total: 4,
      loading: false,
    }
  },
  components: {
    FriendshipLinkDialog
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
      this.$refs.friendshipLinkDialog.open();
    },
    editLink(index, row) {
      this.$refs.friendshipLinkDialog.linkForm = row;
      this.$refs.friendshipLinkDialog.open();
    },
    deleteLink(index, row) {
      this.$api.settings.deleteFriendshipLink(row.id).then(res => {
        this.$message.success(res.msg);
        this.query();
      }).catch(error => this.$message.error(error.msg))
    },
    showStatus(code) {
      return showCommonStatus(code);
    }
  }
}
</script>

<style scoped>
.friend-content {
  background-color: #FFF;
  min-height: 90vh;
}

.friend-link {
  margin: 20px;
  padding-top: 20px;
}
</style>
