<template>
  <div>登录成功</div>
</template>

<script>
export default {
  name: "ReceiveToken",
  data() {
    return {
      accessToken: ''
    }
  },
  created() {
    let accessToken = this.$route.query.accessToken;
    let username = this.$route.query.username;
    console.log(accessToken)
    if (!accessToken || !username) {
      window.opener.location.reload();
      window.close();
      return;
    }
    this.$api.oauthApi.realLogin(username, accessToken).then(res => {
      window.opener.location.reload();
      window.close();
    });
  }
}
</script>

<style scoped>

</style>