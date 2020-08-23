<template>
  <div>
    <div class="list-content">
      <el-table
        border
        :default-sort="{prop: 'createDate', order: 'descending'}"
        :data="articleList"
      >
        <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
        <el-table-column prop="title" label="标题" width="300" align="center"></el-table-column>
        <el-table-column prop="author" label="作者" width="180" align="center"></el-table-column>
        <el-table-column sortable prop="createDate" label="发布时间" width="180" align="center"></el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template slot-scope="scope">
            <el-tag type="success">{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-list">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[15, 30, 50, 100]"
          :page-size="15"
          layout="total, sizes, prev, pager, next, jumper"
          :total="articleList.length"
          background
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleList",
  data() {
    return {
      articleList: [
        {
          title: "这是一个文章标题",
          author: "守到黎明",
          createDate: "2020-08-23",
          status: "已发布",
        },
      ],
    };
  },
};
</script>

<style scoped>
.list-content {
  width: 98%;
  margin: 0 auto;
  background-color: #fff;
  margin-top: 20px;
}
.el-table {
}
.page-list {
  margin-top: 20px;
  padding-left: 20px;
}
</style>