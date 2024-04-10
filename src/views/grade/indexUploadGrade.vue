<template>
    上传成绩信息
    <el-form :model="form" label-width="auto" style="max-width: 600px">
        <el-form-item label="报名竞赛">
            <el-input v-model="form.contest" />
        </el-form-item>
        <el-form-item label="成绩">
            <el-input v-model="form.grade" />
        </el-form-item>
        <el-form-item label="证明材料">
            <el-upload
                    ref="uploadRef"
                    class="upload-demo"
                    drag
                    action="http://localhost:9006/api/public/v1/upload"
                    :on-change="handleChange"
                    :auto-upload="false"
                    name="file"
            >
                <el-icon class="esl-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                    Drop file here or <em>click to upload</em>
                </div>
                <template #tip>
                    <div class="el-upload__tip">
                        jpg/png files with a size less than 500kb
                    </div>
                </template>
            </el-upload>
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
    import { ref, reactive } from 'vue';
    import { uploadGrade,uploadImg} from '@/api/grade';
    import { ElMessage } from 'element-plus';
    import { getToken } from '@/utils/auth'
    import axios from "axios";
    import store from "@/store";

    export default {
        setup() {
            // 使用 reactive 创建响应式对象，相当于 data
            const form = reactive({
                username: store.getters.username,
                contest: '',
                grade: '',
                state: 3,
                certificate: '',
                desc: ''
            });

            const formPic = reactive({
                file: '',
            })

            const uploadRef = ref(null); // 上传组件的引用，需要是 null，因为组件可能还没有挂载

            // 清除表单
            const handleClearForm = () => {
                form.username = store.getters.username;
                form.contest = '';
                form.grade = '';
                form.certificate = '';
                form.desc = '';
            };

            // 处理文件变化
            const handleChange = (file) => {
                console.log("文件变化：", file);
                uploadRef.value = file
                // 如果这里是要引用某个上传组件的实例，请确保该组件正确传递了引用
                // uploadRef.value = file; // 这一步取决于你的上传组件API，可能需要的是文件对象，而不是组件实例
            };

            // 创建Axios实例，用于特定的请求配置
            const uploadAxios = axios.create({
                baseURL: "http://localhost:9006/api/",
                timeout: 5000
            })

            // 为这个特定的Axios实例设置请求拦截器
            uploadAxios.interceptors.request.use(config => {
                // 这里可以添加或覆盖头部信息
                config.headers["Content-Type"] = 'multipart/form-data'
                config.headers["BackServer-token"] = getToken()
                return config;
            }, error => {
                return Promise.reject(error);
            });

            // 创建表单
            const handleCreate = async () => {
                // 假设 uploadRef.value 是一个具有 submit 方法的上传组件实例
                //if (uploadRef.value && typeof uploadRef.value.submit === 'function') {
                if (uploadRef.value) {
                    console.log("(((((((^^^^^^^^^^^^^^^^^^^676")
                    formPic.file = uploadRef.value
                    //发送请求到后端接口
                    const resp = await uploadAxios.post('public/v1/upload', formPic)
                    console.log("resp:",resp)
                    if(resp.data.code === 200) {
                        form.certificate = resp.data.data.imageurl
                    }
                }

                try {
                    const resp = await uploadGrade(form);
                    console.log("addUser:", resp);
                    if (resp.code === 200) {
                        ElMessage({
                            type: 'success',
                            message: '提交成功',
                        });
                    } else {
                        ElMessage({
                            type: 'error',
                            message: '提交失败',
                        });
                    }
                } catch (error) {
                    ElMessage({
                        type: 'error',
                        message: '提交失败',
                    });
                }
            };

            // 返回需要暴露给模板的属性和方法
            return {
                form,
                formPic,
                uploadRef,
                handleChange,
                handleClearForm,
                handleCreate
            };
        }
    };
</script>
<style scoped>

</style>
