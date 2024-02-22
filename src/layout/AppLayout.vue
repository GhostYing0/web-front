<template>
    <div class="common-layout">
        <el-container class="master-container">
            <el-aside class="aside">
                <AppMenu/>
            </el-aside>
            <el-container class="container">
                <el-header class="header">Header</el-header>
                <el-main class="main"><router-view/></el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import AppMenu from '@/components/AppMenu.vue';
</script>

<style scoped lang="scss">
    .master-container{
        height: 100vh;
        display: flex;
        .aside{
            background: #797979;
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