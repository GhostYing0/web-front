<template>
    <div class="app-container">
      <div class="filter-container" style="margin-bottom: 15px">
            <!-- 用户名输入 -->
          <div class="filter">
            <div class="input-container">
              <el-input v-model="param.contest" placeholder="竞赛名称" class="filter-item" @keyup.enter="handleFilter" />
              <el-input v-model="param.contest_type" placeholder="类型"  class="filter-item" @keyup.enter="handleFilter" />
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
                <el-button class="filter-button" type="primary"  @click="handleFilter">
                  搜索
                </el-button>
              </div>
            </div>
            <el-form-item label="审核状态" prop="role" class="filter-check">
              <el-radio v-model="param.state" :label="-1" @change="handleFilter">全部</el-radio>
              <el-radio v-model="param.state" :label="1" @change="handleFilter">通过</el-radio>
              <el-radio v-model="param.state" :label="3" @change="handleFilter">审核中</el-radio>
              <el-radio v-model="param.state" :label="2" @change="handleFilter">未通过</el-radio>
            </el-form-item>
          </div>
        </div>
      <div class="handle-container">
        <!-- 一些按钮 -->
        <el-button class="handle-button" type="primary"  @click="handleShowALL">
          显示全部
        </el-button>
        <el-button class="handle-button" type="primary" @click="handleCreate">
          添加竞赛信息
        </el-button>
        <el-button class="handle-delete-button"  type="danger"  @click="handleDeleteSome">
          批量删除
        </el-button>
      </div>
    </div>

    <!--弹出框-->
    <el-dialog :title="formTitle" v-model="dialogFormVisible" width="30%">
        <!--普通表单-->
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="80px">
            <el-form-item label="竞赛名称" prop="name">
                <el-input v-model="form.contest"></el-input>
            </el-form-item>
            <el-form-item label="竞赛类型" prop="type">
                <el-input v-model="form.contest_type"></el-input>
            </el-form-item>
            <el-form-item label="开赛时间" prop="create_time">
                <!--<el-input v-model="form.create_time"></el-input>-->
                <div class="block">
                    <span class="demonstration"></span>
                    <el-date-picker
                            v-model="form.start_time"
                            type="datetime"
                            placeholder="Select date and time"
                            :shortcuts="shortcuts"
                    />
                </div>
            </el-form-item>
            <el-form-item label="报名截止时间" prop="create_time">
              <!--<el-input v-model="form.create_time"></el-input>-->
              <div class="block">
                <span class="demonstration"></span>
                <el-date-picker
                    v-model="form.deadline"
                    type="datetime"
                    placeholder="Select date and time"
                    :shortcuts="shortcuts"
                />
              </div>
            </el-form-item>
            <el-form-item label="上传者用户名" prop="username">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="审核状态" prop="state">
                <el-radio v-model="form.state" :label="3">审核中</el-radio>
                <el-radio v-model="form.state" :label="1">通过</el-radio>
                <el-radio v-model="form.state" :label="2">未通过</el-radio>
            </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
    </el-dialog>

    <el-table
            ref="multipleTable"
            :data="tableData"
            border
            class="table"
            height="435px"
            @selection-change="handleSelectionChange"
    >
      <el-table-column
      label="竞赛信息管理界面">
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
                prop="state"
                label="审核状态"
                show-overflow-tooltip>
            <template #default="{ row }">
                <el-tag v-if="row.state === 3" type="primary">审核中</el-tag>
                <el-tag v-else-if="row.state === 1" type="success">通过</el-tag>
                <el-tag v-else-if="row.state === 4" type="warning">被撤回</el-tag>
                <el-tooltip
                    class="box-item"
                    effect="dark"
                    :content="row.reject_reason"
                    placement="top-start"
                ><el-tag v-if="row.state === 2" type="danger">未通过</el-tag>
                </el-tooltip>
            </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150" type="index">
            <template #default="{ row, $index }">
                <el-button @click="handleUpdate(row)" type="primary" size="small">编辑</el-button>
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
    import {getContest, addContest, deleteContest, updateContest, getContestCount} from '@/api/contest'
    import {computed, ref} from "vue"
    import { ElMessageBox, ElMessage ,ElTable} from 'element-plus';

    export default {
        //创建后
        setup() {
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

            const value = ref('');
            const defaultTime = new Date(2000, 1, 1, 12, 0, 0);

            return {
                value,
               time_range,
                defaultTime,

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
                    contest: '',
                    type: '',
                    start_time: '',
                    end_time: '',
                    school: "",
                    college: "",
                    name: "",
                    state: -1
                },


                // 对话框表单显示
                dialogFormVisible: false,
                // 表单类型（添加数据:0,修改数据:1）

                form: {
                    id: -1,
                    username:"",
                    contest: '',
                    type: '',
                    create_time: '',
                    deadline: '',
                    school: "",
                    college: "",
                    name: "",
                    state: -1
                },

                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入用户密码', trigger: 'blur' }
                    ]
                },

            };
        },
        created() {
            return this.handleShowContest()
        },
        methods: {
          handleTime() {
            // form.start_time = time_range.value[0]
            this.param.end_time = this.time_range[1]
            this.param.start_time = this.time_range[0]
          },
            // 搜索
            handleFilter() {
                this.param.page_number = 1
                console.log("asd:",this.param)
                getContest(this.param).then(resp => {
                    console.log(resp)
                    if(resp.code === 200) {
                        this.tableData = resp.data.list
                        this.recordTotal = resp.data.total
                        if(resp.data.total === 0){
                            ElMessage({
                                type: 'info',
                                message: '未搜索到竞赛信息',
                            })//
                        }
                    }
                })
            },

            submitForm() {
                if (this.formType === 0) {  // 添加记录
                    console.log("addUser:", this.form)
                    addContest(this.form).then(resp => {
                        console.log("addUser:", resp)
                        if(resp.code === 200) {
                            this.$message.success('添加记录成功')
                            // 跳转到末尾
                            getContestCount().then(resp => {
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
                    updateContest(this.form).then(resp => {
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
                getContest(this.param).then(resp => {
                    console.log('分页数据获取成功',resp)
                    this.tableData = resp.data.list
                    this.recordTotal = resp.data.total
                })
            },

            // 点击分页监听方法
            handleCurrentChange(curPage) {
                this.param.page_number = curPage
                getContest(this.param).then(resp => {
                    console.log('分页数据获取成功',resp)
                    this.tableData = resp.data.list
                    this.recordTotal = resp.data.total
                })
            },

            handleShowContest() {
                this.param.page_number = 1
                getContest(this.param).then(resp => {
                    console.log(resp)
                    if(resp.code === 200) {
                        this.tableData = resp.data.list
                        this.recordTotal = resp.data.total
                    }
                })
            },

            handleShowALL() {
                this.param = {
                    page_number: 1,
                    page_size: 10,
                    id: '',
                    contest: '',
                    contest_type: '',
                    start_time: '',
                    deadline: '',
                    school: "",
                    college: "",
                    name: "",
                    state: -1
                }
                this.time_range[0] = ''
                this.time_range[1] = ''
                getContest(this.param).then(resp => {
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
                    id: '',
                     username:"",
                    contest: '',
                    contest_type: '',
                    start_time: '',
                    deadline: '',
                    school: "",
                    college: "",
                    name: "",
                    state: -1
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
                    contest: row.contest,
                    type: row.contest_type,
                    start_time: row.start_time,
                    deadline: row.deadline,
                    // school: row.school,
                    // college: row.college,
                    name: row.name,
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
                    deleteContest(param).then(resp => {
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

                    deleteContest(param).then(resp => {
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
</style>