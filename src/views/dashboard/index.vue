<template>
    <div class="mb-4">
        <el-button type="success" @click="visit" class="dashboard-button">进入系统</el-button>
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

<style lang="scss">
.dashboard-button {
  margin-left: auto;
  margin-right: auto;
  margin-top: 30vh;
}
</style>