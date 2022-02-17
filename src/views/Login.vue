<template>
  <div style="width: 100%;height: 100vh;background-color: rgba(0,47,167,0.56); overflow: hidden">
    <div
        style="width: 390px ;margin: 140px auto;border: black 1px solid;background-color: rgba(255,255,255,0.73);border-radius: 5px">
      <div style="color: black;font-size: 28px;text-align: center;padding: 30px">欢迎登录</div>
      <el-form ref="form" :model="form" label-width="20%">
        <el-form-item label="用户名" style="width: 95%">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" style="width: 95%">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item style="width: 95%">
          <el-button style="width: 88%" @click="login" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import request from "../utils/request";
import {ElMessage} from "element-plus";

export default {
  name: "Login",
  data() {
    return {
      form: {
        username: null,
        password: null,
      },
    }
  },
  created() {

  },
  methods: {
    login() {
      if (this.form.username==null||this.form.password==null||this.form.username.indexOf(" ")>0||this.form.password.indexOf(" ")>0){
        ElMessage.warning("用户名或密码不得为空或含有空格！！");
      }else {
        request.post("/user/login", this.form).then(res => {
          console.log(res);
          if (res.code === '1' && res.flag === true) {
            ElMessage.success("登录成功");
            this.$router.push("/home");
          } else {
            ElMessage.error(res.msg);
          }
          if (res.data.newToken!=null){
            console.log(res.data.newToken);
            localStorage.setItem("userToken",res.data.newToken);
          }
        }, error => {
          ElMessage.error("请求失败");
        })
      }
    },
  },
}
</script>

<style scoped>

</style>