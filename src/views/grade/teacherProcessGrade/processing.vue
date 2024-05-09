<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
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
          style="width: 100%"
          height="435px"
          @selection-change="handleSelectionChange"
      >
        <el-table-column label="成绩审核表">
        <el-table-column
            fixed
            prop="id"
            label="序号"
            width="55" v-if="store.getters.roles.includes('manager')">
        </el-table-column>
          <el-table-column
              fixed
              type="selection"
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
              prop="contest_level"
              label="竞赛级别"
              width="55"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              prop="reward_time"
              label="获奖时间"
              width="55"
              show-overflow-tooltip>
          </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            show-overflow-tooltip>
        </el-table-column>
        <el-table-column
            prop="college"
            label="学院"
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
              prop="grade"
              label="奖项等级"
              width="55"
              show-overflow-tooltip>
          </el-table-column>
        <el-table-column
            prop="certificate"
            label="证明材料"
            show-overflow-tooltip>
            <template #default="{row}">
                <el-popover trigger="hover" placement="top">
                    <template #reference>
                        <el-button type="primary" @click="handDown(row.certificate)">查看</el-button>
                    </template>
                    <el-image :src="row.certificate" fit="contain" />
                </el-popover>
            </template>
        </el-table-column>
          <el-table-column
              prop="guidance_teacher_name"
              label="指导教师"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              prop="title"
              label="指导教师职称"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              prop="department"
              label="指导教师系部"
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
            <el-button @click="writeRejectReason(row, $index)" type="danger" size="small">驳回</el-button>
          </template>
        </el-table-column>
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
    <el-tab-pane label="被驳回" name="rejected">    <div class="app-container">
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
        style="width: 100%"
        height="435px"
        @selection-change="handleSelectionChange"
    >
      <!--    <el-table-column-->
      <!--        fixed-->
      <!--        type="selection"-->
      <!--        width="55">-->
      <!--    </el-table-column>-->
      <el-table-column label="成绩驳回表">
      <el-table-column
          fixed
          prop="id"
          label="序号"
          width="55" v-if="store.getters.roles.includes('manager')">
      </el-table-column>
        <el-table-column type="expand"
                         label="备注"
                         width="70px">
          <template #default="props">
            <div>
              <el-text>{{props.row.ps}}</el-text>
            </div>
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
          prop="certificate"
          label="证明材料"
          show-overflow-tooltip>
          <template #default="{row}">
              <el-popover trigger="hover" placement="top">
                  <template #reference>
                      <el-button type="primary" @click="handDown(row.certificate)">查看</el-button>
                  </template>
                  <el-image :src="row.certificate" fit="contain" />
              </el-popover>
          </template>
      </el-table-column>
      <el-table-column
          prop="state"
          label="审核状态"
          show-overflow-tooltip>
        <template #default="{ row }">
          <el-tag v-if="row.state === 3" type="primary">审核中</el-tag>
          <el-tag v-else-if="row.state === 1" type="success">通过</el-tag>
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
            prop="reject_reason"
            label="驳回原因"
            show-overflow-tooltip>
        </el-table-column>
      <el-table-column fixed="right" label="操作" width="150" type="index">
        <template #default="{ row, $index}">
          <el-button @click="handleRecover(row, $index)" type="primary" size="small"> 重新审核</el-button>
        </template>
      </el-table-column>
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
    ></el-pagination></el-tab-pane>
  </el-tabs>
  </template>
  
  <script setup>
  
  import {
    getContestType,
  } from '@/api/contest'

  import {
    processPassGrade,
    processRejectGrade,
    teacherSearchGrade,
    processRecoverGrade, departmentManagerSearchGrade
  } from '@/api/grade'
  
  import {computed, onMounted, reactive, ref, watch} from "vue"
  import { ElMessageBox, ElMessage ,ElTable} from 'element-plus';
  import store from "@/store";
  import {processPassEnroll} from "@/api/enroll";
  
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

  const returnDesktop = () => {
    emit('sendToParent',)
  }

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

  const delete_index = ref()

  const dialogFormVisible = ref(false)

  // 表格数据
  const tableData = ref([])
  // 记录总数
  const recordTotal = ref()
  // 查询参数
  const param = reactive( {
    id: 0,
    page_number: 1,
    page_size: 10,
    contest: '',
    contest_type: '',
    start_time: '',
    end_time: '',
    school: "",
    college: "",
    name: "",
    state: 3
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
    state: 3
  })


  // 搜索
  const handleFilter = () => {
    param.page_number = 1
    param.type = item.value[0]
    console.log("asd:")
    departmentManagerSearchGrade(param).then(resp => {
      console.log(resp)
      if (resp.code === 200) {
        tableData.value = resp.data.list
        recordTotal.value = resp.data.total
        if (resp.data.total === 0) {
          ElMessage({
            type: 'info',
            message: '未搜索到成绩信息',
          })//
        }
      }
    })
  }
  
  // 分页大小改变监听
  const handleSizeChange = (curSize) => {
    param.page_size = curSize
    departmentManagerSearchGrade(param).then(resp => {
      console.log('分页数据获取成功',resp)
      tableData.value = resp.data.list
      recordTotal.value = resp.data.total
    })
  }
  
  // 点击分页监听方法
  const handleCurrentChange = async (curPage) => {
    param.page_number = curPage
    await departmentManagerSearchGrade(param).then(resp => {
      console.log('分页数据获取成功',resp)
      tableData.value = resp.data.list
      recordTotal.value = resp.data.total
    })
  }
  
  const handleShowContest = async () => {
    param.page_number = 1
    if(activeName === "processing") {
      param.state = 3
    } else if (activeName === "rejected") {
      param.state = 2
    }
    param.type = ""
    item.value = ""
    departmentManagerSearchGrade(param).then(resp => {
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
    const param = {ids:[]}
    param.ids.push(row.id)
    console.log( row.id)
    processPassGrade(param).then(resp => {
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
    processRejectGrade(form).then(resp => {
      if(resp.code === 200) {
        ElMessage({
          type: 'success',
          message: '更新成功',
        })//
        tableData.value.splice(delete_index, 1)
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

  const handlePassSome = () => {
    ElMessageBox.confirm('确定要通过这些成绩吗?', '提示', {
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

      processPassGrade(param).then(resp => {
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
  
  const handDown = (url) => {
      picture.value = url
      dialogPictureVisible.value = true
  }

  const writeRejectReason = (row, index) => {
    form.state = 2
    form.id = row.id
    delete_index.value = index
    dialogFormVisible.value = true
  }

  const handleRecover = (row, index) => {
    form.state = 1
    form.id = row.id
    console.log( row.id)
    processRecoverGrade(form).then(resp => {
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

  const cancel = () => {
    form.state = -1
    form.id = 0
    delete_index.value = 0
    dialogFormVisible.value = false
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