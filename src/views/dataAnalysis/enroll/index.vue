import { onMounted } from 'vue';
<template>
  <div class="basic-chart-table">
    <div class="basic-chart-table-item">
      最近五年总报名数
      <div
          class="basic-chart-table-chart"
          ref="totalEnrollChart"
          id="totalEnrollChart"
          :style="{ width: '500px', height: '350px' }"
      ></div>
    </div>
    <div class="basic-chart-table-item">
      今年各类竞赛报名数
      <div
          class="basic-chart-table-chart"
          ref="perTypeEnrollChart"
          id="perTypeEnrollChart"
          :style="{ width: '500px', height: '350px' }"
      ></div>
    </div>
    <div class="basic-chart-table-item">
      往年各类竞赛报名数
      <div
          class="basic-chart-table-chart"
          ref="testChart"
          id="testChart"
          :style="{ width: '500px', height: '350px' }"
      ></div>
    </div>
    <div class="basic-chart-table-item">
      各类竞赛报名数与往年对比
      <div
          class="basic-chart-table-chart"
          ref="testChart"
          id="testChart"
          :style="{ width: '500px', height: '350px' }"
      ></div>
    </div>

  </div>

</template>

<script setup>
import {onMounted, ref, reactive} from "vue"
import {preTypeEnrollCountOfPerYear, totalEnrollCountOfPerYear} from "@/api/analysis"
import * as echarts from 'echarts';



const perTypeEnrollChart = ref()
const perTypeEnrollChartDate_ContestType = ref([])
const perTypeEnrollChartDate_EnrollCount = ref([])

const totalEnrollChart = ref()
const totalEnrollChart_Year = ref([])
const totalEnrollChart_EnrollCount = ref([])

const initPerTypeEnrollChartDate = () => {
  preTypeEnrollCountOfPerYear().then(resp => {
    console.log(resp.data)
    let data = resp.data.contest_type_with_enroll_data
    for (const key in data) {
      console.log(key, data[key])
      perTypeEnrollChartDate_ContestType.value.push(key)
      perTypeEnrollChartDate_EnrollCount.value.push(data[key])
    }
    console.log(perTypeEnrollChartDate_ContestType)
    console.log(perTypeEnrollChartDate_EnrollCount)
  }).catch(error => {
    console.error(error)
  })
  initPerTypeEnrollChart()
}
const initPerTypeEnrollChart = () => {
  const Chart = echarts.init(perTypeEnrollChart.value)
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
  app.configParameters = {
    rotate: {
      min: -90,
      max: 90
    },
    align: {
      options: {
        left: 'left',
        center: 'center',
        right: 'right'
      }
    },
    verticalAlign: {
      options: {
        top: 'top',
        middle: 'middle',
        bottom: 'bottom'
      }
    },
    position: {
      options: posList.reduce(function (map, pos) {
        map[pos] = pos;
        return map;
      }, {})
    },
    distance: {
      min: 0,
      max: 100
    }
  };
  app.config = {
    rotate: 90,
    align: 'left',
    verticalAlign: 'middle',
    position: 'insideBottom',
    distance: 15,
    onChange: function () {
      const labelOption = {
        rotate: app.config.rotate,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        position: app.config.position,
        distance: app.config.distance
      };
      perTypeEnrollChart.value.setOption({
        series: [
          {
            label: labelOption
          },
          {
            label: labelOption
          },
          {
            label: labelOption
          },
          {
            label: labelOption
          }
        ]
      });
    }
  };
  const labelOption = {
    show: false,
  };
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Forest', 'Steppe', 'Desert', 'Wetland']
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar', 'stack'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['2012', '2013', '2014', '2015', '2016']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Forest',
        type: 'bar',
        barGap: 0,
        label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: [320, 332, 301, 334, 390]
      },
      {
        name: 'Steppe',
        type: 'bar',
        label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: [220, 182, 191, 234, 290]
      },
      {
        name: 'Desert',
        type: 'bar',
        label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: [150, 232, 201, 154, 190]
      },
      {
        name: 'Wetland',
        type: 'bar',
        label: labelOption,
        emphasis: {
          focus: 'series'
        },
        data: [98, 77, 101, 99, 40]
      }
    ]
  };

  Chart.setOption(option)
  return  Chart}

const initTotalEnrollChartDate = () => {
  totalEnrollCountOfPerYear().then(resp => {
    console.log(resp)
    let data = resp.data.enroll_data
    for (const key in data) {
      console.log(key)
      totalEnrollChart_Year.value.push(key)
      totalEnrollChart_EnrollCount.value.push(data[key])
    }
    console.log(totalEnrollChart_Year)
    console.log(totalEnrollChart_EnrollCount)
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

onMounted(initPerTypeEnrollChartDate)
onMounted(initTotalEnrollChartDate)
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
  }
}
</style>