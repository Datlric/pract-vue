<template>
  <div style="padding: 10px">
    <!--搜索区域-->
    <div style="margin: 10px 0">
      <el-button type="primary" size="medium" @click="">新增</el-button>
    </div>

    <!--搜索区域-->
    <div style="margin: 20px 0">
      <el-input placeholder="请输入device_id" clearable style="width: 260px"></el-input>
      <el-button type="primary" size="medium" @click="">查找</el-button>
    </div>

    <!--表格展示区-->
    <el-table :data="tableData" border style="width: 100%"  >
      <el-table-column prop="id" label="ID" sortable />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="nick_name" label="昵称" />
      <el-table-column prop="age" label="年龄" />
      <el-table-column prop="sex" label="性别" />
      <el-table-column prop="address" label="地址" />
      <el-table-column fixed="right" label="操作" >
        <template #default="scope">
          <el-button @click="handleEdit(scope.row)" type="primary" size="small">编辑</el-button>
          <el-popconfirm
              @confirm="confirmEvent(scope.row)"
              confirmButtonText="确定"
              cancelButtonText="取消"
              title="确定删除此行吗？">
            <template #reference>
              <el-button size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!--分页组件-->
    <div style="margin: 10px 0;float: right">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
      >
      </el-pagination>
      <el-dialog title="新增用户信息" v-model="dialogVisible" width="500px" :before-close="handleClose">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="form.username" style="width: 70%"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" style="width: 70%"></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="form.nick_name" style="width: 70%"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="form.age" type="number" style="width: 30%"></el-input>
          </el-form-item>
          <el-form-item label= "性别">
            <el-radio-group v-model="form.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
              <el-radio label="未知"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="地址">
            <el-select v-model="form.address" placeholder="请选择活动区域">
              <el-option label="华中" value="华中"></el-option>
              <el-option label="华北" value="华北"></el-option>
              <el-option label="华南" value="华南"></el-option>
              <el-option label="华东" value="华东"></el-option>
              <el-option label="华西" value="华西"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="">提 交</el-button>
            </span>
        </template>
      </el-dialog>
    </div>


    <h1>
      DeviceManage
    </h1>
  </div>
</template>

<script>
  import request from "../utils/request";
  import { ElMessage } from 'element-plus';
export default {


  name: "DeviceManage",
  data(){
    return{
      dialogVisible: false,
      search:"",
      currentPage:1,
      pageSize:5,
      total:0,
      form: {},
      tableData: [
        {
          id:3,
          username: "",
          password: "",
          nick_name: null,
          age: null,
          sex: "",
          address: ""
        },

      ],
    }
  },
  methods:{
    handleEdit(row){
      this.form = JSON.parse(JSON.stringify(row));
      console.log(this.form);
      this.dialogVisible =true;
    },

    handleSizeChange(val){
      this.pageSize=val;
      console.log(this.pageSize);
    },

    handleCurrentChange(val){
      this.currentPage = val;
      this.pageNum = this.currentPage;
      console.log(this.currentPage);
    },

    handleClose(done) {
      this.$confirm('确认关闭？')
          .then((_) => {
            done()
          })
          .catch((_) => {})
    },
  }
}
</script>

<style scoped>
.el-button{
  margin-left:5px;
}
</style>