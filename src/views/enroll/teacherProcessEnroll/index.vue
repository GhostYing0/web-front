<template>
  <div v-show="desktop">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="单人赛" name="first">
        <div class="filter-container" style="margin-bottom: 15px">
          <div class="filter">
            <div class="input-container">
              <el-cascader
                class="filter-item"
                placeholder="选择竞赛"
                v-model="contest"
                :options="contestOptions"
                :props="props"
                  filterable
                  @change="handleFilter"
              />
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
              <!--<el-input v-model="param.contest" placeholder="竞赛名称" class="filter-item" @keyup.enter="handleFilter" />-->
<!--              <div class="filter-button-container">-->
<!--                <el-button class="filter-button" type="primary"  @click="handleFilter">-->
<!--                  搜索-->
<!--                </el-button>-->
<!--              </div>-->
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
          <el-button class="handle-button" type="primary" @click="handleShowALL">
            显示全部
          </el-button>
        </div>

        <el-table
            class="table"
            ref="multipleTable"
            :data="tableData"
            border
            height="435px"
            style="width:100% font-size:14px"
            @selection-change="handleSelectionChange"
        >
          <el-table-column label="竞赛列表" width="100%">
            <el-table-column
                prop="contest"
                label="竞赛名称"
                width="160"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="contest_type"
                label="竞赛类型"
                width="90"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="contest_level"
                label="竞赛级别"
                width="70"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="start_time"
                label="开赛时间"
                width="160"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="enroll_time"
                label="报名开始时间"
                width="160"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="deadline"
                label="报名截至时间"
                width="160"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="processing_count"
                label="待审核人数"
                width="95"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="rejected_count"
                label="被驳回人数"
                width="95"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="state"
                label="审核状态"
                show-overflow-tooltip>
              <template #default="{ row }">
                <el-tooltip
                    class="box-item"
                    effect="dark"
                    :content="row.reject_reason"
                    placement="top-start"
                ><el-tag v-if="row.state === 2" type="danger">未通过</el-tag>
                </el-tooltip>
                <el-tag v-if="row.state === 3" type="primary">审核中</el-tag>
                <el-tag v-else-if="row.state === 1" type="success">通过</el-tag>
              </template>
            </el-table-column>
            <el-table-column
                label="操作"
                width="240"
                show-overflow-tooltip>
              <template #default="{ row }">
                <el-button type="primary" @click="DoProcessing(row)" size="small">进入审核</el-button>
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
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="组队赛" name="second">
        <div class="filter-container" style="margin-bottom: 15px">
          <div class="filter">
            <div class="input-container">
              <el-cascader
                  class="filter-item"
                  placeholder="选择竞赛"
                  v-model="contest"
                  :options="contestOptions"
                  :props="props"
                  filterable
                  @change="handleFilter"
              />
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
              <!--<el-input v-model="param.contest" placeholder="竞赛名称" class="filter-item" @keyup.enter="handleFilter" />-->
<!--              <div class="filter-button-container">-->
<!--                <el-button class="filter-button" type="primary"  @click="handleFilter">-->
<!--                  搜索-->
<!--                </el-button>-->
<!--              </div>-->
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
          <el-button class="handle-button" type="primary" @click="handleShowALL">
            显示全部
          </el-button>
        </div>

        <el-table
            class="table"
            ref="multipleTable"
            :data="tableData"
            border
            height="435px"
            style="width:100%; font-size:14px"
            @selection-change="handleSelectionChange"
        >
          <el-table-column label="竞赛列表" width="100%">
            <el-table-column
                prop="contest"
                label="竞赛名称"
                width="160"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="contest_type"
                label="竞赛类型"
                width="90"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="contest_level"
                label="竞赛级别"
                width="70"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="start_time"
                label="开赛时间"
                width="160"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="enroll_time"
                label="报名开始时间"
                width="160"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="deadline"
                label="报名截至时间"
                width="160"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="processing_count"
                label="待审核人数"
                width="95"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="rejected_count"
                label="被驳回人数"
                width="95"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="state"
                label="审核状态"
                show-overflow-tooltip>
              <template #default="{ row }">
                <el-tooltip
                    class="box-item"
                    effect="dark"
                    :content="row.reject_reason"
                    placement="top-start"
                ><el-tag v-if="row.state === 2" type="danger">未通过</el-tag>
                </el-tooltip>
                <el-tag v-if="row.state === 3" type="primary">审核中</el-tag>
                <el-tag v-else-if="row.state === 1" type="success">通过</el-tag>
              </template>
            </el-table-column>
            <el-table-column
                label="操作"
                width="240"
                show-overflow-tooltip>
              <template #default="{ row }">
                <el-button type="primary" @click="DoProcessing(row)" size="small">进入审核</el-button>
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
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
  <div v-show="detail">
    <contestProcessing
    :contestID="propContestID"
    :contestName="propContestName"
    :contestType="propContestType"
    :contestLevel="propContestLevel"
     @sendToParent="handleReturn" />
  </div>
</template>

<script setup>
import { ref , reactive, onMounted, watch} from 'vue'
import {getContestType, getDepartmentContest, onlyGetDepartmentContest} from "@/api/contest";
import {ElMessage} from "element-plus";
import {router} from "@/router"
import store from "@/store";
import {enrollContest} from "@/api/enroll";
import contestProcessing from './processing.vue';
import { defineProps, defineEmits } from 'vue'

const props = {
  expandTrigger: 'hover',
}

const emit = defineEmits(['showDetail'])

const propContestID = ref("")
const propContestName = ref("")
const propContestType = ref("")
const propContestLevel = ref("")

const contestOptions = ref([])
const contest = ref("")
const contestType = reactive({})

const param = reactive({
  page_number: 1,
  page_size: 10,
  contest: "",
  type: "",
  state: 1,
  year: "",
  is_group: 2,
  contest_level: -1,
})

const year = ref(new Date().getFullYear())

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
})

const activeName = ref('first');

// 使用 watch 监听 contestID prop 的变化
watch(() => activeName.value, (newActiveName, oldActiveName) => {
  handleFilter(newActiveName);
});

const getContestAndType = () => {
  getContestType().then(resp => {
    let data = resp.data
    data.forEach(element => {
      contestType[element.type] = {value: element.type, label: element.type, children:[]}
    })
  }).catch(error => {
    console.error(error)
  })

  onlyGetDepartmentContest().then(resp => {
    let data = resp.data
    data.forEach(element => {
      contestType[element.type].children.push({value:element.contest, label:element.contest})
    })

    for (const key in contestType) {
      let value = contestType[key]
      contestOptions.value.push(value)
    }
  }).catch(error => {
    console.error(error)
  })
}

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

const handleFilter = (newActiveName) => {
  param.page_number = 1
  //param.type = item.value[0]
  if(contest.value[1]) {
    param.contest = contest.value[1]
  }
  if(newActiveName === "first") {
    param.is_group = 2
  } else if(newActiveName === "second") {
    param.is_group = 1
  }
  param.year = year.value
  getDepartmentContest(param).then(resp => {
    console.log(resp)
    if(resp.code === 200) {
      tableData.value = resp.data.list
      recordTotal.value = resp.data.total
      if(resp.data.total === 0){
        ElMessage({
          type: 'info',
          message: '未搜索到竞赛',
        })//
      }
    }
  })
}

// 分页大小改变监听
const handleSizeChange = (curSize) => {
  param.page_size = curSize
  getDepartmentContest(param).then(resp => {
      console.log('分页数据获取成功',resp)
      tableData.value = resp.data.list
      recordTotal.value = resp.data.total
    })
  }

// 点击分页监听方法
const handleCurrentChange = async (curPage) => {
  param.page_number = curPage
  await getDepartmentContest(param).then(resp => {
    console.log('分页数据获取成功', resp)
    if(resp.code === 200){
      tableData.value = resp.data.list
      recordTotal.value = resp.data.total
    }
  })
}

const handleShowContest = async () => {
  param.page_number = 1
  param.contest_level = -1
  param.year = year.value
  getDepartmentContest(param).then(resp => {
    console.log(resp)
    if(resp.code === 200) {
      tableData.value = resp.data.list
      recordTotal.value = resp.data.total
    }
  })
}

const handleShowALL = () => {
  param.page_number= 1
  param.page_size=10
  param.contest=''
  param.contest_level = -1
  param.type=''
  item.value = ""
  contest.value = ""


  getDepartmentContest(param).then(resp => {
    console.log(resp)
    if(resp.code === 200) {
      tableData.value = resp.data.list
      recordTotal.value = resp.data.total
    }
  })
}

const handleShowMyContest = () => {
  param.page_number= 1
  param.page_size=10
  param.contest=''
  param.type=''
  param.state= -1
  item.value = ""

  getDepartmentContest(param).then(resp => {
    console.log(resp)
    if(resp.code === 200) {
      tableData.value = resp.data.list
      recordTotal.value = resp.data.total
    }
  })
}

const copyTextToClipboard = (row) => {
  form.contest = row.contest
  form.name = store.getters.name
  form.school = store.getters.school
  form.phone = store.getters.phone
  form.email = store.getters.email

  enrollContest(form).then(resp => {
    console.log("addUser:", resp)
    if(resp.code === 200) {
      ElMessage({
        type: 'success',
        message: '报名成功',
      })
    } else {
      ElMessage({
        type: 'error',
        message: resp.message,
      })
    }
  }).catch(() => {
    ElMessage({
      type: 'error',
      message: '报名失败',
    })
  })
}

const DoProcessing = (row) => {
  desktop.value = false
  detail.value = true
  propContestID.value = row.id
  propContestName.value = row.contest
  propContestType.value = row.contest_type
  propContestLevel.value = row.contest_level
 // emit('showDetail', row.id)
  //router.push("contestDetail")
}

const handleReturn = () => {
  detail.value = false
  desktop.value = true
  handleShowALL()
  console.log("get")
}

onMounted(getContestAndType)
onMounted(initOptions)
onMounted(handleShowContest)
</script>

<style scoped>

</style>




<!--<template>
  <div>
 <el-menu
:default-active="defaultActive"
class="el-menu-demo"
mode="horizontal"
@select="handleSelect"
router
>
<el-menu-item index="/enrollProcessing">审核中</el-menu-item>
<el-menu-item index="/enrollRejected">被驳回</el-menu-item>
</el-menu>
<el-main>
<router-view/>
</el-main>
</div>
</template>

<script setup>
import { router } from '@/router'
import { ref ,onMounted} from 'vue'
const defaultActive = ref("/enrollProcessing")
const handleSelect = (key, keyPath) => {
  console.log("==============", key, "  ",keyPath)
}
const initDash = () => {
  router.push("/enrollProcessing")
}

onMounted(initDash)
</script>-->