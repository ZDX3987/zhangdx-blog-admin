<template>
  <div>
    <el-table :data="sysUserList" style="width: 100%" stripe v-loading="loading">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="nickname" label="昵称"></el-table-column>
      <el-table-column prop="tel" label="手机号"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" :formatter="dateFormat"></el-table-column>
      <el-table-column label="第三方账号绑定">
        <template slot-scope="scope">
          <el-avatar v-for="socialUser in scope.row.socialUserVos" :key="socialUser.id" size="large"
                     :src="socialUser.avatar" :title="socialUser.source"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              type="primary"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
              size="mini"
              :type="scope.row.status ? 'danger' : 'primary'"
              @click="handleDelete(scope.$index, scope.row)">{{ scope.row.status ? '禁用' : '启用' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :page-size="pageSize"
                   :hide-on-single-page="true"
                   :total="total" :current-page="currentPage" @current-change="query($event)">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "SysUserList",
  data() {
    return {
      sysUserList: [],
      total: 1,
      currentPage: 1,
      pageSize: 10,
      loading: false
    }
  },
  created() {
    this.query(this.currentPage)
  },
  methods: {
    query(currentPage) {
      this.loading = true;
      this.$api.user.getSysUserByPage(currentPage, this.pageSize).then(res => {
        this.sysUserList = res.data.records;
        this.total = res.data.total;
      }).catch(error => {
      }).finally(() => this.loading = false);
    },
    dateFormat(row) {
      return this.$options.filters['dateFormat'](row.createTime)
    }
  }
}
</script>

<style scoped>

</style>