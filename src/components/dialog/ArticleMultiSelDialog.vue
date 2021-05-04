<template>
  <div>
    <el-dialog :visible.sync="articleDialogVisible">
      <el-table size="medium" ref="articleMultiSelTable" :data="articleList" @selection-change="selectChange" @row-click="rowClick">
        <el-table-column type="selection" width="50" align="center"></el-table-column>
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="title" :show-overflow-tooltip="true" label="标题" width="300"></el-table-column>
        <el-table-column prop="author.username" label="作者" width="80" align="center"></el-table-column>
        <el-table-column label="标签" width="200" align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-for="(tag, index) of scope.row.categories" :key="tag.id">
              {{ index !== 0 ? '/' : '' + tag.cateName }}
            </span>
            <span v-if="scope.row.categories.length === 0">/</span>
          </template>
        </el-table-column>
        <el-table-column prop="createDate" :formatter="dateFormat" label="发布时间" width="180"
                         align="center"></el-table-column>
      </el-table>
      <div class="page-list">
        <el-pagination
            @size-change="queryArticle"
            @current-change="queryArticle"
            :current-page="currentPage"
            :page-sizes="[15, 30, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            background
        ></el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="submitArticle">确 定</el-button>
      </span>
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
      currentPage: 1,
      total: 0,
      loading: false,
      queryStatus: [0, 1, 2],
      sort: "DESC",
      selectArticle: []
    }
  },
  created() {
    this.queryArticle(1);
  },
  methods: {
    queryArticle(currentPage) {
      this.currentPage = currentPage;
      let pageIndex = this.currentPage - 1;
      this.loading = true;
      this.$api.article.getArticleByPage(this.pageSize, pageIndex, this.queryStatus, this.sort).then(
          (res) => {
            this.articleList = res.data.elements;
            this.total = res.data.totalCount;
            this.loading = false;
          });
    },
    dateFormat(row, column) {
      return this.$options.filters['dateFormat'](row.createDate, 'yyyy-MM-dd')
    },
    selectChange(list) {
      this.selectArticle = list;
    },
    rowClick(row) {
      this.$refs.articleMultiSelTable.toggleRowSelection(row);
    },
    submitArticle() {
      if (this.selectArticle.length !== 0) {
        this.$emit('select-article', this.selectArticle);
      }
      this.closeDialog();
    },
    closeDialog() {
      this.$refs.articleMultiSelTable.clearSelection();
      this.articleDialogVisible = false;
    }
  }
}
</script>

<style scoped>
.page-list {
  margin-top: 20px;
  padding-left: 20px;
}
</style>