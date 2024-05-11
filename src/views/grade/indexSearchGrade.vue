<template>
    <div class="app-container">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="单人赛" name="first">
          <div class="filter-container" style="margin-bottom: 15px">
              <!-- 用户名输入 -->
            <div class="filter">
              <div class="input-container">
              <el-input v-model="param.contest" placeholder="竞赛名称" class="filter-item" @keyup.enter="handleFilter" />
<!--              <el-input v-model="param.grade" placeholder="成绩" class="filter-item" @keyup.enter="handleFilter" />-->
              <el-date-picker
                  class="block"
                  v-model="time_range"
                  type="datetimerange"
                  start-placeholder="报名截止时间"
                  end-placeholder="开赛时间"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  date-format="YYYY/MM/DD ddd"
                  time-format="HH:mm"
                  @change="handleTime"
              />
                <div class="filter-button-container">
                  <el-button class="filter-button" type="primary" @click="handleFilter">
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
              <el-form-item label="奖项" prop="role" class="filter-check">
                <el-radio v-model="param.grade" :label="-1" @change="handleFilter">全部</el-radio>
                <el-radio v-model="param.grade" :label="1" @change="handleFilter">特等奖</el-radio>
                <el-radio v-model="param.grade" :label="2" @change="handleFilter">一等奖</el-radio>
                <el-radio v-model="param.grade" :label="3" @change="handleFilter">二等奖</el-radio>
                <el-radio v-model="param.grade" :label="4" @change="handleFilter">三等奖</el-radio>
              </el-form-item>
            </div>
          </div>
        <div class="handle-container">
        <!-- 一些按钮 -->
        <el-button class="handle-button" type="primary" @click="handleShowALL">
          显示全部
        </el-button>
        </div>
        </el-tab-pane>
        <el-tab-pane label="组队赛" name="second">
          <div class="filter-container" style="margin-bottom: 15px">
            <!-- 用户名输入 -->
            <div class="filter">
              <div class="input-container">
                <el-input v-model="param.contest" placeholder="竞赛名称" class="filter-item" @keyup.enter="handleFilter" />
<!--                <el-input v-model="param.grade" placeholder="成绩" class="filter-item" @keyup.enter="handleFilter" />-->
                <el-date-picker
                    class="block"
                    v-model="time_range"
                    type="datetimerange"
                    start-placeholder="报名截止时间"
                    end-placeholder="开赛时间"
                    value-format="YYYY-MM-DD HH:mm:ss"
                    date-format="YYYY/MM/DD ddd"
                    time-format="HH:mm"
                    @change="handleTime"
                />
                <div class="filter-button-container">
                  <el-button class="filter-button" type="primary" @click="handleFilter">
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
              <el-form-item label="奖项" prop="role" class="filter-check">
                <el-radio v-model="param.grade" :label="-1" @change="handleFilter">全部</el-radio>
                <el-radio v-model="param.grade" :label="1" @change="handleFilter">特等奖</el-radio>
                <el-radio v-model="param.grade" :label="2" @change="handleFilter">一等奖</el-radio>
                <el-radio v-model="param.grade" :label="3" @change="handleFilter">二等奖</el-radio>
                <el-radio v-model="param.grade" :label="4" @change="handleFilter">三等奖</el-radio>
              </el-form-item>
            </div>
          </div>
          <div class="handle-container">
            <!-- 一些按钮 -->
            <el-button class="handle-button" type="primary" @click="handleShowALL">
              显示全部
            </el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
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
<!--    <el-table-column-->
<!--        fixed-->
<!--        type="selection"-->
<!--        width="55">-->
<!--    </el-table-column>-->
<!--    <el-table-column-->
<!--        fixed-->
<!--        prop="id"-->
<!--        label="序号"-->
<!--        width="55">-->
<!--    </el-table-column>-->
    <el-table-column label="我的成绩">
      <!--<el-table-column type="expand"
                       label="备注"
                       width="70px">
        <template #default="props">
          <div>
            <el-text>{{props.row.ps}}</el-text>
          </div>
        </template>
      </el-table-column>-->
    <el-table-column
        prop="contest"
        label="竞赛"
        show-overflow-tooltip>
    </el-table-column>
      <el-table-column
          prop="contest_type"
          label="竞赛类型"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="contest_level"
          label="竞赛级别"
          show-overflow-tooltip>
      </el-table-column>
    <el-table-column
        prop="reward_time"
        label="获奖时间"
        show-overflow-tooltip>
    </el-table-column>
    <el-table-column
        prop="grade"
        label="成绩"
        show-overflow-tooltip>
    </el-table-column>
    <el-table-column
        prop="certificate"
        label="证书"
        show-overflow-tooltip>
      <!--<div>-->
      <!--<el-image style="width: 100px; height: 100px" :src="form.certificate" :fit="fit" />-->
      <!--</div>-->
      <!--<template #default="{ row }">-->
      <!--<el-button @click="handDown(row.certificate)">查看</el-button>-->
      <!--</template>-->

      <template #default="{row}">
        <el-popover trigger="hover" placement="top">
          <template #reference>
            <el-button type="primary" @click="handDown(row.certificate)">查看</el-button>-->
          </template>
          <el-image :src="row.certificate" fit="contain" />
        </el-popover>
      </template>
    </el-table-column>
    <!--<el-table-column
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
        <el-tag v-else-if="row.state === 4" type="warning">被撤回</el-tag>
        <el-tag v-else-if="row.state === 1" type="success">通过</el-tag>
      </template>
    </el-table-column>-->
<!--    <el-table-column fixed="right" label="操作" width="150" type="index">-->
<!--      <template #default="{ row }">-->
<!--        <el-button @click="handleUpdate(row)" type="primary" size="small" v-if="row.state === 3">编辑</el-button>-->
<!--        <el-button @click="handleUpdate(row)" type="primary" size="small" v-if="row.state !== 3" plain disabled>编辑</el-button>-->
<!--        <el-button @click="handleCancel(row)" type="warning" size="small" v-if="row.state !== 3" plain disabled>撤回</el-button>-->
<!--        <el-button @click="handleCancel(row)" type="warning" size="small" v-if="row.state === 3">撤回</el-button>-->
<!--      </template>-->
<!--    </el-table-column>-->
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

  <!--查看图片-->
  <el-dialog v-model="dialogPictureVisible" width="30%">
    <!--普通表单-->
    <div>
      <el-image :src="picture" />
    </div>
  </el-dialog>

  <el-dialog :title="formTitle" v-model="dialogFormVisible" width="30%">
    <el-form-item label="证明材料">
      <el-upload
          ref="uploadRef"
          class="upload-demo"
          drag
          action="http://localhost:9006/api/public/v1/upload"
          :on-change="handleChange"
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
    <el-form-item label="成绩" label-width="80px">
      <el-input v-model="form.grade"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="Submit">提交</el-button>
      <el-button type="info" @click="Cancel">取消</el-button>
    </el-form-item>
  </el-dialog>
</template>

<script>
    import {searchGrade, studentUpdateGrade} from '@/api/grade'
    import {computed, reactive, ref} from "vue"
    import { ElMessageBox, ElMessage ,ElTable} from 'element-plus';
    import {revokeGrade} from "@/api/grade";
    import axios from "axios";
    import {getToken} from "@/utils/auth";
    import store from "@/store";
    import {updateAvatar, updateProfile} from "@/api/user";

    export default {
        //创建后
        setup() {
            const uploadRef = ref(null) // 上传组件的引用，需要是 null，因为组件可能还没有挂载
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

            const formPic = reactive({
              file: '',
            })

            const formType = ref(0);
            const formTitle = computed(() => {
                console.log("computed")
                return "编辑成绩";
            });

          const activeName = ref('first');

          const time_range = ref([])

            const multipleTable = ref()
            const multipleSelection = ref([])

            const handleSelectionChange = (selection) => {
                multipleSelection.value = selection
                console.log(multipleSelection.value)
            }

            const value = ref('');
            const defaultTime = new Date(2000, 1, 1, 12, 0, 0);

            return {
                value,
                time_range,
                defaultTime,
                formPic,
                uploadAxios,
                uploadRef,
               activeName,

                formType,
                formTitle,
                multipleTable,
                multipleSelection,
                handleSelectionChange,
            };
        },
        data() {
            return {
                picture: "",
                dialogPictureVisible : false,
                shortcuts: [
                    {
                        text: 'Today',
                        value: new Date(),
                    },
                    {
                        text: 'Yesterday',
                        value: () => {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            return date;
                        },
                    },
                    {
                        text: 'A week ago',
                        value: () => {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            return date;
                        },
                    }
                ],
                // 表格数据
                tableData: [],
                // 记录总数
                recordTotal: 0,
                // 查询参数
                form : {
                  id: -1,
                  state: -1,
                  grade: "",
                  certificate: ""
                },

                param: {
                    page_number: 1,
                    page_size: 10,
                    username: '',
                    grade: -1,
                    contest: '',
                    start_time: '',
                    end_time: '',
                    state: -1,
                    contest_level: -1,
                    is_group: 2,
                },


                // 对话框表单显示
                dialogFormVisible: false,
                // 表单类型（添加数据:0,修改数据:1）

            };
        },
      watch: {
        // 使用 watch 监听 contestID prop 的变化
        activeName(newActiveName, oldActiveName) {
          this.handleFilter(newActiveName);
        }
      },
        created() {
            return this.handleShowUser()
        },
        methods: {
          handleTime() {
            // form.start_time = time_range.value[0]
            this.param.end_time = this.time_range[1]
            this.param.start_time = this.time_range[0]
          },
            // 搜索
            handleFilter(newActiveName) {
              if(newActiveName === "first") {
                this.param.is_group = 2
              } else if(newActiveName === "second") {
                this.param.is_group = 1
              }
                this.param.page_number = 1
                console.log("asda:",this.param.contest)
                console.log("asda:",this.param.state)
                searchGrade(this.param).then(resp => {
                    console.log(resp)
                    if (resp.code === 200) {
                        this.tableData = resp.data.list
                        this.recordTotal = resp.data.total
                        if (resp.data.total === 0) {
                            ElMessage({
                                type: 'info',
                                message: '未搜索成绩信息',
                            })//
                        }
                    }
                })
            },

            // 分页大小改变监听
            handleSizeChange(curSize) {
                this.param.page_size = curSize
                searchGrade(this.param).then(resp => {
                    console.log('分页数据获取成功', resp)
                    this.tableData = resp.data.list
                    this.recordTotal = resp.data.total
                })
            },

            // 点击分页监听方法
            handleCurrentChange(curPage) {
                this.param.page_number = curPage
                searchGrade(this.param).then(resp => {
                    console.log('分页数据获取成功', resp)
                    this.tableData = resp.data.list
                    this.recordTotal = resp.data.total
                })
            },

            handleShowUser() {
                this.param.page_number = 1
                searchGrade(this.param).then(resp => {
                    console.log(resp)
                    if (resp.code === 200) {
                        this.tableData = resp.data.list
                        this.recordTotal = resp.data.total
                    }
                })
            },

            handleShowALL() {
                this.param = {
                    page_number: 1,
                    page_size: 10,
                    username: '',
                    team_id: '',
                  contest: '',
                    start_time: '',
                    end_time: '',
                    school: '',
                    phone: '',
                    email: '',
                    state: -1,
                  contest_level: -1,
                  grade: -1,
                }
                searchGrade(this.param).then(resp => {
                    console.log(resp)
                    if (resp.code === 200) {
                        this.tableData = resp.data.list
                        this.recordTotal = resp.data.total
                    }
                })
            },
            submitCancel(row) {
              this.form.state = 4
              this.form.id = row.id
              revokeGrade(this.form).then(resp => {
                if(resp.code === 200) {
                  ElMessage({
                    type: 'success',
                    message: '撤回成功',
                  })
                  this.form = {
                    id: -1,
                    state: -1,
                    certificate: "",
                    grade: "",
                  }
                  this.handleCurrentChange(this.param.page_number)
                }
              }).catch(error => {
                console.error(error)
              })
            },
            handleCancel(row) {
              ElMessageBox.confirm(
                  '确定要撤回吗？',
                  'Warning',
                  {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                  }
              ).then(() => {
                this.submitCancel(row)
              })
              .catch(() => {
                ElMessage({
                  type: 'info',
                  message: '取消',
                })
              })
            },
            async Submit() {
              if(store.getters.roles.includes("student") || store.getters.roles.includes("teacher")) {
                  console.log("(((((((^^^^^^^^^^^^^^^^^^^676")
                  this.formPic.file = this.uploadRef
                  //发送请求到后端接口
                  const resp = await this.uploadAxios.post('public/v1/upload', this.formPic)
                  console.log("resp:",resp)
                  if(resp.data.code === 200) {
                    this.form.certificate = resp.data.data.imageurl
                    console.log("asdasd",this.form.certificate)
                  }


                studentUpdateGrade(this.form).then(resp => {
                  if(resp.data.code === 200) {
                    this.route.value.go(0)
                  }
                }).catch(error => {
                  ElMessage({
                    type: 'fail',
                    message: '更新失败',
                  })
                  console.error(error)
                })
              }
              this.handleCurrentChange(this.param.page_number)
              this.dialogFormVisible = false
            },
            Cancel() {
              this.form = {
                id: -1,
                state: -1,
                certificate: "",
                grade: "",
              }
              this.dialogFormVisible = false
            },
            handleUpdate(row) {
              this.form.id = row.id
              this.dialogFormVisible = true
            },

            // 处理文件变化
          handleChange(file) {
              console.log("文件变化：", file);
              this.uploadRef = file
              // 如果这里是要引用某个上传组件的实例，请确保该组件正确传递了引用
              // uploadRef.value = file; // 这一步取决于你的上传组件API，可能需要的是文件对象，而不是组件实例
            },
          handDown(url) {
            // this.downloadPicture(url, "pic")
            this.picture = url
            this.dialogPictureVisible = true
          }
        }
    };
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