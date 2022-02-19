<template>
  <div class="menu-content">
    <div class="menu-tree">
      <el-button-group>
        <el-button class="menu-btn" type="primary" @click="addMenu(null)">添加一级菜单</el-button>
        <el-button class="menu-btn" type="primary" @click="sortClick"><i
            class="fa fa-sort"/>&nbsp;{{ draggable ? '完成' : '排序' }}
        </el-button>
      </el-button-group>
      <el-tree v-if="menuList.length > 0" :data="menuList" show-checkbox
               :expand-on-click-node="false" node-key="id" :props="{children: 'childrenMenu'}"
               :draggable="draggable">
        <div class="menu-tree-node" slot-scope="{ node, data }">
          <span class="menu-node-text">{{ data.text }}</span>
          <span>
          <el-link v-if="data.level < 2" type="primary" @click="addMenu(data)">添加子菜单</el-link>
          <el-link type="primary" @click="editMenu(data)">编辑</el-link>
            <el-popconfirm :title="data.level === 1 ? '删除一级菜单将会同时删除子菜单，确认删除吗？' : '确认删除这个菜单吗？'"
                           @confirm="deleteMenu(data)">
          <el-link slot="reference" type="danger">删除</el-link>
            </el-popconfirm>
        </span>
        </div>
      </el-tree>
    </div>
    <menu-edit-dialog ref="menuEditDialog" :dialog-visible="menuEditDialogVisible" @edit-callback="editCallBack"/>
  </div>
</template>

<script>
import MenuEditDialog from '../components/dialog/MenuEditDialog';

export default {
  name: "Menu",
  data() {
    return {
      menuList: [],
      menuEditDialogVisible: false,
      draggable: false
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
    editMenu(menu) {
      this.$refs.menuEditDialog.menuItem = JSON.parse(JSON.stringify(menu));
      this.$refs.menuEditDialog.dialogVisible = true;
    },
    deleteMenu(menu) {
      if (menu.level == 1) {
      }
    },
    getMenuList() {
      this.$api.settings.getMenuList().then(res => {
        this.menuList = res.data;
      }).catch(() => this.$message.error('菜单加载失败'))
    },
    sortClick() {
      if (this.draggable) {
        this.$api.settings.sortMenuList(this.menuList).then(res => {
          this.getMenuList();
          this.$message.success('更新成功');
        }).catch(() => this.$message.error('更新失败'));
      }
      this.draggable = !this.draggable;
    },
    editCallBack() {
      this.getMenuList();
    }
  }
}
</script>

<style scoped>
.menu-content {
  background-color: #FFF;
  height: 90vh;
}

.menu-btn {
  margin-bottom: 20px;
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