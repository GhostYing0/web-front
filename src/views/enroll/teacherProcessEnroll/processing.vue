<template>
    <!--<div class="app-container">
      <div class="filter-container" style="margin-bottom: 15px">
        <div class="filter">
          <div class="input-container">
            <el-cascader
                v-model="item"
                :options="options"
                :props="props"
                filterable
                @change="handleFilter"
            />
          </div>
       </div>
      </div>
    </div>-->
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
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

    <el-tab-pane label="审核中" name="processing">
      <div class="handle-container">
        <el-button class="handle-button" type="primary" @click="handleShowContest">
          显示全部
        </el-button>
        <el-button class="handle-button" type="primary" @click="handlePassSome">
          批量审核通过
        </el-button>
        <el-button class="handle-button" type="primary" @click="returnDesktop()">
          返回
        </el-button>
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
          style="width: 100%"
          @selection-change="handleSelectionChange"
      >
        <el-table-column :label="contestFullName + ' 竞赛审核表'">
          <el-table-column type="selection" width="55" />
          <el-table-column
              fixed
              prop="id"
              label="序号"
              width="55" v-if="store.getters.roles.includes('manager')">
          </el-table-column>
<!--          <el-table-column-->
<!--              prop="contest"-->
<!--              label="竞赛名称"-->
<!--              show-overflow-tooltip>-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--              prop="contest_type"-->
<!--              label="竞赛类型"-->
<!--              width="55"-->
<!--              show-overflow-tooltip>-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--              prop="contest_level"-->
<!--              label="竞赛级别"-->
<!--              width="55"-->
<!--              show-overflow-tooltip>-->
<!--          </el-table-column>-->
          <el-table-column
              prop="name"
              label="姓名"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              prop="college"
              label="所属学院"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              prop="student_class"
              label="班级"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              prop="student_school_id"
              label="学号"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              prop="phone"
              label="电话"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              prop="email"
              label="邮箱"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              prop="team_name"
              label="队伍名"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              prop="teacher_name"
              label="指导教师"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              prop="department"
              label="指导教师系部"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              prop="title"
              label="指导教师职称"
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
    <el-tab-pane label="被驳回" name="rejected">
      <div class="handle-container">
        <el-button class="handle-button" type="primary" @click="handleShowContest">
          显示全部
        </el-button>
        <el-button class="handle-button" type="primary" @click="returnDesktop()">
          返回
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
      <el-table-column :label="contestFullName + ' 竞赛驳回表'">
      <el-table-column
          fixed
          prop="id"
          label="序号"
          width="55" v-if="store.getters.roles.includes('manager')">
      </el-table-column>
<!--      <el-table-column-->
<!--          prop="contest"-->
<!--          label="竞赛名称"-->
<!--          show-overflow-tooltip>-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--          prop="contest_type"-->
<!--          label="竞赛类型"-->
<!--          width="55"-->
<!--          show-overflow-tooltip>-->
<!--      </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="contest_level"-->
<!--            label="竞赛级别"-->
<!--            width="55"-->
<!--            show-overflow-tooltip>-->
<!--        </el-table-column>-->
      <el-table-column
          prop="name"
          label="姓名"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="college"
          label="所属学院"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="student_class"
          label="班级"
          show-overflow-tooltip>
      </el-table-column>
        <el-table-column
            prop="student_school_id"
            label="学号"
            show-overflow-tooltip>
        </el-table-column>
      <el-table-column
          prop="phone"
          label="电话"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="email"
          label="邮箱"
          show-overflow-tooltip>
      </el-table-column>
        <el-table-column
            prop="team_name"
            label="队伍名"
            show-overflow-tooltip>
        </el-table-column>
        <el-table-column
            prop="teacher_name"
            label="指导教师"
            show-overflow-tooltip>
        </el-table-column>
        <el-table-column
            prop="department"
            label="指导教师系部"
            show-overflow-tooltip>
        </el-table-column>
        <el-table-column
            prop="title"
            label="指导教师职称"
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
            prop="reject_reason"
            label="驳回原因"
            show-overflow-tooltip>
        </el-table-column>
      <el-table-column fixed="right" label="操作" width="150" type="index">
        <template #default="{ row, $index}">
          <el-button @click="handleProcess(row, $index)" type="primary" size="small">重新审核</el-button>
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
    processRecoverEnroll,
    processPassEnroll,
    processRejectEnroll, deleteEnroll
  } from '@/api/enroll'

  import {
    departmentManagerSearchEnroll,
    getContestType
  } from '@/api/contest'
  
  import {computed, onMounted, reactive, ref} from "vue"
  import { ElMessageBox, ElMessage ,ElTable} from 'element-plus';
  import store from "@/store";
  import { defineProps, defineEmits, watch} from 'vue'  
  

  const emit = defineEmits(['sendToParent'])
  const props = defineProps({
    contestID: {
      type: Number,
      required: true
    },
    contestName: {
      type: String,
      required: true
    },
    contestType: {
      type: String,
      required: true
    },
    contestLevel: {
      type: String,
      required: true
    },

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


  const contestFullName = ref("")
  // 使用 watch 监听 contestID prop 的变化  
  watch(() => props.contestID, (newContestID, oldContestID) => {  
    handleContestIDChange(newContestID);
    contestFullName.value = props.contestName + " " + props.contestType + " " + props.contestLevel
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
    state: 3
  })
  
  
  const returnDesktop = () => {
    emit('sendToParent',)
  }

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
  
  // 搜索
  const handleFilter = () => {
    param.page_number = 1
    param.type = item.value[0]
    console.log("asd:")
    departmentManagerSearchEnroll(param).then(resp => {
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
    departmentManagerSearchEnroll(param).then(resp => {
      console.log('分页数据获取成功',resp)
      tableData.value = resp.data.list
      recordTotal.value = resp.data.total
    })
  }
  
  // 点击分页监听方法
  const handleCurrentChange = async (curPage) => {
    param.page_number = curPage
    await departmentManagerSearchEnroll(param).then(resp => {
      console.log('分页数据获取成功',resp)
      tableData.value = resp.data.list
      recordTotal.value = resp.data.total
    })
  }
  
  const handleShowContest = async () => {
    param.page_number = 1
    if(activeName.value === "processing") {
      param.state = 3
    } else if (activeName.value === "rejected") {
      param.state = 2
    }
    param.student_class = ""
    param.name = ""
    param.major = ""
    param.type = ""
    item.value = ""
    await departmentManagerSearchEnroll(param).then(resp => {
      console.log(resp)
      if(resp.code === 200) {
        tableData.value = resp.data.list
        recordTotal.value = resp.data.total
      }
    })
  }

  const handlePassSome = () => {
    ElMessageBox.confirm('确定要通过这些报名吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      // 获取选中的对象数组
      const param = {ids:[]};
      multipleSelection.value.forEach(row => {
        param.ids.push(row.id)
      });
      console.log(param)

      processPassEnroll(param).then(resp => {
        console.log("deletes:",resp)
        if(resp.code === 200) {
          ElMessage({
            type: 'success',
            message: '审核成功',
          })
          if(tableData.value.length === 0) {  //如果本页内容全部删光了
            //当前页为上一页
            if(param.page_number !== 1) {
              param.page_number = param.page_number - 1
            }
          }
          // 重载当前页
          handleCurrentChange(param.page_number)
        } else {
          ElMessage({
            type: 'error',
            message: '删除失败',
          })
        }
      })
    }).catch((error) => {
      console.error(error)
      ElMessage({
        type: 'info',
        message: '取消',
      })
    })
  }

  const handlePass = (row, index) => {
    form.state = 1
    const param = {ids:[]}
    param.ids.push(row.id)
    console.log( row.id)
    processPassEnroll(param).then(resp => {
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

  const handleProcess = (row, index) => {
    form.state = 3
    form.id = row.id
    console.log( row.id)
    processRecoverEnroll(form).then(resp => {
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

  const handleReject = () => {
    processRejectEnroll(form).then(resp => {
      if(resp.code === 200) {
        ElMessage({
          type: 'success',
          message: '更新成功',
        })//
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
    dialogFormVisible.value = false
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