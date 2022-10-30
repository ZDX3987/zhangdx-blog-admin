<template>
  <div>
    <div class="list-content">
      <div class="search-article">
        <el-form :inline="true">
          <el-form-item :model="queryParams" label="作者" size="small">
            <el-input v-model="queryParams.authorName" placeholder="请输入作者名字"></el-input>
          </el-form-item>
          <el-form-item label="文章状态">
            <el-select v-model="queryParams.queryStatus" multiple clearable placeholder="文章状态">
              <el-option v-for="(value, key, index) in status" :label="key" :value="value.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布时间">
            <el-date-picker
                v-model="queryParams.queryDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item size="middle">
            <el-button type="primary" @click="queryArticle(1)">查询</el-button>
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
        <el-table-column sortable prop="updateDate" :formatter="dateFormat" label="更新时间" width="180"
                         align="center"></el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template slot-scope="scope">
            <el-tag :type="status[scope.row.status].color">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column sortable prop="publishDate" :formatter="dateFormat" label="发布时间" width="180"
                         align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editArticle(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="primary" @click="downloadArticle(scope.$index, scope.row)">下载</el-button>
            <el-popconfirm
                icon="el-icon-info"
                title="确定删除吗？这将会删除和这篇文章相关的所有内容"
                @confirm="deleteArticle(scope.$index, scope.row)"
            >
              <el-button size="mini" type="danger" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-list">
        <el-pagination
            @size-change="queryArticle"
            @current-change="queryArticle"
            :current-page="currentPage"
            :page-sizes="[15, 30, 50]"
            :page-size="pageSize"
            :page-count="pageCount"
            layout="total, sizes, prev, pager, next, jumper"
            background
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {downloadMdFile} from '../../util/file-util';

export default {
  name: "ArticleList",
  data() {
    return {
      articleList: [],
      queryParams: {
        authorName: "",
        sort: 2,
        queryStatus: [],
        queryDate: null
      },
      pageSize: 10,
      currentPage: 1,
      pageCount: 0,
      loading: false,

      articleStatus: [
        {name: "已保存", value: 0, color: ""},
        {name: "待审核", value: 1, color: "warning"},
        {name: "已发布", value: 2, color: "success"},
        {name: "已删除", value: 3, color: "danger"},
      ],
      status: {
        "已保存": {name: "已保存", value: 0, color: ""},
        "待审核": {name: "待审核", value: 1, color: "warning"},
        "已发布": {name: "已发布", value: 2, color: "success"},
        "已删除": {name: "已删除", value: 3, color: "danger"}
      }
    };
  },
  created() {
    this.queryArticle(1);
  },
  methods: {
    queryArticle(currentPage) {
      this.currentPage = currentPage;
      let pageIndex = this.currentPage - 1;
      this.loading = true;
      let queryStatus = this.queryParams.queryStatus;
      if (queryStatus.length === 0) {
        queryStatus = [0, 1, 2, 3];
      }
      this.$api.article.getArticleByPage(this.pageSize, pageIndex, queryStatus, this.queryParams.sort, this.queryParams.queryDate).then(
          (res) => {
            this.articleList = res.data.records;
            this.pageCount = res.data.pages;
            this.loading = false;
          },
          (error) => this.$message.error("文章查询失败！")
      );
    },
    previewArticle(row) {
      this.$router.push({name: 'ArticlePreview', params: {id: row.id}})
    },
    editArticle(index, row) {
      this.$router.push({name: 'PublishArticle', params: {operate: 'update', article: row}})
    },
    downloadArticle(index, row) {
      this.$api.article.download(row.id).then(res => {
        downloadMdFile(res, row.title + '.md');
        this.$message.success('下载成功');
      })
    },
    deleteArticle(index, row) {
      this.$api.article.delArticle(row.id).then(res => {
        this.$message.success(res.msg);
        this.queryArticle(1);
      }).catch(error => this.$message.error(error.msg));
    },
    dateFormat(row, column, cellValue) {
      return this.$options.filters['dateFormat'](cellValue)
    }
  },
};
</script>

<style scoped>
.list-content {
  background-color: #fff;
  min-height: 90vh;
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
