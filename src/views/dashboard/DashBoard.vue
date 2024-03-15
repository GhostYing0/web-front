<template>
    <div class="mb-4">
        <el-button type="primary" plain @click="DisplayContest">预览竞赛</el-button>
        <el-button type="success" plain @click="AddUser">添加用户</el-button>
    </div>
</template>

<script>
    export default {
        name: "DashBoard",


        methods: {
            DisplayContest() {
                this.$router.push("/display_contest")
            },

            AddUser() {
                this.$router.push("/add_user")
            }
        }
    }
</script>

<style scoped>
</style>