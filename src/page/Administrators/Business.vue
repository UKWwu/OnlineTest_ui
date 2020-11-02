<template>
  <el-container style="background-color: #faebd7;height: 100%">
    <el-container style="height: 100%; border: 1px solid #eee;">
      <el-header style="text-align: right; font-size: 18px">
        <div style="color: white;font-size: 40px;float: left;margin-left: 20%">在线笔试系统</div>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 1px;font-size: 20px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item  @click.native = "logOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span style="margin-right: 20%">{{userName}}</span>
      </el-header>
      <div style="width: 60%;margin-left: 20%;height: 100%">
        <el-container style="height: 100%">
          <el-aside width="20%" style="background-color: rgb(238, 241, 246);height: 100%">
            <el-menu default-active="1-4-1" style="height: 100%" class="el-menu-vertical-demo" :default-active="this.$router.path"
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
          <el-main style="width: 100%;height: 100%;background-color: white">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>首页</el-breadcrumb-item>
              <el-breadcrumb-item>企业管理</el-breadcrumb-item>
            </el-breadcrumb>
            <div style="width: 100%;margin-top: 5%;margin-bottom: 10%">
              <el-button type="primary" style="float: right;margin-right: 15%">
                新增企业
              </el-button>
            </div>

            <el-row :gutter="20" >
              <el-col :span="6" style="margin-top: 5%" v-for="(user,o) in tableData" :key="o"  :offset="1">
                <el-card :body-style="{ padding: '0px' }">
                  <img :src="user.src" class="image">
                  <div style="padding: 14px;">
                    <span>{{user.name}}</span>
                    <div class="bottom clearfix">
                      <el-button type="primary" class="button" size="mini">管理公司信息</el-button>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>

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
    components: {},
    name: "Administrators_business",
    data() {
      return {
        isCollapse: false,
        userType:"",
        userName:"",
        tableData: [{
          name:"腾讯",
          time:"2020-11-2",
          remark:"这是腾讯公司",
          dizhi:"深圳",
          fuzeren:"马化腾",
          src:require('../../assets/img/腾讯.jpg'),
          xinxi:"课程设计专用"
        },{
          name:"阿里巴巴",
          time:"2020-11-2",
          remark:"这是阿里巴巴",
          dizhi:"杭州",
          fuzeren:"马云",
          src:require('../../assets/img/阿里巴巴.jpg'),
          xinxi:"课程设计专用"
        },{
          name:"360",
          time:"2020-11-2",
          remark:"这是360",
          dizhi:"深圳",
          fuzeren:"小青蛙",
          src:require('../../assets/img/360.jpg'),
          xinxi:"课程设计专用"
        },{
          name:"微店",
          time:"2020-11-2",
          remark:"这是微店公司",
          dizhi:"杭州",
          src:require('../../assets/img/微店.jpg'),
          fuzeren:"张鑫",
          xinxi:"课程设计专用"
        }
        ],
      }
    },
    methods: {
      logOut(){
        coo.clearCookie();
        this.$router.push({name: 'HomePage', params: {}});
      },
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

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    float: right;
  }

  .image {
    width: 100%;
    height: 180px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }


</style>
