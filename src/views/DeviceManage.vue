<template>
  <div style="padding: 10px">
    <!--搜索区域-->
    <div style="margin: 10px 0">
      <el-button type="primary" size="medium" @click="add">新增</el-button>
    </div>

    <!--搜索区域-->
    <div style="margin: 20px 0">
      <el-input placeholder="请输入device_id" clearable style="width: 260px"></el-input>
      <el-button type="primary" size="medium" @click="">查找</el-button>
    </div>

    <!--表格展示区-->
    <el-table :data="tableData" border style="width: 100%"  >
      <el-table-column prop="device_id" label="DeviceID" sortable />
      <el-table-column prop="topic" label="Topic" />
      <el-table-column prop="host" label="Host" />
      <el-table-column prop="qos" label="Qos" />
      <el-table-column prop="client_id" label="ClientID" />
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
      <el-dialog title="新增设备信息" v-model="dialogVisible" width="500px" :before-close="handleClose">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="device_id">
            <el-input v-model="form.device_id" style="width: 70%"></el-input>
          </el-form-item>
          <el-form-item label="topic">
            <el-input v-model="form.topic" style="width: 70%"></el-input>
          </el-form-item>
          <el-form-item label="host">
            <el-input v-model="form.host" style="width: 70%"></el-input>
          </el-form-item>
          <el-form-item label="qos">
            <el-select v-model="form.qos" placeholder="请选择">
              <el-option label="消息接受至多一次 code: 0"     value="0"></el-option>
              <el-option label="消息接受至少一次 code: 1"     value="1"></el-option>
              <el-option label="消息接受确保只有一次 code: 2"  value="2"></el-option>
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
  created() {
    this.load();
  },
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
          device_id:3,
          topic: "",
          host: "",
          qos: null,
          client_id: null,
        },

      ],
    }
  },
  methods:{
    load(){
      request.get("/device/findPage",{
        params:{
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          search:this.search
        }
      }).then(res => {
        if (res.flag===true){
          console.log(res);
          this.tableData=res.data.list;
          this.total=res.data.total;
        }else {
          //this.$router.push("/login");
          ElMessage.error(res.msg);
        }
      },error => {
        ElMessage.error("加载失败，错误信息："+error.response.status);
      })
    },
    add(){
      this.dialogVisible = true;
      this.form ={};
    },
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