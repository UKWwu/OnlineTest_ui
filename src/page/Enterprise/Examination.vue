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
            <el-menu default-active="1-4-1" style="height: 100%" class="el-menu-vertical-demo" :default-active="this.$router.path"
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
          <el-main  style="width: 100%;height: 100%;background-color: white">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>首页</el-breadcrumb-item>
              <el-breadcrumb-item>笔试管理</el-breadcrumb-item>
            </el-breadcrumb>

            <el-button type="primary" icon="el-icon-plus" style="width:50%;margin-top:15px;margin-left: 20%;height: 10%;font-size: 30px" @click.native = "addNewTest">发布新笔试</el-button>

            <el-table
              :data="tableData"
              border
              style="width: 100%;margin-top: 5%">
              <el-table-column
                fixed
                prop="name"
                label="笔试名称"
                width="100">
              </el-table-column>
              <el-table-column
                fixed
                prop="beginTime"
                label="笔试时间"
                width="200">
              </el-table-column>
              <el-table-column
                fixed
                prop="status"
                label="笔试状态"
                width="200">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="300">
                <template slot-scope="scope">
                  <el-button type="success" @click="startExam(scope.row)" v-if="scope.row.status =='未启动'">启动该场笔试</el-button>
                  <el-button type="danger" @click="finishExam(scope.row)" v-if="scope.row.status =='正在进行'">结束该场笔试</el-button>
                  <el-button type="primary" @click="displayExa(scope.row)"  v-if="scope.row.status =='已结束'">查看笔试结果</el-button>
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
    export default {
        name: "Enterprise_examination",
      data(){
          return{
            number:0,
            userType:"",
            userName:"",
            tableData: [],
            req:{
              userName:"",
              page:1,
              number:10,
              remark:""
            }
          }
      },
      methods:{
        addNewTest(){
          this.$router.push({name:'ReleaseTest',params:{userType:this.userType,userName:this.userName}})
        },
        displayExa(val){
          this.$router.push({name:'DispalyGrade',params:{testId:val.id}})
        },
        findExaminationNumber(){
          this.$axios.post('http://localhost:8081/Examination/findExaminationNumber',this.req)
            .then((res) => {
              this.number = res.data;
            }).catch((err) => {
            console.log(err)
          })
        },
        findExamination(){
          this.$axios.post('http://localhost:8081/Examination/findExamination',this.req)
            .then((res) => {
              this.findExaminationNumber();
              this.tableData = res.data;
              this.tableData.forEach(
                function (item) {
                 item.beginTime = item.beginTime.substr(0,10);
                }
              )
            }).catch((err) => {
            console.log(err)
          })
        },
        handleSizeChange(val){
          this.req.page = 1;
          this.req.number = val;
          this.findExamination();
        },
        handleCurrentChange(val){
          this.req.page = val;
          this.findExamination();
        },
        finishExam(val){
          this.$confirm('是否结束该场笔试?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let re = {
              targetID:val.id,
              remark:"已结束"
            };
            this.$axios.post(
              'http://localhost:8081/Examination/finishExam', re)
              .then((res) => {
                this.findExamination();
                this.$message({
                  type: 'success',
                  message: '笔试已结束!'
                });
              }).catch((err) => {
              this.$message({
                type: 'error',
                message: '操作失败'
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
        startExam(val){
          this.$confirm('是否启动该场笔试?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let re = {
              targetID:val.id,
              remark:"正在进行"
            };
            this.$axios.post(
              'http://localhost:8081/Examination/finishExam', re)
              .then((res) => {
                this.findExamination();
                this.$message({
                  type: 'success',
                  message: '笔试成功开启!'
                });
              }).catch((err) => {
              this.$message({
                type: 'error',
                message: '操作失败'
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
        logOut(){
          coo.clearCookie();
          this.$router.push({name: 'HomePage', params: {}});
        },
      },
      mounted() {
        this.userName = coo.getCookie("userName");
        this.req.userName = this.userName;
        this.findExamination();
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
