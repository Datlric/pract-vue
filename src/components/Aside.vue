<template>
  <div>
      <el-menu
          style="width: 200px;min-height: calc(100vh - 50px)"
          :default-active='path'
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
      >
        <el-submenu index="1">
          <template #title>
            <el-icon><location /></el-icon>&nbsp;
            <span>系统管理</span>
          </template>
          <el-menu-item index="/home" @click="this.$router.push('/home')">&nbsp;&nbsp;用户管理</el-menu-item>
        </el-submenu>
        <el-menu-item index="/deviceManage" @click="this.$router.push('/deviceManage')">
          <el-icon><icon-menu /></el-icon>&nbsp;
          <span>设备信息管理</span>
        </el-menu-item>
        <el-menu-item index="/deviceDataAndControl" @click="this.$router.push('/deviceDataAndControl')">
          <el-icon><document /></el-icon>&nbsp;
          <span>设备数据及操控</span>
        </el-menu-item>
      </el-menu>
  </div>
</template>

<script>
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
  Key,
} from '@element-plus/icons-vue'

export default {
  name: "Aside",
  components:{
    Location,
    Document,
    IconMenu,
    Setting,
    Key,
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  data(){
    return{
      path:this.$route.path   //设置默认高亮的菜单栏
    }
  }
}
</script>

<style scoped>

</style>