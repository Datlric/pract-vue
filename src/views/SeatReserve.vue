<template>
  <div style="padding: 10px">
    <div style="padding: 10px">
      <el-button type="primary" @click="dialogVisible = true">点击填写申请</el-button>

      <el-dialog
          title="提示"
          v-model="dialogVisible"
          width="30%"
          :before-close="handleClose"
      >
        <el-form
            :label-position="labelPosition"
            label-width="80px"
            :model="formLabelAlign"
        >
          <el-form-item label="座位ID">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="A01"></el-option>
              <el-option label="A03" ></el-option>
              <el-option label="B01" ></el-option>
              <el-option label="C01" ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-col :span="11">
              <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.date1"
                  style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker
                  placeholder="选择时间"
                  v-model="form.date2"
                  style="width: 100%;"
              ></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-col :span="11">
              <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.date3"
                  style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker
                  placeholder="选择时间"
                  v-model="form.date4"
                  style="width: 100%;"
              ></el-time-picker>
            </el-col>
          </el-form-item>
        </el-form>
        <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
        </template>
      </el-dialog>
    </div>
    <div style="padding: 10px">
      <h3 style="padding: 10px;color: #3b3a3a">目前可用座位</h3>
      <el-table :data="tableData" height="250" border style="width: 100%;height: 350px">
        <el-table-column sortable prop="device_id" label="ID" > </el-table-column>
        <el-table-column prop="area" label="所在区域" > </el-table-column>
        <el-table-column prop="status" label="状态" > </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "SeatReserve",
  data() {
    return {
      dialogVisible: false,
      labelPosition: 'right',
      form:{
        region:'请选择',
        date1:'',
        date2:'',
        date3:'',
        date4:''
      },
      formLabelAlign: {
        name: '',
        region: '',
        type: '',
      },
      tableData: [
        {
          device_id: 'A01',
          area: '一层东区',
          status: '可用',
        },
        {
          device_id: 'A02',
          area: '一层西区',
          status: '不可用',
        },
        {
          device_id: 'A03',
          area: '一层北区',
          status: '可用',
        },
        {
          device_id: 'B01',
          area: '二层东区',
          status: '可用',
        },
        {
          device_id: 'B02',
          area: '二层西区',
          status: '不可用',
        },
        {
          device_id: 'C01',
          area: '三层东区',
          status: '可用',
        },
      ],
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then((_) => {
            done()
          })
          .catch((_) => {})
    },
  },
}
</script>

<style scoped>
.el-button {
  margin-left: 5px;
}
</style>