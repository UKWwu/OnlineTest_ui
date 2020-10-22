<template>
  <div id="app">

    <div class="kj">
      <div class="dl">
        <i class="el-icon-s-home" style="font-size:45px"> </i>
        <span style="color: #666666;font-weight:bold;font-size: 40px">在线笔试平台</span>
      </div>
      <div class="inp">
        <div class="djg"></div>
        <span class="font-dl">登录</span>
        <div class="jg"></div>
        <el-input v-model="input" placeholder="请输入账号" style="width: 80%"></el-input>
        <div class="jg"></div>
        <el-input v-model="input" placeholder="请输入密码" style="width: 80%"></el-input>
        <div class="jg"></div>
        <el-button type="primary">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "HomePage"
    }
</script>

<style scoped>
  html,body{
    padding: 0px;
    margin: 0px;
  }
  #app {
    text-align: center;
    background-image: url("../assets/proxy.jpg");
    display: block;
    width: 1920px;
    height: 937px;
  }
  .kj{
    width: 60%;
    position:absolute;
    left:20%;
    height: 95%;
  }

  .dl {
    color: goldenrod;
    float:left;
    margin-top: 10%;
    margin-left: 10%;
  }

  .inp{
    float:right;
    margin-right: 10%;
    margin-top: 20%;
    width: 30%;
    height: 40%;
    background-color:rgba(240,248,255,0.2);
  }
  .font-dl{
    color: black;
    font-size: 30px;
    font-weight:bold;
  }
  .jg{
    width: 1px;
    height: 5%;
  }
  .djg{
    width: 1px;
    height: 15%;
  }
</style>
