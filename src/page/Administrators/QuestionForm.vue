<template>
  <el-container style="background-color: #faebd7;height: 100%">
    <el-container style="height: 100%; border: 1px solid #eee;">
      <el-header style="text-align: right; font-size: 18px">
        <div style="color: white;font-size: 40px;float: left;margin-left: 20%">在线笔试系统</div>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 1px;font-size: 20px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span style="margin-right: 20%">{{userName}}</span>
      </el-header>
      <div style="width: 60%;margin-left: 20%;height: 100%">
        <el-container style="height: 100%">
          <el-aside width="20%" style="background-color: rgb(238, 241, 246);height: 100%">
            <el-menu default-active="1-4-1" style="height: 100%" class="el-menu-vertical-demo"  :default-active="this.$router.path"
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
            <el-page-header @back="goback" content="新增题目" v-if="this.formType == 'add'">
            </el-page-header>
            <el-page-header @back="goback" content="编辑题目" v-if="this.formType == 'update'">
            </el-page-header>
            <el-page-header @back="goback" content="查看题目" v-if="this.formType == 'display'">
            </el-page-header>

            <el-form :model="question" label-width="80px" :rules="rules" ref="question"
                     style="margin-left: 15%;width: 70%;margin-top: 5%" size="small" v-bind:disabled="false">
              <el-form-item label="问题名称" prop="name">
                <el-input v-model="question.name" :readonly="readonly ? 'readonly':false"></el-input>
              </el-form-item>
              <el-form-item label="问题类型" prop="problemType">
                <el-input v-model="question.problemType" :readonly="readonly ? 'readonly':false"></el-input>
              </el-form-item>
              <el-form-item label="问题类型" prop="unit">
                <el-select v-model="question.unit" placeholder="请选择问题类型">
                  <el-option label="公共" value="-1"></el-option>
                  <el-option label="腾讯" value="1"></el-option>
                  <el-option label="阿里" value="2"></el-option>
                  <el-option label="微店" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="问题标题" prop="title">
                <el-input v-model="question.title" type="textarea" :readonly="readonly ? 'readonly':false"
                          :rows="3"></el-input>
              </el-form-item>
              <el-form-item label="选项A" prop="contentA">
                <el-input v-model="question.contentA" type="textarea" :readonly="readonly ? 'readonly':false"
                          :rows="3"></el-input>
              </el-form-item>
              <el-form-item label="选项B" prop="contentB">
                <el-input v-model="question.contentB" type="textarea" :readonly="readonly ? 'readonly':false"
                          :rows="3"></el-input>
              </el-form-item>
              <el-form-item label="选项C" prop="contentC">
                <el-input v-model="question.contentC" type="textarea" :readonly="readonly ? 'readonly':false"
                          :rows="3"></el-input>
              </el-form-item>
              <el-form-item label="选项D" prop="contentD">
                <el-input v-model="question.contentD" type="textarea" :readonly="readonly ? 'readonly':false"
                          :rows="3"></el-input>
              </el-form-item>
              <el-form-item label="正确选项" prop="answer">
                <el-input v-model="question.answer" :readonly="readonly ? 'readonly':false"></el-input>
              </el-form-item>
              <div style="margin-left: 45%">
                <el-button type="primary" v-if="formType == 'add'" @click.native="addQuestion">新建</el-button>
                <el-button type="primary" v-if="formType == 'update'" @click.native="updateQuestion">修改</el-button>
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
    name: "Administrators_QuestionForm",
    data() {
      return {
        readonly:false,
        userName: "",
        userId: -1,
        formType: "add",
        question: {
          id: "",
          name: "",
          problemType: "",
          title: "",
          contentA: "",
          contentB: "",
          contentC: "",
          contentD: "",
          answer:"",
          content:"",
          unitName: "",
          adm:"y",
        },
        rules: {
          name: [
            {required: true, message: '请输入题目名称', trigger: 'blur'}
          ],
          problemType: [
            {required: true, message: '请输入题目类型', trigger: 'blur'}
          ],
          title: [
            {required: true, message: '请输入问题描述', trigger: 'blur'}
          ],
          contentA: [
            {required: true, message: '请输入问题选项A', trigger: 'blur'}
          ],
          contentB: [
            {required: true, message: '请输入问题选项B', trigger: 'blur'}
          ],
          contentC: [
            {required: true, message: '请输入问题选项C', trigger: 'blur'}
          ],
          contentD: [
            {required: true, message: '请输入问题选项D', trigger: 'blur'}
          ],
          answer: [
            {required: true, message: '请输入正确选项', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      goback() {
        this.$router.push({name: "Administrators_question"});
      },
      addQuestion() {
        this.question.unitName = coo.getCookie("userName");
        this.question.content = this.question.contentA+"&|&"+this.question.contentB+"&|&"+this.question.contentC+"&|&"+this.question.contentD;
        this.$axios.post(
          'http://localhost:8081/EnterpriseQuestion/addQuestion', this.question)
          .then((res) => {
            var list = res.data;
            this.$router.push({name:"Administrators_question"});
          }).catch((err) => {
          console.log(err)
        })
      },
      updateQuestion() {
        this.question.unitName = coo.getCookie("userName");
        this.question.content = this.question.contentA+"&|&"+this.question.contentB+"&|&"+this.question.contentC+"&|&"+this.question.contentD;
        this.$axios.post(
          'http://localhost:8081/EnterpriseQuestion/updateQuestion', this.question)
          .then((res) => {
            var list = res.data;
            this.$router.push({name:"Administrators_question"});
          }).catch((err) => {
          console.log(err)
        })
      },
      findQuestionById(id){
        let problem = {
          id:id
        };
        this.$axios.post(
          'http://localhost:8081/EnterpriseQuestion/findQuestionById', problem)
          .then((res) => {
            this.question = res.data;
          }).catch((err) => {
          console.log(err)
        })
      },
      logOut(){
        coo.clearCookie();
        this.$router.push({name: 'HomePage', params: {}});
      }
    },
    created() {
      this.userName = coo.getCookie("userName");
      this.questionId = this.$route.params.questionId;
      this.formType = this.$route.params.formType;
      if (this.formType == "update") {
        this.findQuestionById(this.questionId);
      } else if(this.formType == "display"){
        this.findQuestionById(this.questionId);
        this.readonly = true;
        this.rules = {}
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
</style>
