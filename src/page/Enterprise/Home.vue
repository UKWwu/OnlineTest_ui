<template>
  <div>
    <div class="top">
      <div style="float: left;padding-right: 3%;">
        <h1>在线笔试平台</h1>
      </div>
      <button class="homeButton" @click="homeButton">
        <i class="el-icon-s-home" style="font-size: 30px"></i>
      </button>
      <button class="homeButton" @click="examinationButton">
        考试
      </button>
      <button class="homeButton" @click="problemButton">
        试题
      </button>
      <button class="homeButton" @click="talentButton">
        考生
      </button>
      <button class="homeButton" disabled="true">
        报表
      </button>
    </div>
    <div>
      <HomeComponent v-if="component == 'Home'"></HomeComponent>
      <ExaminationComponent v-if="component == 'Examination'"></ExaminationComponent>
      <ProblemComponent v-if="component == 'Problem'"></ProblemComponent>
      <TalentComponent v-if="component == 'Talent'"></TalentComponent>
      <ReportComponent v-if="component == 'Report'" :examId="examId"></ReportComponent>
    </div>
  </div>
</template>

<script>
  import HomeComponent from './Components/HomeComponent'
  import ProblemComponent from './Components/ProblemComponent'
  import TalentComponent from './Components/TalentComponent'
  import ReportComponent from './Components/ReportComponent'
  import ExaminationComponent from './Components/ExaminationComponent'

  export default {
    name: "Home",
    components: {
      HomeComponent,
      ProblemComponent,
      TalentComponent,
      ReportComponent,
      ExaminationComponent
    },
    data() {
      return {
        component: "Home",
        examId:""
      }
    },
    mounted() {
    },
    methods: {
      //首页模块
      homeButton() {
        this.changeButtonColor(0);
        this.component = "Home";
      },
      //考试模块
      examinationButton() {
        this.changeButtonColor(1);
        this.component = "Examination";
      },
      //题目模块
      problemButton() {
        this.changeButtonColor(2);
        this.component = "Problem";
      },
      //考生模块
      talentButton() {
        this.changeButtonColor(3);
        this.component = "Talent";
      },
      //报表模块
      reportButton(val) {
        this.changeButtonColor(4);
        this.examId = val;
        this.component = "Report";
      },

      //改变显示颜色
      changeButtonColor(log) {
        let buttonDom = document.getElementsByClassName("homeButton");
        for (let i = 0; i < buttonDom.length; i++) {
          buttonDom[i].style.backgroundColor = "#14c0e4"
        }
        buttonDom[log].style.backgroundColor = "#3b8897"
      }
    }
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }

  .top {
    background-color: #14c0e4;
    height: 8vh;
    width: 100%;
    color: white;
    text-align: center;
    font-size: 20px;
    user-select: none;
  }

  .homeButton {
    background-color: #14c0e4;
    color: white;
    font-size: 20px;
    float: left;
    width: 6%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer
  }
</style>
