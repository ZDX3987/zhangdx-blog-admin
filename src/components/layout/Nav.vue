<template>
  <el-scrollbar wrapClass="scrollbar-wrapper" class="bg-color">
    <h4 class="nav-title">{{ isCollapse ? 'Z' : title }}</h4>
    <el-menu
      default-active="2"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409eff"
      :collapse="isCollapse"
      class="menu-list"
    >
      <router-link :to="{name: 'Home'}">
        <el-menu-item index="1">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
      </router-link>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>文章管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">
            <router-link :to="{name: 'ArticleList'}">文章列表</router-link>
          </el-menu-item>
          <el-menu-item index="2-2">
            <router-link :to="{name: 'PublishArticle'}">发布文章</router-link>
          </el-menu-item>
          <el-menu-item index="2-3">
            <router-link :to="{name: 'DraftBox'}">草稿箱</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <router-link :to="{name: 'TopicList'}">
        <el-menu-item index="3">
          <i class="el-icon-collection"></i>
          <span slot="title">专题管理</span>
        </el-menu-item>
      </router-link>
      <router-link :to="{name: 'Category'}">
        <el-menu-item index="4">
          <i class="el-icon-collection-tag"></i>
          <span slot="title">分类标签管理</span>
        </el-menu-item>
      </router-link>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>系统设置</span>
        </template>
        <el-menu-item-group>
          <el-submenu index="5-1">
            <template slot="title">内容设置</template>
            <el-menu-item index="5-1-1">
              <router-link :to="{name: 'UpdateLogList'}">更新日志</router-link>
            </el-menu-item>
            <el-menu-item index="5-1-2">
              <router-link :to="{name: 'FriendshipLinks'}">友链设置</router-link>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="5-2">个人信息设置</el-menu-item>
          <el-menu-item index="5-3">系统用户设置</el-menu-item>
          <el-menu-item index="5-4">
            <router-link :to="{name: 'SystemControl'}">系统数据管理</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="6">
        <a href="http://www.zhangdx.cn">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">博客主页</span>
        </a>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      title: 'ZHANGDX',
    }
  },
  props: ['isCollapse'],
  methods: {}
};
</script>

<style scoped>
.bg-color {
  background-color: #304156;
  height: 100%;
}

.nav-title {
  margin: 0;
  height: 50px;
  line-height: 50px;
  color: #fff;
  text-align: center;
}

.menu-list {
  text-align: left;
  min-height: 100%;
  min-width: 100%;
}

.menu-list:not(.el-menu--collapse) {
  width: 200px;
}

a {
  color: #bfcbd9;
  text-decoration: none;
}
</style>
