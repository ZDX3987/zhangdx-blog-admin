<template>
  <el-dialog title="编辑菜单" :visible.sync="dialogVisible" width="600px" :destroy-on-close="true" @close="close">
    <el-form :model="menuItem" :rules="menuRule" ref="menuItem">
      <el-form-item label="名称" label-width="100px" prop="name">
        <el-input v-model="menuItem.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="文本" label-width="100px">
        <el-input v-model="menuItem.text" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="路由" label-width="100px">
        <el-input v-model="menuItem.router" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="组件" label-width="100px">
        <el-input v-model="menuItem.componentName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="父菜单" label-width="100px">
        <el-input v-model="parentMenu.text" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="图标" label-width="100px">
        <el-input v-model="menuItem.iconClass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="启用" label-width="100px">
        <el-switch v-model="menuActive"></el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="saveMenu">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "MenuEditDialog",
  data() {
    return {
      dialogVisible: false,
      menuItem: {
        id: null,
        name: '',
        text: '',
        router: '',
        componentName: '',
        parentId: null,
        iconClass: '',
        seqNum: 1,
        level: 1,
        status: 1
      },
      menuActive: true,
      menuRule: {
        name: [{required: true, message: '请输入菜单名称', trigger: 'blur'}]
      },
      parentMenu: {}
    }
  },
  methods: {
    saveMenu() {
      this.$refs.menuItem.validate((valid) => {
        if (!valid) {
          return;
        }
        if (!this.menuItem.id) {
          this.menuItem.parentId = this.parentMenu.id
          this.menuItem.level = this.parentMenu.level ? this.parentMenu.level + 1 : 1;
        }
        this.menuItem.status = this.menuActive ? 1 : 0;
        this.$api.settings.saveMenu(this.menuItem).then(res => this.$message.success(res.msg))
            .catch(() => this.$message.error('保存失败')).finally(() => {
          this.$emit('edit-callback');
          this.close();
        });
      });
    },
    close() {
      this.dialogVisible = false
      this.menuItem = this.$options.data().menuItem
      this.parentMenu = {}
    }
  }
}
</script>

<style scoped>

</style>