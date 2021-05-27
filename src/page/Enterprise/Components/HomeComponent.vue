<template>
  <div>
    <div class="left">
      <div class="buttonDiv">
        <div class="headTitle">
          操作流程
        </div>
        <div class="buttonContent" @click="moveExamination">
          <div class="img1"></div>
          <p>创建考试</p>
        </div>
        <div class="buttonContent" @click="moveExamination">
          <div class="img2"></div>
          <p>设置考试</p>
        </div>
        <div class="buttonContent" @click="moveProblem">
          <div class="img3"></div>
          <p>题目批量上传</p>
        </div>
        <div class="buttonContent" @click="moveTalent">
          <div class="img4"></div>
          <p>人员批量上传</p>
        </div>
        <div class="buttonContent" @click="moveReport">
          <div class="img5"></div>
          <p>查看结果</p>
        </div>
      </div>
      <div class="report">
        <div class="headTitle" style="top: 45%;">
          结果报告
        </div>
        <div style="margin-left:10%;margin-top:3%;width:30%;float:left;background-color: white">
          <el-table
            :data="tableData"
            max-height="400"
            style="width: 100%;">
            <el-table-column prop="name" label="成绩范围" ></el-table-column>
            <el-table-column prop="value" label="数量"></el-table-column>
          </el-table>
        </div>
        <div id="displayMain"
             style="margin-top:10%;width: 40%;height:50%;float:right;background-color: white;margin-right: 10%"></div>
      </div>
    </div>

    <div class="right">
      <div class="notice">
        <div class="headTitle" style="left: 79%;">
          考生排行
        </div>
        <div style="width: 80%;margin-left: 12%;margin-top: 20%">
          <el-table
            :data="talentData"
            style="width: 100%">
            <el-table-column prop="name" label="姓名" ></el-table-column>
            <el-table-column prop="grade" label="成绩"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import coo from '../../cookie'
  // 引入 ECharts 主模块
  var echarts = require('echarts/lib/echarts');
  // 引入柱状图
  require('echarts/lib/chart/bar');
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');

  export default {
    name: "homeComponets",
    data() {
      return {
        userName: "",
        tableData: [],
        talentData:[],
        examination: {},
        option: {
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              data: []
            }
          ]
        }
      }
    },
    mounted() {
      this.userName = coo.getCookie("userName");
      //找到最近的一次考试
      this.findEndTest();
      this.findBestStudent();
    },
    methods: {
      moveExamination() {
        this.$parent.examinationButton();
      },
      moveProblem() {
        this.$parent.problemButton()
      },
      moveReport() {
        this.$parent.reportButton()
      },
      moveTalent() {
        this.$parent.talentButton()
      },

      //结果
      display() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('displayMain'));
        // 绘制图表
        myChart.setOption(this.option);
      },
      //找到最近的一次考试
      findEndTest() {
        let req = {
          userName: this.userName
        };
        this.$axios.post('http://localhost:8081/Examination/findEndTest', req)
          .then((res) => {
            this.examination = res.data;
            this.findRatioById(this.examination.id);
          }).catch((err) => {
          console.log(err)
        })
      },
      //获取信息考试
      findRatioById(val) {
        let req = {
          targetID: val
        };
        this.$axios.post('http://localhost:8081/Examination/findRatioById', req)
          .then((res) => {
            console.log(res.data)
            this.option.series[0].data = res.data;
            for (let i = 0; i < res.data.length; i++) {
              this.tableData.push(res.data[i]);
            }
            this.display();
          }).catch((err) => {
          console.log(err)
        })
      },

      //找到成绩最好的几名学生
      findBestStudent(){
        let req ={
          targetID : this.testId,
          userName : this.userName,
        };
        this.$axios.post('http://localhost:8081/Examination/findBestStudent',req)
          .then((res) => {
            this.talentData =  res.data;
          }).catch((err) => {
          console.log(err)
        })
      },
    }
  }
</script>

<style scoped>
  * {
    background-color: #f3f5f7;
  }

  .buttonDiv {
    width: 100%;
    height: 33vh;
    margin-top: 1%;
    margin-left: 4%;
    display: flex;
    align-items: center;
    background-color: white;
  }

  .headTitle{
    background-color: white;
    position: absolute;
    top: 10%;
    left: 4%;
    font-size: 2em;
  }

  .report {
    width: 70vw;
    height: 54vh;
    background-color: white;
    margin-top: 2%;
    margin-left: 4%;
  }

  .notice {
    width: 20vw;
    height: 90vh;
    margin-top: 2%;
    float: right;
    margin-right: 10%;
    background-color: white;
  }

  .left {
    width: 70%;
    height: 70%;
    float: left;
  }

  .right {
    width: 30%;
    height: 70%;
    float: right;
  }

  .img1 {
    background-image: url(../../../assets/img/首页.png);
    background-position: 0px 0px;
    background-repeat: no-repeat;
    width: 50px;
    height: 50px;
    margin-right: 10%;
    margin-left: 5%;
  }

  .img2 {
    background-image: url(../../../assets/img/首页.png);
    background-position: 0px -70px;
    background-repeat: no-repeat;
    width: 50px;
    height: 40px;
    margin-right: 10%;
    margin-left: 5%;
  }

  .img3 {
    background-image: url(../../../assets/img/首页.png);
    background-position: 0px -180px;
    background-repeat: no-repeat;
    width: 50px;
    height: 45px;
    margin-right: 10%;
    margin-left: 5%;
  }

  .img4 {
    background-image: url(../../../assets/img/首页.png);
    background-position: 0px -240px;
    background-repeat: no-repeat;
    width: 50px;
    height: 50px;
    margin-right: 10%;
    margin-left: 5%;
  }

  .img5 {
    background-image: url(../../../assets/img/首页.png);
    background-position: 0px -300px;
    background-repeat: no-repeat;
    width: 50px;
    height: 50px;
    margin-right: 10%;
    margin-left: 5%;
  }

  .buttonContent {
    display: flex;
    width: 15%;
    height: 100px;
    margin-left: 1%;
    margin-right: 3%;
    align-items: center;
    border-color: #e9ebed;
    border-width: 1px;
    border-style: solid;
    cursor: pointer;
  }

</style>
