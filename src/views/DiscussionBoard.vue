<template>
  <div style="padding: 10px">
    <h2 style="margin-left: 10px">
      讨论区
    </h2>
    <div style="padding: 10px">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="发条评论？">
          <el-input v-model="formInline.newComment" placeholder="字数不超过60字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="">发送</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div style="padding: 10px;">
      <el-table :data="tableData" style="width: 100%"
                :default-sort="{prop: 'date', order: 'descending'}">
        <el-table-column prop="comment" label="最新评论" width="800px"> </el-table-column>
        <el-table-column prop="user" label="来源用户" width="200px"> </el-table-column>
        <el-table-column sortable prop="date" label="发布时间"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "DiscussionBoard",
  data() {
    return {
      formInline: {
        newComment: '',
      },
      tableData: [
        {
          comment: '大家要不要考虑再新买一批设备？',
          user: '王朗',
          date: '2016-05-02',
        },
        {
          comment: 'A01设备貌似出了点问题，请派维修人员过去看一下',
          user: '赵龙',
          date: '2016-05-04',
        },
        {
          comment: '最近的数据看起来很不错呀',
          user: '王小虎',
          date: '2016-05-01',
        },
        {
          comment: '这电费又涨价了，不过好在我们的设备很节能',
          user: '张枫',
          date: '2016-05-03',
        },
        {
          comment: 'Nice work😀',
          user: 'David',
          date: '2016-05-08',
        },
        {
          comment: '是不是有个设备没电了',
          user: '钱冠',
          date: '2016-05-01',
        },
      ],
    }
  },
}
</script>

<style scoped>
.el-button {
  margin-left: 5px;
}
</style>