<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>审核</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
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
              <el-button type="danger" @click="showDel(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog title="提示" :visible.sync="delArticleVisible" width="20%">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delArticleVisible = false">取 消</el-button>
        <el-button type="primary" @click="delArticle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      articleList: [],
      id: '',
      delArticleVisible: false
    }
  },
  created () {
    this.getArticleList()
  },
  methods: {
    async getArticleList () {
      const { data: res } = await this.$axios.get('/show_article')
      if (res.status !== 200) return this.$msg.error(res.msg)
      // console.log(res)
      this.articleList = res.data
    },
    showDel (row) {
      this.id = row.id
      this.delArticleVisible = true
    },
    async delArticle () {
      const { data: res } = await this.$axios.delete('/show_article', { data: { id: this.id } })
      if (res.status !== 200) return this.$msg.error(res.msg)
      window.alert('文章删除成功！')
      window.location.reload()
    }
  }
}
</script>

<style scoped>

</style>
