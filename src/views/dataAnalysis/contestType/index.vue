<template>
    <div style="display: flex; flex-direction: row; margin-left: auto; margin-right: auto">
      <div class="statistic-slice">
        <el-form-item>asd</el-form-item>
        <el-form-item>asd</el-form-item>
        <el-form-item>asd</el-form-item>
      </div>
      <div class="statistic-slice">
        <el-form-item>as22d</el-form-item>
        <el-form-item>11</el-form-item>
        <el-form-item>as2d</el-form-item>
      </div>
    </div>
    <div>
    <div style="display: flex; flex-direction: row;">
      <div class="year-selector">asd</div>
      <div class="contest-selector">111</div>
    </div>
    <div style="display: flex; flex-direction: row;">
    <div
      ref="testChart"
      id="testChart"
      class="main-table"
    ></div>
      <div style="display: flex; flex-direction: column; margin-left: auto; margin-right: auto">
        <div class="cake-table"></div>
        <div  class="cake-table"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref, reactive} from "vue"
import * as echarts from 'echarts';
// import YearCurrDepartStatistic from "@/views/dataAnalysis/contestType/yearCurrDepartStatistic.vue";
// import YearStatistic from "@/views/dataAnalysis/contestType/yearStatistic.vue";

const testChart = ref()

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

onMounted(initChart)
</script>

<style lang="scss">
.year-selector {
  border: black 1px solid;
  border-radius: 5px;
  box-shadow: 1px 1px 1px grey;
  height: 40px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 1vw;
  width: 120px;
}
.contest-selector {
  border: black 1px solid;
  border-radius: 5px;
  box-shadow: 1px 1px 1px grey;
  height: 40px;
  margin-left: 1vw;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 645px;
  width: 330px;
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
  border: black 1px solid;
  border-radius: 5px;
  box-shadow: 1px 1px 1px grey;
  height: 270px;
  width: 330px;
  margin-top: auto;
  margin-bottom: auto;
}
</style>