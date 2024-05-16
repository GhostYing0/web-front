<template>
  <el-form-item>编辑竞赛信息</el-form-item>
  <el-form :model="form" label-width="auto" style="max-width: 800px">
    <div style="display: flex; flex-direction: row">
    <el-form-item label="上传教师">
      <el-input v-model="form.name" disabled/>
    </el-form-item>
    <el-form-item label="所属系部">
      <el-input v-model="form.department" disabled/>
    </el-form-item>
    <el-form-item label="职称">
      <el-input v-model="form.title" disabled/>
    </el-form-item>
    </div>
    <el-form-item label="竞赛状态">
    <el-tag class="form-tag" v-if="form.state === 3" type="primary">审核中</el-tag>
    <el-tag class="form-tag" v-else-if="form.state === 2" type="danger">未通过</el-tag>
    <el-tag class="form-tag" v-else-if="form.state === 1" type="success">通过</el-tag>
    <el-tag class="form-tag" v-else-if="form.state === 4" type="warning">被撤回</el-tag>
    </el-form-item>
    <el-form-item label="竞赛所属项目">
      <el-cascader
          v-model="contest_entry_item"
          :options="entryOptions"
          :props="props"
          filterable
          @change="handleEntry"
      />
    </el-form-item>
    <el-form-item label="竞赛名称">
      <el-input v-model="form.contest" style="width: 250px"/>
    </el-form-item>
    <el-form-item label="竞赛级别" prop="role" class="filter-check">
      <el-radio v-model="form.contest_level_id" :label="1" @change="handleFilter">国家级</el-radio>
      <el-radio v-model="form.contest_level_id" :label="2" @change="handleFilter">省部级</el-radio>
      <el-radio v-model="form.contest_level_id" :label="3" @change="handleFilter">校级</el-radio>
    </el-form-item>
    <el-form-item prop="role" class="filter-check" label="竞赛规格">
      <el-radio v-model="form.is_group" :label="2" @change="handleFilter">单人赛</el-radio>
      <el-radio v-model="form.is_group" :label="1" @change="handleFilter">组队赛</el-radio>
      <el-form-item v-if="form.is_group === 1" label="队伍人数">
        <el-input-number v-model="form.max_group_number" :min="2" @change="handleChange" />
      </el-form-item>
    </el-form-item>
    <el-form-item label="竞赛类型" style="width: 200px;">
      <el-cascader
          v-model="contest_type_item"
          :options="typeOptions"
          :props="props"
          filterable
          @change="handleType"
      />
    </el-form-item>
    <div style="display: flex; flex-direction: column">
      <div style="display: flex; flex-direction: row">
        <el-form-item label="特等奖">
          <el-input-number v-model="form.prize1" :min="0"  @change="handleChange" />
        </el-form-item>
        <el-form-item label="一等奖">
          <el-input-number v-model="form.prize2" :min="0"  @change="handleChange" />
        </el-form-item>
      </div>
      <div style="display: flex; flex-direction: row">
        <el-form-item label="二等奖">
          <el-input-number v-model="form.prize3" :min="0"  @change="handleChange" />
        </el-form-item>
        <el-form-item label="三等奖">
          <el-input-number v-model="form.prize4" :min="0"  @change="handleChange" />
        </el-form-item>
      </div>
    </div>
    <el-form-item label="开赛时间" prop="create_time">
      <div class="block">
        <span class="demonstration"></span>
        <el-date-picker
            v-model="form.start_time"
            type="datetime"
            placeholder="Select date and time"
            value-format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm"
            :shortcuts="shortcuts"
        />
      </div>
    </el-form-item>
    <el-form-item label="报名时间段" prop="create_time" style="width: 500px">
    <el-date-picker
        class="block"
        v-model="time_range"
        type="datetimerange"
        start-placeholder="报名开始时间"
        end-placeholder="报名截止时间"
        value-format="YYYY-MM-DD HH:mm:ss"
        date-format="YYYY/MM/DD ddd"
        time-format="HH:mm"
        @change="handleTime"
    />
    </el-form-item>
    <el-form-item label="竞赛介绍">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="form.ps" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-form-item v-if="form.state === 2" label="驳回原因">
        <el-input v-model="form.reject_reason" type="textarea" disabled />
      </el-form-item>
      <el-button class="UpdateContest-button" type="primary" @click="handleCreate">提交</el-button>
      <el-button class="UpdateContest-button" @click="handleReturn">返回</el-button>
    </el-form-item>
  </el-form>

</template>

<script setup>
import {teacherUpdateContest, uploadContest} from '@/api/enroll'
import {ElMessage} from 'element-plus';
import store from "@/store";
import {onMounted, reactive, ref} from "vue";
import {router} from "@/router";
import {getContestEntry, getContestType, viewTeacherContest} from "@/api/contest";

const entryOptions = ref([])
const contest_entry_item = ref()

const typeOptions = ref([])
const contest_type_item = ref()

const time_range = ref([])

const form = reactive({
  contest_entry: 0,
  contest: "",
  contest_level_id: 0,
  is_group: 0,
  max_group_number: 2,
  prize1: 0,
  prize2: 0,
  prize3: 0,
  prize4: 0,
  contest_type: "",
  start_time: "",
  enroll_time: "",
  deadline: "",
  desc: "",
  ps: "",
  type: "",
  reject_reason: "",
  name: "",
  title: "",
  department: "",
})

const handleCreate = () => {
  // 表单是添加状态
  form.id = parseInt(router.currentRoute.value.params.contest_id,10)
  console.log("handleCreate")
  teacherUpdateContest(form).then(resp => {
    console.log("addUser:", resp)
    if (resp.code === 200) {
      ElMessage({
        type: 'success',
        message: '提交成功',
      })
      handleReturn()
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
}

const handleReturn = () => {
  if(store.getters.roles.includes("manager")) {
    router.push("/contestManage")
    return
  }
  router.push("/displayMyContest")
}

const handleType = () => {
  form.type = contest_type_item.value[0]
}

const initOptions = async () => {
  getContestType().then(resp => {
    try {
      resp.data.forEach(unit => {
        console.log(unit.type)
        typeOptions.value.push({
          value:unit.type,
          label:unit.type
        })
      })
    } catch (error) {
      console.error(error)
    }
  })
  getContestEntry().then(resp => {
    try {
      resp.data.forEach(unit => {
        console.log(unit.type)
        entryOptions.value.push({
          value:unit.contest_entry_id,
          label:unit.contest_entry
        })
      })
    } catch (error) {
      console.error(error)
    }
  })
}

const handleEntry = () => {
  form.contest_entry = contest_entry_item.value[0]}

const handleTime = () => {
  form.enroll_time = time_range.value[0]
  form.deadline = time_range.value[1]
}

const param = reactive({
  id: -1,
})

const GetContestByID = () => {
  param.id = router.currentRoute.value.params.contest_id

    param.page_number = 1
    viewTeacherContest(param).then(resp => {
      console.log(resp)
      if(resp.code === 200 && resp.data.list[0]) {
        form.contest= resp.data.list[0].contest
        form.contest_level_id=resp.data.list[0].contest_level_id
        form.is_group=resp.data.list[0].is_group
        form.max_group_number=resp.data.list[0].max_group_number
        form.prize1=resp.data.list[0].prize1
        form.prize2=resp.data.list[0].prize2
        form.prize3=resp.data.list[0].prize3
        form.prize4=resp.data.list[0].prize4
        form.type=resp.data.list[0].contest_type
        form.start_time=resp.data.list[0].start_time
        form.enroll_time=resp.data.list[0].enroll_time
        form.deadline=resp.data.list[0].deadline
        form.desc=resp.data.list[0].desc
        form.ps=resp.data.list[0].ps
        form.state = resp.data.list[0].state
        form.contest_entry = resp.data.list[0].contest_entry
        form.reject_reason = resp.data.list[0].reject_reason
        contest_entry_item.value = resp.data.list[0].contest_entry_id
        contest_type_item.value = resp.data.list[0].contest_type
        time_range.value[0] = resp.data.list[0].enroll_time
        time_range.value[1] = resp.data.list[0].deadline
        form.name = resp.data.list[0].name
        form.title = resp.data.list[0].title
        form.department = resp.data.list[0].department
      }
    })
}

onMounted(initOptions)
onMounted(GetContestByID)
</script>

<style lang="scss">
.UpdateContest-button {
  margin-left: 250px;
}
</style>
