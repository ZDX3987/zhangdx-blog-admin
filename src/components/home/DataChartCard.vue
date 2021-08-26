<template>
  <el-card shadow="never" class="data-chart-card">
    <div ref="echarts" class="main-data-chart"></div>
  </el-card>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: "DataChartCard",
  mounted() {
    let myChart = echarts.init(this.$refs.echarts);
    myChart.setOption({
      title: {
        text: '数据分析'
      },
      legend: {},
      tooltip: {},
      xAxis: {
        data: ['2021/02', '2021/03', '2021/04', '2021/05', '2021/06', '2021/07']
      },
      yAxis: {},
      series: [{
        name: '点赞数',
        type: 'line',
        data: [5, 20, 36, 10, 10, 20]
      }]
    });
  }
}
</script>

<style scoped>
.data-chart-card {
}

.main-data-chart {
  width: 100%;
  height: 500px;
}
</style>