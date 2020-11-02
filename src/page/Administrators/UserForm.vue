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
          <el-main style="width: 100%;height: 100%;background-color: white">
            <el-page-header @back="goback" content="新增用户" v-if="this.formType == 'add'">
            </el-page-header>
            <el-page-header @back="goback" content="编辑用户" v-if="this.formType == 'update'">
            </el-page-header>
            <el-page-header @back="goback" content="查看用户" v-if="this.formType == 'display'">
            </el-page-header>

            <el-form :model="user" label-width="100px" :rules="rules"
                     style="margin-left: 15%;width: 70%;margin-top: 5%" size="small" v-bind:disabled="false">
              <el-form-item label="账号名称" prop="userName">
                <el-input v-model="user.userName" :readonly="readonly ? 'readonly':false"></el-input>
              </el-form-item>
              <el-form-item label="账户" prop="userAccount">
                <el-input v-model="user.userAccount" :readonly="readonly ? 'readonly':false"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="user.password" :readonly="readonly ? 'readonly':false"></el-input>
              </el-form-item>
              <el-form-item label="用户类型" prop="userTypeName">
                <el-select v-model="user.userTypeName" placeholder="请选择用户类型" v-if="!readonly">
                  <el-option label="个人用户" value="个人用户"></el-option>
                  <el-option label="企业用户" value="企业用户"></el-option>
                  <el-option label="管理员" value="管理员"></el-option>
                </el-select>
                <el-input v-model="user.userTypeName" :readonly="'readonly'" v-else></el-input>
              </el-form-item>
              <el-form-item label="电话" prop="userTel">
                <el-input v-model="user.userTel" :readonly="readonly ? 'readonly':false"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="userEmai">
                <el-input v-model="user.userEmai" :readonly="readonly ? 'readonly':false"></el-input>
              </el-form-item>
              <el-form-item label="备注" prop="remark">
                <el-input v-model="user.remark" type="textarea" :readonly="readonly ? 'readonly':false"
                          :rows="3"></el-input>
              </el-form-item>
              <div style="margin-left: 45%">
                <el-button type="primary" v-if="formType == 'add'" @click.native="addUser">新建</el-button>
                <el-button type="primary" v-if="formType == 'update'" @click.native="updateUser">修改</el-button>
              </div>
            </el-form>
          </el-main>
        </el-container>
      </div>
    </el-container>
  </el-container>
</template>

<script>
  import coo from '../cookie'

  export default {
    name: "UserForm",
    data(){
      return{
        userName:"",
        formType:"",
        readonly:false,
        user:{},
        rules:{
          userName: [
            {required: true, message: '请输入账号名称', trigger: 'blur'}
          ],
          userAccount: [
            {required: true, message: '请输入账号', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods:{
      logOut(){
        coo.clearCookie();
        this.$router.push({name: 'HomePage', params: {}});
      },
      goback(){
        this.$router.push({name: 'Administrators_talent', params: {}});
      },
      findUser(id){
        let re = {
          targetID:id
        }
        this.$axios.post(
          'http://localhost:8081/User/findUser', re)
          .then((res) => {
            this.user = res.data;
          }).catch((err) => {
          console.log(err)
        })
      },
      addUser(){
        this.$axios.post(
          'http://localhost:8081/User/addUser', this.user)
          .then((res) => {
            this.$router.push({name: 'Administrators_talent', params: {}});
          }).catch((err) => {
          console.log(err)
        })
      },
      updateUser(){
        this.$axios.post(
          'http://localhost:8081/User/updateUser', this.user)
          .then((res) => {
            this.$router.push({name: 'Administrators_talent', params: {}});
          }).catch((err) => {
          console.log(err)
        })
      }
    },
    mounted() {
      this.userName = coo.getCookie("userName");
      this.formType = this.$route.params.formType;
      if(this.formType == "display"){
        this.rules = {};
        this.readonly = true;
      }
      this.userId = this.$route.params.userId;
      if(this.userId != -1)
        this.findUser(this.userId);
      else
        this.user = {}
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
