<template>
  <div>
    <el-card class="box-card">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>新闻资讯</el-breadcrumb-item>
        <el-breadcrumb-item>详情</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="title2"><span>{{this.title}}</span></div><br><br>
      <span>作者：{{ this.author }}</span>
      <dl v-html="this.content">{{ this.content }}</dl>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'shownews',
  data () {
    return {
      title: '',
      content: '',
      author: ''
    }
  },
  mounted () {
    this.title = this.$route.params.title
    this.content = this.$route.params.content
    this.author = this.$route.params.author
    console.log(this.$route.params)
  }
}
</script>

<style scoped>
  .el-card{
    height: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  span{
    display: inline-block;
  }
  .title2{
    font-size: x-large;
    text-align: center;
    margin: 0 auto;
    font-weight: bold;
  }
  dl{
    /*font-family: "Adobe 黑体 Std R";*/
    font-size: 20px;
  }
</style>
