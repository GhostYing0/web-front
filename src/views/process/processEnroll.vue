<template>
    <div class="app-container">
        <div class="filter-container" style="margin-bottom: 15px">
            <!-- 用户名输入 -->
            <el-input v-model="param.username" placeholder="用户名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
            <el-input v-model="param.team_id" placeholder="队伍" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
            <el-input v-model="param.contest_name" placeholder="竞赛名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
            <div class="block">
                <span class="demonstration"></span>
                <el-date-picker
                        v-model="param.start_time"
                        type="datetime"
                        placeholder="起始时间"
                        :shortcuts="shortcuts"
                />
            </div>
            <div class="block">
                <span class="demonstration"></span>
                <el-date-picker
                        v-model="param.end_time"
                        type="datetime"
                        placeholder="末尾时间"
                        :shortcuts="shortcuts"
                />
            </div>
            <el-input v-model="param.school" placeholder="学校" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
            <el-input v-model="param.phone" placeholder="电话号码" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
            <el-input v-model="param.email" placeholder="邮箱" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
            <el-form-item label="审核状态" prop="role">
                <el-radio v-model="param.state" :label="-1" @change="handleFilter">全部</el-radio>
                <el-radio v-model="param.state" :label="1" @change="handleFilter">通过</el-radio>
                <el-radio v-model="param.state" :label="3" @change="handleFilter">审核中</el-radio>
                <el-radio v-model="param.state" :label="2" @change="handleFilter">未通过</el-radio>
            </el-form-item>
            <br><br>
            <!-- 一些按钮 -->
            <el-button v-waves class="filter-item" type="primary" style="font-size: 20px;" icon="el-icon-a-042" @click="handleFilter">
                搜索
            </el-button>
            <el-button v-waves class="filter-item" type="primary" style="font-size: 20px;" icon="el-icon-a-041" @click="handleShowALL">
                显示全部
            </el-button>
        </div>
    </div>

    用户管理界面
    <el-table
            ref="multipleTable"
            :data="tableData"
            border
            style="width: 100%"
            height="435px"
            @selection-change="handleSelectionChange"
    >
        <el-table-column
                fixed
                type="selection"
                width="55">
        </el-table-column>
        <el-table-column
                fixed
                prop="id"
                label="序号"
                width="55">
        </el-table-column>
        <el-table-column
                prop="username"
                label="用户名称"
                show-overflow-tooltip>
        </el-table-column>
        <el-table-column
                prop="user_id"
                label="用户ID"
                width="55"
                show-overflow-tooltip>
        </el-table-column>
        <el-table-column
                prop="team_id"
                label="队伍ID"
                width="55"
                show-tooltip>
        </el-table-column>
        <el-table-column
                prop="contest"
                label="竞赛"
                show-overflow-tooltip>
        </el-table-column>
        <el-table-column
                prop="create_time"
                label="报名时间"
                show-overflow-tooltip>
        </el-table-column>
        <el-table-column
                prop="school"
                label="学校"
                show-overflow-tooltip>
        </el-table-column>
        <el-table-column
                prop="phone"
                label="电话号码"
                show-overflow-tooltip>
        </el-table-column>
        <el-table-column
                prop="email"
                label="邮箱"
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
            <template #default="{ row, $index }">
                <el-button @click="handleUpdate(row)" type="primary" size="small">通过</el-button>
                <el-button @click="handleDelete(row, $index)" type="danger" size="small">驳回</el-button>
            </template>
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
    import {getUserEnroll, getEnrollCount} from '@/api/enroll'
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
                    username: '',
                    team_id: '',
                    contest_name: '',
                    start_time: '',
                    end_time: '',
                    school: '',
                    phone: '',
                    email: '',
                    state: -1
                },


                // 对话框表单显示
                dialogFormVisible: false,
                // 表单类型（添加数据:0,修改数据:1）
                formType: 0,

                form: {
                    id: -1,
                    username: '',
                    team_id: '',
                    contest_name: '',
                    create_time: '',
                    school: '',
                    phone: '',
                    email: '',
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
            return this.handleShowUser()
        },
        methods: {
            // 搜索
            handleFilter() {
                this.param.page_number = 1
                console.log("asd:",this.param)
                getUserEnroll(this.param).then(resp => {
                    console.log(resp)
                    if(resp.code === 200) {
                        this.tableData = resp.data.list
                        this.recordTotal = resp.data.total
                        if(resp.data.total === 0){
                            ElMessage({
                                type: 'info',
                                message: '未搜索到报名信息',
                            })//
                        }
                    }
                })
            },

            submitForm() {
                if (this.formType === 0) {  // 添加记录
                    console.log("addUser:", this.form)
                    addEnroll(this.form).then(resp => {
                        console.log("addUser:", resp)
                        if(resp.code === 200) {
                            this.$message.success('添加记录成功')
                            // 跳转到末尾
                            getEnrollCount().then(resp => {
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
                    updateEnroll(this.form).then(resp => {
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
                getUserEnroll(this.param).then(resp => {
                    console.log('分页数据获取成功',resp)
                    this.tableData = resp.data.list
                    this.recordTotal = resp.data.total
                })
            },

            // 点击分页监听方法
            handleCurrentChange(curPage) {
                this.param.page_number = curPage
                getUserEnroll(this.param).then(resp => {
                    console.log('分页数据获取成功',resp)
                    this.tableData = resp.data.list
                    this.recordTotal = resp.data.total
                })
            },

            handleShowUser() {
                this.param.page_number = 1
                getUserEnroll(this.param).then(resp => {
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
                    contest_name: '',
                    start_time: '',
                    end_time:'',
                    school: '',
                    phone: '',
                    email: '',
                    state: -1
                }
                getUserEnroll(this.param).then(resp => {
                    console.log(resp)
                    if(resp.code === 200) {
                        this.tableData = resp.data.list
                        this.recordTotal = resp.data.total
                    }
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