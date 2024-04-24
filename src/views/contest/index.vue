<template>
  <div class="filter-container" style="margin-bottom: 15px">
    <div class="filter">
      <div class="input-container">
    <p>竞赛类型</p>
    <el-cascader
        class="filter-item"
        v-model="item"
        :options="options"
        :props="props"
        filterable
        @change="handleFilter"
    />
        <el-input v-model="param.contest" placeholder="竞赛名称" class="filter-item" @keyup.enter="handleFilter" />
        <div class="filter-button-container">
        <el-button class="filter-button" type="primary"  @click="handleFilter">
          搜索
        </el-button>
        </div>
  </div>
    </div>
  </div>
  <div class="handle-container">
  <!-- 一些按钮 -->
  <el-button class="handle-button" type="primary" @click="handleShowALL">
    显示全部
  </el-button>
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
    <el-table-column label="竞赛列表">
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
    <el-table-column
        prop="desc"
        label="竞赛简介"
        show-overflow-tooltip>
    </el-table-column>
    <el-table-column
        prop="contest_state"
        label="报名"
        show-overflow-tooltip
        v-if="store.getters.roles.includes('student')">
        <template #default="{ row }">
          <el-button v-if="row.contest_state === 1 && row.state === 1" @click="copyTextToClipboard(row)" type="success" size="small">点击报名</el-button>
          <el-button v-else type="info" size="small" disabled>不可报名</el-button>

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

<script setup>
import { ref , reactive, onMounted} from 'vue'
import {viewContest, getContestType} from "@/api/contest";
import {ElMessage} from "element-plus";
import {router} from "@/router"
import store from "@/store";

const props = {
  expandTrigger: 'hover',
}

const param = reactive({
  page_number: 1,
  page_size: 10,
  contest: "",
  type: "",
  state: -1,
})

const item = ref()

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
}

const handleFilter = () => {
  param.page_number = 1
  param.type = item.value[0]
  viewContest(param).then(resp => {
    console.log(resp)
    if(resp.code === 200) {
      tableData.value = resp.data.list
      recordTotal.value = resp.data.total
      if(resp.data.total === 0){
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
  viewContest(param).then(resp => {
      console.log('分页数据获取成功',resp)
      tableData.value = resp.data.list
      recordTotal.value = resp.data.total
    })
  }

// 点击分页监听方法
const handleCurrentChange = async (curPage) => {
  param.page_number = curPage
  await viewContest(param).then(resp => {
    console.log('分页数据获取成功', resp)
    if(resp.code === 200){
      tableData.value = resp.data.list
      recordTotal.value = resp.data.total
    }
  })
}

const handleShowContest = async () => {
  param.page_number = 1
  viewContest(param).then(resp => {
    console.log(resp)
    if(resp.code === 200) {
      tableData.value = resp.data.list
      recordTotal.value = resp.data.total
    }
  })
}

const handleShowALL = () => {
  param.page_number= 1
  param.page_size=10
  param.contest=''
  param.type=''
  item.value = ""

  viewContest(param).then(resp => {
    console.log(resp)
    if(resp.code === 200) {
      tableData.value = resp.data.list
      recordTotal.value = resp.data.total
    }
  })
}

const handleShowMyContest = () => {
  param.page_number= 1
  param.page_size=10
  param.contest=''
  param.type=''
  param.state= -1
  item.value = ""

  viewContest(param).then(resp => {
    console.log(resp)
    if(resp.code === 200) {
      tableData.value = resp.data.list
      recordTotal.value = resp.data.total
    }
  })
}

const copyTextToClipboard = async (row) => {  
      try {  
        const textToCopy = '这是要复制的文本';  
        await navigator.clipboard.writeText(row.contest);  
        alert('文本已复制到剪贴板！');  
      } catch (err) {  
        console.error('无法复制文本: ', err);  
        alert('复制文本时出错，请检查浏览器权限。');  
      }  
    };  

onMounted(initOptions)
onMounted(handleShowContest)
</script>

<style scoped>

</style>