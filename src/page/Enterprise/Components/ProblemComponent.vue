<template>
  <div>
    <div class="left">
      <div class="leftButtonDiv">
        <button class="leftButton" style="background-color: #202897;color: white">新增试题</button>
        <button class="leftButton" style="background-color: #F4B335;" @click="">模板下载</button>
        <button class="leftButton" style="border-color: white;" @click="excelDialogVisible = true">批量上传</button>
      </div>
    </div>
    <div class="right">
    </div>
    <div>
      <el-dialog
        title="选择文件进行批量上传"
        :visible.sync="excelDialogVisible"
        width="30%"
        center>
        <span>需要注意的是内容是默认不居中的</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="excelDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="excelDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ProblemComponet",
    data(){
      return{
        excelDialogVisible:true,
      }
    },
    methods: {}
  }
</script>

<style scoped>
  .left {
    width: 14%;
    height: 94vh;
    float: left;
    border-right-color: #e9ebed;
    border-right-width: 1px;
    border-right-style: solid;
    background-color: #fafbfc;
  }

  .right {
    width: 85%;
    height: 94vh;
    float: right;
  }

  .leftButtonDiv {
    width: 100%;
    height: 30%;
    display: flex;
    background-color: #fafbfc;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .leftButton {
    width: 70%;
    height: 20%;
    border: none;
    cursor: pointer;
    margin-top: 20px;
  }

  .excelTag {
    width: 70vh;
    height: 80vw;
    background-color: black;
  }
</style>
