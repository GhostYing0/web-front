<template>
  <div class="basic-chart-table-item">
    <div class="title-item">
      <div class="chart-title">
      </div>
      <el-form-item class="form-item" prop="school" label="竞赛" label-width="80px" style="width:180px">
        <div class="m-4">
          <el-cascader
              v-model="contest"
              :options="contestOptions"
              :props="props"
              filterable
              @change="handleGetData"
          />
        </div>
      </el-form-item>
    </div>
  </div>
  <div class="basic-chart-table">
    <div class="basic-chart-table-item">
      <div class="chart-title">
        竞赛报名学生入学年份
      </div>
      <div
          class="basic-chart-table-chart"
          ref="studentContestSemesterChart"
          id="studentContestSemesterChart"
          :style="{ width: '500px', height: '350px' }"
      ></div>
    </div>
    <div class="basic-chart-table-item">
      <div class="chart-title">
        竞赛获奖比例
      </div>
      <div
          class="basic-chart-table-chart"
          ref="rewardRateChart"
          id="rewardRateChart"
          :style="{ width: '500px', height: '350px' }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref, reactive} from "vue"
import * as echarts from 'echarts';
import {studentContestSemester ,studentRewardRate, getContest} from "@/api/analysis";
import {getContestType} from "@/api/contest"


const contestOptions = ref([])
const contest = ref("")
const param = reactive({
  contest: "演讲竞赛"
})

const contestType = reactive({})

const rewardRateChart = ref()
const rewardRateChartData = ref([])
const rewardRateChartRate = reactive({})

const studentContestSemesterChart = ref()
const SemesterCountData = ref([])

const handleGetData = () => {
  if(contest.value[1]) {
    param.contest = contest.value[1]
  }
  SemesterCountData.value = []
  rewardRateChartData.value = []
  initStudentContestSemesterChartData()
  initRewardRateChartData()
}

const getContestAndType = () => {
  getContestType().then(resp => {
    let data = resp.data
    data.forEach(element => {
      contestType[element.type] = {value: element.type, label: element.type, children:[]}
    })
  }).catch(error => {
    console.error(error)
  })

  getContest().then(resp => {
    let data = resp.data
    data.forEach(element => {
      contestType[element.type].children.push({value:element.contest, label:element.contest})
    })

    for (const key in contestType) {
      let value = contestType[key]
      contestOptions.value.push(value)
    }
  }).catch(error => {
    console.error(error)
  })
}

const initStudentContestSemesterChartData = () => {
  studentContestSemester(param).then(resp => {
     console.log(resp)
    let data = resp.data.data
    data.forEach(element => {
      SemesterCountData.value.push( { value: element.enroll_count, name: element.semester },)
    })
    initStudentContestSemesterChart()
  }).catch(error => {
    console.error(error)
  })
}
const initStudentContestSemesterChart = () => {
  const Chart = echarts.init(studentContestSemesterChart.value)
  let option = {
    title: {
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    series: [
      {
        type: 'pie',
        radius: '65%',
        center: ['50%', '50%'],
        selectedMode: 'single',
        data: SemesterCountData.value,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  Chart.setOption(option)
  return  Chart
}

const initRewardRateChartData = () => {
  studentRewardRate(param).then(resp => {
    console.log(resp)
    rewardRateChartRate["rate"] = resp.data.rate
    if(resp.data.reward_count > 0) {
      rewardRateChartData.value.push({value: resp.data.reward_count, name: "获奖"})
    }
    if(resp.data.enroll_count - resp.data.reward_count > 0) {
      rewardRateChartData.value.push({value: resp.data.enroll_count - resp.data.reward_count, name: "未获奖"})
    }
    initRewardRateChart()
  }).catch(error => {
    console.error(error)
  })
}
const initRewardRateChart = () => {
  const Chart = echarts.init(rewardRateChart.value)
  let option = {
    title: {
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    series: [
      {
        type: 'pie',
        radius: '65%',
        center: ['50%', '50%'],
        selectedMode: 'single',
        data: rewardRateChartData.value,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  Chart.setOption(option)
  return  Chart
}


onMounted(getContestAndType)
onMounted(initStudentContestSemesterChartData)
onMounted(initRewardRateChartData)
</script>

<style>
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