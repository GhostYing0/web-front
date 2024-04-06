<template>
    录入报名信息
        <el-form :model="form" label-width="auto" style="max-width: 600px">
            <el-form-item label="姓名">
                <el-input v-model="form.username" />
            </el-form-item>
            <el-form-item label="学校">
                <el-input v-model="form.school" />
            </el-form-item>
            <el-form-item label="报名竞赛">
                <el-input v-model="form.contest_name" />
            </el-form-item>
            <el-form-item label="参赛队伍">
                <el-input v-model="form.team" />
            </el-form-item>
            <el-form-item label="电话号码">
                <el-input v-model="form.phone" />
            </el-form-item>
            <el-form-item label="电子邮箱">
                <el-input v-model="form.email" />
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="form.desc" type="textarea" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleCreate">提交</el-button>
                <el-button @click="handleClearForm">清空表单</el-button>
            </el-form-item>
        </el-form>

</template>

<script>
    //import { reactive } from 'vue'
    import { enrollContest} from '@/api/enroll'
    import {ElMessage} from 'element-plus';
    export default {

        data() {
            return {
                form: {
                    username: '',
                    school: '',
                    contest: '',
                    grade: '',
                    team: '',
                    phone: '',
                    email: '',
                    desc: ''
                },
            }
        },
        methods: {
            handleClearForm() {
                this.form = {
                    username: '',
                    school: '',
                    contest_name: '',
                    grade: '',
                    team: '',
                    phone: '',
                    email: '',
                    desc: ''
                }
            },
            handleCreate() {
                // 表单是添加状态
                console.log("handleCreate")
                enrollContest(this.form).then(resp => {
                    console.log("addUser:", resp)
                    if(resp.code === 200) {
                        ElMessage({
                            type: 'success',
                            message: '提交成功',
                        })
                    } else {
                        ElMessage({
                            type: 'error',
                            message: '提交失败',
                        })
                    }
                }).catch(() => {
                    ElMessage({
                        type: 'error',
                        message: '提交失败',
                    })
                })
            },
        }
    }
</script>

<style scoped>

</style>
