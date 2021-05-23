<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div class="oneFirstCol">
          <el-card shadow="hover" class="box-card">
            <div slot="header">
              <span>通知公告</span><em>/ NOTICES</em>
              <el-button style="float: right; padding: 3px 0" type="text" @click="checkRoles" :disabled="disable">编辑</el-button>
              <el-dialog title="通知公告编辑" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
                <el-form :model="newsForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item prop="desc">
                    <el-input autosize v-model="newsForm.content" type="textarea" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="postNews('newsForm')">确 定</el-button>
                </span>
              </el-dialog>
            </div>
            <div class="text">
              <p>{{ this.content }}</p>
              <span>{{ this.createTime }}</span>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="oneSecondCol">
          <el-card shadow="hover" class="box-card2">
            <div slot="header">
              <span>新闻资讯</span><em>/ NEWS</em></div>
              <span v-for="(obj,index) in this.articleList" :key="obj.id">
                <el-link @click="showEdit(obj)" class="obj_title" v-if="index <= 5">{{ obj.title }}</el-link><br><span class="obj_createTime"  v-if="index <= 5">{{ obj.create_time.replace('\"', '').replace('\"', '') }}</span><hr>
              </span>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="severNav">
          <span>服务导航</span>
          <hr>
          <el-row :gutter="20">
              <el-col :span="12"><a href="/#/studyfiles"><div :data-num="index='a'" @mouseover="hoverM" @mouseleave="hoverL" id="a">课程学习</div></a></el-col>
              <el-col :span="12"><a href=""><div :data-num="index='b'" @mouseover="hoverM" @mouseleave="hoverL" id="b">学科竞赛</div></a></el-col>
              <el-col :span="12"><a href=""><div :data-num="index='c'" @mouseover="hoverM" @mouseleave="hoverL" id="c">就业辅导</div></a></el-col>
              <el-col :span="12"><a href=""><div :data-num="index='d'" @mouseover="hoverM" @mouseleave="hoverL" id="d">考研资讯</div></a></el-col>
              <el-col :span="12"><a href=""><div :data-num="index='e'" @mouseover="hoverM" @mouseleave="hoverL" id="e">校友风采</div></a></el-col>
              <el-col :span="12"><a href="/#/article"><div :data-num="index='f'" @mouseover="hoverM" @mouseleave="hoverL" id="f">校园生活</div></a></el-col>
          </el-row>
          <hr>
          <img src="../../assets/bwcx.jpg" alt="">
        </div>
      </el-col>
      <el-col :span="8">
        <div class="twoSecondCol">
          <el-card shadow="hover" class="box-card3">
            <span>建议反馈</span>
            <el-form ref="form" :model="form">
              <el-form-item>
                <textarea cols="42" rows="20" v-model="form.desc"></textarea>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">点击提交</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="twoThirdCol">
          <template>
            <div class="block">
              <el-carousel trigger="click" height="465px">
                <el-carousel-item v-for="item in 4" :key="item">
                  <h3 class="small">本栏目正在开发中。。。</h3>
                </el-carousel-item>
              </el-carousel>
            </div>
          </template>
        </div>
      </el-col>
    </el-row>
<!--    <div class="firstRow">-->
<!--      <div class="oneFirstCol">11</div>-->
<!--      <div class="oneSecondCol">12</div>-->
<!--    </div>-->
<!--    <div class="secondRow">-->
<!--      <div class="twoFirstCol">21</div>-->
<!--      <div class="twoSecondCol">22</div>-->
<!--      <div class="twoThirdCol">23</div>-->
<!--    </div>-->
  </div>
</template>

<script>
export default {
  props: {
    disable: {
      default: false
    }
  },
  created () {
    this.getNews()
    this.getArticleList()
    this.disable = window.sessionStorage.getItem('flag_role')
  },
  data () {
    return {
      index: '',
      dialogVisible: false,
      roles: '',
      role_flag: 'true',
      content: '',
      createTime: '',
      token: window.sessionStorage.getItem('token'),
      newsForm: {
        content: ''
      },
      articleList: [],
      articleForm: {
        title: '',
        content: '',
        author: ''
      },
      form: {
        desc: ''
      }
    }
  },
  methods: {
    hoverM (e) {
      // console.log(e)
      // console.log(e.target.getAttribute('data-num'))
      this.index = e.target.getAttribute('data-num')
      // const p = document.getElementsByTagName('a')[this.index].children[0]
      const p = document.getElementById(this.index)
      // console.log(this.name)
      p.style.backgroundColor = '#5a7fa1'
      p.style.color = '#ffffff'
      // p.style.border = '1px solid #fff'
    },
    hoverL (e) {
      // console.log(e)
      this.index = e.target.getAttribute('data-num')
      // const p = document.getElementsByTagName('a')[this.index].children[0]
      const p = document.getElementById(this.index)
      // console.log(p)
      p.style.backgroundColor = '#D4D4D4'
      p.style.color = '#000000'
      // p.style.border = '0px solid #fff'
    },
    async checkRoles () {
      const { data: res } = await this.$axios.get('/user/test', { header: { token: this.token } })
      // console.log(res)
      const { data: usrInfo } = await this.$axios.get('/user/user', { params: { id: res.data.id } })
      // console.log(usrInfo.data.role_name)
      this.roles = usrInfo.data.role_name
      // console.log(userRoles)
      if (this.roles === '管理员') {
        // console.log('你好。管理员')
        this.dialogVisible = true
      } else {
        this.disable = true
        this.role_flag = false
        window.sessionStorage.setItem('flag_role', this.role_flag)
        this.$notify({
          title: '提示',
          message: '权限不足',
          position: 'top-left'
        })
      }
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    async getNews () {
      const { data: res } = await this.$axios.get('/news')
      this.content = res.data.content
      res.data.create_time = res.data.create_time.replace('\"', '').replace('\"', '')
      this.createTime = res.data.create_time
      // console.log(res)
    },
    async postNews () {
      const { data: res } = await this.$axios.post('/news', this.$qs.stringify(this.newsForm))
      console.log(res)
      if (res.status === 200) {
        location.reload()
        this.dialogVisible = false
        alert('上传成功！')
      } else {
        alert('上传失败，请重试！！')
      }
    },
    async getArticleList () {
      const { data: res } = await this.$axios.get('/show_article')
      if (res.status !== 200) return this.$msg.error(res.msg)
      // console.log(res)
      this.articleList = res.data.reverse()
      // console.log(this.articleList)
    },
    showEdit (obj) {
      // 发送请求，获取后台实时数据
      // const { data: res } = await this.$axios.get('/show_article', { params: { id: obj.id } })
      // console.log(res)
      // console.log(obj)
      // if (res.status !== 200) return this.$msg.error(res.msg)
      // console.log(res.data[row.id - 1].title)
      this.articleForm.title = obj.title
      this.articleForm.content = obj.content
      this.articleForm.author = obj.author
      // console.log(this.articleForm)
      this.$router.push({
        name: 'shownews',
        // path: '/shownews',
        params: {
          title: this.articleForm.title,
          content: this.articleForm.content,
          author: this.articleForm.author
        }
      })
    },
    async onSubmit () {
      const { data: res } = await this.$axios.get('/user/test', { header: { token: this.token } })
      // console.log(res)
      if (res.status !== 200) return this.$msg.error(res.msg)
      // console.log(this.form.desc)
      if (this.form.desc.replace(/^\s*|\s*$/g, '') === '') return alert('请输入内容后提交！')
      const { data: res2 } = await this.$axios.post('/user/suggest', this.$qs.stringify(this.form))
      // console.log(res2)
      window.alert(res2.msg)
      window.location.reload()
    }
  }
}
</script>

<style lang="less" scoped>
  .oneFirstCol{
    // background-color: #324260;
    height: 500px;
    // border: 1px solid rebeccapurple;
    padding: 0;
    padding-right: 20px;
      .box-card{
        width: 100%;
        height: 100%;
        span{
          font-size: 25px;
        }
        box-shadow: 10px 10px 5px #888888;
      }
      .el-form{
        display: flex;
        /*border: 1px solid red;*/
        .el-form-item{
          /*display: block;*/
          width: 100%;
          padding: 0;
          margin: 0 auto;
          /*border: 1px solid red;*/
        }
        .el-textarea {
          width: 100%;
          /*border: 1px solid red;*/
          margin-left: -100px;
        }
    }
    .text{
      position: relative;
      span{
        display: block;
        position: relative;
        float: right;
      }
      p{
        font-size: 18px;
      }
    }
  }
  .oneSecondCol{
    /*background-color: #409EFF;*/
    /*border: 1px solid rosybrown;*/
    height: 500px;
    padding: 0;
    .box-card2{
      width: 100%;
      height: 100%;
      span{
        font-size: 25px;
      }
      .obj_createTime{
        display: block;
        float: right;
        font-size: medium;
      }
      .obj_title{
        font-size: medium;
      }
      box-shadow: 10px 10px 5px #888888;
    }
  }
  .severNav{
    color: #333333;
    /*background-color: white;*/
    /*border: 1px solid rosybrown;*/
    height: 500px;
    span{
      display: block;
      text-align: center;
      line-height: 50px;
      color: white;
      width: 100px;
      height: 50px;
      background-color: #5a7fa1;
    }
    .el-col{
      div{
        height: 25px;
        text-align: center;
        background-color: #D4D4D4;
      }
      a{
        color: black;
        text-decoration:none;
      }
    }
    img{
      width: 380px;
      height: 210px;
    }
  }
  .twoSecondCol{
    /*background-color: bisque;*/
    height: 500px;
    /*overflow: hidden;*/
    padding: 0;
    .box-card3{
      /*width: 100%;*/
      height: 100%;
      box-shadow: 10px 10px 5px #888888;
      span{
        display: block;
        text-align: center;
        line-height: 50px;
        border-radius: 50px;
        color: white;
        width: 339px;
        height: 50px;
        background-color: #409EFF;
      }
      .el-button{
        float: right;
      }
      .el-form-item{
          margin-bottom: 0px;
      }
    }
  }
  .twoThirdCol{
    background-color: white;
    height: 500px;
    .el-carousel__item h3 {
      color: #475669;
      font-size: 24px;
      opacity: 0.75;
      line-height: 465px;
      margin: 0;
    }
    .el-carousel {
      overflow: hidden;
      background: #D4D4D4;
    }
    box-shadow: 10px 10px 5px #888888;
  }
  div {
    padding: 10px;
  }
</style>
