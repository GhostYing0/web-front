<template>
    <div>
        <el-image style="width: 100px; height: 100px" :src="url" :fit="fit" />
    </div>
</template>

<script>
    export default {
        name: "processGrade",
        data() {
            return {
                url:"http://localhost:9006/api/public/picture/1711975062129649500.jpg"
            }
        }
    }
</script>

<style scoped>

</style>