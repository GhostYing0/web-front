<template>
  <div>
    <div class="desc">
      <el-descriptions title="竞赛详情" border label-align="">
        <el-descriptions-item width="10vw" label=竞赛名>{{form.contest}}</el-descriptions-item>
        <el-descriptions-item width="10vw" label=竞赛所属项目>{{form.contest_entry}}</el-descriptions-item>
        <el-descriptions-item width="10vw" label="竞赛类型">{{form.contest_type}}</el-descriptions-item>
        <el-descriptions-item width="10vw" label="竞赛级别">{{form.contest_level}}</el-descriptions-item>
        <el-descriptions-item width="10vw" label="参与形式">
          <template v-if="form.is_group === 2">组队赛</template>
          <template v-else>单人赛</template>
        </el-descriptions-item>
        <el-descriptions-item width="10vw" label="队伍最大人数" v-if="form.is_group === 2">
          {{form.max_group_number}}人
        </el-descriptions-item>
      </el-descriptions>
        <el-descriptions  border label-align="">
        <el-descriptions-item width="10vw" label="奖项数量设置" >
          特等奖{{form.prize1_count}}项
          一等奖{{form.prize2_count}}项
          二等奖{{form.prize3_count}}项
          三等奖{{form.prize4_count}}项
        </el-descriptions-item>
        </el-descriptions>
      <el-descriptions border>
        <el-descriptions-item width="10vw" label="开赛时间">{{form.start_time}}</el-descriptions-item>
        <el-descriptions-item width="10vw" label="报名开始时间">{{form.enroll_time}}</el-descriptions-item>
        <el-descriptions-item width="10vw" label="报名截止时间">{{form.deadline}}</el-descriptions-item>
        <el-descriptions-item width="10vw" label="上传教师">{{form.name}}</el-descriptions-item>
        <el-descriptions-item width="10vw" label="教师所在系">{{form.department}}</el-descriptions-item>
        <el-descriptions-item width="10vw" label="教师职称">{{form.title}}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions border direction="vertical">
        <el-descriptions-item width="10vw" label="竞赛介绍">{{form.desc}}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions border>
      <el-descriptions-item width="10vw" label="备注">{{form.ps}}</el-descriptions-item>
      </el-descriptions>
    </div>
    <div>
    </div>

    <el-button @click="returnDesktop()" type="success" size="small" >返回</el-button>
  </div>

</template>

<script setup>
import { ref , reactive, onMounted} from 'vue'
import { getContestDetail} from "@/api/contest";
import {ElMessage} from "element-plus";
import {router} from "@/router"
import store from "@/store";
import {enrollContest} from "@/api/enroll";

const returnDesktop = () => {
  if(store.getters.roles.includes("manager")) {
    router.push("/contestManage")
    return
  }
  router.push("/contestProcess")
}

const param = reactive({
  id: -1,
})

const form = reactive({

})

const handleGetContestDetail = () => {
  param.id = parseInt(router.currentRoute.value.params.contest_id, 10)
  getContestDetail(param).then(resp => {
    if(resp.code === 200) {
      if(resp.data.data[0]) {
        form.id = resp.data.data[0].id
        form.contest = resp.data.data[0].contest
        form.contest_entry = resp.data.data[0].contest_entry
        form.contest_type = resp.data.data[0].contest_type
        form.contest_level = resp.data.data[0].contest_level
        form.is_group = resp.data.data[0].is_group
        form.prize1_count = resp.data.data[0].prize1_count
        form.prize2_count = resp.data.data[0].prize2_count
        form.prize3_count = resp.data.data[0].prize3_count
        form.prize4_count = resp.data.data[0].prize4_count
        form.start_time = resp.data.data[0].start_time
        form.enroll_time = resp.data.data[0].enroll_time
        form.deadline = resp.data.data[0].deadline
        form.desc = resp.data.data[0].desc
        form.name = resp.data.data[0].name
        form.department = resp.data.data[0].department
        form.title = resp.data.data[0].title
        form.ps = resp.data.data[0].ps
        form.max_group_number = resp.data.data[0].max_group_number
      }
    }
  }).catch((error) => {
    console.error(error)
  })
}

onMounted(handleGetContestDetail)

</script>

<style lang="scss">
.desc {
  width:60vw;
  margin-left:auto;
  margin-right: auto;

}
</style>