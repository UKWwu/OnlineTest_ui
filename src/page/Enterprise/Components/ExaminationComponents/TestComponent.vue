<template>
  <div>
    <el-table
      :data="tableData"
      ref="examinationList"
      @selection-change="handleSelectionChange"
      border
      style="width: 90%;margin-top: 5%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        fixed
        prop="name"
        label="笔试名称"
        width="200">
      </el-table-column>
      <el-table-column
        fixed
        prop="beginTime"
        label="开始时间"
        width="200">
      </el-table-column>
      <el-table-column
        fixed
        prop="endTime"
        label="结束时间"
        width="200">
      </el-table-column>
      <el-table-column
        fixed
        prop="continueTime"
        label="考试时间"
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
        width="400">
        <template slot-scope="scope">
          <el-button type="primary" @click="displayExamValue(scope.row)" style="float: left">查看笔试信息</el-button>
          <el-button type="success" @click="startExam(scope.row)" v-if="scope.row.status =='未启动'">启动该场笔试</el-button>
          <el-button type="danger" @click="finishExam(scope.row)" v-if="scope.row.status =='正在进行'">结束该场笔试</el-button>
          <el-button type="primary" @click="displayExam(scope.row)" v-if="scope.row.status =='已结束'">查看笔试结果</el-button>
          <el-button type="danger" @click="deleteExam(scope.row)">删除笔试</el-button>
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
    <div>
      <el-dialog
        :visible.sync="examForm"
        title="考试信息"
        width="80%"
        top="5vh"
        center>
        <div class="dialogContent">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基本信息" name="first">
              <el-form :model="examination" label-width="80px" ref="question"
                       style="margin-left: 15%;width: 70%;margin-top: 5%" size="small" v-bind:disabled="false">
                <el-form-item label="笔试名称" prop="name" label-width="120px">
                  <el-input v-model="examination.name" :readonly="'readonly'"></el-input>
                </el-form-item>
                <el-form-item label="笔试开始时间" prop="beginTime" label-width="120px">
                  <el-input v-model="examination.beginTime" :readonly="'readonly'"></el-input>
                </el-form-item>
                <el-form-item label="笔试结束时间" prop="endTime" label-width="120px">
                  <el-input v-model="examination.endTime" :readonly="'readonly'"></el-input>
                </el-form-item>
                <el-form-item label="考试时间" label-width="120px">
                  <el-col :span="11">
                    <el-time-select
                      style="width: 100%;"
                      v-model="examination.continueTime" :readonly="'readonly'"
                      :picker-options="{start: '00:15',step: '00:15',end: '6:00'
                             }"
                      placeholder="选择时间">
                    </el-time-select>
                  </el-col>
                </el-form-item>
                <el-form-item label="笔试状态" prop="status" label-width="120px">
                  <el-input v-model="examination.status" :readonly="'readonly'"></el-input>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="题目信息" name="second">
              <el-table
                :data="problemData"
                height="600"
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
                  label="题目分类"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="题目类型"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="score"
                  label="分数"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="time"
                  label="日期"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="unitName"
                  label="所属单位"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="answer"
                  label="答案"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="remark"
                  label="备注"
                  width="435">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="人员信息" name="third">
              <el-button @click="downUserData" type="primary" style="margin-left: 63%">下载信息</el-button>
              <el-table
                :data="userData"
                height="500"
                border
                style="width: 40%;margin-left: 30%;margin-top: 3%">
                <el-table-column
                  fixed
                  prop="userName"
                  label="考生名称"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="userAccount"
                  label="账号名称"
                  width="193">
                </el-table-column>
                <el-table-column
                  prop="password"
                  label="密码"
                  width="200">
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import coo from '../../../cookie'
  import xlsx from 'xlsx'

  export default {
    name: "AllTest",
    props: ["status"],
    data() {
      return {
        tableData: [],
        examination: {},
        examForm: false,
        number: 0,
        problemData: [],
        userType: "",
        userName: "",
        req: {
          userName: "",
          page: 1,
          number: 10,
          remark: "",
          //查询关键字为status
          key: ""
        },
        activeName: "first",
        userData: [],
        examinationList:[],
      }
    },
    mounted() {
      this.userName = coo.getCookie("userName");
      this.req.userName = this.userName;
      this.req.key = this.status;
      this.findExamination();
    },
    methods: {
      //选中
      handleSelectionChange(val) {
        this.examinationList = val;
      },
      //批量删除
      deleteExamList(){
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for(let i=0;i<this.examinationList.length;i++){
            let re = {
              targetID :this.examinationList[i].id
            };
            this.$axios.post(
              'http://localhost:8081/Examination/deleteExam', re)
              .then((res) => {
              }).catch((err) => {
              this.$message({
                type: 'error',
                message: '删除失败'
              });
              console.log(err)
            })
          }
        }).then(()=>{
          this.findExamination();
          this.$message({
            type: 'success',
            message: '成功删除!'
          });
        }).catch(()=>{
          this.$message({
            type: 'info',
            message: '取消删除!'
          });
        })
      },
      //查询笔试
      findExamination() {
        this.$axios.post('http://localhost:8081/Examination/findExamination', this.req)
          .then((res) => {
            this.findExaminationNumber();
            this.tableData = res.data;
            this.tableData.forEach(
              function (item) {
                if (item.beginTime != null) {
                  item.beginTime = item.beginTime.substr(0, 19);
                  item.beginTime = item.beginTime.replace("T", "-")
                }
                if (item.endTime != null) {
                  item.endTime = item.endTime.substr(0, 19);
                  item.endTime = item.endTime.replace("T", "-")
                }
                if (item.continueTime != null) {
                  item.continueTime = item.continueTime.toString().slice(11, 19);
                }
              }
            );
          }).catch((err) => {
          console.log(err)
        })
      },
      handleSizeChange(val) {
        this.req.page = 1;
        this.req.number = val;
        this.findExamination();
      },
      handleCurrentChange(val) {
        this.req.page = val;
        this.findExamination();
      },

      //启动笔试
      startExam(val) {
        this.$confirm('是否启动该场笔试?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let re = {
            targetID: val.id,
            remark: "正在进行"
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

      //结束笔试
      finishExam(val) {
        this.$confirm('是否结束该场笔试?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let re = {
            targetID: val.id,
            remark: "已结束"
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
            message: '已取消结束'
          });
        });
      },

      deleteExam(val) {
        this.$confirm('是否删除该场笔试?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let re = {
            targetID: val.id
          };
          this.$axios.post(
            'http://localhost:8081/Examination/deleteExam', re)
            .then((res) => {
              this.findExamination();
              this.$message({
                type: 'success',
                message: '成功删除!'
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

      //查看结果
      displayExam(val) {
        this.$parent.$parent.reportButton(val.id);
      },

      //查看笔试信息
      displayExamValue(val) {
        this.examForm = true;
        this.activeName = "first";
        this.examination = val;
        this.findProblemData(val.id);
        this.findUserData(val.id);
      },

      //查询考试试题
      findProblemData(userId) {
        let re = {
          targetID: userId
        }
        this.$axios.post(
          'http://localhost:8081/Examination/findProblemData', re)
          .then((res) => {
            this.problemData = res.data;
          }).catch((err) => {
          this.$message({
            type: 'error',
            message: '出错'
          });
          console.log(err)
        })
      },
      //查询考试人员
      findUserData(userId) {
        let re = {
          targetID: userId
        }
        this.$axios.post(
          'http://localhost:8081/Examination/findUserData', re)
          .then((res) => {
            this.userData = res.data;
          }).catch((err) => {
          this.$message({
            type: 'error',
            message: '出错'
          });
          console.log(err)
        })
      }
      ,

      //查询个数
      findExaminationNumber() {
        this.$axios.post('http://localhost:8081/Examination/findExaminationNumber', this.req)
          .then((res) => {
            this.number = res.data;
          }).catch((err) => {
          console.log(err)
        })
      }
      ,

      //导出用户信息
      downUserData(){
        let arr = this.userData.map((item)=>{
          return{
            姓名:item.userName,
            账号:item.userAccount,
            密码:item.password
          }
        });
        let sheet = xlsx.utils.json_to_sheet(arr),
        book = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(book,sheet,"sheet1");
        xlsx.writeFile(book,'考生账号.xls');
      },

      //
      handleClick(tab, event) {
      }
    },
    watch: {
      status(val, oldVal) {
        if (val == undefined) {
          this.req.key = null;
        } else {
          this.req.key = val;
        }
        this.findExamination();
      }
    }
  }
</script>

<style scoped>
  .dialogContent {
    width: 100%;
    height: 75vh;
  }
</style>
