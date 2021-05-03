<template>
  <div class="log-content">
    <div class="log-table">
      <el-row>
        <el-col>
          <el-button-group class="btn-group">
            <el-button type="primary" size="small" @click="addLog()">新建日志</el-button>
          </el-button-group>
        </el-col>
      </el-row>
      <el-table :data="updateLogList">
        <el-table-column type="expand">
          <template slot-scope="props">
            这是日志内容
          </template>
        </el-table-column>
        <el-table-column
            label="序号"
            prop="index">
        </el-table-column>
        <el-table-column
            label="标题"
            prop="name">
        </el-table-column>
        <el-table-column
            label="时间"
            prop="desc">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

export default {
  name: "UpdateLogList",
  data() {
    return {
      updateLogList: []
    }
  },
  components: {
  },
  methods: {
    addLog() {
      this.$router.push({name: 'UpdateLogDetail'});
    }
  }
}
</script>

<style scoped>
.log-content {

}
</style>