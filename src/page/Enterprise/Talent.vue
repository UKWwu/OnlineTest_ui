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
          <el-main style="width: 100%;height: 100%;background-color: white">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>首页</el-breadcrumb-item>
              <el-breadcrumb-item>人才库管理</el-breadcrumb-item>
            </el-breadcrumb>

            <div style="width: 100%;margin-top: 5%;margin-bottom: 5%">
              <el-input v-model="input" placeholder="请输入关键字搜索" style="width: 20%"></el-input>
              <el-button type="primary" icon="el-icon-search">搜索</el-button>
              <el-button type="primary" style="float: right">
                新增候选人
              </el-button>
              <el-button type="primary" style="float: right;margin-right: 5px">
                批量上传
              </el-button>
            </div>
            <el-table
              :data="tableData"
              border
              style="width: 100%">
              <el-table-column
                fixed
                prop="name"
                label="候选人姓名"
                width="150">
              </el-table-column>
              <el-table-column
                prop="xinxi"
                label="性别"
                width="120">
              </el-table-column>
              <el-table-column
                prop="fuzeren"
                label="学历"
                width="120">
              </el-table-column>
              <el-table-column
                prop="dizhi"
                label="学校"
                width="120">
              </el-table-column>
              <el-table-column
                prop="time"
                label="笔试成绩"
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
    name: "Enterprise_talent",
    data() {
      return {
        userType: "",
        userName: "",
        tableData: [{
          name: "张三",
          time: "70",
          remark: "",
          dizhi: "重庆理工大学",
          fuzeren: "本科",
          xinxi: "男"
        }, {
          name: "李四",
          time: "80",
          remark: "",
          dizhi: "重庆理工大学",
          fuzeren: "本科",
          xinxi: "男"
        }, {
          name: "小青蛙",
          time: "60",
          remark: "",
          dizhi: "重庆理工大学",
          fuzeren: "本科",
          xinxi: "女"
        }
        ],
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
