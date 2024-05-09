<template>
  编辑竞赛信息
  <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-tag class="form-tag" v-if="form.state === 3" type="primary">审核中</el-tag>
    <el-tag class="form-tag" v-else-if="form.state === 2" type="danger">未通过</el-tag>
    <el-tag class="form-tag" v-else-if="form.state === 1" type="success">通过</el-tag>
    <el-tag class="form-tag" v-else-if="form.state === 4" type="warning">被撤回</el-tag>
    <div class="m-4">
      竞赛所属项目
      <el-cascader
          v-model="contest_entry_item"
          :options="entryOptions"
          :props="props"
          filterable
          @change="handleEntry"
      />
    </div>
    <el-form-item label="竞赛名称">
      <el-input v-model="form.contest" />
    </el-form-item>
    <el-form-item label="竞赛级别" prop="role" class="filter-check">
      <el-radio v-model="form.contest_level_id" :label="1" @change="handleFilter">国家级</el-radio>
      <el-radio v-model="form.contest_level_id" :label="2" @change="handleFilter">省部级</el-radio>
      <el-radio v-model="form.contest_level_id" :label="3" @change="handleFilter">校级</el-radio>
    </el-form-item>
    <el-form-item prop="role" class="filter-check">
      <el-radio v-model="form.is_group" :label="2" @change="handleFilter">单人赛</el-radio>
      <el-radio v-model="form.is_group" :label="1" @change="handleFilter">组队赛</el-radio>
      <el-form-item v-if="form.is_group === 1" label="队伍人数">
        <el-input-number v-model="form.max_group_number" :min="2" @change="handleChange" />
      </el-form-item>
    </el-form-item>
    <el-text>奖项数量设置</el-text>
    <el-form-item label="特等奖">
      <el-input-number v-model="form.prize1" :min="0"  @change="handleChange" />
    </el-form-item>
    <el-form-item label="一等奖">
      <el-input-number v-model="form.prize2" :min="0"  @change="handleChange" />
    </el-form-item>
    <el-form-item label="二等奖">
      <el-input-number v-model="form.prize3" :min="0"  @change="handleChange" />
    </el-form-item>
    <el-form-item label="三等奖">
      <el-input-number v-model="form.prize4" :min="0"  @change="handleChange" />
    </el-form-item>
    <div class="m-4">
      竞赛类型
      <el-cascader
          v-model="contest_type_item"
          :options="typeOptions"
          :props="props"
          filterable
          @change="handleType"
      />
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
    <el-form-item label="竞赛介绍">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="form.ps" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleCreate">提交</el-button>
      <el-button @click="handleClearForm">清空表单</el-button>
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

const handleType = () => {
  form.type = contest_type_item.value[0]
  console.log(form.contest_type)
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
        contest_entry_item.value = resp.data.list[0].contest_entry
        contest_type_item.value = resp.data.list[0].contest_type
        time_range.value[0] = resp.data.list[0].enroll_time
        time_range.value[1] = resp.data.list[0].deadline
      }
    })
}

onMounted(initOptions)
onMounted(GetContestByID)
</script>

<style scoped>

</style>
