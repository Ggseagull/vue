<template>
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
</template>

<script>
export default {
  data () {
    return {
      editDialogVisible: false,
      editForm: {},
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
  methods: {
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
    }
  }
}
</script>

<style scoped>

</style>
