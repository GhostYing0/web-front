<template>
    <div class="navbar">
        <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
      <el-avatar size="large"
                   :src=avatar
                  class="avatar-container"
                 v-if="store.getters.roles.includes('student') || store.getters.roles.includes('teacher')"
        />
        <div class="right-menu">
          <el-dropdown class="dropdown">
            <el-button type="primary" class="dropdown-button">
              选项<el-icon><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu class="user-dropdown">
                <el-dropdown-item @click="goToDashBoard">首页</el-dropdown-item>
                <el-dropdown-item @click="goToProfile" v-if="store.getters.roles.includes('student') || store.getters.roles.includes('teacher')">个人信息</el-dropdown-item>
                <el-dropdown-item @click="logout">
                  <span style="display:block;">退出登录</span>
                </el-dropdown-item>
                <el-dropdown-item>Action 4</el-dropdown-item>
                <el-dropdown-item>Action 5</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
    </div>

</template>

<script>
    import { mapGetters } from 'vuex'
    import Hamburger from '@/components/Hamburger'
    import {router} from "@/router";
    import store from "@/store";

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
            ])
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
              router.push("/dashboard")
            },
            goToProfile() {
              router.push("/profile")
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
        position: relative;
        background: #fff;
        background-color: orange;


          .dropdown-button {
              display: flex;
             margin-top:25%;
            margin-right: 20px;

        }

        .el-icon--right {
          float: right;
          height: 100%;
          line-height: 50px;

        }

        .hamburger-container {
            line-height: 60px;
            height: 100%;
            float: left;
            cursor: pointer;
            transition: background .3s;
            -webkit-tap-highlight-color:transparent;

            &:hover {
                background: rgba(0, 0, 0, .025)
            }
        }

        /*.breadcrumb-container {*/
            /*float: left;*/
            /*font-size: 18px;*/
            /*margin-top: 8px;*/
        /*}*/

        .right-menu {
            float: right;
            height: 100%;
            line-height: 50px;

            &:focus {
                outline: none;
            }

            .right-menu-item {
                display: inline-block;
                padding: 0 8px;
                height: 100%;
                font-size: 18px;
                color: #5a5e66;
                vertical-align: text-bottom;

                &.hover-effect {
                    cursor: pointer;
                    transition: background .3s;

                    &:hover {
                        background: rgba(0, 0, 0, .025)
                    }
                }
            }
        }
      .avatar-container {
        margin-top: 10px;
        margin-right: -1150px;
      }
    }
</style>
