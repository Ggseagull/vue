<template>
    <el-container class="home-container">
      <el-header>
        <div>
          <img src="../assets/home.png" alt="">
          <!--<span>后台管理系统</span>-->
        </div>
        <!--<el-button type="primary" plain @click="test">点我测试token有效性</el-button>-->
        <el-button type="danger" plain @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px"><el-menu
      :default-active="activePath"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#F7B2B2"
      :unique-opened="true"
      router>
      <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
        <template slot="title">
          <i :class="iconObj[item.id+' ']"></i>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item :index="subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveActivePath">
          <i :class="iconObj[subItem.id+' ']"></i>
          <span>{{ subItem.name }}</span>
        </el-menu-item>
      </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      menuList: [],
      iconObj: {
        '2 ': 'el-icon-user',
        '3 ': 'el-icon-setting',
        '4 ': 'el-icon-goods',
        '5 ': 'el-icon-s-order',
        '6 ': 'el-icon-s-data',
        '21 ': 'el-icon-user-solid',
        '31 ': 'el-icon-s-tools',
        '32 ': 'el-icon-s-tools',
        '41 ': 'el-icon-s-goods',
        '42 ': 'el-icon-s-goods'
      },
      activePath: ''
    }
  },
  created () {
    this.getMenulist()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    test () {
      const { data: res } = this.$axios.get('/user/test')
      console.log(res)
    },
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },
    async getMenulist () {
      const { data: res } = await this.$axios.get('/menu')
      // console.log(res.data)
      this.menuList = res.data
    },
    saveActivePath (ap) {
      // console.log(ap.index)
      window.sessionStorage.setItem('activePath', ap.index)
      this.activePath = ap.index
    }
  }
}
</script>

<style lang="less" scoped>
.home-container{
  height: 100%;
}
.el-header{
  display: flex;
  background-color: #19191B;
  align-items: center;
  justify-content: space-between;
  img{
    height: 67px;
    width: 270px;
  }
}
.el-aside{
  background-color: #545c64;
}
.el-main{
  background-color: #EBEEF5;
}
</style>
