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
              style="width:100%"
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
                  prop="enroll_count"
                  label="报名成功人数"
                  width="95"
                  show-overflow-tooltip>
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
              style="width:100%"
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
                  prop="enroll_count"
                  label="报名成功人数"
                  width="95"
                  show-overflow-tooltip>
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
    processRecoverEnroll
  } from '@/api/enroll'

  import {
    cancelContest, getContestForTeacher,
    getContestType
  } from '@/api/contest'
  
  import {computed, onMounted, reactive, ref, watch} from "vue"
  import { ElMessageBox, ElMessage ,ElTable} from 'element-plus';
  import store from "@/store";
  import axios from "axios";
  import {getToken} from "@/utils/auth";
  import {uploadGrade} from "@/api/grade";
  import {viewTeacherContestEnroll} from "@/api/contest"
  import {router} from "@/router";
  
  const multipleTable = ref();
  const multipleSelection = ref([])
  
  const handleSelectionChange = (selection) => {
    multipleSelection.value = selection
    console.log(multipleSelection.value)
  }


  const year = ref(new Date().getFullYear())

  const contestOptions = reactive([])
  const contest = ref("")
  const handleGetData = () => {
    if(contest.value[1]) {
      param.contest = contest.value[1]
    }
    handleFilter()
  }

  const item = ref()
  const form_item = ref("")
  const options = ref([])
  
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
    is_grade: 2,
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

  const dialogFormVisible = ref(false)

  const formPic = reactive({
    file: '',
  })

  const activeName = ref('first');

  // 使用 watch 监听 contestID prop 的变化
  watch(() => activeName.value, (newActiveName, oldActiveName) => {
    handleFilter(newActiveName);
  });

  const uploadRef = ref(null); // 上传组件的引用，需要是 null，因为组件可能还没有挂载
  // 处理文件变化
  const handleChange = (file) => {
    console.log("文件变化：", file);
    uploadRef.value = file
    // 如果这里是要引用某个上传组件的实例，请确保该组件正确传递了引用
    // uploadRef.value = file; // 这一步取决于你的上传组件API，可能需要的是文件对象，而不是组件实例
  };

  // 创建Axios实例，用于特定的请求配置
  const uploadAxios = axios.create({
    baseURL: "http://localhost:9006/api/",
    timeout: 5000
  })

  // 为这个特定的Axios实例设置请求拦截器
  uploadAxios.interceptors.request.use(config => {
    // 这里可以添加或覆盖头部信息
    config.headers["Content-Type"] = 'multipart/form-data'
    config.headers["BackServer-token"] = getToken()
    return config;
  }, error => {
    return Promise.reject(error);
  });

  const handleClearForm = () => {
    dialogFormVisible.value = false
    form.state = -1;
    form.contest = '';
    form.grade = '';
    form.certificate = '';
    form.ps = '';
    uploadRef.value = null
  }

  // 创建表单
  const handleCreate = async () => {
    // 假设 uploadRef.value 是一个具有 submit 方法的上传组件实例
    //if (uploadRef.value && typeof uploadRef.value.submit === 'function') {
    if (uploadRef.value) {
      console.log("(((((((^^^^^^^^^^^^^^^^^^^676")
      formPic.file = uploadRef.value
      //发送请求到后端接口
      const resp = await uploadAxios.post('public/v1/upload', formPic)
      console.log("resp:",resp)
      if(resp.data.code === 200) {
        form.certificate = resp.data.data.imageurl
      }
    }

    try {
      const resp = await uploadGrade(form);
      console.log("addUser:", resp);
      if (resp.code === 200) {
        ElMessage({
          type: 'success',
          message: '提交成功',
        });
      } else {
        ElMessage({
          type: 'error',
          message: '提交失败',
        });
      }
    } catch (error) {
      ElMessage({
        type: 'error',
        message: '提交失败',
      });
    }
    dialogFormVisible.value = false
    handleClearForm()
  };

  const checkDetail = (row) => {
    router.push(`teacherDisplayEnrollDetail/${row.id}`)
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
    viewTeacherContestEnroll(param).then(resp => {
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
    viewTeacherContestEnroll(param).then(resp => {
      console.log('分页数据获取成功',resp)
      tableData.value = resp.data.list
      recordTotal.value = resp.data.total
    })
  }
  
  // 点击分页监听方法
  const handleCurrentChange = async (curPage) => {
    param.page_number = curPage
    await viewTeacherContestEnroll(param).then(resp => {
      console.log('分页数据获取成功',resp)
      tableData.value = resp.data.list
      recordTotal.value = resp.data.total
    })
  }
  
  const handleShowContest = async () => {
    param.page_number = 1
    param.state = 1
    param.type = ""
    item.value = ""
    contest.value = ""
    param.contest = ""
    param.year = year.value
    param.contest_level = -1
    viewTeacherContestEnroll(param).then(resp => {
      console.log(resp)
      if(resp.code === 200) {
        tableData.value = resp.data.list
        recordTotal.value = resp.data.total
      }
    })
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

  const handleRecover = (row, index) => {
    form.state = 3
    form.id = row.id
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

  const openUploadGrade = (row) => {
    form.contest = row.contest
    form.id = row.id
    dialogFormVisible.value = true
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