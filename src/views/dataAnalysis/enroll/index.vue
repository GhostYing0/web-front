import { onMounted } from 'vue';
<template>
  <div class="basic-chart-table">
    <div class="basic-chart-table-item">
      <div class="chart-title">
        最近五年总报名数
      </div>
      <div
          class="basic-chart-table-chart"
          ref="totalEnrollChart"
          id="totalEnrollChart"
          :style="{ width: '500px', height: '350px' }"
      ></div>
    </div>
    <div class="basic-chart-table-item">
      <div class="chart-title">
        最近五年各类竞赛报名总览
      </div>
      <div
          class="basic-chart-table-chart"
          ref="perTypeEnrollChart"
          id="perTypeEnrollChart"
          :style="{ width: '500px', height: '350px' }"
      ></div>
    </div>
    <div class="basic-chart-table-item">
      <div class="title-item">
        <div class="chart-title">
          最近五年各类竞赛报名单年查看
        </div>
        <el-form-item class="form-item" prop="school" label="年份" label-width="80px" style="width:180px">
        <div class="m-4">
          <el-cascader
              v-model="item_year"
              :options="yearOptions"
              :props="props"
              filterable
              @change="handleYear"
          />
        </div>
       </el-form-item>
    </div>
      <div
          class="basic-chart-table-chart"
          ref="prevEnrollTypeChart"
          id="prevEnrollTypeChart"
          :style="{ width: '500px', height: '350px' }"
      ></div>
    </div>
    <div class="basic-chart-table-item">
      <div class="chart-title">
        各类竞赛报名数与往年对比[(今年-往年)/往年]
      </div>
      <div
          class="basic-chart-table-chart"
          ref="compareEnrollChart"
          id="compareEnrollChart"
          :style="{ width: '500px', height: '350px' }"
      ></div>
    </div>

  </div>

</template>

<script setup>
import {onMounted, ref, reactive} from "vue"
import {preTypeEnrollCountOfPerYear, totalEnrollCountOfPerYear, compareEnrollCount} from "@/api/analysis"
import * as echarts from 'echarts';

const yearOptions = ref([])
const item_year = ref()

const handleYear = () => {
  initPrevEnrollTypeChart(item_year.value[0])
}

const perTypeEnrollChart = ref()
const perTypeEnrollChartDate_Year = ref([])
const perTypeEnrollChartDate_Type = ref([])
const perTypeEnrollChartDate_EnrollCount = reactive({})

const totalEnrollChart = ref()
const totalEnrollChart_Year = ref([])
const totalEnrollChart_EnrollCount = ref([])

const prevEnrollTypeChart = ref()
const prevTypeEnrollData = reactive({})

const compareEnrollData = reactive({})
const compareEnrollChart = ref()
const compareEnrollType = ref()
const compareEnrollChartData = reactive([])

const initCompareEnrollChartData = () => {
  compareEnrollCount().then(resp => {
    let data = resp.data.enroll_compare
    for(const key in data) {
      compareEnrollChartData.push({value: data[key], label: key})
    }
    compareEnrollType.value = perTypeEnrollChartDate_Type.value
    compareEnrollType.value.push("总和")
    initCompareEnrollChart()
  }).catch(error => {
    console.error(error)
  })
}
const initCompareEnrollChart = () => {
  const Chart = echarts.init(compareEnrollChart.value);
  const labelRight = {
    position: 'left'
  };
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      top: 80,
      bottom: 30
    },
    xAxis: {
      type: 'category',
      axisLine: { show: false },
      axisLabel: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      data: compareEnrollType.value
    },
    yAxis: {
      type: 'value',
      position: 'top',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [
      {
        name: '增长比率',
        type: 'bar',
        stack: 'Total',
        label: {
          show: true,
          formatter: '{b}'
        },
        data: compareEnrollChartData
      }
    ]
  };
  Chart.setOption(option)
  return Chart
}

const initPrevEnrollTypeChartData = () => {
  preTypeEnrollCountOfPerYear().then(resp => {
    let data = resp.data.contest_type_with_enroll_data
    for (const key in data) {
        prevTypeEnrollData[key] = []
      for (const type in data[key]) {
        prevTypeEnrollData[key].push({value: data[key][type], name: type})
      }
    }
    console.log("====:",prevTypeEnrollData)
    initPrevEnrollTypeChart(item_year.value[0])
  }).catch(error => {
    console.error(error)
  })

}
const initPrevEnrollTypeChart = (year) => {
  const Chart = echarts.init(prevEnrollTypeChart.value);
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: prevTypeEnrollData[year]
      }
    ]
  };
  Chart.setOption(option)
  return Chart
}

const initPerTypeEnrollChartData = () => {
  preTypeEnrollCountOfPerYear().then(resp => {
    let data = resp.data.contest_type_with_enroll_data
    for (const key in data) {
      perTypeEnrollChartDate_Year.value.push(key)
      perTypeEnrollChartDate_EnrollCount[key] =  {}
      for (const type in data[key]) {
        // console.log("ads",type,data[key])
        perTypeEnrollChartDate_EnrollCount[key][type] = perTypeEnrollChartDate_EnrollCount[key][type] || []
        perTypeEnrollChartDate_EnrollCount[key][type].push(data[key][type])
      }
    }
    for(const key in data) {
      for(const type in data[key]) {
          perTypeEnrollChartDate_Type.value.push(type)
      }
      break
    }
    initPerTypeEnrollChart()
  }).catch(error => {
    console.error(error)
  })
}
const initPerTypeEnrollChart = () => {
  const Chart = echarts.init(perTypeEnrollChart.value)
  console.log("ASDSAda",perTypeEnrollChartDate_EnrollCount)
  const series = ref([])
  let typeCount = reactive({})

  perTypeEnrollChartDate_Type.value = []
  for (const key in perTypeEnrollChartDate_EnrollCount) {
    for (const value in perTypeEnrollChartDate_EnrollCount[key]) {
      perTypeEnrollChartDate_Type.value.push(value)
    }
    break
  }

  for (const key in perTypeEnrollChartDate_EnrollCount) {
    for (const value in perTypeEnrollChartDate_EnrollCount[key]) {
      typeCount[value] = typeCount[value] || []
      for (const asd in perTypeEnrollChartDate_EnrollCount[key][value]) {
        //console.log(asd, perTypeEnrollChartDate_EnrollCount[key][value][asd])c
        typeCount[value].push(perTypeEnrollChartDate_EnrollCount[key][value][asd])
      }
    }
  }

  const posList = [
    'left',
    'right',
    'top',
    'bottom',
    'inside',
    'insideTop',
    'insideLeft',
    'insideRight',
    'insideBottom',
    'insideTopLeft',
    'insideTopRight',
    'insideBottomLeft',
    'insideBottomRight'
  ];
  const labelOption = {
    show: true,
    formatter: '{c}  {name|{a}}',
    fontSize: 16,
    rich: {
      name: {}
    }
  };
  perTypeEnrollChartDate_Type.value.forEach((type) => {
    series.value.push({
      name: type,
      type: 'bar',
      barGap: 0,
      label: {
        show: labelOption,
      },
      emphasis: {
        focus: 'series'
      },
    })
  })

  let index = 0
  for (const key in typeCount) {
    series.value[index].data = typeCount[key]
    index++
  }
  console.log("series:", series.value)

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: perTypeEnrollChartDate_Type.value
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: perTypeEnrollChartDate_Year.value
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series:series.value
  };

  console.log("done:", option.series.value)
  Chart.setOption(option)
  return Chart
}

const initTotalEnrollChartData = () => {
  totalEnrollCountOfPerYear().then(resp => {
    // console.log(resp)
    let data = resp.data.enroll_data
    for (const key in data) {
      // console.log(key, data[key])
      totalEnrollChart_Year.value.push(key)
      totalEnrollChart_EnrollCount.value.push(data[key])
      yearOptions.value.push({
        value:key,
        label:key
      })
    }
    console.log("item:", item_year.value)
    // console.log(totalEnrollChart_Year)
    // console.log(totalEnrollChart_EnrollCount)
    item_year.value = yearOptions.value[0]
    initTotalEnrollChart()
  }).catch(error => {
    console.error(error)
  })
}
const initTotalEnrollChart = () => {
  const Chart = echarts.init(totalEnrollChart.value);
  let option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: totalEnrollChart_Year.value
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
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: "count",
        data: totalEnrollChart_EnrollCount.value,
        type: 'bar'
      }
    ]
  }
  Chart.setOption(option)
  return Chart
}

onMounted(initTotalEnrollChartData)
onMounted(initPerTypeEnrollChartData)
onMounted(initPrevEnrollTypeChartData)
onMounted(initCompareEnrollChartData)
</script>

<style lang="scss">
.basic-chart-table {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: stretch;
  .basic-chart-table-item {
    flex: 0 0 calc(50% - 10px);
    margin-bottom: 20px;
    background-color: #f5f5f5;
    padding: 10px;
    box-sizing: border-box;
    .basic-chart-table-chart {
      margin: auto auto;
    }
    .title-item {
      display: flex;
      flex-direction: row;
      .form-item {
        float: left;
        margin-right: 25px;
      }
      .chart-title {
        margin-left: 70px;
        margin-right: auto;
      }
    }
  }
}
</style>