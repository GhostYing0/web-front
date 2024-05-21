<template>
    <div style="display: flex; flex-direction: row; margin-left: auto; margin-right: auto">
      <div class="statistic-slice">
        <div class="statistic-card">
          <div class="year-tag">
            {{param.year}}
          </div>
          <div class="card">
            <el-form-item class="card-item">{{store.getters.department}}竞赛数<br>{{slice.department_contest_count}}</el-form-item>
            <el-form-item class="card-item">{{store.getters.department}}报名数<br>{{slice.department_enroll_count}}</el-form-item>
            <el-form-item class="card-item">{{store.getters.department}}获奖数<br>{{slice.department_grade_count}}</el-form-item>
          </div>
        </div>
      </div>
      <div class="statistic-slice">
        <div class="statistic-card">
          <div class="year-tag">
            {{param.year}}
          </div>
          <div class="card">
            <el-form-item class="card-item">全校竞赛数<br>{{slice.contest_count}}</el-form-item>
            <el-form-item class="card-item">全校报名数<br>{{slice.enroll_count}}</el-form-item>
            <el-form-item class="card-item">全校获奖数<br>{{slice.grade_count}}</el-form-item>
          </div>
        </div>
      </div>
    </div>
    <div>
    <div style="display: flex; flex-direction: row;">
      <div class="left-table">
        <el-date-picker
          v-model="param.year"
          type="year"
          placeholder="选择年份"
          @change="getContestAndType"
          class="year-selector"
          value-format="YYYY"
          date-format="YYYY"
      />
        <div class="statistic-button">
          <el-button type="primary" @click="handleShowTotal">总报名数</el-button>
          <el-button type="primary" @click="handleShowTypeTotal">类型报名数</el-button>
          <el-button type="primary" @click="handleShowLevelTotal">级别报名数</el-button>
        </div>
      </div>
      <div class="right-table">
        <el-cascader
          v-model="contest"
          class="contest-selector"
          :options="contestOptions"
          :props="props"
          filterable
          placeholder="请选择竞赛"
          @change="handleGetData"
      /></div>
    </div>
    <div style="display: flex; flex-direction: row;">
    <div
      v-show="showTotal"
      ref="totalEnrollChart"
      id="totalEnrollChart"
      class="main-table"
    ></div>
    <div
        v-show="showTypeTotal"
        ref="perTypeEnrollChart"
        id="perTypeEnrollChart"
        class="main-table"
    ></div>
      <div
          v-show="showLevelTotal"
          ref="perLevelEnrollChart"
          id="perLevelEnrollChart"
          class="main-table"
      ></div>
      <div style="display: flex; flex-direction: column; margin-left: auto; margin-right: auto">
        <div class="cake-table">
          <div
              class="basic-chart-table-chart"
              ref="rewardRateChart"
              id="rewardRateChart"
          ></div>
        </div>
        <div  class="cake-table">
          <div class="basic-chart-table-item">
            <div
                class="basic-chart-table-chart"
                ref="studentContestSemesterChart"
                id="studentContestSemesterChart"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref, reactive} from "vue"
import * as echarts from 'echarts';
import store from  "@/store"
import {getContestType} from "@/api/contest";
import {
  Menu
} from '@element-plus/icons-vue'
import {
  getContest,
  preTypeEnrollCountOfPerYear,
  studentContestSemester,
  studentRewardRate,
  totalEnrollCountOfPerYear,
  preLevelEnrollCountOfPerYear
} from "@/api/analysis";
import {statisticSlice} from "@/api/statistic";
// import YearCurrDepartStatistic from "@/views/dataAnalysis/contestType/yearCurrDepartStatistic.vue";
// import YearStatistic from "@/views/dataAnalysis/contestType/yearStatistic.vue";

const testChart = ref()

const yearOptions = ref([])
const item_year = ref()

const showTotal = ref(true)
const showTypeTotal = ref(false)
const showLevelTotal = ref(false)

const handleShowTotal = () => {
  showTotal.value = true
  showTypeTotal.value = false
  showLevelTotal.value = false
}

const handleShowTypeTotal = () => {
  showTotal.value = false
  showTypeTotal.value = true
  showLevelTotal.value = false
}

const handleShowLevelTotal = () => {
  showTotal.value = false
  showTypeTotal.value = false
  showLevelTotal.value = true
}

const handleYear = () => {
  initPrevEnrollTypeChart(item_year.value[0])
}

const perTypeEnrollChart = ref()
const perTypeEnrollChartDate_Year = ref([])
const perTypeEnrollChartDate_Type = ref([])
const perTypeEnrollChartDate_EnrollCount = reactive({})

const perLevelEnrollChart = ref()
const perLevelEnrollChartDate_Year = ref([])
const perLevelEnrollChartDate_Level = ref([])
const perLevelEnrollChartDate_EnrollCount = reactive({})

const totalEnrollChart = ref()
const totalEnrollChart_Year = ref([])
const totalEnrollChart_EnrollCount = ref([])

const slice = reactive({
  department_contest_count: 0,
  department_enroll_count: 0,
  department_grade_count: 0,
  contest_count: 0,
  enroll_count: 0,
  grade_count: 0,
})

const initChart = () => {
    const Chart = echarts.init(testChart.value)
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
    myChart.setOption({
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
  show: true,
  position: app.config.position,
  distance: app.config.distance,
  align: app.config.align,
  verticalAlign: app.config.verticalAlign,
  rotate: app.config.rotate,
  formatter: '{c}  {name|{a}}',
  fontSize: 16,
  rich: {
    name: {}
  }
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
return  Chart
}


const contestOptions = ref([])
const contest = ref("")
const param = reactive({
  contest: "演讲竞赛",
  year: ref(new Date().getFullYear()),
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
  initStatisticSlice()
  contestOptions.value = []
  contestType.value = {}
  getContestType().then(resp => {
    let data = resp.data
    data.forEach(element => {
      contestType[element.type] = {value: element.type, label: element.type, children:[]}
    })
  }).catch(error => {
    console.error(error)
  })

  getContest(param).then(resp => {
    let data = resp.data
    data.forEach(element => {
      contestType[element.type].children.push({value:element.contest, label:element.contest})
    })

    for (const key in contestType) {
      if(key === "value") {
        continue
      }
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
      text: '报名学生年级分布',
      left: 'center',
      textStyle: {
        fontSize:15
      }
    },
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
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
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
        data: SemesterCountData.value,
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
    /*if(resp.data.reward_count > 0) {
      rewardRateChartData.value.push({value: resp.data.reward_count, name: "获奖"})
    }*/
    if(resp.data.prize1 > 0) {
      rewardRateChartData.value.push({value: resp.data.reward_count, name: "特等奖"})
    }
    if(resp.data.prize2 > 0) {
      rewardRateChartData.value.push({value: resp.data.reward_count, name: "一等奖"})
    }
    if(resp.data.prize3 > 0) {
      rewardRateChartData.value.push({value: resp.data.reward_count, name: "二等奖"})
    }
    if(resp.data.prize4 > 0) {
      rewardRateChartData.value.push({value: resp.data.reward_count, name: "三等奖"})
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
      text: "竞赛获奖比例",
      left: 'center',
      textStyle: {
        fontSize:15
      }
    },
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
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
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
        data: rewardRateChartData.value,
      }
    ]
  };

  Chart.setOption(option)
  return  Chart
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
    title: {
      left: 'center',
      bottom: 0,
      text:"最近五年总报名数量"
    },
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
    title: {
      left: 'center',
      bottom: 0,
      text:"最近五年按竞赛类型分类报名数量"
    },
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

const initPerLevelEnrollChartData = () => {
  preLevelEnrollCountOfPerYear().then(resp => {
    let data = resp.data.contest_level_with_enroll_data
    for (const key in data) {
      console.log("level:",key)
      perLevelEnrollChartDate_Year.value.push(key)
      perLevelEnrollChartDate_EnrollCount[key] =  {}
      for (const level in data[key]) {
         console.log("ads",level,data[key])
        perLevelEnrollChartDate_EnrollCount[key][level] = perLevelEnrollChartDate_EnrollCount[key][level] || []
        perLevelEnrollChartDate_EnrollCount[key][level].push(data[key][level])
      }
    }
    for(const key in data) {
      for(const level in data[key]) {
        console.log("key:", key, " level:", level)
        perLevelEnrollChartDate_Level.value.push(level)
      }
      break
    }
    initPerLevelEnrollChart()
  }).catch(error => {
    console.error(error)
  })
}
const initPerLevelEnrollChart = () => {
  const Chart = echarts.init(perLevelEnrollChart.value)
  console.log("ASDSAda",perLevelEnrollChartDate_EnrollCount)
  const series = ref([])
  let levelCount = reactive({})

  perLevelEnrollChartDate_Level.value = []
  for (const key in perLevelEnrollChartDate_EnrollCount) {
    for (const value in perLevelEnrollChartDate_EnrollCount[key]) {
      perLevelEnrollChartDate_Level.value.push(value)
    }
    break
  }

  for (const key in perLevelEnrollChartDate_EnrollCount) {
    for (const value in perLevelEnrollChartDate_EnrollCount[key]) {
      levelCount[value] = levelCount[value] || []
      for (const asd in perLevelEnrollChartDate_EnrollCount[key][value]) {
        //console.log(asd, perTypeEnrollChartDate_EnrollCount[key][value][asd])c
        levelCount[value].push(perLevelEnrollChartDate_EnrollCount[key][value][asd])
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
  perLevelEnrollChartDate_Level.value.forEach((level) => {
    series.value.push({
      name: level,
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
  for (const key in levelCount) {
    series.value[index].data = levelCount[key]
    index++
  }
  console.log("series:", series.value)

  const option = {
    title: {
      left: 'center',
      bottom: 0,
      text:"最近五年按竞赛级别分类报名数量"
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: perLevelEnrollChartDate_Level.value
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
        data: perLevelEnrollChartDate_Year.value
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

const initStatisticSlice = () => {
  statisticSlice(param).then(resp => {
    if(resp.code === 200) {
      slice.department_contest_count = resp.data.department_contest_count
      slice.department_enroll_count = resp.data.department_enroll_count
      slice.department_grade_count = resp.data.department_grade_count
      slice.contest_count = resp.data.contest_count
      slice.enroll_count = resp.data.enroll_count
      slice.grade_count = resp.data.grade_count
    }
  }).catch(error => {
    console.error(error)
  })
}

onMounted(initStatisticSlice)
onMounted(initTotalEnrollChartData)
onMounted(initPerTypeEnrollChartData)
onMounted(initPerLevelEnrollChartData)
onMounted(getContestAndType)
onMounted(initStudentContestSemesterChartData)
onMounted(initRewardRateChartData)

// onMounted(initChart)
</script>

<style lang="scss">
.left-table {
  display: flex;
  flex-direction: row;
  border: black 1px solid;
  border-radius: 5px;
  box-shadow: 1px 1px 1px grey;
  height: 40px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 1vw;
  width: 750px;
  .year-selector {
    margin-top: auto;
    margin-left: 5px;
    margin-bottom: auto;
  }
  .statistic-button {
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 205px;
  }
}
.right-table {
  border: black 1px solid;
  border-radius: 5px;
  box-shadow: 1px 1px 1px grey;
  height: 40px;
  margin-left: 15px;
  margin-top: 5px;
  margin-bottom: 5px;
  width: 330px;
  .contest-selector {
    width: 300px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
}
.statistic-slice {
  display: flex;
  flex-direction: row;
  border: black 1px solid;
  border-radius: 5px;
  width: 38vw;
  height: 10vh;
  box-shadow: 1px 1px 1px grey;
  margin-left: auto;
  margin-right: auto;
  .statistic-card{
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    .year-tag{
      margin-left: 245px;
      margin-right: auto;
    }
    .card{
      max-width: 38vw;
      display: flex;
      flex-direction: row;
      .card-item {
        width: 200px;
        margin-left: 40px;
        margin-top: auto;
        margin-bottom: auto;
      }
    }
  }
}
.main-table {
  border: black 1px solid;
  border-radius: 5px;
  margin-left: 1vw;
  box-shadow: 1px 1px 1px grey;
  width: 750px;
  height: 550px;
}
.cake-table{
  //display: flex;
  //flex-direction: row;
  border: black 1px solid;
  border-radius: 5px;
  box-shadow: 1px 1px 1px grey;
  height: 270px;
  width: 330px;
  margin-top: auto;
  margin-bottom: auto;
  .chart-title {
    float: left;
  }
  .basic-chart-table-chart {
    width: 294px;
    height: 294px;
    margin: auto auto auto auto;
  }
}
</style>