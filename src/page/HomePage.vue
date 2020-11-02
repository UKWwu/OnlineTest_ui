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
        <el-input v-model="userAccount" placeholder="请输入账号" style="width: 80%"></el-input>
        <div class="jg"></div>
        <el-input v-model="password" type="password" placeholder="请输入密码" style="width: 80%"></el-input>
        <div class="jg">
        </div>
        <el-alert
          style="width: 80%;margin-left: 10%;margin-bottom: 5%"
          v-if="passworderrow"
          :closable="false"
          show-icon
          title="请输入正确的账号和密码"
          type="error">
        </el-alert>
        <el-alert
          style="width: 80%;margin-left: 10%;margin-bottom: 5%"
          v-if="passwordeWarn"
          :closable="false"
          show-icon
          title="该账号已过期"
          type="warning">
        </el-alert>
        <el-button type="primary" @click.native="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import coo from './cookie'
  export default {
    name: "HomePage",
    data() {
      return {
        passworderrow: false,
        passwordeWarn: false,
        userName: "",
        userAccount: "",
        password: "",
        user: {
          userName: "",
          password: "",
        }
      }
    },
    methods: {
      login() {
        this.user.userAccount = this.userAccount;
        this.user.password = this.password;
        this.$axios.post(
          'http://localhost:8081/User/Login', this.user)
          .then((res) => {
            var list = res.data;
            if (list.userType == null) {
              this.passwordeWarn = false;
              this.passworderrow = true;
            } else if (list.userType == "4") {
              this.passwordeWarn = true;
              this.passworderrow = false;
            } else {
              coo.setCookie(list.userAccount, list.userName,list.userType, 365);
              if (list.userType == "1")
                this.$router.push({name: 'Administrators_business', params: {}})
              if (list.userType == "2")
                this.$router.push({name: 'Enterprise_question', params: {}})
              if (list.userType == "3")
                this.$router.push({name: 'AnswerOnline', params: {userId:list.id}})
            }
          }).catch((err) => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>
  html, body {
    padding: 0px;
    margin: 0px;
  }

  #app {
    text-align: center;
    background-image: url("../assets/img/proxy.jpg");
    display: block;
    width: 1920px;
    height: 937px;
  }

  .kj {
    width: 60%;
    position: absolute;
    left: 20%;
    height: 95%;
  }

  .dl {
    color: goldenrod;
    float: left;
    margin-top: 10%;
    margin-left: 10%;
  }

  .inp {
    float: right;
    margin-right: 10%;
    margin-top: 20%;
    width: 30%;
    height: 40%;
    background-color: rgba(240, 248, 255, 0.2);
  }

  .font-dl {
    color: black;
    font-size: 30px;
    font-weight: bold;
  }

  .jg {
    width: 100%;
    height: 5%;
  }

  .djg {
    width: 1px;
    height: 15%;
  }
</style>
