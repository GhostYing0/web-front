<template>
    <div class="app-container">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="单人赛" name="first">
          <div class="filter-container" style="margin-bottom: 15px">
            <!-- 用户名输入 -->
            <div class="filter">
              <div class="input-container">
                <el-input v-model="param.contest_name" placeholder="竞赛名称" class="filter-item" @keyup.enter="handleFilter" />
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
                </div>            </div>
              <el-form-item label="审核状态" prop="role" class="filter-check">
                <el-radio v-model="param.state" :label="-1" @change="handleFilter">全部</el-radio>
                <el-radio v-model="param.state" :label="1" @change="handleFilter">通过</el-radio>
                <el-radio v-model="param.state" :label="3" @change="handleFilter">审核中</el-radio>
                <el-radio v-model="param.state" :label="2" @change="handleFilter">未通过</el-radio>
              </el-form-item>
              <el-form-item label="竞赛级别" prop="role" class="filter-check">
                <el-radio v-model="param.contest_level" :label="-1" @change="handleFilter">全部</el-radio>
                <el-radio v-model="param.contest_level" :label="1" @change="handleFilter">国家级</el-radio>
                <el-radio v-model="param.contest_level" :label="2" @change="handleFilter">省部级</el-radio>
                <el-radio v-model="param.contest_level" :label="3" @change="handleFilter">校级</el-radio>
              </el-form-item>
            </div>
          </div>
          <div class="handle-container">
            <!-- 一些按钮 -->
            <el-button class="handle-button" type="primary" @click="handleShowALL">
              显示全部
            </el-button>
            <el-text>将光标悬停在未通过标签上查看驳回原因</el-text>

          </div>
          <el-table
              height="54vh"
              class="table"
              ref="multipleTable"
              :data="tableData"
              border=true
              style="width: 100%"
              @selection-change="handleSelectionChange"
          >
            <el-table-column label="我的报名">
              <el-table-column
                  prop="contest"
                  label="竞赛"
                  show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                  prop="start_time"
                  label="开赛时间"
                  show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                  prop="create_time"
                  label="报名时间"
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
                  <el-tag v-else-if="row.state === 4" type="warning">被撤回</el-tag>
                </template>
              </el-table-column>
              <!--    <el-table-column-->
              <!--        label="上传成绩"-->
              <!--        show-overflow-tooltip>-->
              <!--      <template #default="{ row }">-->
              <!--        <el-button  type="success" size="small" v-if="row.do_upload === true" @click="openUploadGrade(row)">上传</el-button>-->
              <!--        <el-button  type="info" size="small" v-else plain disabled>不可上传</el-button>-->
              <!--      </template>-->
              <!--    </el-table-column>-->
              <el-table-column fixed="right" label="操作" width="300" type="index">
                <template #default="{ row }">
                  <el-button @click="CheckDetail(row)" type="success" size="small" >查看详情</el-button>
                  <el-button @click="DoUpdate(row)" type="primary" size="small" v-if="row.state !== 1" >编辑</el-button>
                  <el-button  type="primary" size="small" v-if="row.state === 1" plain disabled>编辑</el-button>
                  <el-button @click="handleCancel(row)" type="warning" size="small" v-if="row.state !== 3" plain disabled>撤回</el-button>
                  <el-button @click="handleCancel(row)" type="warning" size="small" v-if="row.state === 3">撤回</el-button>
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
            <!-- 用户名输入 -->
            <div class="filter">
              <div class="input-container">
                <el-input v-model="param.contest_name" placeholder="竞赛名称" class="filter-item" @keyup.enter="handleFilter" />
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
                </div>            </div>
              <el-form-item label="审核状态" prop="role" class="filter-check">
                <el-radio v-model="param.state" :label="-1" @change="handleFilter">全部</el-radio>
                <el-radio v-model="param.state" :label="1" @change="handleFilter">通过</el-radio>
                <el-radio v-model="param.state" :label="3" @change="handleFilter">审核中</el-radio>
                <el-radio v-model="param.state" :label="2" @change="handleFilter">未通过</el-radio>
              </el-form-item>
              <el-form-item label="竞赛级别" prop="role" class="filter-check">
                <el-radio v-model="param.contest_level" :label="-1" @change="handleFilter">全部</el-radio>
                <el-radio v-model="param.contest_level" :label="1" @change="handleFilter">国家级</el-radio>
                <el-radio v-model="param.contest_level" :label="2" @change="handleFilter">省部级</el-radio>
                <el-radio v-model="param.contest_level" :label="3" @change="handleFilter">校级</el-radio>
              </el-form-item>
            </div>
          </div>
          <div class="handle-container">
            <!-- 一些按钮 -->
            <el-button class="handle-button" type="primary" @click="handleShowALL">
              显示全部
            </el-button>
            <el-text>将光标悬停在未通过标签上查看驳回原因</el-text>

          </div>
          <el-table
              height="54vh"
              class="table"
              ref="multipleTable"
              :data="tableData"
              border=true
              style="width: 100%"
              @selection-change="handleSelectionChange"
          >
            <el-table-column label="我的报名">
              <el-table-column
                  prop="contest"
                  label="竞赛"
                  show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                  prop="start_time"
                  label="开赛时间"
                  show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                  prop="create_time"
                  label="报名时间"
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
                  <el-tag v-else-if="row.state === 4" type="warning">被撤回</el-tag>
                </template>
              </el-table-column>
              <!--    <el-table-column-->
              <!--        label="上传成绩"-->
              <!--        show-overflow-tooltip>-->
              <!--      <template #default="{ row }">-->
              <!--        <el-button  type="success" size="small" v-if="row.do_upload === true" @click="openUploadGrade(row)">上传</el-button>-->
              <!--        <el-button  type="info" size="small" v-else plain disabled>不可上传</el-button>-->
              <!--      </template>-->
              <!--    </el-table-column>-->
              <el-table-column fixed="right" label="操作" width="300" type="index">
                <template #default="{ row }">
                  <el-button @click="CheckDetail(row)" type="success" size="small" >查看详情</el-button>
                  <el-button @click="DoUpdate(row)" type="primary" size="small" v-if="row.state !== 1" >编辑</el-button>
                  <el-button  type="primary" size="small" v-if="row.state === 1" plain disabled>编辑</el-button>
                  <el-button @click="handleCancel(row)" type="warning" size="small" v-if="row.state !== 3" plain disabled>撤回</el-button>
                  <el-button @click="handleCancel(row)" type="warning" size="small" v-if="row.state === 3">撤回</el-button>
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

<!--  &lt;!&ndash;弹出框&ndash;&gt;-->
<!--  <el-dialog :title="formTitle" v-model="dialogFormVisible" width="30%">-->
<!--    &lt;!&ndash;普通表单&ndash;&gt;-->
<!--    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="80px">-->
<!--      <el-form-item label="竞赛名称" prop="name">-->
<!--        <el-input v-model="form.contest" disabled></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="成绩">-->
<!--        <el-input v-model="form.grade" />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="证明材料">-->
<!--        <el-upload-->
<!--            ref="uploadRef"-->
<!--            class="upload-demo"-->
<!--            drag-->
<!--            action="http://localhost:9006/api/public/v1/upload"-->
<!--            :on-change="handleChange"-->
<!--            :limit="1"-->
<!--            :on-exceed="handleChange"-->
<!--            :auto-upload="false"-->
<!--            name="file"-->
<!--        >-->
<!--          <el-icon class="esl-icon&#45;&#45;upload"><upload-filled /></el-icon>-->
<!--          <div class="el-upload__text">-->
<!--            Drop file here or <em>click to upload</em>-->
<!--          </div>-->
<!--          <template #tip>-->
<!--            <div class="el-upload__tip">-->
<!--              jpg/png files with a size less than 500kb-->
<!--            </div>-->
<!--          </template>-->
<!--        </el-upload>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="备注">-->
<!--        <el-input v-model="form.ps" type="textarea" />-->
<!--      </el-form-item>-->
<!--    </el-form>-->

<!--    <div slot="footer" class="dialog-footer">-->
<!--      <el-button @click="handleClearForm">取 消</el-button>-->
<!--      <el-button type="primary" @click="handleCreate">提交</el-button>-->
<!--    </div>-->
<!--  </el-dialog>-->
</template>

<script>
    import {getUserEnroll, revokeEnroll} from '@/api/enroll'
    import {computed, reactive, ref, watch} from "vue"
    import { ElMessageBox, ElMessage ,ElTable} from 'element-plus';
    import {uploadGrade} from "@/api/grade";
    import { getToken } from '@/utils/auth'
    import axios from "axios";
    import store from "@/store";

    export default {
        //创建后
        setup() {
            const activeName = ref('first');

            const formType = ref(0);
            const formTitle = computed(() => {
                console.log("computed")
                return formType.value === 0 ? '添加记录' : '修改记录';
            });

            const time_range = ref([])
            const multipleTable = ref()
            const multipleSelection = ref([])

            const handleSelectionChange = (selection) => {
                multipleSelection.value = selection
                console.log(multipleSelection.value)
            }

           const form = reactive({
                  state: -1,
                  contest: "",
                  certificate: "",
                  grade: "",
                  ps: "",
            })

            const value = ref('');
            const defaultTime = new Date(2000, 1, 1, 12, 0, 0);

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

          const dialogFormVisible = ref(false)

            return {
              activeName,
                value,
                form,
                time_range,
                defaultTime,
              handleClearForm,
                handleCreate,
                handleChange,
              dialogFormVisible,

                formType,
                formTitle,
                multipleTable,
                multipleSelection,
                handleSelectionChange,
            };
        },
        data() {
            return {
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
                param: {
                    page_number: 1,
                    page_size: 10,
                    username: '',
                    team_id: '',
                    contest_name: '',
                    start_time: '',
                    end_time: '',
                    state: -1,
                    contest_level: -1,
                },


                // 对话框表单显示
                //dialogFormVisible: false,

            };
        },
        created() {
            return this.handleShowUser()
        },
      watch : {
        // 使用 watch 监听 contestID prop 的变化
        activeName(newActiveName, oldActiveName) {
          this.handleFilter(newActiveName);
        }
        },
        methods: {

            openUploadGrade(row) {
              this.form.contest = row.contest
              this.dialogFormVisible = true
            },

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
                console.log("asda:",this.param.contest_name)
                console.log("asda:",this.param.state)
                getUserEnroll(this.param).then(resp => {
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
            },

            // 分页大小改变监听
            handleSizeChange(curSize) {
                this.param.page_size = curSize
                getUserEnroll(this.param).then(resp => {
                    console.log('分页数据获取成功', resp)
                    this.tableData = resp.data.list
                    this.recordTotal = resp.data.total
                })
            },

            // 点击分页监听方法
            handleCurrentChange(curPage) {
                this.param.page_number = curPage
                getUserEnroll(this.param).then(resp => {
                    console.log('分页数据获取成功', resp)
                    this.tableData = resp.data.list
                    this.recordTotal = resp.data.total
                })
            },

            handleShowUser() {
                this.param.page_number = 1
                getUserEnroll(this.param).then(resp => {
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
                    contest_name: '',
                    start_time: '',
                    end_time: '',
                    school: '',
                    phone: '',
                    email: '',
                    state: -1,
                    contest_level: -1,
                }
                if (this.time_range) {
                  this.time_range[0] = ''
                  this.time_range[1] = ''
                }
                getUserEnroll(this.param).then(resp => {
                    console.log(resp)
                    if (resp.code === 200) {
                        this.tableData = resp.data.list
                        this.recordTotal = resp.data.total
                    }
                })
            },
          handleCancel(row) {
            this.form.state = 1
            this.form.id = row.id
            console.log( row.id)
            revokeEnroll(this.form).then(resp => {
              if(resp.code === 200) {
                ElMessage({
                  type: 'success',
                  message: '更新成功',
                })//
                this.handleCurrentChange(this.param.page_number)
              }
            })
          },
          CheckDetail(row) {
            this.$router.push(`/studentEnrollDetail/${row.id}`)
          },
          DoUpdate(row) {
            this.$router.push(`/studentEnrollUpdate/${row.id}`)
          },
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