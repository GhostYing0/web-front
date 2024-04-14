import { onMounted } from 'vue';
<template>
    <div
    ref="testChart"
    id="testChart"
    :style="{ width: '800px', height: '400px' }"
  ></div>
</template>

<script setup>
import {onMounted, ref, reactive} from "vue"
import {totalEnrollCountOfPerYear} from "@/api/analysis"
import * as echarts from 'echarts';

const testChart = ref()
const year = ref([])
const enroll_count = ref([])

const initDate= () => {
  totalEnrollCountOfPerYear().then(resp => {
    console.log(resp)
    let data = resp.data.enroll_data
    for (const key in data) {
      console.log(key)
      year.value.push(key)
      enroll_count.value.push(data[key])
    }
    console.log(year)
    console.log(enroll_count)
    initChart()
  }).catch(error => {
    console.error(error)
  })
}

const initChart = () => {
  const Chart = echarts.init(testChart.value);
  let option = {
    xAxis: {
      type: 'category',
      data: year.value
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: enroll_count.value,
        type: 'bar'
      }
    ]
  }
  Chart.setOption(option)
  return Chart
} 

onMounted(initDate)
</script>

<style>
</style>