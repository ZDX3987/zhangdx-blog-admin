<template>
  <div class="update-log-dialog">
    <el-dialog title="收货地址" :visible.sync="updateLogDialogVisible">
      <el-form :model="updateLogForm">
        <el-form-item label="标题" :label-width="'120px'">
          <el-input v-model="updateLogForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="'120px'">
          <el-select v-model="updateLogForm.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateLogDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateLogDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "UpdateLogDialog",
  data() {
    return {
      updateLogDialogVisible: false,
      updateLogForm: {
        title: '',
        region: 'beijing'
      }
    }
  }
}
</script>

<style scoped>

</style>