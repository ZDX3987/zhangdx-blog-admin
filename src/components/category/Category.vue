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
      <el-table :data="categoryList" v-loading="loading" header-row-class-name="table-header">
        <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
        <el-table-column prop="cateName" label="名称" width="280" align="center"></el-table-column>
        <el-table-column prop="parentCate.cateName" label="父标签" width="280" align="center"></el-table-column>
        <el-table-column prop="articleCount" label="文章数量" width="100" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editCate(scope.$index, scope.row)">编辑</el-button>
            <el-popconfirm
                confirmButtonText='好的'
                cancelButtonText='不用了'
                icon="el-icon-info"
                title="确定删除这个分类标签吗？"
                @confirm="deleteCate(scope.$index, scope.row)"
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
            <el-input :value="cateForm.parentCate === null ? '' : cateForm.parentCate.cateName" readonly
                      v-on:dblclick.native="selectCate"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitCate('cateForm')">确 定</el-button>
        </div>
      </el-dialog>
      <category-dialog ref="categoryDialog" @onSelect="onSelectRow"/>
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
      loading: false,
      categoryList: [],
      dialogFormVisible: false,
      selectRow: null,
      cateForm: {
        cateName: '',
        parentCate: null
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
    addCate() {
      this.dialogFormVisible = true;
    },
    editCate(index, row) {
      this.cateForm = row;
      this.dialogFormVisible = true;
    },
    deleteCate(index, row) {
      this.$api.article.delCategory(row.id).then(res => {
        this.$message.success(res.msg);
        this.query();
      }).catch(error => this.$message.error(error.msg));
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
            this.query();
          }).catch(error => this.$message.error(error.msg));
        }
      });
    },
    onSelectRow(row) {
      this.cateForm.parentCate = row;
    },
    categoryDialogClose() {
      this.cateForm.parentCate = null;
    }
  }

}
</script>

<style scoped>
.category-content {
  background-color: #FFF;
  height: 90vh;
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
