<template>
  <div>
    <el-container style="background-color: #faebd7;height: 100%">
      <el-container style="height: 100%; border: 1px solid #eee;">
        <el-header style="text-align: right; font-size: 18px">
          <div style="color: white;font-size: 40px;float: left;margin-left: 20%">在线笔试系统</div>
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 1px;font-size: 20px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span style="margin-right: 20%">张三</span>
        </el-header>
      </el-container>
    </el-container>
  </div>
</template>

<script>
    export default {
        name: "personalHome"
    }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
</style>
