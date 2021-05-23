<template>
    <div class="login_container">
      <div class="login_box">
        <div class="logo">
          <img src="../assets/logo.png" alt="">
        </div>
        <el-form ref="userRef" :rules="userRules" :model="userForm" label-width="0px" class="form_style">
          <el-form-item prop="name">
            <el-input v-model="userForm.name" placeholder="用户名" prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input v-model="userForm.pwd" placeholder="密码" prefix-icon="el-icon-lock" show-password></el-input>
          </el-form-item>
          <el-form-item class="btns" >
            <el-button type="primary" @click="log_in('userForm')">登录</el-button>
            <el-button @click="restForm('userForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
export default
{
  name: 'Login',
  data () {
    return {
      userForm: {
        name: 'gjtzbq',
        pwd: '123456'
      },
      userRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
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
            this.$router.push('/home')
          } else {
            window.sessionStorage.setItem('token', res.data.token)
            // const { data: resp } = await this.$axios.get('/user/user', { params: { name: this.userForm.name } })
            // console.log(resp.data.role_name)
            this.$msg.success(res.msg)
            this.$router.push('/index')
          }
        } else {
          this.$msg.error(res.msg)
        }
      })
    },
    restForm () {
      this.$refs.userRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
    .login_container{
      background-color: #324260;
      height: 100%;
    }
    .login_box{
      width: 450px;
      height: 300px;
      border-radius: 30px;
      background-color: #fff;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
    .logo {
      height: 80px;
      width: 220px;
      border-radius: 10px;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      /*box-shadow: 0 0 10px gray;*/
      img {
        width: 100%;
        height: 100%;
      }
    }
    .form_style{
      position: absolute;
      bottom: 0px;
      width: 100%;
      padding: 0 10%;
      box-sizing: border-box;
    }
    .btns{
      display: flex;
      justify-content: flex-end;
    }
</style>
