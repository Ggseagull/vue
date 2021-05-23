<template>
  <el-container class="container">
    <el-header height="171px">
      <div class="logo_box">
        <div class="logo">
          <img class="img_logo" src="../assets/xxlogo.png" alt="">
          <img class="img_ck" src="../assets/ck.png" alt="">
          <!--<span class="index-login" v-show="showLogout"><a href="http://127.0.0.1:8081/#/login"><span>你好，{{ loginName }}<el-button plain @click="logout" type="primary" >登出</el-button></span></a></span>-->
          <!--<div class="login-card" v-show="showLogin">-->
            <!--<el-card shadow="hover">-->
              <!--<el-form inline ref="userRef" :rules="userRules" :model="userForm" label-width="0px" class="form_style">-->
                <!--<el-form-item prop="name">-->
                  <!--<el-input v-model="userForm.name" placeholder="用户名" prefix-icon="el-icon-user"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item prop="pwd">-->
                  <!--<el-input v-model="userForm.pwd" placeholder="密码" prefix-icon="el-icon-lock" show-password></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item class="btns" >-->
                  <!--<el-button type="primary" @click="log_in('userForm')">登录</el-button>-->
                <!--</el-form-item>-->
              <!--</el-form>-->
            <!--</el-card>-->
          <!--</div>-->
        </div>
        <div class="header-login">
          <div class="login-card" v-show="showLogin">
            <el-form inline ref="userRef" :rules="userRules" :model="userForm" label-width="0px" class="form_style">
              <el-form-item prop="name">
                <el-input v-model="userForm.name" placeholder="用户名" prefix-icon="el-icon-user"></el-input>
              </el-form-item>
              <el-form-item prop="pwd">
                <el-input v-model="userForm.pwd" placeholder="密码" prefix-icon="el-icon-lock" show-password></el-input>
              </el-form-item>
              <el-form-item class="btns" >
                <el-button type="primary" @click="log_in('userForm')">登录</el-button>
              </el-form-item>
              <el-form-item class="btns" >
                <el-button type="primary" @click="AddDialogVisible = true">注册</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!-- 新增用户窗口 -->
          <el-dialog title="注册" :visible.sync="AddDialogVisible" width="30%" :before-close="addFormClose">
            <el-form ref="addFormRef" :rules="addFormRules" label-width="80px" :model="addForm">
              <el-form-item label="账号" prop="name">
                <el-input v-model="addForm.name"></el-input>
              </el-form-item>
              <el-form-item label="昵称" prop="nick_name">
                <el-input v-model="addForm.nick_name"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pwd">
                <el-input v-model="addForm.pwd"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="real_pwd">
                <el-input v-model="addForm.real_pwd"></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="phone">
                <el-input v-model="addForm.phone"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="addForm.email"></el-input>
              </el-form-item>
              <el-form-item label="角色">
                <el-input placeholder="学生" :v-model="addForm.role_name=3" :disabled="true"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="addFormClose">取 消</el-button>
              <el-button type="primary" @click="addUser">确 定</el-button>
            </span>
          </el-dialog>
          <div class="login-info" v-show="showLogout">
            <span>你好，<span class="info-role">[{{ userRole }}]</span>{{ loginName }}&emsp;【</span>
            <el-link type="danger" @click="logout"><span>点击退出</span></el-link>
            <span>】</span>
          </div>
        </div>
      </div>
      <div class="tips_box">
        <div class="tips">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
            <el-submenu index="1">
              <template slot="title"><span class="tips_title" @click="goHome">首页</span></template>
              <el-menu-item index="1-1" @click="jj">专业介绍</el-menu-item>
              <el-menu-item index="1-2">学生手册</el-menu-item>
              <el-menu-item index="1-3" @click="sz">师资介绍</el-menu-item>
            </el-submenu>
            <el-submenu index="2" @click="sz">
              <template slot="title"><span class="tips_title" @click="goStudyFile">课程学习</span></template>
              <el-submenu index="2-1">
                <template slot="title"><span>课程</span></template>
                <el-menu-item index="2-1-1">课程1</el-menu-item>
                <el-menu-item index="2-1-2">课程2</el-menu-item>
                <el-menu-item index="2-1-3">课程3</el-menu-item>
              </el-submenu>
              <el-submenu index="2-2">
                <template slot="title"><span>实践</span></template>
                <el-menu-item index="2-2-1">实践1</el-menu-item>
                <el-menu-item index="2-2-2">实践2</el-menu-item>
                <el-menu-item index="2-2-3">实践3</el-menu-item>
              </el-submenu>
              <el-submenu index="2-3">
                <template slot="title"><span>素拓</span></template>
                <el-menu-item index="2-3-1">素拓1</el-menu-item>
                <el-menu-item index="2-3-2">素拓2</el-menu-item>
                <el-menu-item index="2-3-3">素拓3</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><span class="tips_title">学科竞赛</span></template>
              <el-menu-item index="3-1">创新创业</el-menu-item>
              <el-menu-item index="3-2">竞赛2</el-menu-item>
              <el-menu-item index="3-3">竞赛3</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title"><span class="tips_title">就业辅导</span></template>
              <el-menu-item index="4-1">1111</el-menu-item>
              <el-menu-item index="4-2">2222</el-menu-item>
              <el-menu-item index="4-3">3333</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title"><span class="tips_title">考研资讯</span></template>
              <el-menu-item index="5-1">1111</el-menu-item>
              <el-menu-item index="5-2">2222</el-menu-item>
              <el-menu-item index="5-3">3333</el-menu-item>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title"><span class="tips_title">校友风采</span></template>
              <el-menu-item index="6-1">1111</el-menu-item>
              <el-menu-item index="6-2">2222</el-menu-item>
              <el-menu-item index="6-3">3333</el-menu-item>
            </el-submenu>
            <el-menu-item index="7" @click="goArticle"><span class="tips_title">校园生活</span></el-menu-item>
          </el-menu>
        </div>
      </div>
    </el-header>
    <el-main class="main">
      <!--<div class="main-carousel">-->
          <!--<el-carousel height="250px">-->
            <!--<el-carousel-item>-->
              <!--<img src="../assets/ban3.jpg" alt="">-->
            <!--</el-carousel-item>-->
            <!--<el-carousel-item>-->
              <!--<img src="../assets/lxyz.jpg" alt="">-->
            <!--</el-carousel-item>-->
            <!--<el-carousel-item>-->
              <!--<img src="../assets/bwcx.jpg" alt="">-->
            <!--</el-carousel-item>-->
          <!--</el-carousel>-->
      <!--</div>-->
      <!--<div class="main-tabs">-->
        <!--<el-tabs type="border-card">-->
          <!--<el-tab-pane>-->
            <!--<span slot="label"><i class="el-icon-bell"></i> 通知公告</span>-->
            <!--<p>2021.1.11 – 2021.2.20：阅读和学习Flask框架、VUE框架的相关知识期刊</p>-->
            <!--<p>2021.2.21 – 2021.3.01：基于Flask和VUE的网站基本框架的搭建</p>-->
            <!--<p>2021.3.01 – 2021.3.25：完成后台系统的开发</p>-->
            <!--<p>2021.3.25 – 2021.4.28：完成平台页面的布局及相关业务逻辑的实现</p>-->
            <!--<p>2021.4.29 – 2021.5.05：完善及调试网站平台的功能</p>-->
            <!--<p>2021.5.06 – 2021.5.07：完成后期的运维和交接</p>-->
          <!--</el-tab-pane>-->
        <!--</el-tabs>-->
      <!--</div>-->
      <div class="main-box"><router-view></router-view></div>
      <el-footer height="250px">
        <el-row>
          <el-col :span="8">
            <div>
              <span class="footer-fonts">友情链接</span>
              <ul class="clearfix">
                <li><a href="http://www.moe.gov.cn/" target="_blank" title="">国家教育部</a></li>
                <li><a href="http://www.edu.cn/" target="_blank" title="">中国科教网</a></li>
                <li><a href="http://www.ncss.org.cn/" target="_blank" title="">就业信息</a></li>
                <li><a href="http://hrss.gd.gov.cn/" target="_blank" title="">广东省教育厅</a></li>
                <li><a href="http://gaokao.eol.cn/html/g/dxcx.shtml" target="_blank" title="">兄弟院校</a></li>
              </ul>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
            <span class="footer-fonts">校园媒体</span>
            <p><img class="wx" src="../assets/wx.jpg" alt=""></p>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
            <span class="footer-fonts">联系我们</span>
            <p>学院地址：广东省茂名市官渡二路139号 邮编：525000</p>
            <p>联系电话：0668—2923716  传真：0668—2873904</p>
            </div>
          </el-col>
        </el-row>
      </el-footer>
    </el-main>
  </el-container>
</template>

<script>
export default {
  created () {
    this.activeIndex = window.sessionStorage.getItem('activeIndex')
    if (window.sessionStorage.getItem('token')) {
      this.getUserInfo()
      this.showLogin = false
      this.showLogout = true
    } else {
      this.loginName = '请登录'
    }
  },
  data () {
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.addForm.pwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      const phoneReg = /^1[345678]\d{9}$/
      if (phoneReg.test(value)) {
        return callback()
      }
      return callback(new Error('请输入有效的手机号'))
    }
    const validateEmail = (rule, value, callback) => {
      const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      if (emailReg.test(value)) {
        return callback()
      }
      return callback(new Error('请输入正确的邮箱号'))
    }
    return {
      AddDialogVisible: false,
      addForm: {},
      activeIndex: '1',
      loginName: '',
      userRole: '',
      token: window.sessionStorage.getItem('token'),
      userForm: {
        name: '',
        pwd: ''
      },
      showLogin: true,
      showLogout: false,
      userRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      addFormRules: {
        name: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 11, message: '长度在 3 到 11 个字符', trigger: 'blur' }
        ],
        nick_name: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 2, max: 11, message: '长度在 2 到 11 个字符', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 11, message: '长度在 3 到 11 个字符', trigger: 'blur' }
        ],
        real_pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
        phone: [
          { validator: validatePhone, trigger: 'blur' }
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      location.reload()
    },
    jj (ap) {
      window.sessionStorage.setItem('activeIndex', ap.index)
      this.$router.push('/jianjie')
    },
    sz (ap) {
      window.sessionStorage.setItem('activeIndex', ap.index)
      this.$router.push('/szdw')
    },
    xx (ap) {
      window.sessionStorage.setItem('activeIndex', ap.index)
      this.$router.push('/studydownload')
    },
    async getUserInfo () {
      const { data: res } = await this.$axios.get('/user/test', { header: { token: this.token } })
      // console.log(res)
      const { data: usrInfo } = await this.$axios.get('/user/user', { params: { id: res.data.id } })
      // console.log(usrInfo)
      this.loginName = usrInfo.data.name
      this.userRole = usrInfo.data.role_name
      // console.log(this.loginName)
    },
    log_in () {
      this.$refs.userRef.validate(async valid => {
        // console.log(valid)
        if (!valid) return
        // console.log('登录操作')
        // 定义一个变量res 来接收返回值
        const { data: res } = await this.$axios.post('/user/login', this.$qs.stringify(this.userForm))
        if (res.status === 200) {
          // console.log(this.userForm.name)
          // const logName = this.userForm.name
          // window.sessionStorage.setItem('login_name', logName)
          const { data: usrName } = await this.$axios.get('/user/user', { params: { name: this.userForm.name } })
          if (usrName.data.role_name === '管理员') {
            window.sessionStorage.setItem('token', res.data.token)
            this.$msg.success(res.msg)
            location.reload()
          } else {
            window.sessionStorage.setItem('token', res.data.token)
            // const { data: resp } = await this.$axios.get('/user/user', { params: { name: this.userForm.name } })
            // console.log(resp.data.role_name)
            this.$msg.success(res.msg)
            location.reload()
          }
        } else {
          this.$msg.error(res.msg)
        }
      })
    },
    goArticle () {
      this.$router.push('/article')
    },
    goHome (ap) {
      // window.sessionStorage.setItem('activeIndex', ap.index)
      this.$router.push('/index')
    },
    goStudyFile () {
      this.$router.push('/studyfiles')
    },
    addFormClose () {
      this.$refs.addFormRef.resetFields()
      this.AddDialogVisible = false
    },
    // 增加用户
    addUser () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        // 发送请求
        const { data: res } = await this.$axios.post('/user/user', this.$qs.stringify(this.addForm))
        console.log(res)
        // 验证结果
        if (res.status !== 200) return this.$msg.error(res.msg)
        this.$msg.success(res.msg)
        // 隐藏窗口
        this.AddDialogVisible = false
        // 重置增加用户表单
        this.$refs.addFormRef.resetFields()
        // // 重新获取用户列表
        // this.getUserList()
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .container{
    height: 100%;
  }
  .el-header{
    padding: 0;
  }
  .logo_box{
    display: flex;
    width: 100%;
    height: 110px;
    background-color: #324260;
    /*border: 1px solid red;*/
  }
  .logo{
    width: 100%;
    padding-top: 8px;
    /*border: 1px solid red;*/
  }
  .header-login{
    height: 100%;
    width: 100%;
    /*border: 1px solid red;*/
    text-align: right;
  }
  .img_logo{
    width: 120px;
    height: 90px;
  }
  .img_ck{
    width: 275px;
    height: 90px;
  }
  .tips_box{
    width: 100%;
    background-color: #ffffff;
  }
  .tips_title{
    font-size: 25px;
  }
  .tips{
    width: 1300px;
    margin: 0 auto;
  }
  .main{
    background-color: #E4E7ED;
    position: relative;
    padding: 0;
    /*background-image: url("../assets/main.jpg");*/
    /*background-size: 100%;*/
    /*background-repeat:no-repeat;*/
  }
  .box-card{
    width: 1000px;
    margin: 0 auto;
  }
  .el-footer{
    overflow:hidden;
    background: #324260;
    color: #ffff;
    padding-top: 10px;
    /*background-image: url('../assets/footer.jpg');*/
    /*background-size: 100%;*/
    /*background-repeat:no-repeat;*/
  }
  .main-box{
    width: 1300px;
    margin: 0 auto;
    /*padding: 15px;*/
  }
  .footer-box{
    width: 100%;
    height: 100%;
  }
  .clearfix a{
    text-decoration:none;
    color: white;
    font-size: 18px;
  }
  .clearfix li{
    list-style: none;
    float: left;
    margin-left: 15px;
  }
  .footer-fonts{
    font-size: 24px;
    font-weight: bold;
  }
  .el-col p{
    display: flex;
    justify-content: center;
    font-size: 18px;
  }
  .wx{
    width: 120px;
    height: 120px;
  }
  .el-row{
    width: 1300px;
    margin: 0 auto;
  }
  .login-info{
    align-content: right;
    color: white;
    .el-button {
      margin-left: 20px;
    }
    span {
      font-size: 20px;
    }
    margin-right: 10px;
    transform:translateY(50%);
    .info-role{
      color: lightskyblue;
    }
    /*border:1px solid red;*/
  }
  .main-tabs{
    width: 300px;
    position: absolute;
    right: 15px;
  }
  .main-carousel{
    width: 350px;
    position: absolute;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .login-card{
    .el-form{
      transform:translateY(50%);
    }
  }
</style>
