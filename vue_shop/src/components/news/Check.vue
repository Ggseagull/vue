<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>审核</el-breadcrumb-item>
      <el-breadcrumb-item>文章审核</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col>
        <el-table :data="articleList" border>
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column prop="create_time" label="时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" @click="check(scope.row)">审核</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog title="审核文章" :visible.sync="checkDialogVisible" width="80%">
      <span>标题：{{ this.title }}</span><br>
      <span>
        作者：{{ this.author }}<br>
        内容：<dl v-html="this.content">{{ this.content }}</dl>
      </span>
      <el-button type="success" @click="go_pass">通过</el-button>
      <el-button type="warning" @click="no_pass">删除</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      articleList: [],
      checkDialogVisible: false,
      title: '',
      author: '',
      content: '',
      id: ''
    }
  },
  created () {
    this.getArticleList()
  },
  methods: {
    async getArticleList () {
      const { data: res } = await this.$axios.get('/article')
      if (res.status !== 200) return this.$msg.error(res.msg)
      // console.log(res)
      this.articleList = res.data
    },
    check (row) {
      this.checkDialogVisible = true
      // console.log(row)
      this.title = row.title
      this.author = row.author
      this.content = row.content
      this.id = row.id
    },
    async no_pass () {
      const { data: res } = await this.$axios.delete('/article', { data: { id: this.id } })
      if (res.status !== 200) return this.$msg.error(res.msg)
      window.alert('删除成功！')
      this.checkDialogVisible = false
      window.location.reload()
    },
    async go_pass () {
      const { data: res } = await this.$axios.post('/show_article', this.$qs.stringify({ id: this.id }))
      console.log(res)
      if (res.status !== 200) return this.$msg.error(res.msg)
      const { data: res2 } = await this.$axios.delete('/article', { data: { id: this.id } })
      if (res2.status !== 200) return this.$msg.error(res2.msg)
      window.alert('成功！')
      this.checkDialogVisible = false
      window.location.reload()
    }
  }
}
</script>

<style scoped>

</style>
