<template>
    <div class="common-layout">
        <el-container class="master-container">
            <!--<AppMenu/>-->
          <el-header class="header"><Navbar/></el-header>
            <el-container class="container">
              <el-aside class="aside">
                <template v-if="store.getters.roles.includes('manager')">
                  <AppMenu/>
                </template>
                <template v-else-if="store.getters.roles.includes('student') || store.getters.roles.includes('teacher')">
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
    .master-container{
        height: 100vh;
        display: flex;
      .header{
        background: #a1e9d2;
        height: 80px;
      }
      .container {
        display: flex;
        aside{
          background: white;
          flex: 1;
        }
        .main{
          flex:6;
        }
      }
    }

</style>
