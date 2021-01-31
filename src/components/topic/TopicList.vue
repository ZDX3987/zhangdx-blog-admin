<template>
  <div class="topic-content">
    <el-row>
      <el-col>
        <el-button-group class="btn-group">
          <el-button type="primary" size="small" @click="addTopic()">新建主题</el-button>
        </el-button-group>
      </el-col>
    </el-row>
    <el-table :data="topicList" v-loading="loading" header-row-class-name="table-header">
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="title" label="名称" width="280" align="center"></el-table-column>
      <el-table-column prop="articleCount" label="文章数量" width="100" align="center"></el-table-column>
      <el-table-column prop="updateDate" label="更新时间" width="280" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="editTopic(scope.$index, scope.row)">编辑</el-button>
          <el-popconfirm
            confirmButtonText='好的'
            cancelButtonText='不用了'
            icon="el-icon-info"
            title="确定删除这个专题吗？"
            @onConfirm="deleteTopic(scope.$index, scope.row)"
          >
            <el-button size="mini" type="danger" slot="reference">删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page-list"
      background
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "TopicList",
  data() {
    return {
      total: 0,
      pageIndex: 0,
      pageSize: 15,
      loading: false,
      topicList: [],
    }
  },
  created() {
    this.query();
  },
  methods: {
    query() {
      let params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      this.loading = true;
      this.$api.article.getAllCategory(params).then(res => {
        this.categoryList = res.data.elements;
        this.loading = false;
      }).catch(error => this.$message.error(error.msg));
    },
    addTopic() {
      this.$router.push({name: 'EditTopic'})
    }
  }
}
</script>

<style scoped>
.topic-content {
  background-color: #FFF;
}

.btn-group {
  margin-top: 2%;
  margin-left: 2%;
}

.page-list {
  margin-top: 20px;
  padding-left: 20px;
  padding-bottom: 20px;
}
</style>
