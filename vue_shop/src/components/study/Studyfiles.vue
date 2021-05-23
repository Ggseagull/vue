<template>
    <div>
      <el-card>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>学习资料</el-breadcrumb-item>
          <el-breadcrumb-item>课程</el-breadcrumb-item>
          <el-breadcrumb-item>资料</el-breadcrumb-item>
        </el-breadcrumb>
        <!--<template>-->
         <!--<input class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg,*.pdf,*.txt" @change="update"/>-->
        <!--</template>-->
        <el-upload
          multiple
          :limit="3"
          class="upload-demo"
          action="/study/upload"
          :on-preview="handlePreview"
          :before-remove="beforeRemove">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传'txt','pdf','jpg','jpeg'文件，且一次性只能上传3个文件</div>
        </el-upload>
        <template>
          <el-table :data="tableData.filter(data => !search || data.file_name.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
            <el-table-column label="Date" prop="create_time"></el-table-column>
            <el-table-column label="Name" prop="file_name"></el-table-column>
            <el-table-column align="right">
              <template slot="header" slot-scope="scope">
                <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
              </template>
              <template slot-scope="scope">
                <el-button size="mini" @click="downloadFile(scope.row)">下载</el-button>
                <!--<el-button size="mini" type="danger">删除</el-button>-->
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-card>
    </div>
</template>

<script>
// import axios from 'axios'
export default {
  name: 'Studyfiles',
  data () {
    return {
      search: '',
      file: {},
      tableData: [],
      href: '/download?fileId=',
      fileName: '',
      count: {}
      // update (e) {
      //   const file = e.target.files[0]
      //   console.log(file.name)
      //   const param = new FormData()// 创建form对象
      //   param.append('file', file)
      //   param.append('filename', file.name)
      //   console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
      //   axios.post('http://127.0.0.1:5000/study/upload', param, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }) // 请求头要为表单
      //     .then(response => {
      //       console.log(response.data)
      //     })
      //     .catch(function (error) {
      //       console.log(error)
      //     })
      // }
    }
  },
  created () {
    this.getFileName()
    this.countView()
  },
  methods: {
    handlePreview (file) {
      console.log(file.response.data)
      this.file = file.response.data
      console.log(this.file)
    },
    beforeRemove (file) {
      return this.$confirm(`确定移除 ${ file.response.data.file_name }？`)
    },
    async downloadFile (row) {
    // const { data: res } = await this.$axios.post('/download?fileId=基于Flask框架的展示型网站的设计与实现_马旭_.pdf')
    // console.log(res)
    // console.log(row)
      this.fileName = row.file_name
      // console.log(this.href + this.fileName)
      window.location.href = this.href + this.fileName
    },
    async getFileName () {
      const { data: res } = await this.$axios.get('/getFile')
      // console.log(res)
      this.tableData = res.data.filedata
    },
    async countView () {
      this.count.study_count = 1
      const { data: res } = await this.$axios.put('/user/record', this.$qs.stringify(this.count))
      if (res.status !== 200) return this.$msg.error(res.msg)
    }
  }
}
</script>

<style scoped lang="less">
.el-card{
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
