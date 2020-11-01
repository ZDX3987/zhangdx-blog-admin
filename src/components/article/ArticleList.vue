<template>
  <div>
    <div class="list-content">
      <div class="search-article">
        <el-form :inline="true">
          <el-form-item :model="queryParams" label="作者" size="small">
            <el-input v-model="queryParams.authorName" placeholder="请输入作者名字"></el-input>
          </el-form-item>
          <el-form-item size="small">
            <el-button type="primary" @click="queryArticle(pageIndex)">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        header-row-class-name="table-header"
        :default-sort="{prop: 'createDate', order: 'descending'}"
        :data="articleList"
        v-loading="loading"
        @row-dblclick="previewArticle"
      >
        <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
        <el-table-column prop="title" label="标题" width="300" align="center"></el-table-column>
        <el-table-column prop="author.username" label="作者" width="180" align="center"></el-table-column>
        <el-table-column sortable prop="createDate" :formatter="dateFormat" label="发布时间" width="180"
                         align="center"></el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template slot-scope="scope">
            <el-tag :type="statusEnum[scope.row.status].type">{{ statusEnum[scope.row.status].text }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editArticle(scope.$index, scope.row)">编辑</el-button>
            <el-popconfirm
              icon="el-icon-info"
              title="确定删除吗？这将会删除和这篇文章相关的所有内容"
              @onConfirm="deleteArticle(scope.$index, scope.row)"
            >
              <el-button size="mini" type="danger" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
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
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleList",
  data() {
    return {
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
      statusEnum: [
        {text: "已保存", type: ""},
        {text: "待审核", type: "warning"},
        {text: "已发布", type: "success"},
        {text: "已删除", type: "danger"},
      ],
    };
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
    previewArticle(row) {
      this.$router.push({name: 'ArticlePreview', params: {id: row.id}})
    },
    editArticle(index, row) {
      console.log(row)
    },
    deleteArticle(index, row) {
      this.$api.article.delArticle(row.id).then(res => {
        this.$message.success(res.msg);
        this.queryArticle(0);
      }).catch(error => this.$message.error(error.msg));
    },
    dateFormat(row, column) {
      return this.$options.filters['dateFormat'](row.createDate, 'yyyy-MM-dd')
    }
  },
};
</script>

<style scoped>
.list-content {
  background-color: #fff;
}

.page-list {
  margin-top: 20px;
  padding-left: 20px;
  padding-bottom: 20px;
}

.search-article {
  padding-top: 20px;
  padding-left: 30px;
}
</style>
