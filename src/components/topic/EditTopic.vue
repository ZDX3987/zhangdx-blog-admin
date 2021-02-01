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
          <el-button size="small" type="danger" plain>删除文章</el-button>
          <el-table :data="tableData" height="500" @selection-change="selectArticle">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="title" label="标题" width="300"></el-table-column>
            <el-table-column prop="author" label="作者" width="120"></el-table-column>
            <el-table-column prop="createTime" label="发布时间" width="120"></el-table-column>
            <el-table-column width="120" label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-form>
    <article-dialog ref="articleDialog"></article-dialog>
  </div>
</template>

<script>
import ArticleDialog from "../dialog/ArticleDialog";

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
      tableData: [{
        createTime: '2016-05-03',
        author: '王小虎',
        title: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  components: {
    ArticleDialog
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
      console.log(list)
    },
    openArticleDialog() {
      this.$refs.articleDialog.articleDialogVisible = true;
    }
  }
}
</script>

<style scoped>
.edit-topic {
  background-color: #FFF;
  padding: 20px;
}
</style>
