<template>
  <div class="m-4">
    <p>竞赛类型</p>
    <el-cascader
        v-model="param.type"
        :options="options"
        :props="props"
        filterable
        @change="handleChange"
    />
  </div>
<!--  <el-input v-model="param.contest" placeholder="竞赛名称" style="width: 200px;" class="filter-item" @keyup.enter="handleFilter" />-->
  <el-button v-waves class="filter-item" type="primary" style="font-size: 20px;" icon="el-icon-a-042" @click="handleFilter">
    搜索
  </el-button>
  <el-button v-waves class="filter-item" type="primary" style="font-size: 20px;" icon="el-icon-a-041" @click="handleShowALL">
    显示全部
  </el-button>
  竞赛列表
  <el-table
      ref="multipleTable"
      :data="tableData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
  >
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
        prop="start_time"
        label="开赛时间"
        show-overflow-tooltip>
    </el-table-column>
    <el-table-column
        prop="deadline"
        label="报名截至时间"
        show-overflow-tooltip>
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
      style="margin-top: 15px"
  ></el-pagination>
</template>

<script setup>
import { ref , onMounted} from 'vue'
import {getContest, getContestType} from "@/api/contest";
import {ElMessage} from "element-plus";

const value = ref([])

const props = {
  expandTrigger: 'hover',
}

const handleChange = (value) => {
  console.log(value)
}

const param = ref({
  page_number: 1,
  page_size: 10,
  contest: "",
  type: "",
})

const tableData = ref([])
const recordTotal = ref(0)

const options = ref([])

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

  const handleFilter = () => {
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
            message: '未搜索到该用户',
          })//
        }
      }
    })
  }
}

// 分页大小改变监听
const handleSizeChange = (curSize) => {
    this.param.page_size = curSize
    getContest(this.param).then(resp => {
      console.log('分页数据获取成功',resp)
      this.tableData = resp.data.list
      this.recordTotal = resp.data.total
    })
  }

// 点击分页监听方法
const handleCurrentChange = async (curPage) => {
    param.value.page_size = curPage
    await getContest(this.param).then(resp => {
      console.log('分页数据获取成功',resp)
      this.tableData = resp.data.list
      this.recordTotal = resp.data.total
    })
  }

const handleShowContest = async () => {
  param.value.page_number = 1
  getContest(this.param).then(resp => {
    console.log(resp)
    if(resp.code === 200) {
      this.tableData = resp.data.list
      this.recordTotal = resp.data.total
    }
  })
}

const handleShowALL = () => {
  param.value= {
    page_number: 1,
    page_size: 10,
    contest: '',
    type: '',
  }
  getContest(this.param).then(resp => {
    console.log(resp)
    if(resp.code === 200) {
      this.tableData = resp.data.list
      this.recordTotal = resp.data.total
    }
  })
}

onMounted(initOptions);
</script>

<style scoped>

</style>