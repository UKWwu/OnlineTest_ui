<template>
  <div>
    <div class="left">
      <div class="leftButtonDiv">
        <button class="leftButton" style="background-color: #202897;color: white">新建考试</button>
        <button class="leftButton" style="border-color: white;" @click="changeComponent">考试分析</button>
      </div>
      <div class="testLog">
        <button class="testLogButton" @click="allTest"  >所有考试</button>
        <button class="testLogButton" @click="runTest" >正在进行</button>
        <button class="testLogButton" @click="noneTest" >未开始</button>
        <button class="testLogButton" @click="endTest" >已结束</button>
      </div>
    </div>
    <div class="right">
      <AllTest v-if="testType == 'all'"></AllTest>
      <RunTest  v-if="testType == 'run'"></RunTest>
      <EndTest  v-if="testType == 'none'"></EndTest>
      <none-test  v-if="testType == 'end'"></none-test>
    </div>
  </div>
</template>

<script>
  import AllTest from './ExaminationComponents/AllTest'
  import RunTest from './ExaminationComponents/RunTest'
  import NoneTest from './ExaminationComponents/NoneTest'
  import EndTest from './ExaminationComponents/EndTest'
  export default {
    name: "ExaminationComponet",
    data(){
      return{
        testType:"all",
      }
    },
    components: {
      AllTest,
      RunTest,
      NoneTest,
      EndTest,
    },
    methods: {
      allTest() {
        this.testType = "all";
      },
      runTest() {
        this.testType = "run";
      },
      noneTest() {
        this.testType = "none";
      },
      endTest() {
        this.testType = "end";
      },
      changeComponent(){
        this.$parent.reportButton();
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
  }

  .right {
    width: 85%;
    height: 94vh;
    float: right;
  }

  .leftButtonDiv {
    width: 100%;
    height: 30%;
    display: flex;
    background-color: #fafbfc;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .leftButton {
    width: 70%;
    height: 20%;
    border: none;
    cursor: pointer;
    margin-top: 20px;
  }

  .testLog {
    width: 100%;
    height: 30%;
  }

  .testLogButton {
    width: 100%;
    height: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fafbfc;
    border: none;
    cursor: pointer;
  }

  .testLogButton:hover {
    background-color: #f3f3f3;
  }
</style>
