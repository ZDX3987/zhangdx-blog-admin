<template>
  <div>
    <el-tabs v-model="activeTabName" type="border-card">
      <el-tab-pane label="富文本编辑器" name="editor">
        <EditorPublish ref="editorPublish" @openCateDialog="showCateDialog"/>
      </el-tab-pane>
      <el-tab-pane label="MarkDown编辑器"  name="markdown">
        <MarkdownPublish ref="markdownPublish"  @openCateDialog="showCateDialog"/>
      </el-tab-pane>
    </el-tabs>
    <CategoryDialog ref="categoryDialog" @onSelect="onSelectCate"/>
  </div>
</template>

<script>
import CategoryDialog from "../dialog/CategoryDialog";
import EditorPublish from "./EditorPublish";
import MarkdownPublish from "./MarkdownPublish";
export default {
  name: "Publish",
  components: {
    EditorPublish,
    MarkdownPublish,
    CategoryDialog
  },
  data() {
    return {
      activeTabName: 'editor'
    };
  },
  mounted() {

  },
  methods: {
    showCateDialog() {
      this.$refs.categoryDialog.cateDialogVisible = true;
    },
    onSelectCate(row) {
      if (this.activeTabName === 'editor') {
        this.$refs.editorPublish.onSelectCate(row);
      } else {
        this.$refs.markdownPublish.onSelectCate(row);
      }
    }
  },
};
</script>

<style scoped>

</style>
