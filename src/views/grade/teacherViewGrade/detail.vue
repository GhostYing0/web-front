<template>
  <div class="filter-container" style="margin-bottom: 15px">
    <div class="filter">
      <div class="input-container">
        <el-input v-model="param.name" placeholder="搜索姓名" class="filter-item" @keyup.enter="handleFilter" />
        <el-input v-model="param.major" placeholder="搜索专业" class="filter-item" @keyup.enter="handleFilter" />
        <el-input v-model="param.student_class" placeholder="搜索班级" class="filter-item" @keyup.enter="handleFilter" />
        <div class="filter-button-container">
          <el-button class="filter-button" type="primary"  @click="handleFilter">
            搜索
          </el-button>
        </div>
      </div>
    </div>
  </div>
  <div class="handle-container">
    <el-button class="handle-button" type="primary" @click="handleShowContest">
      显示全部
    </el-button>
    <el-button class="handle-button" type="primary" @click="handleShowContest">
      批量给成绩
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
    <el-table-column label="报名审核表">
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
          width="55"
          show-overflow-tooltip>
      </el-table-column>
      <!--    <el-table-column-->
      <!--        prop="create_time"-->
      <!--        label="创建时间"-->
      <!--        show-overflow-tooltip>-->
      <!--    </el-table-column>-->
      <!--    <el-table-column-->
      <!--        prop="start_time"-->
      <!--        label="开赛时间"-->
      <!--        show-overflow-tooltip>-->
      <!--    </el-table-column>-->
      <!--    <el-table-column-->
      <!--        prop="deadline"-->
      <!--        label="报名截至时间"-->
      <!--        show-overflow-tooltip>-->
      <!--    </el-table-column>-->
      <!--      <el-table-column-->
      <!--          prop="username"-->
      <!--          label="用户名"-->
      <!--          show-overflow-tooltip>-->
      <!--      </el-table-column>-->
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
          prop="student_school_id"
          label="学号"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="major"
          label="专业"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="student_class"
          label="班级"
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
          <el-button @click="handleUploadGrade(row, $index)" type="primary" size="small">上传成绩</el-button>
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
  processRejectEnroll, processRecoverEnroll
} from '@/api/enroll'

import {router} from "@/router"

import {
  teacherSearchEnroll,
} from '@/api/enroll'

import { onMounted, reactive, ref} from "vue"
import { ElMessageBox, ElMessage ,ElTable} from 'element-plus';
import store from "@/store";
import { defineProps, defineEmits, watch} from 'vue'
import {getContestType} from '@/api/contest'


const emit = defineEmits(['sendToParent'])
const props = defineProps({
  contestID: {
    type: Number,
    required: true
  }
})

const activeName = ref('processing');

const handleClick = (tab, event) => {
  console.log(tab, event);
};

// 定义一个函数，该函数将在 contestID prop 变化时执行
const handleContestIDChange = (newContestID) => {
  param.id = newContestID
  handleShowContest()
  // 在这里添加你想要执行的代码
}

const handleActiveNameChange = (newActiveName) => {
  console.log(newActiveName)
  if(newActiveName === "processing") {
    param.state = 3
  } else if(newActiveName === "rejected") {
    param.state = 2
  }
  handleShowContest()

}

// 使用 watch 监听 contestID prop 的变化
watch(() => props.contestID, (newContestID, oldContestID) => {
  handleContestIDChange(newContestID);
});

watch(() => activeName.value, (newActiveName, oldActiveName) => {
  console.log(newActiveName)
  handleActiveNameChange(newActiveName);
});

const multipleTable = ref();
const multipleSelection = ref([])

const handleSelectionChange = (selection) => {
  multipleSelection.value = selection
  console.log(multipleSelection.value)
}

const delete_index = ref()

const route = ref(router)

const item = ref()
const form_item = ref("")
const options = ref([])

const dialogFormVisible = ref(false)

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
  reject_reason: "",
  name: "",
  state: 1,
  student_school_id: "",
  major:"",
  student_class: "",
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
  state: 1
})

// 搜索
const handleFilter = () => {
  param.page_number = 1
  param.type = item.value[0]
  console.log("asd:")
  teacherSearchEnroll(param).then(resp => {
    console.log(resp)
    if (resp.code === 200) {
      tableData.value = resp.data.list
      recordTotal.value = resp.data.total
      if (resp.data.total === 0) {
        ElMessage({
          type: 'info',
          message: '未搜索到报名信息',
        })//
      }
    }
  })
}

// 分页大小改变监听
const handleSizeChange = (curSize) => {
  param.page_size = curSize
  teacherSearchEnroll(param).then(resp => {
    console.log('分页数据获取成功',resp)
    tableData.value = resp.data.list
    recordTotal.value = resp.data.total
  })
}

// 点击分页监听方法
const handleCurrentChange = async (curPage) => {
  param.page_number = curPage
  await teacherSearchEnroll(param).then(resp => {
    console.log('分页数据获取成功',resp)
    tableData.value = resp.data.list
    recordTotal.value = resp.data.total
  })
}

const handleShowContest = async () => {
  console.log("asdasdasdadas:",route.value.currentRoute.params.contest_id)
  param.id = route.value.currentRoute.params.contest_id
  param.page_number = 1
  param.type = ""
  param.major = ""
  param.name = ""
  param.student_class = ""
  item.value = ""
  await teacherSearchEnroll(param).then(resp => {
    console.log(resp)
    if(resp.code === 200) {
      tableData.value = resp.data.list
      recordTotal.value = resp.data.total
    }
  })
}

const cancel = () => {
  form.state = -1
  form.id = 0
  delete_index.value = 0
  dialogFormVisible.value = false
}

const handleUploadGrade = (row) => {
  router.push(`/doUploadGrade/${row.id}`)
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