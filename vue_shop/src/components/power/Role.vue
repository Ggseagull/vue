<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="10">
        <el-col :span="2">
          <!--<el-button type="primary" icon="el-icon-circle-plus-outline" class="tj" disabled>添加用户</el-button>-->
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-table :data="roleList" border style="width: 60%">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-row :class="['bottom',i === 0?'top':'','rcenter']" v-for="(m,i) in scope.row.menu" :key="m.id">
                  <el-col :span="8">
                    <el-tag>{{m.name}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="14"><el-tag type="success" v-for="sm in m.children" :key="sm.id">{{sm.name}}</el-tag></el-col>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column prop="id" label="ID" ></el-table-column>
            <el-table-column prop="name" label="权限名称"></el-table-column>
            <el-table-column prop="desc" label="权限描述"></el-table-column>
            <el-table-column prop="control" label="操作" width="300px">
              <template slot-scope="scope">
                <el-button size="mini" icon="el-icon-edit" disabled>编辑</el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" disabled>删除</el-button>
                <el-button size="mini" type="warning" icon="el-icon-setting" @click="showMenuDialog(scope.row)">分配权限</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog title="分配权限" :visible.sync="menuDialogVisible" width="30%" :before-close="handleClose">
      <el-tree ref="treeRef" :default-checked-keys="keyList" node-key="id" :data="menuList" :props="menuProps" default-expand-all show-checkbox></el-tree>
      <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose()">取 消</el-button>
      <el-button type="primary" @click="editMenu()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default
{
  name: 'Role',
  data () {
    return {
      roleList: [],
      menuDialogVisible: false,
      menuProps: {
        label: 'name',
        children: 'children'
      },
      menuList: [],
      keyList: [],
      rid: 0
    }
  },
  created () {
    this.getRoleList()
  },
  methods: {
    async getRoleList () {
      const { data: res } = await this.$axios.get('/role', { params: { type: 'list' } })
      // console.log(res)
      if (res.status !== 200) return this.$msg.error(res.msg)
      this.roleList = res.data
    },
    showMenuDialog (row) {
      this.rid = row.id
      this.getMenuList()
      this.menuDialogVisible = true
      this.getMenuKey(row.menu)
    },
    handleClose () {
      this.keyList = []
      this.menuDialogVisible = false
    },
    async getMenuList () {
      const { data: resp } = await this.$axios.get('/menu')
      if (resp.status !== 200) return this.$msg.error(resp.msg)
      this.menuList = resp.data
    },
    getMenuKey (menu) {
      menu.forEach(item => {
        item.children.forEach(i => {
          this.keyList.push(i.id)
        })
      })
    },
    async editMenu () {
      console.log(this.rid)
      const mids = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      // console.log(mids)
      const midStr = mids.join(',')
      const { data: resp } = await this.$axios.post(`/set_menu/${this.rid}`, this.$qs.stringify({ mids: midStr }))
      if (resp.status !== 200) return this.$msg.error(resp.msg)
      this.$msg.success(resp.msg)
      this.getRoleList()
      this.handleClose()
    }
  }
}
</script>

<style scoped lang="less">
  .el-tag{
    margin: 10px;
  }
  .top{
    border-top:1px solid #EBEEF5;
  }
  .bottom{
    border-bottom:1px solid #EBEEF5;
  }
  .tj{
    margin-bottom: 10px;
  }
  .rcenter{
    display: flex;
    align-items: center;
  }
</style>
