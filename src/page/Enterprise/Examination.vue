<template>
  <el-container style="background-color: #faebd7;height: 100%">
    <el-container style="height: 100%; border: 1px solid #eee;">
      <el-header style="text-align: right; font-size: 18px">
        <div style="color: white;font-size: 40px;float: left;margin-left: 20%">在线笔试系统</div>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 1px;font-size: 20px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span style="margin-right: 20%">{{userName}}</span>
      </el-header>
      <div style="width: 60%;margin-left: 20%;height: 100%">
        <el-container style="height: 100%">
          <el-aside width="20%" style="background-color: rgb(238, 241, 246);height: 100%">
            <el-menu default-active="1-4-1" style="height: 100%" class="el-menu-vertical-demo" @open="handleOpen"
                     @close="handleClose" :collapse="isCollapse" :default-active="this.$router.path"
                     router>
              <el-menu-item index="/Enterprise_question">
                <i class="el-icon-menu"></i>
                <span slot="title">题库管理</span>
              </el-menu-item>
              <el-menu-item index="/Enterprise_examination">
                <i class="el-icon-document"></i>
                <span slot="title">笔试管理</span>
              </el-menu-item>
              <el-menu-item index="/Enterprise_talent">
                <i class="el-icon-setting"></i>
                <span slot="title">人才库管理</span>
              </el-menu-item>
            </el-menu>
          </el-aside>
          <el-main  style="width: 100%;height: 100%;background-color: white">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>首页</el-breadcrumb-item>
              <el-breadcrumb-item>笔试管理</el-breadcrumb-item>
            </el-breadcrumb>

            <el-button type="primary" icon="el-icon-plus" style="width:50%;margin-top:15px;margin-left: 20%;height: 10%;font-size: 30px" @click.native = "addNewTest">发布新笔试</el-button>

            <el-table
              :data="tableData"
              border
              style="width: 100%;margin-top: 5%">
              <el-table-column
                fixed
                prop="name"
                label="笔试名称"
                width="100">
              </el-table-column>
              <el-table-column
                fixed
                prop="time"
                label="笔试时间"
                width="200">
              </el-table-column>
              <el-table-column
                fixed
                prop="status"
                label="笔试状态"
                width="200">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="200">
                <template slot-scope="scope">
                  <el-button type="primary">查看笔试结果</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div style="width: 100%;text-align: center;margin-top: 5%;">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="10">
              </el-pagination>
            </div>
          </el-main>
        </el-container>
      </div>


    </el-container>
  </el-container>
</template>

<script>
  import coo from '../cookie'
    export default {
        name: "Enterprise_examination",
      data(){
          return{
            userType:"",
            userName:"",
            tableData: [{
              name:"第一次笔试",
              time:2020-1-1,
              status:"已结束",
            },{
              name:"第二次笔试",
              time:2020-3-1,
              status:"已结束",
            },{
              name:"第三次笔试",
              time:2020-5-1,
              status:"已结束",
            },],
          }
      },
      methods:{
        addNewTest(){
          this.$router.push({name:'ReleaseTest',params:{userType:this.userType,userName:this.userName}})
        }
      },
      mounted() {
        this.userName = coo.getCookie("userName");
      }
    }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>
