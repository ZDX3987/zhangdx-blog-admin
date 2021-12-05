<template>
  <div class="log-content">
    <div class="log-table">
      <el-row>
        <el-col>
          <el-button-group class="btn-group">
            <el-button type="primary" size="small" @click="addLog()">新建日志</el-button>
          </el-button-group>
        </el-col>
      </el-row>
      <el-table :data="updateLogList" v-loading="loading">
        <el-table-column width="50" type="index"></el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="最后修改时间" :formatter="dateFormat" prop="updateDate"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editUpdateLog(scope.$index, scope.row)">编辑</el-button>
            <el-popconfirm icon="el-icon-info" title="确定删除吗这个日志吗？" @confirm="deleteUpdateLog(scope.$index, scope.row)">
              <el-button size="mini" type="danger" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-list">
        <el-pagination
            @size-change="queryLog"
            @current-change="queryLog"
            :current-page="currentPage"
            :page-sizes="[15, 30, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            hide-on-single-page
            background
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "UpdateLogList",
  data() {
    return {
      updateLogList: [],
      pageSize: 15,
      currentPage: 1,
      total: 0,
      loading: false,
    }
  },
  created() {
    this.queryLog(1);
  },
  methods: {
    addLog() {
      this.$router.push({name: 'AddUpdateLogDetail'});
    },
    queryLog(currentPage) {
      this.loading = true;
      let pageIndex = currentPage - 1;
      this.$api.settings.getUpdateLogByPage(pageIndex, this.pageSize).then(res => {
        this.updateLogList = res.data.elements;
        this.total = res.data.totalCount;
      }).catch(error => this.$message.error('查询失败'))
          .finally(() => this.loading = false);
    },
    editUpdateLog(index, row) {
      this.$router.push({name: 'ModifyUpdateLogDetail', params: {operate: 'update', updateLog: row}})
    },
    deleteUpdateLog(index, row) {
      this.$api.settings.deleteUpdateLog(row.id).then(res => {
        this.$message.success(res.msg);
        this.queryLog(1);
      }).catch(error => this.$message.error(error.msg));
    },
    dateFormat(row) {
      return this.$options.filters['dateFormat'](row.updateDate)
    }
  }
}
</script>

<style scoped>
.log-content {

}

.page-list {
  margin-top: 20px;
}
</style>