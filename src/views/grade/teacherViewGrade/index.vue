<template>
    <div class="app-container">
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
              style="width: 100%"
              @selection-change="handleSelectionChange"
          >
            <el-table-column label="成绩信息表">
              <el-table-column
                  fixed
                  prop="id"
                  label="序号"
                  width="55" v-if="store.getters.roles.includes('manager')">
              </el-table-column>
              <el-table-column
                  prop="contest"
                  label="竞赛名称"
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
                  width="90"
                  show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                  prop="start_time"
                  label="开赛时间"
                  width="200"
                  show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                  prop="reward_count"
                  label="获奖通过人数"
                  show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                  prop="process_count"
                  label="审核中"
                  show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                  prop="rejected_count"
                  label="被驳回"
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
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="150" type="index">
                <template #default="{ row }">
                <el-button type="primary" size="small" @click="checkDetail(row)">查看</el-button>
                </template>
<!--                <template #default="{ row, $index}">-->
<!--                  <el-button v-if="row.state === 3" @click="handleRevoke(row, $index)" type="warning" size="small">撤销</el-button>-->
<!--                  <el-button v-else  type="danger" size="small" disabled>撤销</el-button>-->
<!--                </template>-->
<!--              </el-table-column>-->
            </el-table-column>
          </el-table>

          <!--查看图片-->
          <el-dialog v-model="dialogPictureVisible" width="30%">
            <!--普通表单-->
            <div>
              <el-image :src="picture" />
            </div>
          </el-dialog>

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
              style="width: 100%"
              @selection-change="handleSelectionChange"
          >
            <el-table-column label="成绩信息表">
              <el-table-column
                  fixed
                  prop="id"
                  label="序号"
                  width="55" v-if="store.getters.roles.includes('manager')">
              </el-table-column>
              <el-table-column
                  prop="contest"
                  label="竞赛名称"
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
                  width="90"
                  show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                  prop="start_time"
                  label="开赛时间"
                  width="200"
                  show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                  prop="reward_count"
                  label="获奖通过人数"
                  show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                  prop="process_count"
                  label="审核中"
                  show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                  prop="rejected_count"
                  label="被驳回"
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
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="150" type="index">
              <template #default="{ row }">
                <el-button type="primary" size="small" @click="checkDetail(row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!--查看图片-->
          <el-dialog v-model="dialogPictureVisible" width="30%">
            <!--普通表单-->
            <div>
              <el-image :src="picture" />
            </div>
          </el-dialog>

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
    <div>
    </div>
</template>

  <script setup>

  import {
    cancelContest,
    viewTeacherContestGrade,
    getContestType,
    getContestForTeacher,
  } from '@/api/contest'

  import {
    processPassGrade,
    processRejectGrade,
    processRecoverGrade, revokeGrade
  } from '@/api/grade'
  
  import {computed, onMounted, reactive, ref, watch} from "vue"
  import { ElMessageBox, ElMessage ,ElTable} from 'element-plus';
  import store from "@/store";
  import {getContest} from "@/api/analysis";
  import {router} from "@/router";
  
  const multipleTable = ref();
  const multipleSelection = ref([])
  const dialogPictureVisible = ref(false)
  
  
  const handleSelectionChange = (selection) => {
    multipleSelection.value = selection
    console.log(multipleSelection.value)
  }

  const year = ref(new Date().getFullYear())
  
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
    start_time: '',
    end_time: '',
    school: "",
    college: "",
    name: "",
    state: 1,
    year: "",
    is_group: 2,
    contest_level: -1
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
    router.push(`teacherDisplayGradeDetail/${row.id}`)
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
    param.year = year.value
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

  const handDown = (url) => {
      picture.value = url
      dialogPictureVisible.value = true
  }
  
  onMounted(initOptions)
  onMounted(handleShowContest)
  </script>
  
  <style scoped>
  .demo-datetime-picker {
    display: flex;
    width: 100%;
    padding: 0;
    flex-wrap: wrap;
  }
  .demo-datetime-picker .block {
    padding: 30px 0;
    text-align: center;
    border-right: solid 1px var(--el-border-color);
    flex: 1;
  }
  .demo-datetime-picker .block:last-child {
    border-right: none;
  }
  .demo-datetime-picker .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
  }
  </style>