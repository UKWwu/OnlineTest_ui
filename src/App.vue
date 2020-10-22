<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import 'element-ui/lib/theme-chalk/index.css';
  export default {
    name: 'App'
  }
</script>

<style>
  html,body{
    padding: 0px;
    margin: 0px;
  }
  #app {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
</style>
