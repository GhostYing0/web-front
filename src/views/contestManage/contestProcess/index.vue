<template>
  <el-tabs v-model="activeName" class="demo-tabs">
    <el-tab-pane label="单人赛" name="first">
      <div class="app-container">
        <div class="filter-container" style="margin-bottom: 15px">
          <!-- 用户名输入 -->
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
            </div>
            <el-form-item label="竞赛级别" prop="role" class="filter-check">
              <el-radio v-model="param.contest_level" :label="-1" @change="handleFilter">全部</el-radio>
              <el-radio v-model="param.contest_level" :label="1" @change="handleFilter">国家级</el-radio>
              <el-radio v-model="param.contest_level" :label="2" @change="handleFilter">省部级</el-radio>
              <el-radio v-model="param.contest_level" :label="3" @change="handleFilter">校级</el-radio>
            </el-form-item>
            <el-form-item label="审核状态" prop="role" class="filter-check">
              <el-radio v-model="param.state" :label="3" @change="handleFilter">审核中</el-radio>
              <el-radio v-model="param.state" :label="2" @change="handleFilter">未通过</el-radio>
            </el-form-item>
          </div>
        </div>
        <div class="handle-container">
          <!-- 一些按钮 -->
          <el-button class="handle-button" type="primary" @click="handleShowContest">
            显示全部
          </el-button>
        </div>
      </div>

      <!--弹出框-->
      <el-dialog :title="formTitle" v-model="dialogFormVisible" width="30%">
        <!--普通表单-->
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="80px">
          <el-form-item label="驳回原因" prop="reject_reason">
            <el-input v-model="form.reject_reason"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="handleReject">确 定</el-button>
        </div>
      </el-dialog>

      <el-table
          class="table"
          ref="multipleTable"
          :data="tableData"
          border
          height="435px"
          style="width: 100vw"
          @selection-change="handleSelectionChange"
      >
        <el-table-column label="待审核竞赛表">
          <el-table-column label="详情">
            <template #default="{ row }">
              <el-button @click="checkDetail(row)" type="success" size="small" >查看详情</el-button>
            </template>
          </el-table-column>
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
              width="90"
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
              prop="state"
              label="审核状态"
              width="82"
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
<!--          <el-table-column-->
<!--              prop="contest_state"-->
<!--              label="报名状态"-->
<!--              show-overflow-tooltip>-->
<!--            <template #default="{ row }">-->
<!--              <el-tag v-if="row.contest_state === 1" type="success" size="small">可报名</el-tag>-->
<!--              <el-tag v-else type="info" size="small">不可报名</el-tag>-->
<!--            </template>-->
<!--          </el-table-column>-->
          <el-table-column
              prop="reject_reason"
              label="驳回原因"
              show-overflow-tooltip>
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
          <el-table-column fixed="right" label="操作" width="150" type="index" >
            <template #default="{ row, $index}">
              <el-button v-if="row.state === 3" @click="handlePass(row, $index)" type="primary" size="small">通过</el-button>
              <el-button  v-if="row.state === 3" @click="writeRejectReason(row, $index)" type="danger" size="small">驳回</el-button>
              <el-button  v-if="row.state === 2" @click="handleRecover(row, $index)" type="primary" size="small">重新审核</el-button>
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
      <div class="app-container">
        <div class="filter-container" style="margin-bottom: 15px">
          <!-- 用户名输入 -->
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
            </div>
            <el-form-item label="竞赛级别" prop="role" class="filter-check">
              <el-radio v-model="param.contest_level" :label="-1" @change="handleFilter">全部</el-radio>
              <el-radio v-model="param.contest_level" :label="1" @change="handleFilter">国家级</el-radio>
              <el-radio v-model="param.contest_level" :label="2" @change="handleFilter">省部级</el-radio>
              <el-radio v-model="param.contest_level" :label="3" @change="handleFilter">校级</el-radio>
            </el-form-item>
            <el-form-item label="审核状态" prop="role" class="filter-check">
              <el-radio v-model="param.state" :label="3" @change="handleFilter">审核中</el-radio>
              <el-radio v-model="param.state" :label="2" @change="handleFilter">未通过</el-radio>
            </el-form-item>
          </div>
        </div>
        <div class="handle-container">
          <!-- 一些按钮 -->
          <el-button class="handle-button" type="primary" @click="handleShowContest">
            显示全部
          </el-button>
        </div>
      </div>

      <!--弹出框-->
      <el-dialog :title="formTitle" v-model="dialogFormVisible" width="30%">
        <!--普通表单-->
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="80px">
          <el-form-item label="驳回原因" prop="reject_reason">
            <el-input v-model="form.reject_reason"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="handleReject">确 定</el-button>
        </div>
      </el-dialog>

      <el-table
          class="table"
          ref="multipleTable"
          :data="tableData"
          border
          height="435px"
          style="width: 100vw"
          @selection-change="handleSelectionChange"
      >
        <el-table-column label="待审核竞赛表">
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
              prop="contest_state"
              label="报名状态"
              show-overflow-tooltip>
            <template #default="{ row }">
              <el-tag v-if="row.contest_state === 1" type="success" size="small">可报名</el-tag>
              <el-tag v-else type="info" size="small">不可报名</el-tag>
            </template>
          </el-table-column>
          <el-table-column
              prop="reject_reason"
              label="驳回原因"
              show-overflow-tooltip>
          </el-table-column>
<!--          <el-table-column-->
<!--              prop="contest_state"-->
<!--              label="报名"-->
<!--              show-overflow-tooltip-->
<!--              v-if="store.getters.roles.includes('student')">-->
<!--            <template #default="{ row }">-->
<!--              <el-button v-if="row.contest_state === 1" @click="handleEnroll(row)" type="success" size="small">点击报名</el-button>-->
<!--              <el-button v-else type="info" size="small" disabled>不可报名</el-button>-->
<!--            </template>-->
<!--          </el-table-column>-->
          <el-table-column fixed="right" label="操作" width="150" type="index">
            <template #default="{ row, $index}">
              <el-button @click="handlePass(row, $index)" type="primary" size="small">通过</el-button>
              <el-button @click="writeRejectReason(row, $index)" type="danger" size="small">驳回</el-button>
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
</template>

<script setup>
import {
  getContest,
  processPassContest,
  processRejectContest,
  updateContest,
  getContestCount,
  viewTeacherContest,
  updateTeacherContest, getDepartmentContest, getContestType, processRecoverContest
} from '@/api/contest'
import {computed, onMounted, reactive, ref, watch} from "vue"
import {router} from "@/router"
import { ElMessageBox, ElMessage ,ElTable} from 'element-plus';
import store from "@/store";

const multipleTable = ref();
const multipleSelection = ref([])

const handleSelectionChange = (selection) => {
  multipleSelection.value = selection
  console.log(multipleSelection.value)
}

const value = ref('');
const defaultTime = new Date(2000, 1, 1, 12, 0, 0);

// 表格数据
const tableData = ref([])
// 记录总数
const recordTotal = ref()
// 查询参数
const param = reactive( {
  page_number: 1,
  page_size: 10,
  contest: '',
  type: '',
  start_time: '',
  end_time: '',
  school: "",
  college: "",
  name: "",
  state: -1,
  year: "",
  is_group: 2,
  contest_level:-1,
})

const delete_index = ref()
const dialogFormVisible = ref(false)


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
  state: 3
})


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
  })
}


const activeName = ref('first');

// 使用 watch 监听 contestID prop 的变化
watch(() => activeName.value, (newActiveName, oldActiveName) => {
  handleFilter(newActiveName);
});

const year = ref(new Date().getFullYear())

// 搜索
const handleFilter = (newActiveName) => {
  param.page_number = 1
  if(newActiveName === "first") {
    param.is_group = 2
  } else if(newActiveName === "second") {
    param.is_group = 1
  }
  if(item.value) {
    param.type = item.value[0]
  }
  console.log("asd:")
  getDepartmentContest(param).then(resp => {
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

const checkDetail = (row) => {
  router.push(`processContestDetail/${row.id}`)
}

// 分页大小改变监听
const handleSizeChange = (curSize) => {
  param.page_size = curSize
  viewTeacherContest(param).then(resp => {
    console.log('分页数据获取成功',resp)
    tableData.value = resp.data.list
    recordTotal.value = resp.data.total
  })
}

// 点击分页监听方法
const handleCurrentChange = async (curPage) => {
  param.page_number = curPage
  await viewTeacherContest(param).then(resp => {
    console.log('分页数据获取成功',resp)
    tableData.value = resp.data.list
    recordTotal.value = resp.data.total
  })
}

const handleShowContest = async () => {
  param.page_number = 1
  param.state = 3
  param.year = year.value
  item.value = ""
  param.type = ""
  param.contest_level = -1
  param.contest = ""
  getDepartmentContest(param).then(resp => {
    console.log(resp)
    if(resp.code === 200) {
      tableData.value = resp.data.list
      recordTotal.value = resp.data.total
    }
  })
}

const handlePass = (row, index) => {
  form.state = 1
  form.id = row.id
  processPassContest(form).then(resp => {
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
}

const handleReject = () => {
  processRejectContest(form).then(resp => {
    if(resp.code === 200) {
      ElMessage({
        type: 'success',
        message: '更新成功',
      })//
      dialogFormVisible.value = false
      tableData.value.splice(delete_index.value, 1)
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
}

const writeRejectReason = (row, index) => {
  form.state = 2
  form.id = row.id
  delete_index.value = index
  dialogFormVisible.value = true
}

const cancel = () => {
  form.state = -1
  form.id = 0
  delete_index.value = 0
  dialogFormVisible.value = false
}

const item = ref()
const options = ref([])
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