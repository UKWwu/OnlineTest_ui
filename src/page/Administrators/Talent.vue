<template>
  <el-container style="background-color: #faebd7;height: 100%">
    <el-container style="height: 100%; border: 1px solid #eee;">
      <el-header style="text-align: right; font-size: 18px">
        <div style="color: white;font-size: 40px;float: left;margin-left: 20%">在线笔试系统</div>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 1px;font-size: 20px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native = "logOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span style="margin-right: 20%">{{userName}}</span>
      </el-header>
      <div style="width: 60%;margin-left: 20%;height: 100%">
        <el-container style="height: 100%">
          <el-aside width="20%" style="background-color: rgb(238, 241, 246);height: 100%">
            <el-menu default-active="1-4-1" style="height: 100%" class="el-menu-vertical-demo":default-active="this.$router.path"
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
              <el-input v-model="req.remark" placeholder="请输入关键字搜索" style="width: 20%"></el-input>
              <el-button type="primary" icon="el-icon-search" @click="findAllUser">搜索</el-button>
              <el-button type="primary" style="float: right" @click="addUser">
                新增用户
              </el-button>
            </div>
            <el-table
              :data="tableData"
              border
              style="width: 100%">
              <el-table-column
                fixed
                prop="userName"
                label="用户名称"
                width="150">
              </el-table-column>
              <el-table-column
                prop="userTypeName"
                label="用户类型"
                width="120">
              </el-table-column>
              <el-table-column
                prop="userTel"
                label="联系方式"
                width="120">
              </el-table-column>
              <el-table-column
                prop="userEmai"
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
                  <el-button type="text" size="small" @click="displayUser(scope.row)">查看</el-button>
                  <el-button type="text" size="small" @click="updateUser(scope.row)">编辑</el-button>
                  <el-button type="text" size="small" style="color: red"  @click="deleteUser(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div style="width: 100%;text-align: center;margin-top: 5%;">
              <el-pagination
                background
                :total= number
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper">
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
        number:0,
        userType:"",
        userName:"",
        isCollapse: false,
        selectKey:"",
        tableData: [
        ],
        req:{
          userName:"",
          page:1,
          number:10,
          remark:""
        },
      }
    },
    methods: {
      logOut(){
        coo.clearCookie();
        this.$router.push({name: 'HomePage', params: {}});
      },
      handleSizeChange(val){
        this.req.page = 1;
        this.req.number = val;
        this.findAllUser();
      },
      handleCurrentChange(val){
        this.req.page = val;
        this.findAllUser();
      },
      findAllUser(){
        this.$axios.post(
          'http://localhost:8081/User/finUserList', this.req)
          .then((res) => {
            this.tableData = res.data;
            this.tableData.forEach(
              function (item) {
                if(item.time != null)
                item.time = item.time.substr(0,10);
              }
            )
            this.findUserNumber();
          }).catch((err) => {
          console.log(err)
        })
      },
      findUserNumber(){
        this.$axios.post(
          'http://localhost:8081/User/findUserNumber', this.req)
          .then((res) => {
            this.number = res.data;
          }).catch((err) => {
          console.log(err)
        })
      },
      deleteUser(user){
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let re = {
            targetID:user.id
          };
          this.$axios.post(
            'http://localhost:8081/User/deleteUser', re)
            .then((res) => {
              this.findAllUser();
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }).catch((err) => {
            this.$message({
              type: 'error',
              message: '删除失败'
            });
            console.log(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      addUser(){
        this.$router.push({name:'UserForm',params:{userId:-1,formType:"add"}});
      },
      updateUser(val){
        this.$router.push({name:'UserForm',params:{userId:val.id,formType:"update"}});
      },
      displayUser(val){
        this.$router.push({name:'UserForm',params:{userId:val.id,formType:"display"}});
      }
    },
    mounted() {
      this.userName = coo.getCookie("userName");
      this.findAllUser();
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
