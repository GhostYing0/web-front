<template>
  <div class="app-container">
    <div class="filter-container" style="margin-bottom: 15px">
      <!-- 用户名输入 -->
      <div class="filter">
        <div class="input-container">
          <el-input v-model="param.contest" placeholder="竞赛名称" class="filter-item" @keyup.enter="handleFilter" />
          <el-input v-model="param.contest_type" placeholder="类型" class="filter-item" @keyup.enter="handleFilter" />
        </div>
      </div>
    </div>
  </div>

  <el-table
      ref="multipleTable"
      :data="tableData"
      border
      class="table"
      height="435px"
      @selection-change="handleSelectionChange"
  >
    <el-table-column label="待审核竞赛表">
    <el-table-column
        fixed
        type="selection"
        width="55">
    </el-table-column>
      <el-table-column type="expand"
                       label="简介"
                       width="70px">
        <template #default="props">
          <div>
            <el-text>{{props.row.desc}}</el-text>
          </div>
        </template>
      </el-table-column>
    <el-table-column
        fixed
        prop="id"
        label="序号"
        width="55">
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
        prop="create_time"
        label="创建时间"
        show-overflow-tooltip>
    </el-table-column>
    <el-table-column
        prop="start_time"
        label="开赛时间"
        show-overflow-tooltip>
    </el-table-column>
    <el-table-column
        prop="deadline"
        label="报名截至时间"
        show-overflow-tooltip>
    </el-table-column>
    <el-table-column
        prop="username"
        label="用户名"
        show-overflow-tooltip>
    </el-table-column>
    <el-table-column
        prop="name"
        label="姓名"
        show-overflow-tooltip>
    </el-table-column>
    <el-table-column
        prop="school"
        label="学校"
        show-overflow-tooltip>
    </el-table-column>
    <el-table-column
        prop="college"
        label="学院"
        show-overflow-tooltip>
    </el-table-column>
    <el-table-column
        prop="desc"
        label="简介"
        show-overflow-tooltip>
    </el-table-column>
    <el-table-column
        prop="state"
        label="审核状态"
        show-overflow-tooltip>
      <template #default="{ row }">
        <el-tag v-if="row.state === 3" type="primary">审核中</el-tag>
        <el-tag v-else-if="row.state === 1" type="success">通过</el-tag>
        <el-tag v-else-if="row.state === 2" type="danger">未通过</el-tag>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="150" type="index">
      <template #default="{ row, $index}">
        <el-button @click="handlePass(row, $index)" type="primary" size="small">通过</el-button>
        <el-button @click="handleReject(row, $index)" type="danger" size="small">驳回</el-button>
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
</template>

<script setup>
import {
  getContest,
  processPassContest,
  processRejectContest,
  updateContest,
  getContestCount,
  viewTeacherContest,
  updateTeacherContest
} from '@/api/contest'
import {computed, onMounted, reactive, ref} from "vue"
import { ElMessageBox, ElMessage ,ElTable} from 'element-plus';

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
  state: -1
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

// 搜索
const handleFilter = () => {
  param.page_number = 1
  console.log("asd:")
  getContest(param).then(resp => {
    console.log(resp)
    if (resp.code === 200) {
      this.tableData = resp.data.list
      this.recordTotal = resp.data.total
      if (resp.data.total === 0) {
        ElMessage({
          type: 'info',
          message: '未搜索到该用户',
        })//
      }
    }
  })
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
  getContest(param).then(resp => {
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

const handleReject = (row, index) => {
  form.state = 2
  form.id = row.id
  processRejectContest(form).then(resp => {
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