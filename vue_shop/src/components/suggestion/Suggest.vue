<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>建议反馈</el-breadcrumb-item>
      <el-breadcrumb-item>反馈列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table :data="suggestList" border>
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="content" label="反馈内容"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" @click="sug_del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Suggest',
  data () {
    return {
      suggestList: []
    }
  },
  created () {
    this.getSuggest()
  },
  methods: {
    async getSuggest () {
      const { data: res } = await this.$axios.get('/user/suggest')
      // console.log(res)
      this.suggestList = res.data
    },
    async sug_del (row) {
      const { data: res } = await this.$axios.delete('/user/suggest', { data: { id: row.id } })
      if (res.status !== 200) return this.$msg.error(res.msg)
      window.alert('删除成功！')
      // this.checkDialogVisible = false
      window.location.reload()
    }
  }
}
</script>

<style scoped>

</style>
