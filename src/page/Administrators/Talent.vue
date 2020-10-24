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
        <span style="margin-right: 20%">管理员</span>
      </el-header>
      <div style="width: 60%;margin-left: 20%;height: 100%">
        <el-container style="height: 100%">
          <el-aside width="20%" style="background-color: rgb(238, 241, 246);height: 100%">
            <el-menu default-active="1-4-1" style="height: 100%" class="el-menu-vertical-demo" @open="handleOpen"
                     @close="handleClose" :collapse="isCollapse" :default-active="this.$router.path"
                     router>
              <el-menu-item index="/Administrators_business">
                <i class="el-icon-location"></i>
                <span slot="title">企业管理</span>
              </el-menu-item>
              <el-menu-item index="/Administrators_question">
                <i class="el-icon-menu"></i>
                <span slot="title">题库管理</span>
              </el-menu-item>
              <el-menu-item index="/Administrators_talent">
                <i class="el-icon-document"></i>
                <span slot="title">用户管理</span>
              </el-menu-item>
              <el-menu-item index="/Administrators_system">
                <i class="el-icon-setting"></i>
                <span slot="title">系统设置</span>
              </el-menu-item>
            </el-menu>
          </el-aside>

          <el-main  style="width: 100%;height: 100%;background-color: white">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>首页</el-breadcrumb-item>
              <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            </el-breadcrumb>
            <div style="width: 100%;margin-top: 5%;margin-bottom: 5%">
              <el-input v-model="input" placeholder="请输入关键字搜索" style="width: 20%"></el-input>
              <el-button type="primary" icon="el-icon-search">搜索</el-button>
              <el-button type="primary" style="float: right">
                新增用户
              </el-button>
            </div>
            <el-table
              :data="tableData"
              border
              style="width: 100%">
              <el-table-column
                fixed
                prop="name"
                label="用户名称"
                width="150">
              </el-table-column>
              <el-table-column
                prop="xinxi"
                label="用户类型"
                width="120">
              </el-table-column>
              <el-table-column
                prop="fuzeren"
                label="联系方式"
                width="120">
              </el-table-column>
              <el-table-column
                prop="dizhi"
                label="电子邮箱"
                width="240">
              </el-table-column>
              <el-table-column
                prop="time"
                label="注册时间"
                width="120">
              </el-table-column>
              <el-table-column
                prop="remark"
                label="备注"
                width="300">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="150">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                  <el-button type="text" size="small">编辑</el-button>
                  <el-button type="text" size="small" style="color: red">删除</el-button>
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
    components: {
    },
    name: "Administrators_talent",
    data() {
      return {
        userType:"",
        userName:"",
        isCollapse: false,
        tableData: [{
          name:"腾讯",
          time:"2020-11-2",
          remark:"这是腾讯公司",
          dizhi:"123456789@qq.com",
          fuzeren:"110",
          xinxi:"{{userName}}"
        },{
          name:"阿里巴巴",
          time:"2020-11-2",
          remark:"这是阿里巴巴",
          dizhi:"123456789@qq.com",
          fuzeren:"120",
          xinxi:"管理员"
        },{
          name:"小青蛙",
          time:"2020-11-2",
          remark:"这是360",
          dizhi:"123456789@qq.com",
          fuzeren:"10086",
          xinxi:"个人用户"
        },{
          name:"微店",
          time:"2020-11-2",
          remark:"这是微店公司",
          dizhi:"123456789@qq.com",
          fuzeren:"119",
          xinxi:"管理员"
        }
        ],
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
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
