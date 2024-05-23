<template>
  <el-form :model="form" label-width="auto" style="max-width: 800px">
    <div style="display: flex; flex-direction: column">
      <el-form-item label="上传教师ID" v-if="store.getters.roles.includes('manager')">
        <el-input v-model="form.teacher_id" style="width: 400px"/>
      </el-form-item>
      <el-form-item label="审核状态" v-if="store.getters.roles.includes('manager')" class="filter-check">
        <el-radio v-model="form.state" :label="1" >通过</el-radio>
        <el-radio v-model="form.state" :label="2" >未通过</el-radio>
        <el-radio v-model="form.state" :label="3" >审核中</el-radio>
      </el-form-item>
      <el-form-item label="报名状态" v-if="store.getters.roles.includes('manager')" class="filter-check">
        <el-radio v-model="form.contest_state" :label="1" >可报名</el-radio>
        <el-radio v-model="form.contest_state" :label="2" >不可报名</el-radio>
      </el-form-item>
      <el-form-item label="竞赛名称">
        <el-input v-model="form.contest" style="width: 200px"/>
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
      <el-form-item label="竞赛类型">
        <el-cascader
            v-model="contest_type_item"
            :options="typeOptions"
            :props="props"
            filterable
            @change="handleType"
        />
      </el-form-item>
    </div>
    <el-form-item label="竞赛级别" prop="role" class="filter-check">
      <el-radio v-model="form.contest_level" :label="1" @change="handleFilter">国家级</el-radio>
      <el-radio v-model="form.contest_level" :label="2" @change="handleFilter">省部级</el-radio>
      <el-radio v-model="form.contest_level" :label="3" @change="handleFilter">校级</el-radio>
    </el-form-item>
    <el-form-item  label="竞赛规格" prop="role" class="filter-check">
      <el-radio v-model="form.is_group" :label="2" @change="handleFilter">单人赛</el-radio>
      <el-radio v-model="form.is_group" :label="1" @change="handleFilter">组队赛</el-radio>
      <el-form-item v-if="form.is_group === 1" label="队伍人数">
        <el-input-number v-model="form.max_group_number" :min="2" @change="handleChange" />
      </el-form-item>
    </el-form-item>
    <div style="display:flex; flex-direction: column">
       <div style="display:flex; flex-direction: row">
          <el-form-item  class="form-item" label="特等奖数量">
              <el-input-number v-model="form.prize1" :min="0"  @change="handleChange" />
          </el-form-item>
          <el-form-item class="form-item" label="一等奖数量">
            <el-input-number v-model="form.prize2" :min="0"  @change="handleChange" />
          </el-form-item>
       </div>
      <div style="display:flex; flex-direction: row">
        <el-form-item class="form-item" label="二等奖数量">
          <el-input-number v-model="form.prize3" :min="0"  @change="handleChange" />
        </el-form-item>
        <el-form-item class="form-item" label="三等奖数量">
          <el-input-number v-model="form.prize4" :min="0"  @change="handleChange" />
        </el-form-item>
        </div>
    </div>
      <el-form-item class="form-item" label="开赛时间" style="width: 350px">
        <el-date-picker
            v-model="form.start_time"
            type="datetime"
            placeholder="选择时间"
            value-format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm"
            :shortcuts="shortcuts"
        />
      </el-form-item>
      <el-form-item class="form-time-range" label="报名时间段" style="width: 500px">
        <el-date-picker
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
      <el-input style="width:500px" v-model="form.desc" type="textarea" />
    </el-form-item>
    <el-form-item label="备注">
      <el-input style="width:500px" v-model="form.ps" type="textarea" />
    </el-form-item>
    <el-form-item>
      <div class="form-button-container">
      <el-button class="form-button" type="primary" @click="handleCreate">提交</el-button>
      </div>
    </el-form-item>
  </el-form>

</template>

<script setup>
import {uploadContest} from '@/api/enroll'
import {ElMessage} from 'element-plus';
import store from "@/store";
import {onMounted, reactive, ref} from "vue";
import {getContestEntry, getContestType, addContest} from "@/api/contest";

const entryOptions = ref([])
const contest_entry_item = ref()

const typeOptions = ref([])
const contest_type_item = ref()

const time_range = ref([])

const form = reactive({
  teacher_id: "",
  contest_entry: 0,
  contest: "",
  contest_level: 0,
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
  state: 3,
  contest_state: 2,
  ps: "",
})

const handleClearForm = () => {
    form.username = store.getters.username
    form.school= store.getters.school
    form.contest= ''
    form.contest_type=""
    form.phone= ''
    form.email= ''
    form.start_time= ""
    form.deadline=""
    form.desc= ''
}
const handleCreate = () => {
  // 表单是添加状态
  console.log("handleCreate")
  if(store.getters.roles.includes("teacher")) {
    uploadContest(form).then(resp => {
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
  } else if (store.getters.roles.includes("manager")) {
    addContest(form).then(resp => {
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
}

const handleType = () => {
  form.contest_type = contest_type_item.value[0]
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
      entryOptions.value.push({
        value: 0,
        label: "无所属项目",
      })
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
  if(time_range.value) {
    form.enroll_time = time_range.value[0]
    form.deadline = time_range.value[1]
  }
}

onMounted(initOptions)
</script>

<style scoped>

</style>
