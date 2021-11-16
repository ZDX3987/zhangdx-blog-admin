<template>
  <div>
    <el-table :data="sysUserList" style="width: 100%">
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
      <el-table-column
          fixed="right"
          label="操作"
          width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-link type="danger">禁用</el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next"
                   :total="total" :current-page="currentPage">
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
      pageSize: 10
    }
  },
  created() {
    this.query(this.currentPage)
  },
  methods: {
    query(currentPage) {
      this.$api.user.getSysUserByPage(currentPage, this.pageSize).then(res => {
        this.sysUserList = res.data.records;
        this.total = res.data.total;
      }).catch(error => {
      });
    },
    dateFormat(row) {
      return this.$options.filters['dateFormat'](row.createTime)
    }
  }
}
</script>

<style scoped>

</style>