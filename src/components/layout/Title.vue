<template>
  <div>
    <div class="title-content">
      <el-row>
        <el-col :span="1">
          <div class="menu-toggle">
            <i
              @click="menuToggle"
              :class="menuCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
            ></i>
          </div>
        </el-col>
        <el-col :span="13">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item
              v-for="route in routeList"
              :key="route.name"
              :to="{ name: route.name }"
              >{{ route.meta.title }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="2" :offset="8">
          <div class="right-content">
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">
                <el-avatar
                  :size="40"
                  @error="avatarErrorHandler"
                  :title="userInfo.username"
                >
                  <img v-if="userInfo.avatar" :src="userInfo.avatar"/>
                  {{ userInfo.username }}
                </el-avatar>
                <i class="fa fa-caret-down"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <router-link :to="{ name: 'UserCenter', params: userInfo }">
                  <el-dropdown-item icon="fa fa-user-o"
                  >个人中心
                  </el-dropdown-item>
                </router-link>
                <router-link :to="{ name: 'PublishArticle' }">
                  <el-dropdown-item divided icon="fa fa-edit"
                  >写文章
                  </el-dropdown-item>
                </router-link>
                <router-link :to="{ name: 'DraftBox'}">
                  <el-dropdown-item icon="fa fa-hdd-o">草稿箱</el-dropdown-item>
                </router-link>
                <el-dropdown-item divided icon="fa fa-sign-out" command="logout"
                >退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {removeStorageItem} from "../../util/storage-unit";
import {closeWebSocket, initWebSocket} from '../../websocket';

export default {
  name: "Title",
  data() {
    return {
      circleUrl:
        "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80",
      userInfo: {},
      routeList: this.$route.matched,
      menuCollapse: false,
    };
  },
  created() {
    this.$api.user
        .getCurrUser()
        .then((res) => {
          this.userInfo = res.data;
          initWebSocket(res.data.username);
        })
        .catch((error) => {
        });
  },
  beforeDestroy() {
    closeWebSocket();
  },
  watch: {
    $route: {
      handler(route) {
        this.routeList = route.matched;
      },
    },
  },
  methods: {
    handleCommand(command) {
      if (command === "logout") {
        this.logout();
      }
    },
    avatarErrorHandler() {
      return true;
    },
    logout() {
      this.$api.user.logout().then(
        (res) => {
          removeStorageItem('Authorization');
          this.$message.success(res.msg);
          this.$router.push({name: "Login"});
        },
        (error) => {
        }
      );
    },
    menuToggle() {
      this.menuCollapse = !this.menuCollapse;
      this.$emit("menuCollapse", this.menuCollapse);
    },
  },
};
</script>

<style scoped>
.title-content {
  background-color: #fff;
  width: 100%;
  height: 50px;
}

.title-content .el-breadcrumb {
  line-height: 50px;
}

.right-content {
  height: 50px;
  padding: 5px 0;
}

.el-breadcrumb {
  padding-left: 5%;
}

.el-dropdown-menu a {
  text-decoration: none;
}

.menu-toggle {
  font-size: 22px;
  height: 100%;
  line-height: 53px;
  text-align: center;
}
</style>
