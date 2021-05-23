<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>新闻资讯</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="addFormRef" :rules="addFormRules" :model="addForm">
      <el-form-item prop="title">
        <el-input v-model="addForm.title" placeholder="请输入标题" class="title"></el-input>
      </el-form-item>
      <el-form-item prop="content">
        <quill-editor v-model="addForm.content"></quill-editor>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="goodsAdd" class="btnAdd">发布文章</el-button>
    <el-row>
      <el-col>
        <el-table :data="articleList" border>
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column prop="create_time" label="时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" @click="showEdit(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!--<el-dialog title="新闻" :visible.sync="editDialogVisible" width="80%">-->
      <!--<span>标题：{{ this.articleForm.title }}</span><br>-->
      <!--<span>-->
        <!--内容：-->
        <!--<dl v-html="this.articleForm.content">{{ this.articleForm.content }}</dl>-->
      <!--</span>-->
    <!--</el-dialog>-->
  </div>
</template>

<script>
export default {
  data () {
    return {
      addForm: {
        title: '',
        content: '',
        author: ''
      },
      articleList: [],
      articleForm: {
        title: '',
        content: '',
        author: ''
      },
      editDialogVisible: false,
      addFormRules: {
        name: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, message: '长度至少3个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getArticleList()
  },
  methods: {
    goodsAdd () {
      // console.log(this.addForm)
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$axios.get('/user/test', { header: { token: this.token } })
        // console.log(res)
        const { data: usrInfo } = await this.$axios.get('/user/user', { params: { id: res.data.id } })
        console.log(usrInfo)
        this.addForm.author = usrInfo.data.name
        console.log(this.author)
        // 发送请求
        const { data: arct } = await this.$axios.post('/article', this.$qs.stringify(this.addForm))
        // 验证结果
        if (arct.status !== 200) return this.$msg.error(arct.msg)
        this.$msg.success(arct.msg)
        // 重置增加表单
        this.$refs.addFormRef.resetFields()
        // 重新获取列表
        this.getArticleList()
      })
    },
    async getArticleList () {
      const { data: res } = await this.$axios.get('/show_article')
      if (res.status !== 200) return this.$msg.error(res.msg)
      // console.log(res)
      this.articleList = res.data
    },
    async showEdit (row) {
      // 发送请求，获取后台实时数据
      const { data: res } = await this.$axios.get('/show_article', { params: { id: row.id } })
      // console.log(res)
      // console.log(row)
      if (res.status !== 200) return this.$msg.error(res.msg)
      // console.log(res.data[row.id - 1].title)
      this.articleForm.title = row.title
      this.articleForm.content = row.content
      this.articleForm.author = row.author
      // console.log(this.articleForm.title)
      this.$router.push({
        name: 'shownews',
        // path: '/shownews',
        params: {
          title: this.articleForm.title,
          content: this.articleForm.content,
          author: this.articleForm.author
        }
      })
      // this.editDialogVisible = true
    }
  }
}
</script>

<style scoped>
  .btnAdd{
    /*margin-left: 20px;*/
    margin-bottom: 10px;
  }
  .title{
    width: 500px;
    /*margin: 20px;*/
    margin-top: 10px;
  }
  .el-table{
    margin-bottom: 10px;
  }
  .el-breadcrumb{
    margin-top: 10px;
  }
</style>
