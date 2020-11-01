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
            <el-page-header @back="goback" content="新增题目" v-if="this.formType == 'add'">
            </el-page-header>
            <el-page-header @back="goback" content="编辑题目" v-if="this.formType == 'update'">
            </el-page-header>
            <el-page-header @back="goback" content="查看题目" v-if="this.formType == 'display'">
            </el-page-header>


            <el-form :model="talent" label-width="100px" :rules="rules" ref="question"
                     style="margin-left: 15%;width: 70%;margin-top: 5%" size="small" v-bind:disabled="false">
              <el-form-item label="候选人姓名" prop="name">
                <el-input v-model="talent.name" :readonly="readonly ? 'readonly':false"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="sex">
                <el-input v-model="talent.sex" :readonly="readonly ? 'readonly':false"></el-input>
              </el-form-item>
              <el-form-item label="学历" prop="education">
                <el-input v-model="talent.education" :readonly="readonly ? 'readonly':false"></el-input>
              </el-form-item>
              <el-form-item label="学校" prop="school">
                <el-input v-model="talent.school" :readonly="readonly ? 'readonly':false"></el-input>
              </el-form-item>
              <el-form-item label="笔试批次" prop="testName" v-if="formType == 'display'">
                <el-input v-model="talent.testName" :readonly="'readonly'"></el-input>
              </el-form-item>
              <el-form-item label="笔试成绩" prop="grade" v-if="formType == 'display'">
                <el-input v-model="talent.grade" :readonly="'readonly'"></el-input>
              </el-form-item>
              <el-form-item label="备注" prop="remark">
                <el-input v-model="talent.remark" type="textarea" :readonly="readonly ? 'readonly':false"
                          :rows="3"></el-input>
              </el-form-item>
              <div style="margin-left: 45%">
                <el-button type="primary" v-if="formType == 'add'" @click.native="addTalent">新建</el-button>
                <el-button type="primary" v-if="formType == 'update'" @click.native="updateTalent">修改</el-button>
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
    name: "Enterprise_examination",
    data(){
      return{
        userName:"",
        formType:"",
        readonly:false,
        talentId:-1,
        talent:{
          name:"",
          education:"",
          school:"",
          sex:"",
          remark:""
        },
        rules:{
          name: [
            {required: true, message: '请输入候选人名称', trigger: 'blur'}
          ],
          education: [
            {required: true, message: '请输入学历', trigger: 'blur'}
          ],
          school: [
            {required: true, message: '请输入候选人院校', trigger: 'blur'}
          ],
        }
      }
    },
    methods:{
      goback(){
        this.$router.push({name:'Enterprise_talent'});
      },
      addTalent(){
        this.talent.userName = coo.getCookie("userName");
        this.$axios.post(
          'http://localhost:8081/EnterpriseTalent/addTalent', this.talent)
          .then((res) => {
            var list = res.data;
            this.$router.push({name:"Enterprise_talent"});
          }).catch((err) => {
          console.log(err)
        })
      },
      updateTalent(){
        this.talent.userName = coo.getCookie("userName");
        this.$axios.post(
          'http://localhost:8081/EnterpriseTalent/updateTalent', this.talent)
          .then((res) => {
            var list = res.data;
            this.$router.push({name:"Enterprise_talent"});
          }).catch((err) => {
          console.log(err)
        })
      },
      findTalent(id){
        let req ={
          targetID : id
        };
        this.$axios.post('http://localhost:8081/EnterpriseTalent/findTalent',req)
          .then((res) => {
            this.talent =  res.data;
          }).catch((err) => {
          console.log(err)
        })
      },
      logOut(){
        coo.clearCookie();
        this.$router.push({name: 'HomePage', params: {}});
      },
    },
    mounted() {
      this.userName = coo.getCookie("userName");
      this.formType = this.$route.params.formType;
      if(this.formType == "display"){
        this.rules = {};
        this.readonly = true;
      }
      this.talentId = this.$route.params.talentId;
      if(this.talentId != -1)
        this.findTalent(this.talentId);
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
