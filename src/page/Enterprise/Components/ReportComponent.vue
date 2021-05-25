<template>
  <div>
    <!--<div class="left">-->
    <!--</div>-->
    <!--<div class="right">-->
    <!--</div>-->
    <el-table
      :data="tableData"
      style="width: 80%;margin-left: 10%">
      <el-table-column type="expand">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-table
            :data="talentData"
            style="width: 100%;">
            <el-table-column
              fixed
              prop="name"
              label="姓名">
            </el-table-column>
            <el-table-column
              fixed
              prop="education"
              label="学历">
            </el-table-column>
            <el-table-column
              fixed
              prop="school"
              label="学校">
            </el-table-column>
            <el-table-column
              fixed
              prop="grade"
              label="成绩">
            </el-table-column>
          </el-table>
        </el-form>
      </el-table-column>
      <el-table-column
        fixed
        prop="name"
        label="笔试名称">
      </el-table-column>
      <el-table-column
        fixed
        prop="beginTime"
        label="开始时间">
      </el-table-column>
      <el-table-column
        fixed
        prop="endTime"
        label="结束时间">
      </el-table-column>
      <el-table-column
        fixed
        prop="continueTime"
        label="考试时间">
      </el-table-column>
      <el-table-column
        fixed
        prop="status"
        label="笔试状态">
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
  import coo from '../../cookie'

  export default {
    name: "ReportComponet",
    data() {
      return {
        number:0,
        talentData:[],
        tableData: [],
        req: {
          userName: "",
          page: 1,
          number: 10,
          remark: "",
          //查询关键字为status
          key: ""
        },
      }
    },
    mounted(){
      this.userName = coo.getCookie("userName");
      this.req.userName = this.userName;
      this.req.key = "已结束";
      this.findExamination();
    },
    methods:{
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
            this.findTalent(this.tableData[0].id);
          }).catch((err) => {
          console.log(err)
        })
      },

      //查找考生
      findTalent(val){
        let req = {
          targetID:val
        };
        this.$axios.post('http://localhost:8081/IndividualTest/findTalentList', req)
          .then((res) => {
            this.talentData = res.data;
            console.log(res.data)
          }).catch((err) => {
          console.log(err)
        })
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

      handleSizeChange(val) {
        this.req.page = 1;
        this.req.number = val;
        this.findExamination();
      },
      handleCurrentChange(val) {
        this.req.page = val;
        this.findExamination();
      },
    }
  }
</script>

<style scoped>
  .left {
    width: 14%;
    height: 94vh;
    float: left;
    border-right-color: #e9ebed;
    border-right-width: 1px;
    border-right-style: solid;
    background-color: #fafbfc;
  }

  .right {
    width: 85%;
    height: 94vh;
    float: right;
  }

  /*elementui样式*/
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
