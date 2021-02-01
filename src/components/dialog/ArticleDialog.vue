<template>
  <div>
    <el-dialog title="选择文章" :visible.sync="articleDialogVisible">
      <el-table :data="articleList">
        <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
        <el-table-column prop="title" label="标题" width="300" align="center"></el-table-column>
        <el-table-column prop="author.username" label="作者" width="180" align="center"></el-table-column>
        <el-table-column sortable prop="createDate" :formatter="dateFormat" label="发布时间" width="180"
                         align="center"></el-table-column>
      </el-table>
      <div class="page-list">
        <el-pagination
            @size-change="queryArticle(pageIndex)"
            @current-change="queryArticle(pageIndex)"
            :current-page="pageIndex"
            :page-sizes="[15, 30, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            background
        ></el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ArticleDialog",
  data() {
    return {
      articleDialogVisible: false,
      articleList: [],
      queryParams: {
        authorName: "",
      },
      pageSize: 15,
      pageIndex: 0,
      total: 0,
      loading: false,
      queryStatus: [0, 1, 2],
      sort: "DESC",
    }
  },
  created() {
    this.queryArticle(0);
  },
  methods: {
    queryArticle(pageIndex) {
      this.loading = true;
      this.pageIndex = pageIndex;
      let formData = new FormData();
      formData.append("pageSize", this.pageSize);
      formData.append("pageIndex", pageIndex);
      formData.append("articleStatus", this.queryStatus);
      formData.append("sort", this.sort);
      this.$api.article.getArticleByPage(formData).then(
          (res) => {
            this.articleList = res.data.elements;
            this.total = res.data.totalCount;
            this.loading = false;
          },
          (error) => {
          }
      );
    },
    dateFormat(row, column) {
      return this.$options.filters['dateFormat'](row.createDate, 'yyyy-MM-dd')
    }
  }
}
</script>

<style scoped>

</style>