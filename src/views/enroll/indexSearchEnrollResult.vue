<template>
    <div class="app-container">
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
          </div>
        </div>
      <div class="handle-container">
      <!-- 一些按钮 -->
        <el-button class="handle-button" type="primary" @click="handleShowALL">
          显示全部
        </el-button>
      </div>
    </div>

  <el-table
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
        prop="create_time"
        label="报名时间"
        show-overflow-tooltip>
    </el-table-column>
    <el-table-column
        prop="state"
        label="审核状态"
        show-overflow-tooltip>
      <template #default="{ row }">
        <el-tag v-if="row.state === 3" type="primary">审核中</el-tag>
        <el-tag v-else-if="row.state === 4" type="warning">被撤回</el-tag>
        <el-tag v-else-if="row.state === 1" type="success">通过</el-tag>
        <el-tag v-else-if="row.state === 2" type="danger">未通过</el-tag>
      </template>
    </el-table-column>
    <el-table-column
        label="上传成绩"
        show-overflow-tooltip>
      <template #default="{ row }">
        <el-button  type="success" size="small" v-if="row.do_upload === true">上传</el-button>
        <el-button  type="info" size="small" v-else plain disabled>不可上传</el-button>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="150" type="index">
      <template #default="{ row }">
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
</template>

<script>
    import {getUserEnroll, revokeEnroll} from '@/api/enroll'
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
                form : {
                  state: ""
                },
                // 查询参数
                param: {
                    page_number: 1,
                    page_size: 10,
                    username: '',
                    team_id: '',
                    contest_name: '',
                    start_time: '',
                    end_time: '',
                    state: -1
                },


                // 对话框表单显示
                dialogFormVisible: false,
                // 表单类型（添加数据:0,修改数据:1）

            };
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
            handleFilter() {
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
                    state: -1
                }
                this.time_range[0] = ''
                this.time_range[1] = ''
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