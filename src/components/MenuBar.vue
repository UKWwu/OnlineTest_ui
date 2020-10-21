<template>
  <div class="rwl">
    <el-row style="height: 100%">
      <el-col :span="24" style="height: 100%">
        <!--<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">-->
          <!--<el-radio-button :label="false">展开</el-radio-button>-->
          <!--<el-radio-button :label="true">收起</el-radio-button>-->
        <!--</el-radio-group>-->
        <el-menu default-active="1-4-1" style="height: 100%" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">企业管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <!--<el-submenu index="1-4">-->
              <!--<span slot="title">选项4</span>-->
              <!--<el-menu-item index="1-4-1">选项1</el-menu-item>-->
            <!--</el-submenu>-->
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="index" v-for="(item,index) in hasChildren" :key="index">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>{{item.label}}</span> </template>
            <el-menu-item-group>
              <el-menu-item :index="subItem.path" v-for="(subItem,subIndex) in item.children" :key="subIndex">
                {{subItem.label}}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "MenuBar",
    data() {
      return {
        isCollapse: false
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
.rwl{
  float: left;
  width: 15%;
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  background-color: white;
}
</style>
