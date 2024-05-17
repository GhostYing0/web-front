<template>
  <div>
    <el-form class="form-container" :model="information" label-width="auto">
      <el-tag class="form-tag" v-if="information.state === 3" type="primary">审核中</el-tag>
      <el-tag class="form-tag" v-else-if="information.state === 2" type="danger">未通过</el-tag>
      <el-tag class="form-tag" v-else-if="information.state === 1" type="success">通过</el-tag>
      <el-tag class="form-tag" v-else-if="information.state === 4" type="warning">被撤回</el-tag>
      <el-form-item v-if= "store.getters.roles.includes('manager')" label="修改审核状态" prop="role" class="filter-check">
        <el-radio v-model="form.state" :label="1" >通过</el-radio>
        <el-radio v-model="form.state" :label="2" >未通过</el-radio>
        <el-radio v-model="form.state" :label="3" >审核中</el-radio>
        <el-radio v-model="form.state" :label="4" >已撤回</el-radio>
      </el-form-item>
      <div class="form-item-group">
      <el-form-item class="form-item" label="竞赛名称">
        <el-input v-model="information.contest" disabled />
      </el-form-item>
      <el-form-item class="form-item" label="竞赛所属项目">
        <el-input v-model="information.contest_entry" disabled />
      </el-form-item>
      <el-form-item class="form-item" label="报名时间">
        <el-input v-model="information.create_time" disabled />
      </el-form-item>
      </div>
      <div class="form-item-group">
      <el-form-item class="form-item" label="所属队伍" v-if="information.is_group === 1">
        <el-input v-model="information.team_name" />
      </el-form-item>
      <el-form-item class="form-item" label="学生姓名">
        <el-input v-model="information.name" disabled />
      </el-form-item>
      <el-form-item class="form-item" label="学生所属学院">
        <el-input v-model="information.college" disabled />
      </el-form-item>
      </div>
      <div class="form-item-group">
      <el-form-item class="form-item" label="学生专业">
        <el-input v-model="information.major" disabled />
      </el-form-item>
      <el-form-item class="form-item" label="学号">
        <el-input v-model="information.student_school_id" disabled />
      </el-form-item>
      <el-form-item class="form-item" label="班级">
        <el-input v-model="information.student_class" disabled/>
      </el-form-item>
      </div>
      <div class="form-item-group">
      <el-form-item class="form-item" label="指导教师姓名">
        <el-input v-model="form.guidance_teacher" />
      </el-form-item>
      <el-form-item class="form-item" label="指导教师所在系">
        <el-input v-model="form.department" />
      </el-form-item>
      <el-form-item class="form-item" label="指导教师职称">
        <el-input v-model="form.title" />
      </el-form-item>
      </div>
      <el-form-item label="获奖等级" prop="role" class="filter-check">
        <el-radio v-model="form.prize_id" :label="1" @change="handleFilter">特等奖</el-radio>
        <el-radio v-model="form.prize_id" :label="2" @change="handleFilter">一等奖</el-radio>
        <el-radio v-model="form.prize_id" :label="3" @change="handleFilter">二等奖</el-radio>
        <el-radio v-model="form.prize_id" :label="4" @change="handleFilter">三等奖</el-radio>
      </el-form-item>
      <el-form-item class="form-item" label="证明材料">
      <el-image style="width: 500px; height: 300px"
                v-if="information.certificate"
                :src="information.certificate"
                fit="contain"
                :preview-src-list="[information.certificate]"/>
        <el-empty v-else description="无证明材料"/>
      </el-form-item>
      <el-form-item class="form-item" label="上传证明材料">
        <el-upload
            style="width: 500px; height: 300px"
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
            点击此处上传
          </div>
          <template #tip>
            <div class="el-upload__tip">
              请导入证明材料图片
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item label="驳回原因" v-if="information.state === 2">
        <el-input v-model="information.reject_reason" disabled />
      </el-form-item>
      <div class="form-button-container">
        <el-button class="form-button" @click="returnDesktop()" type="info" size="small" >返回</el-button>
        <el-button class="form-button" @click="UpdateEnroll()" type="success" size="small" >提交</el-button>
     </div>
    </el-form>

  </div>

</template>

<script setup>
import { ref , reactive, onMounted, watch} from 'vue'
import {viewContest, getContestType, departmentManagerSearchEnroll} from "@/api/contest";
import {ElMessage, ElMessageBox} from "element-plus";
import {router} from "@/router"
import store from "@/store";
import {enrollContest, getUserEnroll, uploadContest, studentUpdateEnrollContest, updateEnroll} from "@/api/enroll";
import { defineProps, defineEmits } from 'vue'
import {getUserGrade, revokeGrade, updateStudentGrade, uploadGrade} from "@/api/grade";
import axios from "axios";
import {getToken} from "@/utils/auth";

const route = ref(router)

const return_id = ref(0)

const param = reactive({
  id: -1,
})

const form = reactive({
  id: -1,
  guidance_teacher: "",
  department: "",
  title: "",
  prize_id: 0,
  certificate: "",
  state: 3,
})

const handleContestIDChange = (newContestID) => {
  param.id = newContestID
  handleShowContest()
  // 在这里添加你想要执行的代码
}

const information = reactive({
})

const handleShowContest = async () => {
  console.log("asdasdasdadas:",route.value.currentRoute.params.grade_id)
  param.id = parseInt(route.value.currentRoute.params.grade_id, 10)
  return_id.value = parseInt(route.value.currentRoute.params.contest_id, 10)
  await getUserGrade(param).then(resp => {
    console.log(resp)
    if(resp.code === 200) {
      information.id = resp.data.list[0].id
      information.contest = resp.data.list[0].contest
      information.contest_entry = resp.data.list[0].contest_entry
      information.create_time = resp.data.list[0].create_time
      information.team_name = resp.data.list[0].team_name
      information.name = resp.data.list[0].name
      information.college = resp.data.list[0].college
      information.major = resp.data.list[0].major
      information.student_school_id = resp.data.list[0].student_school_id
      information.is_group = resp.data.list[0].is_group
      information.student_class = resp.data.list[0].student_class
      information.certificate = resp.data.list[0].certificate
      information.guidance_teacher_name = resp.data.list[0].guidance_teacher_name
      information.department = resp.data.list[0].department
      information.state = resp.data.list[0].state
      information.title = resp.data.list[0].title
      information.prize_id = resp.data.list[0].prize_id
      information.reject_reason = resp.data.list[0].reject_reason

      form.id = information.id
      form.guidance_teacher = information.guidance_teacher_name
      form.department = information.department
      form.title = information.title
      form.prize_id = information.prize_id
      form.team_name = information.team_name
    }
  })
}

const UpdateEnroll = async () => {
  try {
    // 使用await等待确认框的结果
    const confirmed = await ElMessageBox.confirm(
        '确定要修改吗？',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }
    );

    if (!confirmed) {
      // 用户点击了取消
      ElMessage({
        type: 'info',
        message: '取消',
      });
      return; // 结束函数执行
    }

    // 接下来的代码在用户确认后执行
    form.enroll_id = parseInt(route.value.currentRoute.params.enroll_information_id, 10);

    if (uploadRef.value && uploadRef.value.name !== undefined) {
      formPic.file = uploadRef.value;
      // 使用await等待上传的结果
      const resp = await uploadAxios.post('public/v1/upload', formPic);

      if (resp.data.code === 200) {
        form.certificate = resp.data.data.imageurl;
      } else {
        // 上传失败的处理逻辑（如果需要）
        ElMessage({
          type: 'error',
          message: '上传失败',
        });
        return; // 结束函数执行
      }
    }

    // 使用await等待更新学生的结果
    const updateResp = await updateStudentGrade(form);
    console.log("addUser:", updateResp);

    if (updateResp.code === 200) {
      ElMessage({
        type: 'success',
        message: '修改成功',
      });
      returnDesktop(); // 假设returnDesktop是一个函数，用于返回到桌面或其他操作
    } else {
      ElMessage({
        type: 'error',
        message: '修改失败',
      });
    }
  } catch (error) {
    // 捕获任何错误，并显示错误消息
    ElMessage({
      type: 'error',
      message: '发生错误',
    });
    console.error('Error:', error);
  }
};

const uploadRef = ref(null); // 上传组件的引用，需要是 null，因为组件可能还没有挂载

const formPic = reactive({
  file: '',
})

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

const returnDesktop = () => {
  //router.push(`/teacherDisplayGradeDetail/${return_id.value}`)
  router.back()
}

onMounted(handleShowContest)
</script>

<style lang="scss">
.desc {
  width:60vw;
  margin-left:auto;
  margin-right: auto;

}
</style>