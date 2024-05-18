<template>
    <div class="app-container">
      <div class="filter-container" style="margin-bottom: 15px">
            <!-- 用户名输入 -->
          <div class="filter">
            <div class="input-container">
              <el-input v-model="param.name" placeholder="姓名" class="filter-item" @keyup.enter="handleFilter" />
              <el-input v-model="param.username" placeholder="用户名"  class="filter-item" @keyup.enter="handleFilter" />
              <el-input v-model="param.contest" placeholder="竞赛名称"  class="filter-item" @keyup.enter="handleFilter" />
              <el-input v-model="param.major" placeholder="专业"  class="filter-item" @keyup.enter="handleFilter" />
                <!--<el-input v-model="param.grade" placeholder="成绩" style="width: 200px;" class="filter-item" @keyup.enter="handleFilter" />-->
              <div>
                <el-date-picker
                    class="block"
                    v-model="time_range"
                    type="datetimerange"
                    start-placeholder="起始获奖时间"
                    end-placeholder="结束时间"
                    value-format="YYYY-MM-DD HH:mm:ss"
                    date-format="YYYY/MM/DD ddd"
                    time-format="HH:mm"
                    @change="handleTime"
                />
              </div>
              <div class="filter-button-container">
                <el-button class="filter-button" type="primary" @click="handleFilter">
                  搜索
                </el-button>
              </div>
              </div>
            <el-form-item label="获奖级别" prop="role" class="filter-check">
              <el-radio v-model="param.prize_id" :label="-1" @change="handleFilter">全部</el-radio>
              <el-radio v-model="param.prize_id" :label="1" @change="handleFilter">特等奖</el-radio>
              <el-radio v-model="param.prize_id" :label="2" @change="handleFilter">一等奖</el-radio>
              <el-radio v-model="param.prize_id" :label="3" @change="handleFilter">二等奖</el-radio>
              <el-radio v-model="param.prize_id" :label="4" @change="handleFilter">三等奖</el-radio>
            </el-form-item>
              <el-form-item label="审核状态" prop="role" class="filter-check">
                <el-radio v-model="param.state" :label="-1" @change="handleFilter">全部</el-radio>
                <el-radio v-model="param.state" :label="1" @change="handleFilter">通过</el-radio>
                <el-radio v-model="param.state" :label="3" @change="handleFilter">审核中</el-radio>
                <el-radio v-model="param.state" :label="2" @change="handleFilter">未通过</el-radio>
              </el-form-item>
          </div>
        </div>
      <div class="handle-container">
        <el-button class="handle-button" type="primary" @click="handleShowALL">
          显示全部
        </el-button>
        <el-button class="handle-button" type="primary" @click="handleCreate">
          添加成绩信息
        </el-button>
        <el-button class="handle-delete-button" type="danger" @click="handleDeleteSome">
          批量删除
        </el-button>
      </div>
    </div>


    <!--查看图片-->
    <el-dialog v-model="dialogPictureVisible" width="30%">
        <!--普通表单-->
            <div>
                <el-image :src="picture" />
            </div>
    </el-dialog>

    <!--弹出框-->
    <el-dialog :title="formTitle" v-model="dialogFormVisible" width="50%">
        <!--普通表单-->
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="获奖学生ID" prop="student_id">
                <el-input v-model="form.student_id"></el-input>
            </el-form-item>
          <el-form-item label="指导教师ID" prop="teacher_id">
            <el-input v-model="form.teacher_id"></el-input>
          </el-form-item>
          <el-form-item label="报名信息ID" prop="enroll_id">
            <el-input v-model="form.enroll_id"></el-input>
          </el-form-item>
          <el-form-item label="获奖等级" prop="state">
            <el-radio v-model="form.grade" :label="1">特等奖</el-radio>
            <el-radio v-model="form.grade" :label="2">一等奖</el-radio>
            <el-radio v-model="form.grade" :label="3">二等奖</el-radio>
            <el-radio v-model="form.grade" :label="4">三等奖</el-radio>
          </el-form-item>
          <el-form-item class="form-item" label="上传证明材料">
            <el-upload
                style="width: 500px; height: 300px"
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
                点击此处上传
              </div>
              <template #tip>
                <div class="el-upload__tip">
                  请导入证明材料图片
                </div>
              </template>
            </el-upload>
          </el-form-item>
            <el-form-item label="获奖时间" prop="reward_time">
                <!--<el-input v-model="form.create_time"></el-input>-->
                <div class="block">
                    <span class="demonstration"></span>
                    <el-date-picker
                            v-model="form.reward_time"
                            type="datetime"
                            placeholder="Select date and time"
                            :shortcuts="shortcuts"
                    />
                </div>
            </el-form-item>
            <el-form-item label="审核状态" prop="state">
                <el-radio v-model="form.state" :label="3">审核中</el-radio>
                <el-radio v-model="form.state" :label="1">通过</el-radio>
                <el-radio v-model="form.state" :label="2">未通过</el-radio>
            </el-form-item>
        </el-form>

        <template #footer>
            <div class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
        </template>
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
      <el-table-column label="成绩管理界面">
        <el-table-column
                fixed
                type="selection"
                width="40">
        </el-table-column>
        <el-table-column
                fixed
                prop="id"
                label="序号"
                width="55">
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
                prop="contest"
                label="竞赛"
                show-overflow-tooltip>
        </el-table-column>
      <el-table-column
          prop="major"
          label="专业"
          show-overflow-tooltip>
      </el-table-column>
        <el-table-column
                prop="reward_time"
                width="170"
                label="获奖时间"
                show-overflow-tooltip>
        </el-table-column>
        <el-table-column
                prop="grade"
                label="获奖级别"
                show-overflow-tooltip>
          <template #default="{row}">
            <p v-if="row.prize_id === 1">特等奖</p>
            <p v-else-if="row.prize_id === 2">一等奖</p>
            <p v-else-if="row.prize_id === 3">二等奖</p>
            <p v-else-if="row.prize_id === 4">三等奖</p>
          </template>
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
                    <el-button type="primary" @click="handDown(row.certificate)" size="small">查看</el-button>-->
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
        <el-table-column fixed="right" label="操作" width="200" type="index">
            <template #default="{ row, $index }">
                <el-button type="success" @click="checkGradeDetail(row.id)" size="small">详情</el-button>
                <el-button type="primary" size="small" @click="UpdateGrade(row)">编辑</el-button>
                <el-button @click="handleDelete(row, $index)" type="danger" size="small">删除</el-button>
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

<script>
    import {getGrade, addGrade, deleteGrade, updateGrade,getGradeCount} from '@/api/grade'
    import {computed, reactive, ref} from "vue"
    import { ElMessageBox, ElMessage ,ElTable} from 'element-plus';
    import {router} from "@/router";
    import axios from "axios";
    import {getToken} from "@/utils/auth";

    export default {
        //创建后
        setup() {
            const formType = ref(0);
            const formTitle = computed(() => {
                console.log("computed")
                return formType.value === 0 ? '添加记录' : '修改记录';
            });

            const uploadRef = ref(null); // 上传组件的引用，需要是 null，因为组件可能还没有挂载
            const time_range = ref([])

            const multipleTable = ref()
            const multipleSelection = ref([])

            const handleSelectionChange = (selection) => {
                multipleSelection.value = selection
                console.log(multipleSelection.value)
            }

            const formPic = reactive({
              file: '',
            })

            const value = ref('');
            const defaultTime = new Date(2000, 1, 1, 12, 0, 0);

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

            return {
                handleChange,
                value,
                time_range,
                defaultTime,
                uploadRef,
                formPic,
                uploadAxios,

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
                    name: '',
                    school: '',
                    contest: '',
                    start_time: '',
                    end_time: '',
                    state: -1,
                    major : "",
                    prize_id : -1,
                },


                // 对话框表单显示
                dialogPictureVisible: false,
                dialogFormVisible: false,
                // 表单类型（添加数据:0,修改数据:1）

                form: {
                    student_id: "",
                    enroll_id: 0,
                    teacher_id: "",
                    id: '',
                    username: '',
                    contest: '',
                    create_time: '',
                    grade: 0,
                    reward_time: "",
                    certificate: '',
                    state: -1
                },

                rules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入用户密码', trigger: 'blur' }
                    ]
                },

            };
        },
        created() {
            return this.handleShowUser()
        },
        methods: {
            UpdateGrade(row) {
              router.push(`/UpdateGrade/${row.id}`)
            },
            handleTime() {
              // form.start_time = time_range.value[0]
              this.param.end_time = this.time_range[1]
              this.param.start_time = this.time_range[0]
            },
            checkGradeDetail(id) {
              router.push(`/gradeDetail/${id}`)
            },
            // 搜索
            handleFilter() {
                this.param.page_number = 1
                console.log("asd:",this.param)
                getGrade(this.param).then(resp => {
                    console.log(resp)
                    if(resp.code === 200) {
                        this.tableData = resp.data.list
                        this.recordTotal = resp.data.total
                        if(resp.data.total === 0){
                            ElMessage({
                                type: 'info',
                                message: '未搜索到成绩信息',
                            })//
                        }
                    }
                })
            },

            async submitForm() {
                if (this.formType === 0) {  // 添加记录
                    if (this.uploadRef.name !== "") {
                      console.log("(((((((^^^^^^^^^^^^^^^^^^^676")
                      console.log(this.uploadRef)
                      this.formPic.file = this.uploadRef
                      //发送请求到后端接口
                      const resp = await this.uploadAxios.post('public/v1/upload', this.formPic)
                      console.log("resp:",resp)
                      if(resp.data.code === 200) {
                        this.form.certificate = resp.data.data.imageurl
                      } else {

                        return
                      }
                    } else{
                      return
                    }
                    console.log("addUser:", this.form)
                   this.form.enroll_id = parseInt(this.form.enroll_id, 10)
                    addGrade(this.form).then(resp => {
                        console.log("addUser:", resp)
                        if(resp.code === 200) {
                            this.$message.success('添加记录成功')
                            // 跳转到末尾
                            getGradeCount().then(resp => {
                                console.log("getCount:", resp)
                                this.recordTotal = resp.data.count
                                this.page_number = Math.ceil(this.recordTotal / this.page_size)
                                console.log(this.page_number)
                                console.log("record:", this.recordTotal)
                                console.log("size:",this.page_size)
                                this.handleCurrentChange(this.page_number)
                            })
                        } else {
                            this.$message.error('添加记录失败')
                        }
                        this.dialogFormVisible = false  // 关闭对话框
                    })
                } else if(this.formType === 1) {  //更新记录
                    console.log("update:",this.form)
                    updateGrade(this.form).then(resp => {
                        if(resp.code === 200) {
                            ElMessage({
                                type: 'success',
                                message: '更新成功',
                            })//
                            this.handleCurrentChange(this.page_number)
                        } else {
                            ElMessage({
                                type: 'error',
                                message: '更新失败',
                            })//
                        }
                        this.dialogFormVisible = false  // 关闭对话框
                    })
                }
            },

            // 分页大小改变监听
            handleSizeChange(curSize) {
                this.param.page_size = curSize
                getGrade(this.param).then(resp => {
                    console.log('分页数据获取成功',resp)
                    this.tableData = resp.data.list
                    this.recordTotal = resp.data.total
                })
            },

            // 点击分页监听方法
            handleCurrentChange(curPage) {
                this.param.page_number = curPage
                getGrade(this.param).then(resp => {
                    console.log('分页数据获取成功',resp)
                    this.tableData = resp.data.list
                    this.recordTotal = resp.data.total
                })
            },

            handleShowUser() {
                this.param.page_number = 1
                getGrade(this.param).then(resp => {
                    console.log(resp)
                    if(resp.code === 200) {
                        this.tableData = resp.data.list
                        this.recordTotal = resp.data.total
                    }
                })
            },

            handleShowALL() {
                this.param= {
                    page_number: 1,
                    page_size: 10,
                    username: '',
                    team_id: '',
                    contest: '',
                    start_time: '',
                    end_time:'',
                    school: '',
                    phone: '',
                    email: '',
                    state: -1,
                    prize: -1,
                    major: "",
                }
                this.time_range[0] = ''
                this.time_range[1] = ''
                getGrade(this.param).then(resp => {
                    console.log(resp)
                    if(resp.code === 200) {
                        this.tableData = resp.data.list
                        this.recordTotal = resp.data.total
                    }
                })
            },

            // 点击添加用户
            handleCreate() {
                // 表单是添加状态
                this.formType = 0
                console.log("handleCreate")
                // 将空数据置入form
                this.form = {
                    enroll_id: 35,
                    student_id: "5a811726-1e28-320c-911f-10fe44b67f62",
                    teacher_id: "4e20355d-bf1a-3728-90c4-c6718a0b441e",
                    username: '',
                    team_id: '',
                    contest: '',
                    create_time: '',
                    school: '',
                    phone: '',
                    email: '',
                    state: ''
                }
                // 显示表单框
                this.dialogFormVisible = true
                console.log("dialogFormVisible",this.dialogFormVisible)
            },

            // 点击添加用户
            handleUpdate(row) {
                // 表单是添加状态
                this.formType = 1
                console.log("handleUpdate")
                // 将空数据置入form
                this.form = {
                    id: row.id,
                    username: row.username,
                    team_id: row.team_id,
                    contest: row.contest,
                    create_time: row.create_time,
                    grade: row.grade,
                    certificate: row.certificate,
                    state: row.state
                }
                // 显示表单框
                this.dialogFormVisible = true
                console.log("dialogFormVisible",this.dialogFormVisible)
            },

            // 删除记录
            handleDelete(row, index) {
                ElMessageBox.confirm('确定要删除这条记录吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const param = {ids:[row.id]};
                    console.log("index:", index)
                    console.log(param)
                    deleteGrade(param).then(resp => {
                        if(resp.code === 200) {
                            ElMessage({
                                type: 'success',
                                message: '删除成功',
                            })//
                            //const index = this.multipleTable.value.findIndex(item => item === row);
                            console.log("index:", index)
                            this.tableData.splice(index, 1)
                            // 如果删完了，获取上一页
                            if(this.tableData.length === 0) {
                                this.page_number = this.handleCurrentChange - 1
                                this.handleCurrentChange(this.page_number)
                            }
                        }
                    })
                }).catch(() => {
                    ElMessage({
                        type: 'error',
                        message: '删除失败',
                    })
                })
            },

            // 删除一些
            handleDeleteSome() {
                ElMessageBox.confirm('确定要删除这些记录吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 获取选中的对象数组
                    const param = {ids:[]};
                    this.multipleSelection.forEach(row => {
                        param.ids.push(row.id)
                    });
                    console.log(param)

                    deleteGrade(param).then(resp => {
                        console.log("deletes:",resp)
                        if(resp.code === 200) {
                            ElMessage({
                                type: 'success',
                                message: '删除成功',
                            })
                            if(this.tableData.length === 0) {  //如果本页内容全部删光了
                                //当前页为上一页
                                if(this.page_number !== 1) {
                                    this.page_number = this.page_number - 1
                                }
                            }
                            // 重载当前页
                            this.handleCurrentChange(this.page_number)
                        } else {
                            ElMessage({
                                type: 'error',
                                message: '删除失败',
                            })
                        }
                    })
                }).catch(() => {
                    ElMessage({
                        type: 'info',
                        message: '取消',
                    })
                })
            },
            // downloadPicture(imgSrc, name) {
            //     const image = new Image();
            //     // 解决跨域 Canvas 污染问题
            //     image.setAttribute("crossOrigin", "anonymous");
            //     image.src = imgSrc;
            //     image.onload = () => {
            //         const canvas = document.createElement("canvas");
            //         canvas.width = image.width;
            //         canvas.height = image.height;
            //         const context = canvas.getContext("2d");
            //         context.drawImage(image, 0, 0, image.width, image.height);
            //         canvas.toBlob((blob) => {
            //             const url = URL.createObjectURL(blob);
            //             const a = document.createElement("a");
            //             a.download = name || "photo";
            //             a.href = url;
            //             a.click();
            //             a.remove();
            //             URL.revokeObjectURL(url);
            //         });
            //     };
            // },
            handDown(url) {
                // this.downloadPicture(url, "pic")
                this.picture = url
                this.dialogPictureVisible = true
            }
        },
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

     /*.custom-popover .el-popover__popper {*/
         /*width: 500px; !* 设置气泡宽度 *!*/
         /*height: 500px; !* 设置气泡高度 *!*/
     /*}*/
</style>