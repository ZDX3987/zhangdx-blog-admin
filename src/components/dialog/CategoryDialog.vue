<template>
  <div>
    <el-dialog title="标签列表" :visible.sync="cateDialogVisible">
      <el-table :data="cateList" @row-click="handleCurrentChange">
        <el-table-column type="index" label="序号" width="150"></el-table-column>
        <el-table-column property="cateName" label="标签名称" width="200"></el-table-column>
        <el-table-column property="articleCount" label="文章数量"></el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "CategoryDialog",
  data() {
    return {
      cateDialogVisible: false,
      cateList: [],
      total: 0,
      pageIndex: 0,
      pageSize: 15,
    }
  },
  created() {
    let params = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    }
    this.$api.article.getAllCategory(params).then(res => {
      this.cateList = res.data.elements;
    }).catch(error => this.$message.error(error.msg));
  },
  methods: {
    handleCurrentChange(row) {
      this.$emit('onSelect', row);
      this.cateDialogVisible = false;
    }
  }
}
</script>

<style scoped>

</style>
