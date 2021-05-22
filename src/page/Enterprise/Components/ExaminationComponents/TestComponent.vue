<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 90%;margin-top: 5%">
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
        width="300">
        <template slot-scope="scope">
          <el-button type="success" @click="startExam(scope.row)" v-if="scope.row.status =='未启动'">启动该场笔试</el-button>
          <el-button type="danger" @click="finishExam(scope.row)" v-if="scope.row.status =='正在进行'">结束该场笔试</el-button>
          <el-button type="primary" @click="displayExa(scope.row)" v-if="scope.row.status =='已结束'">查看笔试结果</el-button>
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
  </div>
</template>

<script>
  import coo from '../../../cookie'

  export default {
    name: "AllTest",
    props:["status"],
    data() {
      return {
        tableData: [],
        number: 0,
        userType: "",
        userName: "",
        req: {
          userName: "",
          page: 1,
          number: 10,
          remark: "",
          //查询关键字为status
          key:""
        }
      }
    },
    mounted() {
      this.userName = coo.getCookie("userName");
      this.req.userName = this.userName;
      this.req.key = this.status;
      this.findExamination();
    },
    methods: {
      //查询笔试
      findExamination() {
        this.$axios.post('http://localhost:8081/Examination/findExamination', this.req)
          .then((res) => {
            this.findExaminationNumber();
            this.tableData = res.data;
            this.tableData.forEach(
              function (item) {
                if (item.beginTime != null){
                  item.beginTime = item.beginTime.substr(0, 19);
                  item.beginTime = item.beginTime.replace("T","-")
                }
                if (item.endTime != null){
                  item.endTime = item.endTime.substr(0, 19);
                  item.endTime = item.endTime.replace("T","-")
                }
                if (item.continueTime != null){
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
            message: '已取消删除'
          });
        });
      },

      //查看结果
      displayExa(val) {
        this.$router.push({name: 'DispalyGrade', params: {testId: val.id}})
      },

      //查询个数
      findExaminationNumber() {
        this.$axios.post('http://localhost:8081/Examination/findExaminationNumber', this.req)
          .then((res) => {
            this.number = res.data;
          }).catch((err) => {
          console.log(err)
        })
      },
    },
    watch:{
      status(val,oldVal){
        if(val == undefined){
          this.req.key = null;
        }else{
          this.req.key = val;
        }
        this.findExamination();
      }
    }
  }
</script>

<style scoped>

</style>
