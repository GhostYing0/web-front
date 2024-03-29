<template>
    <div class="common-layout">
        <el-container class="master-container">
            <!--<AppMenu/>-->
            <el-aside class="aside">
                <template v-if="store.getters.roles.includes('manager')">
                    <AppMenu/>
                </template>
                <template v-else-if="store.getters.roles.includes('student') || store.getters.roles.includes('teacher')">
                    <UserAppMenu/>
                </template>
            </el-aside>
            <el-container class="container">
                <el-header class="header"><Navbar/></el-header>
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
        .aside{
            background: white;
            order: -1;
            flex: 1;
        }
        .container {
            order: 1;
            flex: 6;
            .header{
                background: #a1e9d2;
                height: 80px;
            }
            .main{

            }
        }
    }

</style>
