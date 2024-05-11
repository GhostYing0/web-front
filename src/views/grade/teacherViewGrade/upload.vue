<template>
  <div>
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="单人赛" name="first">
        <div class="filter-container" style="margin-bottom: 15px">
          <div class="filter">
            <div class="input-container">
              <el-cascader
                  style="width:150px"
                  placeholder="选择竞赛类型"
                  v-model="item"
                  :options="options"
                  :props="props"
                  filterable
                  @change="handleFilter"
              />
              <el-cascader
                  style="margin-left: 10px; width: 300px;"
                  placeholder="搜索竞赛名称"
                v-model="contest"
                :options="contestOptions"
                :props="props"
                filterable
                @change="handleGetData"
            />
              <!--<el-input v-model="param.contest" placeholder="竞赛名称" class="filter-item" @keyup.enter="handleFilter" />-->
              <div class="filter-button-container">
<!--                <el-button class="filter-button" type="primary"  @click="handleFilter">-->
<!--                  搜索-->
<!--                </el-button>-->
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
            <el-table-column label="奖项设置数量">
              <el-table-column label="特等奖" prop="prize1_count"></el-table-column>
              <el-table-column label="一等奖" prop="prize2_count"></el-table-column>
              <el-table-column label="二等奖" prop="prize3_count"></el-table-column>
              <el-table-column label="三等奖" prop="prize4_count"></el-table-column>
            </el-table-column>
            <el-table-column
                prop="enroll_count"
                label="报名人数"
                width="95"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="state"
                label="审核状态"
                show-overflow-tooltip>
              <template #default="{ row }">
                <el-tag v-if="row.state === 3" type="primary">审核中</el-tag>
                <el-tag v-else-if="row.state === 1" type="success">通过</el-tag>
                <el-tag v-else-if="row.state === 4" type="warning">被撤回</el-tag>
                <el-tooltip
                    class="box-item"
                    effect="dark"
                    :content="row.reject_reason"
                    placement="top-start"
                ><el-tag v-if="row.state === 2" type="danger">未通过</el-tag>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
                label="操作"
                width="240"
                show-overflow-tooltip>
              <template #default="{ row }">
                <el-button type="primary" @click="checkDetail(row)">查看</el-button>
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
                  style="width:150px"
                  placeholder="选择竞赛类型"
                  v-model="item"
                  :options="options"
                  :props="props"
                  filterable
                  @change="handleFilter"
              />
              <el-cascader
                  style="margin-left: 10px; width: 300px;"
                  placeholder="搜索竞赛名称"
                  v-model="contest"
                  :options="contestOptions"
                  :props="props"
                  filterable
                  @change="handleGetData"
              />
              <!--<el-input v-model="param.contest" placeholder="竞赛名称" class="filter-item" @keyup.enter="handleFilter" />-->
              <div class="filter-button-container">
<!--                <el-button class="filter-button" type="primary"  @click="handleFilter">-->
<!--                  搜索-->
<!--                </el-button>-->
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
            <el-table-column label="奖项设置数量">
              <el-table-column label="特等奖" prop="prize1_count"></el-table-column>
              <el-table-column label="一等奖" prop="prize2_count"></el-table-column>
              <el-table-column label="二等奖" prop="prize3_count"></el-table-column>
              <el-table-column label="三等奖" prop="prize4_count"></el-table-column>
            </el-table-column>
            <el-table-column
                prop="enroll_count"
                label="报名人数"
                width="95"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="state"
                label="审核状态"
                show-overflow-tooltip>
              <template #default="{ row }">
                <el-tag v-if="row.state === 3" type="primary">审核中</el-tag>
                <el-tag v-else-if="row.state === 1" type="success">通过</el-tag>
                <el-tag v-else-if="row.state === 4" type="warning">被撤回</el-tag>
                <el-tooltip
                    class="box-item"
                    effect="dark"
                    :content="row.reject_reason"
                    placement="top-start"
                ><el-tag v-if="row.state === 2" type="danger">未通过</el-tag>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
                label="操作"
                width="240"
                show-overflow-tooltip>
              <template #default="{ row }">
                <el-button type="primary" @click="checkDetail(row)">查看</el-button>
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
</template>

<script setup>

import {
  getContestForTeacher,
  getContestType,
  viewTeacherContestGrade,
} from '@/api/contest'


import { onMounted, reactive, ref, watch} from "vue"
import { ElMessage ,ElTable} from 'element-plus';
import {router} from "@/router";

const multipleTable = ref();
const multipleSelection = ref([])
const dialogPictureVisible = ref(false)


const handleSelectionChange = (selection) => {
  multipleSelection.value = selection
  console.log(multipleSelection.value)
}

const item = ref()
const form_item = ref("")
const options = ref([])
const picture = ref()

const contestOptions = reactive([])
const contest = ref("")
const handleGetData = () => {
  if(contest.value[1]) {
    param.contest = contest.value[1]
  }
  handleFilter()
}


const activeName = ref('first');

// 使用 watch 监听 contestID prop 的变化
watch(() => activeName.value, (newActiveName, oldActiveName) => {
  handleFilter(newActiveName);
});

const year = ref(new Date().getFullYear())

// 表格数据
const tableData = ref([])
// 记录总数
const recordTotal = ref()
// 查询参数
const param = reactive( {
  page_number: 1,
  page_size: 10,
  contest: '',
  contest_type: '',
  contest_level: -1,
  start_time: '',
  end_time: '',
  school: "",
  college: "",
  name: "",
  state: -1,
  year: "",
  is_group: 2,
})


const form = reactive( {
  id: -1,
  username: "",
  contest: '',
  contest_type: '',
  create_time: '',
  deadline: '',
  school: "",
  college: "",
  name: "",
  state: -1
})

const checkDetail = (row) => {
  router.push(`/uploadGradeDetail/${row.id}`)
  //propContestID.value = row.id
  // emit('showDetail', row.id)
  //router.push("contestDetail")
}

// 搜索
const handleFilter = (newActiveName) => {
  if(newActiveName === "first") {
    param.is_group = 2
  } else if(newActiveName === "second") {
    param.is_group = 1
  }
  param.page_number = 1
  param.type = item.value[0]
  console.log("asd:")
  viewTeacherContestGrade(param).then(resp => {
    console.log(resp)
    if (resp.code === 200) {
      tableData.value = resp.data.list
      recordTotal.value = resp.data.total
      if (resp.data.total === 0) {
        ElMessage({
          type: 'info',
          message: '未搜索到竞赛信息',
        })//
      }
    }
  })
}

// 分页大小改变监听
const handleSizeChange = (curSize) => {
  param.page_size = curSize
  viewTeacherContestGrade(param).then(resp => {
    console.log('分页数据获取成功',resp)
    tableData.value = resp.data.list
    recordTotal.value = resp.data.total
  })
}

// 点击分页监听方法
const handleCurrentChange = async (curPage) => {
  param.page_number = curPage
  await viewTeacherContestGrade(param).then(resp => {
    console.log('分页数据获取成功',resp)
    tableData.value = resp.data.list
    recordTotal.value = resp.data.total
  })
}

const handleShowContest = async () => {
  param.page_number = 1
  param.state = -1
  param.type = ""
  item.value = ""
  contest.value = ""
  param.contest = ""
  param.year = year.value
  param.contest_level = -1
  viewTeacherContestGrade(param).then(resp => {
    console.log(resp)
    if(resp.code === 200) {
      tableData.value = resp.data.list
      recordTotal.value = resp.data.total
    }
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
        contestOptions[unit.type] = {value: unit.type, label: unit.type, children:[]}
        console.log(options)
      })
    } catch (error) {
      console.error(error)
    }
  })
  getContestForTeacher().then(resp => {
    let data = resp.data
    data.forEach(element => {
      contestOptions[element.type].children.push({value:element.contest, label:element.contest})
    })

    for (const key in contestOptions) {
      let value = contestOptions[key]
      contestOptions.push(value)
    }
  }).catch(error => {
    console.error(error)
  })
}


onMounted(initOptions)
onMounted(handleShowContest)
</script>


<style scoped>

</style>