<template>
  <div>
    <div class="category-content">
      <el-row>
        <el-col>
          <el-button-group class="btn-group">
            <el-button type="primary" size="small" @click="addCate()">新建标签</el-button>
          </el-button-group>
        </el-col>
      </el-row>
      <el-table :data="categoryList" header-row-class-name="table-header">
        <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
        <el-table-column prop="cateName" label="名称" width="280" align="center"></el-table-column>
        <el-table-column prop="parentCate.cateName" label="父标签" width="280" align="center"></el-table-column>
        <el-table-column prop="articleCount" label="文章数量" width="100" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="page-list"
        background
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
      <el-dialog class="category-dialog" title="新建标签"
                 :visible.sync="dialogFormVisible"
                 :close-on-click-modal="false"
                 :destroy-on-close="true"
                 @close="categoryDialogClose">
        <el-form :model="cateForm" :rules="cateRules" ref="cateForm">
          <el-form-item label="标签名称" prop="cateName" label-width="100px">
            <el-input v-model="cateForm.cateName"></el-input>
          </el-form-item>
          <el-form-item label="父标签" label-width="100px">
            <el-input :value="selectRow === null ? '' : selectRow.cateName" readonly
                      v-on:dblclick.native="selectCate"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitCate('cateForm')">确 定</el-button>
        </div>
      </el-dialog>
      <CategoryDialog ref="categoryDialog" @onSelect="onSelectRow"/>
    </div>
  </div>
</template>

<script>
import CategoryDialog from "../dialog/CategoryDialog";

export default {
  name: 'Category',
  data() {
    return {
      total: 0,
      pageIndex: 0,
      pageSize: 15,
      categoryList: [],
      dialogFormVisible: false,
      selectRow: null,
      cateForm: {
        cateName: '',
        parentCate: ''
      },
      cateRules: {
        cateName: [
          {required: true, message: '请输入标签名称', trigger: 'blur'}
        ]
      },
    }
  },
  components: {
    CategoryDialog
  },
  created() {
    let params = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    }
    this.$api.article.getAllCategory(params).then(res => {
      this.categoryList = res.data.elements;
    }).catch(error => this.$message.error(error.msg));
  },
  methods: {
    addCate() {
      this.dialogFormVisible = true;
    },
    selectCate() {
      this.$refs.categoryDialog.cateDialogVisible = true;
    },
    submitCate(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.article.addCategory(this.cateForm).then(res => {
            this.$message.success(res.msg);
            this.dialogFormVisible = false;
          }).catch(error => this.$message.error(error.msg));
        }
      });
    },
    onSelectRow(row) {
      this.cateForm.parentCate = this.selectRow = row;
    },
    categoryDialogClose() {
      this.selectRow = null;
    }
  }

}
</script>

<style scoped>
.category-content {
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
