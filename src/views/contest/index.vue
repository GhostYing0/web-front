<template>
  <div v-show="desktop">
    <div class="block" v-if=false>
      <span class="demonstration">年份</span>
      <el-date-picker
          v-model="year"
          type="year"
          placeholder="Pick a year"
          @change="initSchoolEnrollCountChartData"
          value-format="YYYY"
          date-format="YYYY"
      />
    </div>
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="单人赛" name="first">
        <div class="filter-container" style="margin-bottom: 15px">
        <div class="filter">
          <div class="input-container">
            <el-cascader
                class="filter-item"
                v-model="item"
                :options="options"
                :props="props"
                placeholder="竞赛类别"
                filterable
                @change="handleFilter"
            />
            <el-input v-model="param.contest" placeholder="竞赛名称" class="filter-item" @keyup.enter="handleFilter" />
            <div class="filter-button-container">
              <el-button class="filter-button" type="primary"  @click="handleFilter">
                搜索
              </el-button>
            </div>
            <div class="block">
              <span class="demonstration">年份</span>
              <el-date-picker
                  v-model="year"
                  type="year"
                  placeholder="选择年份"
                  @change="handleFilter"
                  value-format="YYYY"
                  date-format="YYYY"
              />
            </div>
          </div>
          <el-form-item label="竞赛级别" prop="role" class="filter-check">
            <el-radio v-model="param.contest_level" :label="-1" @change="handleFilter">全部</el-radio>
            <el-radio v-model="param.contest_level" :label="1" @change="handleFilter">国家级</el-radio>
            <el-radio v-model="param.contest_level" :label="2" @change="handleFilter">省部级</el-radio>
            <el-radio v-model="param.contest_level" :label="3" @change="handleFilter">校级</el-radio>
          </el-form-item>
        </div>
      </div>
        <div class="handle-container">
          <!-- 一些按钮 -->
          <el-button class="handle-button" type="primary" @click="handleShowContest">
            显示全部
          </el-button>
        </div>

        <el-table
            class="table"
            ref="multipleTable"
            :data="tableData"
            border
            height="435px"
            style="width: 100vw"
            @selection-change="handleSelectionChange"
        >
          <el-table-column label="竞赛列表">
            <el-table-column label="详情">
              <template #default="{ row }">
                <el-button @click="checkDetail(row)" type="success" size="small" >查看详情</el-button>
              </template>
            </el-table-column>
            <el-table-column
                prop="contest"
                label="竞赛名称"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="contest_type"
                label="竞赛类型"
                width="55"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="contest_level"
                label="竞赛级别"
                width="55"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="start_time"
                label="开赛时间"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="enroll_time"
                label="报名开始时间"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="deadline"
                label="报名截至时间"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="contest_state"
                label="状态"
                show-overflow-tooltip>
              <template #default="{ row }">
                <el-tag v-if="row.contest_state === 1" type="success" size="small">可报名</el-tag>
                <el-tag v-else type="info" size="small">不可报名</el-tag>
              </template>
            </el-table-column>
            <el-table-column
                prop="contest_state"
                label="报名"
                show-overflow-tooltip
                v-if="store.getters.roles.includes('student')">
              <template #default="{ row }">
                <el-button v-if="row.contest_state === 1" @click="handleEnroll(row)" type="success" size="small">点击报名</el-button>
                <el-button v-else type="info" size="small" disabled>不可报名</el-button>
              </template>
            </el-table-column>
            <el-table-column v-if="store.getters.roles.includes('department_manager')"
                             label="操作"
                             show-overflow-tooltip>
              <template #default="{ row, $index}">
                <el-button @click="handleRecover(row, $index)" type="primary" size="small">重新审核</el-button>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>

        <!--分页条-->
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="param.page_number"
            :page-sizes="[5, 10, 20, 50]"
            :page-size="param.page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="recordTotal"
            class="pagination_style"
        ></el-pagination></el-tab-pane>
      <el-tab-pane label="组队赛" name="second">
        <div class="filter-container" style="margin-bottom: 15px">
          <div class="filter">
            <div class="input-container">
                <el-cascader
                    class="filter-item"
                  v-model="item"
                  :options="options"
                  :props="props"
                    placeholder="竞赛类别"
                  filterable
                  @change="handleFilter"
              />
              <el-input v-model="param.contest" placeholder="竞赛名称" class="filter-item" @keyup.enter="handleFilter" />
              <div class="filter-button-container">
                <el-button class="filter-button" type="primary"  @click="handleFilter">
                  搜索
                </el-button>
              </div>
              <div class="block">
                <span class="demonstration">年份</span>
                <el-date-picker
                    v-model="year"
                    type="year"
                    placeholder="选择年份"
                    @change="handleFilter"
                    value-format="YYYY"
                    date-format="YYYY"
                />
              </div>
            </div>
            <el-form-item label="竞赛级别" prop="role" class="filter-check">
              <el-radio v-model="param.contest_level" :label="-1" @change="handleFilter">全部</el-radio>
              <el-radio v-model="param.contest_level" :label="1" @change="handleFilter">国家级</el-radio>
              <el-radio v-model="param.contest_level" :label="2" @change="handleFilter">省部级</el-radio>
              <el-radio v-model="param.contest_level" :label="3" @change="handleFilter">校级</el-radio>
            </el-form-item>
          </div>
        </div>
        <div class="handle-container">
          <!-- 一些按钮 -->
          <el-button class="handle-button" type="primary" @click="handleShowContest">
            显示全部
          </el-button>
        </div>

        <el-table
            class="table"
            ref="multipleTable"
            :data="tableData"
            border
            height="435px"
            style="width: 100vw"
            @selection-change="handleSelectionChange"
        >
          <el-table-column label="竞赛列表">
            <el-table-column label="详情">
              <template #default="{ row }">
                <el-button @click="checkDetail(row)" type="success" size="small" >查看详情</el-button>
              </template>
            </el-table-column>
            <el-table-column
                prop="contest"
                label="竞赛名称"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="contest_type"
                label="竞赛类型"
                width="55"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="contest_level"
                label="竞赛级别"
                width="55"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="start_time"
                label="开赛时间"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="enroll_time"
                label="报名开始时间"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="deadline"
                label="报名截至时间"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="contest_state"
                label="状态"
                show-overflow-tooltip>
              <template #default="{ row }">
                <el-tag v-if="row.contest_state === 1" type="success" size="small">可报名</el-tag>
                <el-tag v-else type="info" size="small">不可报名</el-tag>
              </template>
            </el-table-column>
            <el-table-column
                prop="contest_state"
                label="报名"
                show-overflow-tooltip
                v-if="store.getters.roles.includes('student')">
              <template #default="{ row }">
                <el-button v-if="row.contest_state === 1" @click="handleEnrollGroup(row)" type="success" size="small">点击报名</el-button>
                <el-button v-else type="info" size="small" disabled>不可报名</el-button>
              </template>
            </el-table-column>
            <el-table-column v-if="store.getters.roles.includes('department_manager')"
                             label="操作"
                             show-overflow-tooltip>
              <template #default="{ row, $index}">
                <el-button @click="handleRecover(row, $index)" type="primary" size="small">重新审核</el-button>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>

        <!--分页条-->
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="param.page_number"
            :page-sizes="[5, 10, 20, 50]"
            :page-size="param.page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="recordTotal"
            class="pagination_style"
        ></el-pagination></el-tab-pane>
    </el-tabs>
    </div>
    <div v-show="detail">
      <contestDetail
      :contestName="propContestName"
      :contestDesc="propContestDesc"
      :contestStartTime="propContestStartTime"
      :contestDeadLine="propContestDeadLine"
      :ContestEnrollTime="propContestEnrollTime"
      :contestType="propContestType"
      :contestLevel="propContestLevel"
       @sendToParent="handleReturn" />
    </div>
  </template>

<script setup>
import { ref , reactive, onMounted,watch} from 'vue'
import {viewContest, getContestType, processRejectContest, processRecoverContest, deleteContest} from "@/api/contest";
import {ElMessage, ElMessageBox} from "element-plus";
import {router} from "@/router"
import store from "@/store";
import {enrollContest} from "@/api/enroll";
import contestDetail from './detail/index.vue';
import { defineProps, defineEmits } from 'vue'

const props = {
  expandTrigger: 'hover',
}

const activeName = ref('first');

const year = ref(new Date().getFullYear())
const emit = defineEmits(['showDetail'])

const propContestName = ref("")
const propContestDesc = ref("")
const propContestStartTime = ref("")
const propContestDeadLine = ref("")
const propContestEnrollTime = ref("")
const propContestType = ref("")
const propContestLevel = ref("")

const param = reactive({
  page_number: 1,
  page_size: 10,
  contest: "",
  contest_level: -1,
  type: "",
  state: -1,
  year: "",
  is_group: 2,
})

const item = ref()

const desktop = ref(true)
const detail = ref(false)

const tableData = ref([])
const recordTotal = ref(0)

const options = ref([])


const form = reactive({
  contest: "",
  name: "",
  school: "",
  phone: "",
  email: "",
  team_id: "",
  is_group: 2,
  contest_level: 0,
})

const initOptions = async () => {
  getContestType().then(resp => {
    try {
      resp.data.forEach(unit => {
        console.log(unit.type)
        options.value.push({
          value:unit.type,
          label:unit.type
        })
        console.log(options)
      })
    } catch (error) {
      console.error(error)
    }
  })
}

// 使用 watch 监听 contestID prop 的变化
watch(() => activeName.value, (newActiveName, oldActiveName) => {
  handleFilter(newActiveName);
});

const handleFilter = (newActiveName) => {
  if(newActiveName === "first") {
    param.is_group = 2
  } else if(newActiveName === "second") {
    param.is_group = 1
  }
  param.page_number = 1
  if(item.value) {
    param.type = item.value[0]
  }
  param.year = year.value
  viewContest(param).then(resp => {
    console.log(resp)
    if(resp.code === 200) {
      tableData.value = resp.data.list
      recordTotal.value = resp.data.total
      if(resp.data.total === 0){
        ElMessage({
          type: 'info',
          message: '未搜索到相关信息',
        })//
      }
    }
  })
}

// 分页大小改变监听
const handleSizeChange = (curSize) => {
  param.page_size = curSize
  viewContest(param).then(resp => {
      console.log('分页数据获取成功',resp)
      tableData.value = resp.data.list
      recordTotal.value = resp.data.total
    })
  }

// 点击分页监听方法
const handleCurrentChange = async (curPage) => {
  param.page_number = curPage
  await viewContest(param).then(resp => {
    console.log('分页数据获取成功', resp)
    if(resp.code === 200){
      tableData.value = resp.data.list
      recordTotal.value = resp.data.total
    }
  })
}

const handleShowContest = async () => {
  param.year = year.value
  if(activeName.value === "first") {
    param.is_group = 2
  } else if(activeName.value === "second") {
    param.is_group = 1
  }
  param.page_number= 1
  param.page_size=10
  param.contest=''
  param.type=''
  item.value = ""

  param.page_number = 1
  viewContest(param).then(resp => {
    console.log(resp)
    if(resp.code === 200) {
      tableData.value = resp.data.list
      recordTotal.value = resp.data.total
    }
  })
}

const handleRecover = (row, index) => {
  ElMessageBox.confirm('确定要重新审核该竞赛吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    form.id = row.id
    processRecoverContest(form).then(resp => {
      if(resp.code === 200) {
        ElMessage({
          type: 'success',
          message: '更新成功',
        })//
        tableData.value.splice(index, 1)
        // 如果删完了，获取上一页
        if(tableData.value.length === 0) {
          param.page_number = handleCurrentChange - 1
          handleCurrentChange(param.page_number)
        }
      } else {
        ElMessage({
          type: 'error',
          message: '更新失败',
        })//
      }
    })
  }).catch(() => {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  })
}

const handleEnroll = (row) => {
  router.push(`/enrollContest/${row.id}`)
  // form.contest = row.contest
  // form.name = store.getters.name
  // form.school = store.getters.school
  // form.phone = store.getters.phone
  // form.email = store.getters.email
  //
  // enrollContest(form).then(resp => {
  //   console.log("addUser:", resp)
  //   if(resp.code === 200) {
  //     ElMessage({
  //       type: 'success',
  //       message: '报名成功',
  //     })
  //   } else {
  //     ElMessage({
  //       type: 'error',
  //       message: resp.message,
  //     })
  //   }
  // }).catch(() => {
  //   ElMessage({
  //     type: 'error',
  //     message: '报名失败',
  //   })
  // })
}

const handleEnrollGroup = (row) => {
  router.push(`/enrollContest/${row.id}`)
}


const checkDetail = (row) => {
  desktop.value = false
  detail.value = true
  propContestName.value = row.contest
  propContestDesc.value = row.desc
  propContestStartTime.value = row.start_time
  propContestDeadLine.value = row.deadline
  propContestEnrollTime.value = row.enroll_time
  propContestType.value = row.contest_type
  propContestLevel.value = row.contest_level
 // emit('showDetail', row.id)
  //router.push("contestDetail")
}

const handleReturn = () => {
  detail.value = false
  desktop.value = true
  console.log("get")
}

onMounted(initOptions)
onMounted(handleShowContest)
</script>

<style scoped>

</style>