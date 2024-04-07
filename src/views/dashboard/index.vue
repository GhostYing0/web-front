<template>
    <div class="mb-4">
        <el-button type="primary" plain @click="visit">进入系统</el-button>
    </div>
</template>

<script>
    import {router} from '../../router'
    export default {
        name: "DashBoard",


        methods: {
            visit() {
                router.push("/contestInformationManager")
            }
        }
    }
</script>

<style scoped>
</style>