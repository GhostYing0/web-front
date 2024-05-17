<template>
    <div class="navbar">
      <div class="left-menu">
      <p class="navbar-text">高校学科竞赛信息管理系统</p>
        <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
        {{currentRoute}}
        <div class="right-menu">
          <p class="welcome">{{store.getters.username}} 欢迎使用</p>
          <el-avatar size="large"
                     :src=avatar
                     class="avatar-container"
                     v-if="store.getters.roles.includes('student') || store.getters.roles.includes('teacher')"
          />
          <div  v-else class="block"> </div>
          <el-dropdown class="dropdown">
            <el-button type="primary" class="dropdown-button">
              选项<el-icon><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu class="user-dropdown">
                <el-dropdown-item @click="goToDashBoard">首页</el-dropdown-item>
                <el-dropdown-item @click="goToProfile" v-if="store.getters.roles.includes('student') || store.getters.roles.includes('teacher') || store.getters.roles.includes('department_manager')">个人信息</el-dropdown-item>
                <el-dropdown-item @click="logout">
                  <span style="display:block;">退出登录</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>

</template>

<script>
    import { mapGetters } from 'vuex'
    import Hamburger from '@/components/Hamburger'
    import store from "@/store";
    import {router} from "@/router"
    import { ArrowRight } from '@element-plus/icons-vue'
    import {computed} from "vue";
    export default {
        components: {
            Hamburger
        },
        computed: {
          store() {
            return store
          },
            ...mapGetters([
                'sidebar',
                'avatar',
                'name'
            ]),
           currentRoute() {
             return this.$route.name
           }
        },
        methods: {
            toggleSideBar() {
                this.$store.dispatch('app/toggleSideBar')
            },
            async logout() {
                await this.$store.dispatch('user/logout')
                // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
                this.$router.push(`/login`)
            },
            goToDashBoard() {
              this.$router.push("/dashboard")
            },
            goToProfile() {
              this.$router.push("/profile")
            }
        }
        }
</script>

<style lang="scss" scoped>
    .example-showcase .el-dropdown-link {
        cursor: pointer;
        color: var(--el-color-primary);
        display: flex;
        align-items: center;
    }
    .navbar {
        width: 100%;
        height: 80px;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        position: relative;
        background: #fff;
        background-color: darkorange;
      .left-menu {
        flex: 1;
        display: flex;
        flex-direction: row;
        .navbar-text {
          font-size: 19px;
          margin-top: auto;
          margin-bottom: auto;
        }
        .hamburger-container {
          margin-top: auto;
          margin-bottom: auto;
          line-height: 60px;
          float: left;
          cursor: pointer;
          transition: background .3s;
          -webkit-tap-highlight-color:transparent;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

        .el-icon--right {
          float: right;
          height: 100%;
          line-height: 50px;

        }

        .right-menu {
          flex: 6;
          display: flex;
          flex-direction: row;
          position: relative;
            &:focus {
                outline: none;
            }
          .welcome {
            margin-top: auto;
            margin-bottom: auto;
            margin-left: 60vw;
            font-size: 14px;
          }
          .dropdown-button {
            margin-top: auto;
            margin-bottom: auto;
            margin-left: 1vw;

          }
          .avatar-container {
            margin-top: auto;
            margin-bottom: auto;
            margin-left: 1vw;
          }
          .block {
            margin-top: auto;
            margin-bottom: auto;
            margin-left: 5vw;
          }

        }
    }
</style>
