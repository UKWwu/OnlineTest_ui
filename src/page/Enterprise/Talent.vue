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
            <el-menu default-active="1-4-1" style="height: 100%" class="el-menu-vertical-demo"
                     :default-active="this.$router.path"
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
              <el-input v-model="req.remark" placeholder="请输入关键字搜索" style="width: 20%"></el-input>
              <el-button type="primary" icon="el-icon-search" @click ="findAllTalent">搜索</el-button>
              <el-button type="primary" style="float: right" @click = "addTalent">
                新增候选人
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
                prop="sex"
                label="性别"
                width="120">
              </el-table-column>
              <el-table-column
                prop="education"
                label="学历"
                width="120">
              </el-table-column>
              <el-table-column
                prop="school"
                label="学校"
                width="120">
              </el-table-column>
              <el-table-column
                prop="grade"
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
                  <el-button type="text" size="small" @click="displayTalent(scope.row)">查看</el-button>
                  <el-button type="text" size="small" @click="updateTalent(scope.row)">编辑</el-button>
                  <el-button type="text" size="small" style="color: red"  @click="deleteTalent(scope.row)">删除</el-button>
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
                layout="total, sizes, prev, pager, next, jumper"></el-pagination>
            </div>
          </el-main>
        </el-container>
      </div>


    </el-container>
  </el-container>
</template>

<script>
  import coo from '../cookie'
  import requet from '../request'

  export default {
    name: "Enterprise_talent",
    data() {
      return {
        userType: "",
        number: 0,
        userName: "",
        tableData: [],
        req:{
          userName:"",
          page:1,
          number:10,
          remark:""
        },
      }
    },
    methods:{
      findAllTalent(){
        this.$axios.post('http://localhost:8081/EnterpriseTalent/findTalentList',this.req)
          .then((res) => {
            this.tableData =  res.data;
            this.findTalentNumber();
          }).catch((err) => {
          console.log(err)
        })
      },
      findTalentNumber(){
        this.$axios.post('http://localhost:8081/EnterpriseTalent/findTalentNumber',this.req)
          .then((res) => {
            this.number =  res.data;
          }).catch((err) => {
          console.log(err)
        })
      },
      handleSizeChange(val){
        this.req.page = 1;
        this.req.number = val;
        this.findAllTalent();
      },
      handleCurrentChange(val){
        this.req.page = val;
        this.findAllTalent();
      },
      deleteTalent(talent){
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let re = {
            targetID:talent.id
          };
          this.$axios.post(
            'http://localhost:8081/EnterpriseTalent/deleteTalent', re)
            .then((res) => {
              this.findAllTalent();
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
      addTalent(){
        this.$router.push({name:'Enterprise_TalentForm',params:{talentId:-1,formType:"add"}});
      },
      updateTalent(val){
        this.$router.push({name:'Enterprise_TalentForm',params:{talentId:val.id,formType:"update"}});
      },
      displayTalent(val){
        this.$router.push({name:'Enterprise_TalentForm',params:{talentId:val.id,formType:"display"}});
      },
      logOut(){
        coo.clearCookie();
        this.$router.push({name: 'HomePage', params: {}});
      },
    },
    mounted() {
      this.userName = coo.getCookie("userName");
      this.req.userName = coo.getCookie("userName");
      this.findAllTalent();
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
