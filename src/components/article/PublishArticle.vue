<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="富文本编辑器">
          <div id="editor"></div>
      </el-tab-pane>
      <el-tab-pane label="MarkDown编辑器">配置管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Editor from 'wangeditor'

export default {
  name: "Publish",
  data() {
    return {};
  },
  mounted() {
    let editor = new Editor("#editor");
    editor.customConfig.onchange = (html) => {
          this.editorContent = html
    }
    editor.customConfig.uploadImgServer = '/api/article/upload'
	editor.customConfig.uploadFileName = 'file'
    editor.customConfig.pasteFilterStyle = false
    editor.create();
  }
};
</script>

<style scoped>
</style>