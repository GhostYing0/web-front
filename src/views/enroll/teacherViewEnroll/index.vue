<template>
    <div class="app-container">
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
    </div>
    <div class="handle-container">
      <el-button class="handle-button" type="primary" @click="handleShowContest">
        显示全部
      </el-button>
    </div>

  <!--弹出框-->
  <el-dialog :title="formTitle" v-model="dialogFormVisible" width="30%">
    <!--普通表单-->
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="80px">
      <el-form-item label="竞赛名称" prop="name">
        <el-input v-model="form.contest" disabled></el-input>
      </el-form-item>
      <el-form-item label="成绩">
        <el-input v-model="form.grade" />
      </el-form-item>
      <el-form-item label="证明材料">
        <el-upload
            ref="uploadRef"
            class="upload-demo"
            drag
            action="http://localhost:9006/api/public/v1/upload"
            :on-change="handleChange"
            :limit="1"
            :on-exceed="handleChange"
            :auto-upload="false"
            name="file"
        >
          <el-icon class="esl-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              jpg/png files with a size less than 500kb
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.ps" type="textarea" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
            <el-button @click="handleClearForm">取 消</el-button>
            <el-button type="primary" @click="handleCreate">提交</el-button>
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
  <!--    <el-table-column-->
  <!--        fixed-->
  <!--        type="selection"-->
  <!--        width="55">-->
  <!--    </el-table-column>-->
      <el-table-column label="报名信息表">
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
          prop="semester"
          label="入学年份"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="student_class"
          label="班级"
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
            label="上传成绩"
            show-overflow-tooltip>
          <template #default="{ row }">
            <el-button  type="success" size="small" v-if="row.do_upload === true" @click="openUploadGrade(row)">上传</el-button>
            <el-button  type="info" size="small" v-else plain disabled>不可上传</el-button>
          </template>
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
<!--      <el-table-column fixed="right" label="操作" width="150" type="index">-->
<!--&lt;!&ndash;        <template #default="{ row, $index}">&ndash;&gt;-->
<!--&lt;!&ndash;          <el-button @click="handleRecover(row, $index)" type="primary" size="small">重新审核</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;        </template>&ndash;&gt;-->
<!--            <template #default="{ row, $index}">-->
<!--              <el-button @click="handleRecover(row, $index)" type="primary" size="small">重新审核</el-button>-->
<!--            </template>-->
<!--      </el-table-column>-->
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
    teacherSearchEnroll,
    processRecoverEnroll
  } from '@/api/enroll'

  import {
    cancelContest,
    getContestType
  } from '@/api/contest'
  
  import {computed, onMounted, reactive, ref} from "vue"
  import { ElMessageBox, ElMessage ,ElTable} from 'element-plus';
  import store from "@/store";
  import axios from "axios";
  import {getToken} from "@/utils/auth";
  import {uploadGrade} from "@/api/grade";
  
  const multipleTable = ref();
  const multipleSelection = ref([])
  
  const handleSelectionChange = (selection) => {
    multipleSelection.value = selection
    console.log(multipleSelection.value)
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

  const dialogFormVisible = ref(false)

  const formPic = reactive({
    file: '',
  })

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
            message: '未搜索到该用户',
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
    param.page_number = 1
    param.state = 1
    param.type = ""
    item.value = ""
    teacherSearchEnroll(param).then(resp => {
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
          console.log(options)
        })
      } catch (error) {
        console.error(error)
      }
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