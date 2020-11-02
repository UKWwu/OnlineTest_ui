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
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>首页</el-breadcrumb-item>
              <el-breadcrumb-item>题库管理</el-breadcrumb-item>
            </el-breadcrumb>

            <el-tabs v-model="activeName">
              <el-tab-pane label="公共题库" name="first">
                <div>
                  <div style="width: 100%;margin-bottom: 2%">
                    <el-input v-model="req.remark" placeholder="请输入关键字搜索" style="width: 20%"></el-input>
                    <el-button type="primary" icon="el-icon-search" @click="findAQ">搜索</el-button>
                    <el-button type="primary" style="float: right" @click="addQustion">
                      新增企业题目
                    </el-button>
                  </div>
                  <el-table
                    :data="tableData"
                    border
                    style="width: 100%;">
                    <el-table-column
                      fixed
                      prop="name"
                      label="题目名称"
                      width="150">
                    </el-table-column>
                    <el-table-column
                      prop="problemType"
                      label="题目类型"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="unitName"
                      label="所属单位"
                      width="120">
                    </el-table-column>
                    <!--<el-table-column-->
                    <!--prop="content"-->
                    <!--label="选项"-->
                    <!--width="120">-->
                    <!--</el-table-column>-->
                    <el-table-column
                      prop="answer"
                      label="答案"
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
                        <el-button @click="display(scope.row)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small" @click="update(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" style="color: red" @click="deleteQuestion(scope.row)">删除
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div style="width: 100%;text-align: center;margin-top: 5%;">
                    <el-pagination
                      background
                      :total=number
                      @current-change="handleCurrentChange"
                      @size-change="handleSizeChange"
                      :page-sizes="[10, 20, 30, 40]"
                      :page-size="10"
                      layout="total, sizes, prev, pager, next, jumper">
                    </el-pagination>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="企业题库" name="second">
                <div>
                  <div style="width: 100%;margin-bottom: 2%">
                    <el-input v-model="req2.remark" placeholder="请输入关键字搜索" style="width: 20%"></el-input>
                    <el-button type="primary" icon="el-icon-search" @click="findEQ">搜索</el-button>
                    <el-button type="primary" style="float: right" @click="addQustion">
                      新增企业题目
                    </el-button>
                  </div>
                  <el-table
                    :data="tableData2"
                    border
                    style="width: 100%;">
                    <el-table-column
                      fixed
                      prop="name"
                      label="题目名称"
                      width="150">
                    </el-table-column>
                    <el-table-column
                      prop="problemType"
                      label="题目类型"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="unitName"
                      label="所属单位"
                      width="120">
                    </el-table-column>
                    <!--<el-table-column-->
                    <!--prop="content"-->
                    <!--label="选项"-->
                    <!--width="120">-->
                    <!--</el-table-column>-->
                    <el-table-column
                      prop="answer"
                      label="答案"
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
                        <el-button @click="display(scope.row)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small" @click="update(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" style="color: red" @click="deleteQuestion(scope.row)">删除
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div style="width: 100%;text-align: center;margin-top: 5%;">
                    <el-pagination
                      background
                      :total=number2
                      @current-change="handleCurrentChange2"
                      @size-change="handleSizeChange2"
                      :page-sizes="[10, 20, 30, 40]"
                      :page-size="10"
                      layout="total, sizes, prev, pager, next, jumper">
                    </el-pagination>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>

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
    name: "Administrators_question",
    data() {
      return {
        userType: "",
        userName: "",
        activeName: "first",
        isCollapse: false,
        tableData: [],
        tableData2: [],
        number: 0,
        number2: 0,
        req: {
          userName: "",
          page: 1,
          number: 10,
          type: "公共",
          remark: ""
        },
        req2: {
          userName: "",
          page: 1,
          number: 10,
          type: "企业",
          remark: ""
        },
      }
    },
    methods: {
      logOut() {
        coo.clearCookie();
        this.$router.push({name: 'HomePage', params: {}});
      },
      handleSizeChange(val) {
        this.req.page = 1;
        this.req.number = val;
        this.findAQ();
      },
      handleCurrentChange(val) {
        this.req.page = val;
        this.findAQ();
      },
      handleSizeChange2(val) {
        this.req2.page = 1;
        this.req2.number = val;
        this.findEQ();
      },
      handleCurrentChange2(val) {
        this.req2.page = val;
        this.findEQ();
      },
      findAllQuestion() {
        this.findAQ();
        this.findEQ();
      },
      findAQ() {
        this.$axios.post('http://localhost:8081/EnterpriseQuestion/findAQ', this.req)
          .then((res) => {
            this.tableData = res.data;
            console.log(this.tableData)
            this.findQuestionNumber(this.req,1);
          }).catch((err) => {
          console.log(err)
        })
      },
      findEQ() {
        this.$axios.post('http://localhost:8081/EnterpriseQuestion/findEQ', this.req2)
          .then((res) => {
            this.tableData2 = res.data;
            console.log(this.tableData2)
            this.findQuestionNumber(this.req2,2);
          }).catch((err) => {
          console.log(err)
        })
      },
      findQuestionNumber(temp, type) {
        this.$axios.post('http://localhost:8081/EnterpriseQuestion/findQuestionNumberToA', temp)
          .then((res) => {
            if (type == 1)
              this.number = res.data;
            else
              this.number2 = res.data;
          }).catch((err) => {
          console.log(err)
        })
      },
      deleteQuestion(question) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post(
            'http://localhost:8081/EnterpriseQuestion/deleteQuestion', question)
            .then((res) => {
              this.findAllQuestion();
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
      display(question) {
        let questionId = question.id;
        this.$router.push({name: 'Administrators_QuestionForm', params: {questionId: questionId, formType: "display"}})
      },
      update(question) {
        let questionId = question.id;
        this.$router.push({name: 'Administrators_QuestionForm', params: {questionId: questionId, formType: "update"}})
      },
      addQustion() {
        this.$router.push({name: 'Administrators_QuestionForm', params: {questionId: -1, formType: "add"}});
      },
    },
    mounted() {
      this.userName = coo.getCookie("userName");
      this.req.userName = coo.getCookie("userName");
      this.req2.userName = coo.getCookie("userName");
      this.findAllQuestion();
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
