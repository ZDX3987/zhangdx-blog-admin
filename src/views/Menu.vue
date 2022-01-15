<template>
  <div class="menu-content">
    <div class="menu-tree">
      <el-button type="primary" @click="addMenu(null)">添加一级菜单</el-button>
      <el-tree v-if="menuList.length > 0" :data="menuList" show-checkbox
               :expand-on-click-node="false" node-key="id" :props="{children: 'childrenMenu'}">
        <div class="menu-tree-node" slot-scope="{ node, data }">
          <span class="menu-node-text">{{ data.text }}</span>
          <span>
          <el-link type="primary" @click="addMenu(data)">添加子菜单</el-link>
          <el-link type="primary">编辑</el-link>
          <el-link type="danger">删除</el-link>
        </span>
        </div>
      </el-tree>
    </div>
    <menu-edit-dialog ref="menuEditDialog" :dialog-visible="menuEditDialogVisible"/>
  </div>
</template>

<script>
import MenuEditDialog from '../components/dialog/MenuEditDialog';

export default {
  name: "Menu",
  data() {
    return {
      menuList: [],
      menuEditDialogVisible: false
    }
  },
  components: {
    MenuEditDialog
  },
  created() {
    this.getMenuList();
  },
  methods: {
    addMenu(parentMenu) {
      if (parentMenu) {
        parentMenu = JSON.parse(JSON.stringify(parentMenu));
        parentMenu.childrenMenu = [];
        this.$refs.menuEditDialog.parentMenu = parentMenu;
      }
      this.$refs.menuEditDialog.dialogVisible = true;
    },
    getMenuList() {
      this.$api.settings.getMenuList().then(res => {
        this.menuList = res.data;
      }).catch(() => this.$message.error('菜单加载失败'))
    }
  }
}
</script>

<style scoped>
.menu-content {
  background-color: #FFF;
  height: 90vh;
}

.menu-tree {
  width: 50%;
  margin: 20px;
  padding-top: 20px;
}

.menu-tree-node {
  width: 50%;
  text-align: justify;
}

.menu-node-text {
  margin-right: 50px;
}
</style>