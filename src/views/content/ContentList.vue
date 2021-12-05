<template>
  <div class="content-list">
    <el-row class="content-btn">
      <el-col>
        <el-button-group class="btn-group">
          <el-button type="primary" size="small" @click="toEdit">新建页面内容</el-button>
        </el-button-group>
      </el-col>
    </el-row>
    <el-table :data="contentList" v-loading="loading">
      <el-table-column width="100" label="序号" type="index"></el-table-column>
      <el-table-column width="300" label="名称" prop="name"></el-table-column>
      <el-table-column width="300" label="文档ID" prop="documentId"></el-table-column>
      <el-table-column width="500" label="路由" prop="router"></el-table-column>
      <el-table-column width="300" label="最后修改时间" :formatter="dateFormat" prop="updateDate"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="editContent(scope.$index, scope.row)">编辑</el-button>
          <el-popconfirm icon="el-icon-info" title="确定删除吗？" @confirm="deleteContent(scope.$index, scope.row)">
            <el-button size="mini" type="danger" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-list">
      <el-pagination background layout="prev, pager, next" :page-size="pageSize"
                     :hide-on-single-page="true"
                     :total="total" :current-page="currentPage" @current-change="query($event)">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContentList",
  data() {
    return {
      contentList: [],
      loading: false,
      total: 1,
      currentPage: 1,
      pageSize: 10,
    }
  },
  created() {
    this.query(this.currentPage)
  },
  methods: {
    query(currentPage) {
      this.loading = true;
      this.$api.content.getAllContentByPage(currentPage, this.pageSize).then(res => {
        this.contentList = res.data.records;
        this.total = res.data.total;
      }).catch(error => {
      }).finally(() => this.loading = false);
    },
    editContent(index, row) {
      this.$router.push({name: 'ModifyContentDetail', params: {operate: 'update', contentId: row.id}})
    },
    deleteContent(index, row) {
      this.$api.content.deleteContent(row.id).then(res => {
        this.$message.success(res.msg);
        this.query(1);
      }).catch(error => this.$message.error(error.msg));
    },
    toEdit() {
      this.$router.push({name: 'AddContentDetail', params: {operate: 'add'}})
    },
    dateFormat(row) {
      return this.$options.filters['dateFormat'](row.updateDate)
    }
  }
}
</script>

<style scoped>
.content-list {
  margin: 20px;
  padding-top: 20px;
}

.page-list {
  margin-top: 20px;
}
</style>