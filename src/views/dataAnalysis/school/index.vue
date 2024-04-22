import { onMounted } from 'vue';
<template>
  <div class="chart-title">
  <div class="title">学校总报名数量前十排行</div>
  <div class="block">
    <span class="demonstration">年份</span>
    <el-date-picker
        v-model="year"
        type="year"
        placeholder="Pick a year"
        @change="initSchoolEnrollCountChartData"
        value-format="YYYY"
        date-format="YYYY"
    />
  </div>
  </div>
  <div class="basic-chart-table-item">
    <div
    ref="schoolEnrollCountChart"
    id="schoolEnrollCountChart"
    :style="{ width: '1050px', height: '560px' }"
  ></div>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue"
import * as echarts from 'echarts';
import {schoolEnrollCount} from "@/api/analysis";

const schoolEnrollCountChart = ref()
const School = ref([])
const EnrollCount = ref([])
const year = ref(new Date().getFullYear())

const param = reactive({
  year: ""
})

const initSchoolEnrollCountChartData = () => {
  console.log("year:", year.value)
  param.year = year.value
  School.value = []
  EnrollCount.value = []
  schoolEnrollCount(param).then(resp => {
    // console.log(resp)
    let data = resp.data.SchoolEnrollData
    data.forEach(element => {
      School.value.push(element.school)
      EnrollCount.value.push(element.enroll_count)
    })
    console.log(School.value)
    console.log(EnrollCount)
    initSchoolEnrollCountChart()
  }).catch(error => {
    console.error(error)
  })
}
const initSchoolEnrollCountChart = () => {
  const Chart = echarts.init(schoolEnrollCountChart.value);
  let option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: School.value,
      axisLabel: {
        formatter: function (value) {
          // 根据需要自定义标签的显示格式
          if(value.length <= 4) {
            return value
          }
          return value.substring(0, 4) + '...'; // 假设只显示前三个字符
        }
      }
    },
    yAxis: {
      type: 'value'
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: "报名人数",
        data: EnrollCount.value,
        type: 'bar'
      }
    ]
  }
  Chart.setOption(option)
  return Chart
}


onMounted(initSchoolEnrollCountChartData)
</script>

<style>
  .chart-title {
    display: flex;
    flex-direction: row;
    .title {
      margin-left: 100px;
    }
    .block {
      margin-left: 100px;
    }
  }
  .basic-chart-table-item {
    flex: 0 0 calc(50% - 10px);
    margin-bottom: 20px;
    background-color: #f5f5f5;
    padding: 10px;
    box-sizing: border-box;
  }
</style>