<template>
  <div class="filter-container" style="margin-bottom: 15px">
    <div class="filter">
      <div class="input-container">
        <el-cascader
            class="filter-item"
            v-model="item"
            :options="options"
            :props="props"
            placeholder="竞赛类型"
            filterable
            @change="handleFilter"
        />
        <el-cascader
            class="filter-item"
            v-model="item_contest"
            :options="contestOptions"
            :props="props"
            placeholder="竞赛名称"
            filterable
            @change="handleFilter"
        />
<!--        <el-input v-model="param.contest" placeholder="竞赛名称" class="filter-item" @keyup.enter="handleFilter" />-->
        <div class="filter-button-container">
          <el-button class="filter-button" type="primary" @click="handleFilter">
            搜索
          </el-button>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div class="handle-container">
      <el-button class="handle-button" type="primary" @click="handleShowMyContest">
        显示全部
      </el-button>
    </div>
  </div>
  <el-table
      class="table"
      ref="multipleTable"
      :data="tableData"
      border
      style="width: 100%"
      height="61vh"
      @selection-change="handleSelectionChange"
  >
    <el-table-column label="上传竞赛表">
    <el-table-column
        prop="id"
        label="id"
        show-overflow-tooltip v-if="store.getters.roles.includes('manager')">
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
        prop="contest"
        label="竞赛名称"
        width="100px"
        show-overflow-tooltip>
    </el-table-column>
    <el-table-column
        prop="contest_type"
        label="竞赛类型"
        width="100px"
        show-overflow-tooltip>
    </el-table-column>
    <el-table-column
        sortable
        prop="deadline"
        label="报名截至时间"
        width="200px"
        show-overflow-tooltip>
    </el-table-column>
    <el-table-column
        prop="start_time"
        sortable
        label="开赛时间"
        width="200px"
        show-overflow-tooltip>
    </el-table-column>
    <el-table-column
        prop="contest_state"
        label="竞赛状态"
        width="100px"
        show-overflow-tooltip>
      <template #default="{ row }">
        <el-tag v-if="row.contest_state === 1 && row.state === 1" type="success">可报名</el-tag>
        <el-tag v-else-if="row.contest_state === 2" type="info">不可报名</el-tag>
        <el-tag v-else type="info">不可报名</el-tag>
      </template>
    </el-table-column>
    <el-table-column
        prop="state"
        label="审核状态"
        width="100px"
        show-overflow-tooltip>
      <template #default="{ row }">
        <el-tag v-if="row.state === 3" type="primary">审核中</el-tag>
        <el-tag v-else-if="row.state === 1" type="success">通过</el-tag>
        <el-tag v-else-if="row.state === 2" type="danger">未通过</el-tag>
        <el-tag v-else-if="row.state === 4" type="danger">已撤回</el-tag>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="270px" type="index">
      <template #default="{ row, $index }">
        <el-button v-if="row.state === 3" @click="handleUpdate(row)" type="primary" size="small">编辑</el-button>
        <el-button v-else type="primary" size="small" disabled>编辑</el-button>
        <template v-if="row.state === 1">
        <el-button v-if="row.contest_state === 1" size="small" @click="transformContestState(row)" type="warning">关闭报名</el-button>
        <el-button v-if="row.contest_state === 2" size="small" @click="transformContestState(row)" type="success">打开报名</el-button>
        </template>
        <template v-else>
          <el-button size="small"  type="success" disabled>打开报名</el-button>
        </template>
        <el-button v-if="row.state === 3" @click="handleRevoke(row, $index)" type="danger" size="small">撤销</el-button>
        <el-button v-else  type="danger" size="small" disabled>撤销</el-button>

      </template>
    </el-table-column>
    </el-table-column>
  </el-table>

  <!--弹出框-->
  <el-dialog :title="formTitle" v-model="dialogFormVisible" width="30%">
    <!--普通表单-->
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="80px">
      <el-form-item label="竞赛名称" prop="name">
        <el-input v-model="form.contest"></el-input>
      </el-form-item>
      <el-cascader
          v-model="form_item"
          :options="options"
          :props="props"
          filterable
          @change="handleType"
      />
      <div class="block">
        <el-date-picker
            v-model="time_range"
            type="datetimerange"
            start-placeholder="报名截止时间"
            end-placeholder="开赛时间"
            value-format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="HH:mm"
            @change="handleTime"
        />
      </div>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
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
</template>

<script setup>
import {ref, reactive, onMounted, computed} from 'vue'
import {
  viewTeacherContest,
  getContestType,
  updateTeacherContest,
  addContest,
  getContestCount,
  updateContest, cancelContest
} from "@/api/contest";
import {ElMessage, ElMessageBox} from "element-plus";
import store from "@/store";
import {getContestForTeacher, transformState} from "@/api/contest";


const props = {
  expandTrigger: 'hover',
}

const param = reactive({
  page_number: 1,
  page_size: 10,
  contest: "",
  type: "",
  contest_state: 0,
  state: -1,
})

const form = reactive({
  username: "",
  school: "",
  college: "",
  contest: "",
  contest_type: "",
  state: -1,
  start_time: "",
  contest_state: 0,
  deadline: "",
})

const item = ref()
const item_contest = ref('')
const form_item = ref("")

const time_range = ref()
const tableData = ref([])
const recordTotal = ref(0)

const options = ref([])
const contestOptions = ref([])

const contestType = reactive({})

// 对话框表单显示
const dialogFormVisible = ref(false)

const initOptions = async () => {
  getContestType().then(resp => {
    try {
      resp.data.forEach(unit => {
        console.log(unit.type)
        options.value.push({
          value:unit.type,
          label:unit.type
        })
        contestType[unit.type] = {value: unit.type, label: unit.type, children:[]}
        console.log(options)
      })
    } catch (error) {
      console.error(error)
    }
  })

  getContestForTeacher().then(resp => {
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

const handleFilter = () => {
  param.page_number = 1
  if(item.value) {
    param.type = item.value[0]
  }
  if(item_contest.value[1]) {
    param.contest = item_contest.value[1]
  }
  viewTeacherContest(param).then(resp => {
    console.log(resp)
    if(resp.code === 200) {
      tableData.value = resp.data.list
      recordTotal.value = resp.data.total
      if(resp.data.total === 0){
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
  viewTeacherContest(param).then(resp => {
    console.log(resp)
    if(resp.code === 200) {
      tableData.value = resp.data.list
      recordTotal.value = resp.data.total
    }
  })
}

const formTitle = computed(() => {
  return '修改竞赛信息';
});

const handleShowMyContest = () => {
  param.page_number= 1
  param.page_size=10
  param.contest=''
  param.type=''
  param.state= -1
  item.value = ""
  item_contest.value = ""

  viewTeacherContest(param).then(resp => {
    console.log(resp)
    if(resp.code === 200) {
      tableData.value = resp.data.list
      recordTotal.value = resp.data.total
    }
  })
}

const handleType = () => {
  form.type = form_item.value[0]
}

const handleTime = () => {
  // form.start_time = time_range.value[0]
  form.deadline = time_range.value[0]
  form.start_time = time_range.value[1]
}

const handleRevoke = (row) => {
  form.id = row.id
  cancelContest(form).then(resp => {
    if(resp.code === 200) {
      ElMessage({
        type: 'success',
        message: '更新成功',
      })//
      handleCurrentChange(param.page_number)
    } else {
      ElMessage({
        type: 'error',
        message: '更新失败',
      })//
    }
    dialogFormVisible.value = false  // 关闭对话框
  })
}

// 点击修改竞赛信息
const handleUpdate = (row) => {
  // 表单是添加状态
  console.log("handleUpdate")
  // 将空数据置入form
  form.id= row.id
  // form.contest=  row.contest
  // form_item.value = row.contest_type
  // form.type = form_item.value
  // time_range.value = [row.deadline,row.start_time]
  // form.start_time=  row.start_time
  // form.deadline=  row.deadline
  // 显示表单框
  dialogFormVisible.value = true
  console.log("dialogFormVisible", dialogFormVisible)
}

const submitForm = () => {
    console.log("update:",form)
    updateTeacherContest(form).then(resp => {
      if(resp.code === 200) {
        ElMessage({
          type: 'success',
          message: '更新成功',
        })//
        handleCurrentChange(param.page_number)
      } else {
        ElMessage({
          type: 'error',
          message: '更新失败',
        })//
      }
      dialogFormVisible.value = false  // 关闭对话框
    })
}

const transformContestState = (row) => {
  form.id = row.id
  if(row.contest_state === 1) {
    form.contest_state = 2
  } else {
    form.contest_state = 1
  }
  if(form.contest_state === 2) {
    //ElMessageBox.confirm('确定关闭该竞赛报名?').then(() => {
         ElMessageBox({
           message:'确定关闭该竞赛报名?',
           confirmButtonText: '确定',
           cancelButtonText: '取消',
         }).then(() => {
      transformState(form).then(resp => {
        if (resp.code === 200) {
          handleCurrentChange(param.page_number)
        }
      }).catch(error => {
        console.error(error)
      })
    }).catch(() => {
      console.log("取消")
    })
  } else {
    ElMessageBox.confirm('确定开启该竞赛报名?').then(() => {
      transformState(form).then(resp => {
        if (resp.code === 200) {
          console.log("asdasd")
          handleCurrentChange(param.page_number)
        }
      }).catch(error => {
        console.error(error)
      })
    }).catch(() => {
      console.log("取消")
    })
  }
}

onMounted(initOptions)
onMounted(handleShowContest)
</script>

<style scoped>

</style>