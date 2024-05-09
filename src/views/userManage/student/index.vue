<template>
    <div class="app-container">
        <div class="filter-container" style="margin-bottom: 15px">
            <!-- 用户名输入 -->
          <div class="filter">
            <div class="input-container">
            <el-input v-model="param.searchUser" placeholder="用户名" style="width: 200px;" class="filter-item" @keyup.enter="handleFilter" />
            <el-input v-model="param.name" placeholder="姓名" style="width: 200px;" class="filter-item" @keyup.enter="handleFilter" />
            <el-input v-model="param.class" placeholder="班级" style="width: 200px;" class="filter-item" @keyup.enter="handleFilter" />
            </div>
            <div class="input-container">
            <el-input v-model="param.school" placeholder="学校" style="width: 200px;" class="filter-item" @keyup.enter="handleFilter" />
            <el-input v-model="param.college" placeholder="学院" style="width: 200px;" class="filter-item" @keyup.enter="handleFilter" />
            <el-input v-model="param.semester" placeholder="入学年份" style="width: 200px;" class="filter-item" @keyup.enter="handleFilter" />
              <div class="filter-button-container">
                <el-button class="filter-button" type="primary"  @click="handleFilter">
                  搜索
                </el-button>
              </div>
            </div>
            <el-form-item label="性别" prop="gender" class="filter-check">
              <el-radio v-model="param.gender" :label="''" @change="handleFilter">全部</el-radio>
              <el-radio v-model="param.gender" :label="'男'" @change="handleFilter">男</el-radio>
              <el-radio v-model="param.gender" :label="'女'" @change="handleFilter">女</el-radio>
            </el-form-item>
          </div>
        </div>
      <div class="handle-container">
        <!-- 一些按钮 -->
        <el-button  class="handle-button" type="primary"  @click="handleShowUser()">
          显示全部
        </el-button>
        <el-button class="handle-button"  type="primary"  @click="handleCreate">
          添加用户
        </el-button>
        <el-button class="handle-delete-button"  type="danger" @click="handleDeleteSome">
          批量删除
        </el-button>
      </div>
    </div>

    <!--弹出框-->
    <el-dialog :title="formTitle" v-model="dialogFormVisible" width="30%">
        <!--普通表单-->
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="80px">

            <el-form-item label="用户名称" prop="username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="用户密码" prop="password" v-if="formType === 0">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
          <el-form-item label="重置密码" prop="password" v-if="formType === 1">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio v-model="form.gender" :label="'男'">男</el-radio>
            <el-radio v-model="form.gender" :label="'女'">女</el-radio>
          </el-form-item>
          <el-form-item label="学校" prop="school">
            <el-input v-model="form.school"></el-input>
          </el-form-item>
          <el-form-item label="入学年份" prop="semester">
            <el-input v-model="form.semester"></el-input>
          </el-form-item>
          <el-form-item label="学院" prop="college">
            <el-input v-model="form.college"></el-input>
          </el-form-item>
          <el-form-item label="班级" prop="class">
            <el-input v-model="form.class"></el-input>
          </el-form-item>
        </el-form>

        <template v-slot:footer>
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
            @selection-change="handleSelectionChange"
            border
            height="435px"
        >
      <el-table-column label="学生用户管理界面">
        <el-table-column
                fixed
                type="selection"
                width="55">
        </el-table-column>
        <el-table-column
                fixed
                prop="id"
                label="序号">
        </el-table-column>
      <el-table-column
          prop="name"
          label="姓名"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="gender"
          label="性别"
          show-overflow-tooltip>
      </el-table-column>
        <el-table-column
                prop="username"
                label="用户名称"
                show-overflow-tooltip>
        </el-table-column>
      <el-table-column
          prop="student_id"
          label="学生id"
          show-overflow-tooltip>
      </el-table-column>
        <el-table-column
                prop="password"
                label="用户密码"
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
          prop="class"
          label="班级"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="semester"
          label="入学年份"
          show-overflow-tooltip>
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
    import {getStudent, addStudent, deleteStudent, updateStudent,getStudentCount} from '@/api/user'
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

            return {
                formType,
                formTitle,
                multipleTable,
                multipleSelection,
                handleSelectionChange,
            };
        },
        data() {
            return {
                // 表格数据
                tableData: [],
                // 记录总数
                recordTotal: 0,
                // 查询参数
                param: {
                    page_number: 1,
                    page_size: 10,
                    searchUser: null,
                    name:"",
                    gender: "",
                    class: "",
                    school: "",
                    college: "",
                    semester: ""
                },


                // 对话框表单显示
                dialogFormVisible: false,
                // 表单类型（添加数据:0,修改数据:1）

                form: {
                  id: '',
                  username: '',
                  password: '',
                  role: 1,
                  name: "",
                  gender: "",
                  school: "",
                  semester: "",
                  college: "",
                  class: ""
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
                getStudent(this.param).then(resp => {
                    console.log(resp)
                    if(resp.code === 200) {
                        this.tableData = resp.data.list
                        this.recordTotal = resp.data.total
                        if(resp.data.total === 0){
                            ElMessage({
                                type: 'info',
                                message: '为搜索到用户信息',
                            })//
                        }
                    }
                })
            },

            submitForm() {
                if (this.formType === 0) {  // 添加记录
                    console.log("addUser:", this.form)
                    addStudent(this.form).then(resp => {
                        console.log("addUser:", resp)
                        if(resp.code === 200) {
                            this.$message.success('添加记录成功')
                            // 跳转到末尾
                            getStudentCount().then(resp => {
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
                    updateStudent(this.form).then(resp => {
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
                getStudent(this.param).then(resp => {
                    console.log('分页数据获取成功',resp)
                    this.tableData = resp.data.list
                    this.recordTotal = resp.data.total
                })
            },

            // 点击分页监听方法
            handleCurrentChange(curPage) {
                this.param.page_number = curPage
                getStudent(this.param).then(resp => {
                    console.log('分页数据获取成功',resp)
                    this.tableData = resp.data.list
                    this.recordTotal = resp.data.total
                })
            },

            handleShowUser() {
                this.param = {
                  page_number: 1,
                  page_size: 10,
                  searchUser: null,
                  name:"",
                  gender: "",
                  class: "",
                  school: "",
                  college: "",
                  semester: ""
                }
                getStudent(this.param).then(resp => {
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
                    username: '',
                    password: '',
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
                  password: "",
                  name: row.name,
                  gender: row.gender,
                  school: row.school,
                  semester: row.semester,
                  college: row.college,
                  class: row.class
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
                    deleteStudent(param).then(resp => {
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

                    deleteStudent(param).then(resp => {
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

</style>