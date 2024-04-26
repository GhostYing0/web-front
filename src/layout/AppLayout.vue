<template>
    <div class="common-layout">
        <el-container class="master-container">
            <!--<AppMenu/>-->
          <el-header class="header"><Navbar/></el-header>
            <el-container class="container">
              <el-aside class="aside" v-if="store.getters.sidebar.opened">
                <template v-if="store.getters.roles.includes('manager')">
                  <AppMenu/>
                </template>
                <template v-else-if="store.getters.roles.includes('student') || store.getters.roles.includes('teacher')|| store.getters.roles.includes('department_manager')" >
                  <UserAppMenu/>
                </template>
              </el-aside>
              <el-main class="main"><router-view/></el-main>
            </el-container>
        </el-container>
    </div>
</template>


<script setup>
    import store from '../store'
    import AppMenu from './Sidebar/AppMenu'
    import UserAppMenu from './Sidebar/UserAppMenu'
    import Navbar from './Navbar'
</script>

<style scoped lang="scss">
    .master-container {
      height: 100vh;
      display: flex;

      .header {
        display: flex;
        width: 100%;
        background: #a1e9d2;
        height: 80px;
        padding: 0;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        border-radius: 7px;
      }

      .container {
        display: flex;

        .main {
          flex: 5;
        }


        .aside {
          flex: 1;
          border: solid 1px;
          background-color: #2c3e50;
        }
      }
    }
</style>
