<template>
  <div style="padding: 10px">
    <h1 style="color: #d25571 ">
      DataDisplay
    </h1>
    <!--搜索区域-->
    <div style="margin: 20px 0">
      <el-input placeholder="请输入device_id以查找并启动设备" v-model="device_id" clearable style="width: 400px"></el-input>
      <el-button type="primary" size="medium" @click="findDevice">查找</el-button>
    </div>

    <div style="margin: 20px 0">
      <el-input type="textarea" placeholder="此处为搜索结果" v-model="searchResult" clearable style="width: 700px"></el-input>
    </div>

    <div style="margin: 20px 0">
      <el-button type="primary" @click="initDevice" :disabled="initButtonStatus" :loading="initDeviceStatus">启动设备
      </el-button>
      <el-button type="plain" @click="closeDevice" :disabled="closeButtonStatus" :loading="closeDeviceStatus">关闭设备
      </el-button>
      <el-button type="success" @click="receiveData" :disabled="receiveButtonStatus" :loading="receiveDataStatus">
        查看设备已接收的最新数据
      </el-button>
    </div>

    <!--持续接收设备数据的面板-->
    <el-dialog
        title="数据接收"
        v-model="dialogVisible"
        width="40%"
        :before-close="handleClose"
    >
      <el-input type="textarea" v-model="dialogText" :rows="10"></el-input>
      <template #footer>
    <span class="dialog-footer">
      <el-button type="primary" @click="receiveData">再次接收数据</el-button>
      <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
    </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import request from "../utils/request";
import {ElMessage} from "element-plus";

export default {
  name: "DeviceDataAndControl",
  data() {
    return {
      dialogText: "",
      dialogVisible: false,
      device_id: "",
      initDeviceStatus: false,
      closeDeviceStatus: false,
      receiveDataStatus: false,
      searchResult: "null",
      form: {},
      initButtonStatus: false,  //用于判断当前设备是否存在，以禁用下面的按钮
      closeButtonStatus: false,
      receiveButtonStatus: false,
    }
  },
  methods: {
    handleClose(done) {
      //this.dialogText = "";
      this.$confirm('确认关闭？')
          .then((_) => {
            done()
          })
          .catch((_) => {
          })
    },
    findDevice() {
      console.log(this.device_id);
      //查找设备
      request.get("/device/findOne", {
        params: {
          device_id: this.device_id,
        }
      }).then(res => {
        if (res.flag === true) {
          console.log(res);
          this.searchResult = JSON.stringify(res.data);
        } else {
          ElMessage.error(res.msg);
          this.searchResult = res.msg;
        }
      }, error => {
        ElMessage.error("加载失败，错误信息：" + error.response.status);
        this.searchResult = "";
      })

      //查找设备是否已经启动
      request.get("/device/findDeviceIsStarted", {
        params: {
          device_id: this.device_id,
        }
      }).then(res => {
        if (res.flag === true) {
          ElMessage.warning(res.msg);
          this.initButtonStatus = true;  //更新button是否可用，true为已经启动，为不可用，不能再次启动
          this.receiveButtonStatus = false;
          this.closeButtonStatus = false;
        } else {
          ElMessage.info(res.msg);
          this.initButtonStatus = false;  //false为可用
          this.receiveButtonStatus = true;
          this.closeButtonStatus = true;
        }
      }, error => {
        ElMessage.error("加载失败，错误信息：" + error.response.status);
      })

    },
    initDevice() {
      this.initDeviceStatus = true;
      this.form.device_id = this.device_id;
      request.post("/device/init", this.form).then(res => {
        if (res.flag === true) {
          ElMessage.success(res.msg);
          this.initDeviceStatus = false;
        } else {
          ElMessage.error(res.msg);
          this.initDeviceStatus = false;
        }
      }, error => {
        ElMessage.error("指令发送失败，错误信息：" + error.response.status);
        this.initDeviceStatus = false;
      })
    },
    closeDevice() {
      this.closeDeviceStatus = true;
      this.form.device_id = this.device_id;
      request.post("/device/close", this.form).then(res => {
        if (res.flag === true) {
          ElMessage.success(res.msg);
          this.closeDeviceStatus = false;
        } else {
          ElMessage.error(res.msg);
          this.closeDeviceStatus = false;
        }
      }, error => {
        ElMessage.error("指令发送失败，错误信息：" + error.response.status);
        this.closeDeviceStatus = false;
      })
    },
    receiveData() {
      this.dialogText = "";
      this.dialogVisible = true;
      for (let i = 0; i < 10; i++) {
        setTimeout(() => {
          // 方法区
          this.requestData();
        }, (i+1)*3000);
      }
    },
    requestData() {
      let date = new Date();
      this.form.device_id = this.device_id;
      if (this.dialogVisible) {
        request.get("/device/getCurrentMsg", {
          params: {
            device_id: this.device_id,
          }
        }).then(res => {
          if (res.flag === true) {
            //ElMessage.success(res.msg);
            this.dialogText += res.data + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "\n";
          } else {
            ElMessage.error(res.msg);
            this.dialogText = "";
          }
        }, error => {
          ElMessage.error("指令发送失败，错误信息：" + error.response.status);
          this.initDeviceStatus = false;
        })
      }
    }
  },
}
</script>

<style scoped>
.el-button {
  margin-left: 5px;
}
</style>