<template>
  <div class="edit-topic">
    <el-form ref="topicForm" :inline="true" :model="topicForm" :rules="rules" label-width="100px">
      <el-row>
        <el-col>
          <el-form-item label="专题名称" prop="title">
            <el-input v-model="topicForm.title"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveTopic('topicForm')">保存</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-button size="small" type="primary" plain @click="openArticleDialog">添加文章</el-button>
          <el-button size="small" type="danger" @click="multiDeleteArticle" plain>删除文章</el-button>
          <el-table ref="selectArticleTable" :data="articleList" height="500"
                    @selection-change="selectArticle" @row-click="rowClick">
            <el-table-column type="selection" width="50" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="title" label="标题" width="300" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="author.username" label="作者" width="120" align="center"></el-table-column>
            <el-table-column label="标签" width="200" align="center" :show-overflow-tooltip="true">
              <template slot-scope="scope">
            <span v-for="(tag, index) of scope.row.categories" :key="tag.id">
              {{ index !== 0 ? '/' : '' + tag.cateName }}
            </span>
                <span v-if="scope.row.categories.length === 0">/</span>
              </template>
            </el-table-column>
            <el-table-column prop="createDate" label="发布时间" :formatter="dateFormat" width="120" align="center">
            </el-table-column>
            <el-table-column width="120" label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="deleteArticle(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-form>
    <article-multi-sel-dialog ref="articleDialog" @select-article="addArticle"></article-multi-sel-dialog>
  </div>
</template>

<script>
import ArticleMultiSelDialog from "../dialog/ArticleMultiSelDialog";

export default {
  name: "EditTopic",
  data() {
    return {
      topicForm: {
        id: null,
        title: '',
        articleIds: []
      },
      rules: {
        title: [{required: true, message: '请输入专题名称', trigger: 'blur'}]
      },
      articleList: [],
      selectList: [],
    }
  },
  components: {
    ArticleMultiSelDialog
  },
  methods: {
    saveTopic(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false;
        }
        this.$message.success('保存成功');
      });
    },
    selectArticle(list) {
      this.selectList = list;
    },
    openArticleDialog() {
      this.$refs.articleDialog.articleDialogVisible = true;
    },
    addArticle(list) {
      this.articleList = this.articleList.concat(list);
    },
    deleteArticle(index) {
      this.articleList.splice(index, 1);
    },
    multiDeleteArticle() {
      if (this.selectList.length === 0) {
        return;
      }
      this.articleList = this.articleList.filter(article => this.selectList.findIndex(select => select.id === article.id));
    },
    rowClick(row) {
      this.$refs.selectArticleTable.toggleRowSelection(row);
    },
    dateFormat(row, column) {
      return this.$options.filters['dateFormat'](row.createDate, 'yyyy-MM-dd')
    },
  }
}
</script>

<style scoped>
.edit-topic {
  background-color: #FFF;
  padding: 20px;
}
</style>
