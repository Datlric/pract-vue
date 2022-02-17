<template>
  <div style="height: 50px; line-height: 50px; border-bottom: 1px solid #cccccc; display:flex">
    <div style=" width: 200px;padding-left: 30px;font-weight: bold;color: dodgerblue">后台管理</div>
    <div style="flex: 1"></div>
    <div style="width: 100px">
      <el-dropdown>
      <span class="el-dropdown-link" >
        {{username}}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item @click="logout">退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </template>
      </el-dropdown>

    </div>
  </div>
</template>

<script>
/*import request from "../utils/request.js";*/
import {ArrowDown} from '@element-plus/icons-vue';
import jwtDecode from 'jwt-decode';
import {ElMessage} from "element-plus";
import axios from "axios";

export default {
    components:{
      ArrowDown,
    },
    data(){
      return{
        username:'22',
      }
    },
    mounted() {
      this.init();
    },
    methods:{
      init(){
        let userToken = localStorage.getItem("userToken");
        if (userToken!=null){
          let decode = jwtDecode(userToken);
          this.username= decode.user;
        }
      },
      logout(){
        console.log("logout执行");
        let userToken = localStorage.getItem("userToken");
        //这里如果用自定义的request.js文件会出现报错，header组件会加载失败显示不出来，
        //报错信息：
        //Failed to resolve component: Header If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.
        // at <Layout onVnodeUnmounted=fn<onVnodeUnmounted> ref=Ref< undefined > >
        // at <RouterView>    at <App>
        axios({
          url: '/api/user/logout',
          method: 'post',
          data: {},
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'userToken':userToken,
          }
        }).then(res=>{
           console.log(res.data);
          if (res.data.flag===true){
            localStorage.removeItem("userToken");
            ElMessage.warning(res.data.msg);
            this.$router.push("/login");
          }else {
            localStorage.removeItem("userToken");
          }
        },  error => {
          localStorage.removeItem("userToken");
          ElMessage.error("错误信息："+error.response.status);
          this.$router.push("/login");
        })
      }
    },
  }
</script>


<style scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

</style>