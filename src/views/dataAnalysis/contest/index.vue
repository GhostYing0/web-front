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
import * as echarts from 'echarts';

const testChart = ref()

const initChart = () => {
    const Chart = echarts.init(testChart.value)
    let option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar'
    }
  ]
};

Chart.setOption(option)
return  Chart
} 

onMounted(initChart)
</script>

<style>
</style>