<template>
  <div>
    <el-tabs v-model="activeTabName" type="border-card">
      <el-tab-pane label="Vditor编辑器" name="vditor">
        <VditorPublish ref="vditorPublish"
                       :operate="operate"
                       :articleSource="articleSource"
                       :updateArticle="articleSource === 2 ? updateArticle : null"
                       @openCateDialog="showCateDialog"/>
      </el-tab-pane>
      <el-tab-pane label="富文本编辑器" name="editor">
        <EditorPublish ref="editorPublish"
                       :operate="operate"
                       :articleSource="articleSource"
                       :updateArticle="articleSource === 1 ? updateArticle : null"
                       @openCateDialog="showCateDialog"/>
      </el-tab-pane>
      <!--      <el-tab-pane label="MarkDown编辑器" name="markdown">-->
      <!--        <MarkdownPublish ref="markdownPublish" :operate="operate" :articleSource="articleSource"-->
      <!--                         @openCateDialog="showCateDialog"/>-->
      <!--      </el-tab-pane>-->
    </el-tabs>
    <CategoryDialog ref="categoryDialog" @onSelect="onSelectCate"/>
  </div>
</template>

<script>
import CategoryDialog from "../../components/dialog/CategoryDialog";
import EditorPublish from "../../components/article/EditorPublish";
import MarkdownPublish from "../../components/article/MarkdownPublish";
import VditorPublish from "../../components/article/VditorPublish";

export default {
  name: "Publish",
  components: {
    EditorPublish,
    // MarkdownPublish,
    CategoryDialog,
    VditorPublish
  },
  data() {
    return {
      operate: 'add',
      activeTabName: 'vditor',
      articleSource: 2,
      updateArticle: null
    };
  },
  created() {
    this.operate = this.$route.params.operate;
    if (this.operate === 'update') {
      this.updateArticle = this.$route.params.article;
      this.articleSource = this.updateArticle.source;
      if (this.updateArticle.source === 2) {
        this.activeTabName = 'vditor';
      } else {
        this.activeTabName = 'editor';
      }
      this.$api.article
        .getArticleById(this.updateArticle.id)
        .then((res) => {
          this.updateArticle = res.data;
          this.$route.meta.title = this.updateArticle.title;
        })
        .catch((error) => {
          this.$message.error(error);
        });
    }
  },
  methods: {
    showCateDialog() {
      this.$refs.categoryDialog.cateDialogVisible = true;
    },
    onSelectCate(row) {
      if (this.activeTabName === 'editor') {
        this.$refs.editorPublish.onSelectCate(row);
      } else if (this.activeTabName === 'markdown') {
        this.$refs.markdownPublish.onSelectCate(row);
      } else {
        this.$refs.vditorPublish.onSelectCate(row);
      }
    }
  },
};
</script>

<style scoped>
.el-tabs {
  min-height: 90vh;
}
</style>
