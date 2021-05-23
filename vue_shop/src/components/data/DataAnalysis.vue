<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据分析</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
        <div id="main" style="width: 600px;height:400px;"></div>
      </el-card>
    </div>
</template>

<script>
// import echarts from 'echarts'
export default {
  name: 'DataAnalysis',
  data () {
    return {
      compete_count: 2,
      exams_count: 4,
      introduce_count: 1,
      jobs_count: 1,
      life_count: 1,
      study_count: 1,
      xiaoyou_count: 1
    }
  },
  created () {
    // this.getData()
  },
  methods: {
    async getData () {
      const { data: res } = await this.$axios.get('user/record')
      if (res.status !== 200) return this.$msg.error(res.msg)
      // console.log(res.data[0])
      this.introduce_count = Number(res.data[0].introduce_count)
      this.study_count = Number(res.data[0].study_count)
      this.compete_count = Number(res.data[0].compete_count)
      this.jobs_count = Number(res.data[0].jobs_count)
      this.exams_count = Number(res.data[0].exams_count)
      this.xiaoyou_count = Number(res.data[0].xiaoyou_count)
      this.life_count = Number(res.data[0].life_count)
    }
  },
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    // console.log(document.getElementById('main'))
    this.getData()
    var echarts = require('echarts')
    var myChart = echarts.init(document.getElementById('main'))
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: '平台数据分析'
      },
      tooltip: {},
      legend: {
        data: ['点击量']
      },
      xAxis: {
        data: ['专业介绍', '课程学习', '学科竞赛', '就业辅导', '考研资讯', '校友风采', '校园生活']
      },
      yAxis: {},
      series: [{
        name: '点击量',
        type: 'bar',
        data: [this.introduce_count, this.study_count, this.compete_count, this.jobs_count, this.exams_count, this.xiaoyou_count, this.life_count]
      }]
    }
    console.log(option)
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
  }
}
</script>

<style scoped>

</style>
