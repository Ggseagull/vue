<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入用户名" v-model="queryInfo.name">
            <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-table :data="userList" border style="width: 100%">
            <el-table-column prop="id" label="ID" ></el-table-column>
            <el-table-column prop="name" label="账号"></el-table-column>
            <el-table-column prop="nick_name" label="昵称"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="phone" label="电话"></el-table-column>
            <el-table-column prop="role_name" label="角色"></el-table-column>
            <el-table-column prop="control" label="操作" width="250px">
              <template slot-scope="scope">
                <el-button size="mini" @click="showEdit(scope.row)">编辑</el-button>
                <el-button size="mini" type="warning" @click="showReset(scope.row)">重置</el-button>
                <el-button size="mini" type="danger" @click="showDel(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pnum"
            :page-sizes="[1, 2, 5, 10]"
            :page-size="queryInfo.psize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-col>
      </el-row>
    </el-card>
    <!-- 用户新增窗口 -->
    <el-dialog title="新增用户" :visible.sync="addDialogVisible" width="30%" :before-close="addFormClose">
      <el-form ref="addFormRef" :model="addForm" label-width="80px" :rules="addFormRules">
        <el-form-item label="账号" prop="name">
          <el-input v-model="addForm.name" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="addForm.pwd" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="real_pwd">
          <el-input v-model="addForm.real_pwd" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nick_name">
          <el-input v-model="addForm.nick_name" prefix-icon="el-icon-edit"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" prefix-icon="el-icon-message"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="addForm.phone" prefix-icon="el-icon-phone-outline"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="addForm.role_name" placeholder="请选择角色">
            <el-option :label="r.name" :value="r.id" v-for="r in roles" :key='r.id'></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addFormClose">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 用户编辑窗口 -->
    <el-dialog title="编辑用户" :visible.sync="editDialogVisible" width="30%">
      <el-form ref="editFormRef" :model="editForm" label-width="80px" :rules="editFormRules">
        <el-form-item label="账号" prop="name">
          <el-input v-model="editForm.name" prefix-icon="el-icon-user" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nick_name">
          <el-input v-model="editForm.nick_name" prefix-icon="el-icon-edit" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" prefix-icon="el-icon-message"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="editForm.phone" prefix-icon="el-icon-phone-outline"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="editForm.role_name" placeholder="请选择角色">
            <el-option :label="r.name" :value="r.id" v-for="r in roles" :key='r.id'></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 确认删除窗口 -->
    <el-dialog title="提示" :visible.sync="delUserVisible" width="20%">
      <span>确认删除？（账号:{{ delName }},姓名:{{ delNickName }}）</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="delUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 确认重置密码窗口 -->
    <el-dialog title="提示" :visible.sync="resetUserVisible" width="20%">
      <span>确认重置为初始密码？（账号:{{ resetName }},姓名:{{ resetNickName }}）</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="resetUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Userlist',
  data () {
    const checkPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.addForm.pwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const checkEmail = (rule, value, callback) => {
      // 定义一个正则 来验证邮箱
      const emailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (emailReg.test(value)) {
        return callback()
      }
      return callback(new Error('请输入有效的邮箱号'))
    }
    const checkPhone = (rule, value, callback) => {
      // 定义一个正则 来验证手机号
      const phoneReg = /^1[3|4|5|7|8]\d{9}$/
      if (phoneReg.test(value)) {
        return callback()
      }
      return callback(new Error('请输入有效的手机号'))
    }
    return {
      userList: [],
      queryInfo: {
        name: '',
        pnum: 1,
        psize: 10
      },
      total: 0,
      addDialogVisible: false,
      editDialogVisible: false,
      delUserVisible: false,
      resetUserVisible: false,
      addForm: {},
      editForm: {},
      delName: '',
      delNickName: '',
      resetName: '',
      resetNickName: '',
      roles: [],
      delId: '',
      resetId: '',
      addFormRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        real_pwd: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { validator: checkPwd, trigger: 'blur' }
        ],
        nick_name: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        email: [
          { validator: checkEmail, trigger: 'blur' }
        ],
        phone: [
          { validator: checkPhone, trigger: 'blur' }
        ]
      },
      editFormRules: {
        email: [
          { validator: checkEmail, trigger: 'blur' }
        ],
        phone: [
          { validator: checkPhone, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getUserList()
    this.getRole()
  },
  methods: {
    // 定义一个 获取用户列表方法
    async getUserList () {
      const { data: res } = await this.$axios.get('/user/user_list', { params: this.queryInfo })
      // console.log(res.data.users)
      // 判断如果传参失败 则返回异常
      // console.log(res.data.totalPage)
      if (res.status !== 200) return this.$msg.error(res.msg)
      this.userList = res.data.users
      this.total = res.data.totalPage
    },
    handleSizeChange (val) {
      this.queryInfo.psize = val
      this.getUserList()
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.queryInfo.pnum = val
      // 获取用户列表
      this.getUserList()
      // console.log(`当前页: ${val}`)
    },
    searchUser () {
      this.queryInfo.pnum = 1
      this.getUserList()
    },
    // 重置新增用户的表单
    addFormClose () {
      this.$refs.addFormRef.resetFields()
      this.addDialogVisible = false
    },
    // 增加新用户
    addUser () {
      // 发送请求，验证数据是否规范
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        // 发送请求
        const { data: res } = await this.$axios.post('/user/user', this.$qs.stringify(this.addForm))
        // 验证结果
        if (res.status !== 200) return this.$msg.error(res.msg)
        this.$msg.success(res.msg)
        // 隐藏窗口
        this.addDialogVisible = false
        // 初始化表单
        this.$refs.addFormRef.resetFields()
        // 重新获取用户列表
        this.getUserList()
      })
    },
    // 显示用户编辑窗口
    async showEdit (row) {
      // console.log(row)
      // 发送请求，获取后台实时数据
      const { data: res } = await this.$axios.get('/user/user', { params: { id: row.id } })
      if (res.status !== 200) return this.$msg.error(res.msg)
      // console.log(res)
      this.editForm = res.data
      // 显示窗口
      this.editDialogVisible = true
    },
    // 修改用户信息
    editUser () {
      this.$refs.editFormRef.validate(async valid => {
        // 验证数据是否规范
        if (!valid) return
        // 发送请求
        const { data: res } = await this.$axios.put('/user/user', this.$qs.stringify(this.editForm))
        // 验证结果
        if (res.status !== 200) return this.$msg.error(res.msg)
        this.$msg.success(res.msg)
        this.editDialogVisible = false
        this.getUserList()
      })
    },
    showDel (row) {
      this.delUserVisible = true
      this.delName = row.name
      this.delId = row.id
      this.delNickName = row.nick_name
    },
    async delUser () {
      // 发送请求
      const { data: res } = await this.$axios.delete('/user/user', { data: { id: this.delId } })
      // 验证结果
      if (res.status !== 200) return this.$msg.error(res.msg)
      this.$msg.success(res.msg)
      this.delUserVisible = false
      this.getUserList()
    },
    showReset (row) {
      this.resetUserVisible = true
      this.resetName = row.name
      this.resetNickName = row.nick_name
      this.resetId = row.id
    },
    async resetUser () {
      const { data: res } = await this.$axios.get('user/reset', { params: { id: this.resetId } })
      if (res.status !== 200) return this.$msg.error(res.msg)
      this.$msg.success(res.msg)
      this.resetUserVisible = false
    },
    // 获取所有角色
    async getRole () {
      const { data: res } = await this.$axios.get('/role')
      if (res.status !== 200) return this.$msg.error(res.msg)
      this.roles = res.data
    }
  }
}
</script>

<style scoped lang="less">
.el-table{
  margin-top: 12px;
  margin-bottom: 10px;
}
</style>
