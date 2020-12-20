<template>
  <div class="home-content">
    <v-chart :options="options" style="width: 600px;height:400px;"></v-chart>
    <v-chart :options="options2" style="width: 400px;height:400px;"></v-chart>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      options: {
        title: {
          text: 'ECharts 入门示例',
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      },
      options2: {
        series: {
          type: 'pie',
          data: [
            {name: 'A', value: 1212},
            {name: 'B', value: 2323},
            {name: 'C', value: 1919}
          ]
        }
      }
    }
  }
}
</script>

<style scoped>
.home-content {
  background-color: #FFF;
}
</style>
