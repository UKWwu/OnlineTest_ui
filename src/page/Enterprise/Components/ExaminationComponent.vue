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
      <TestComponent v-if="testType == 'all'"></TestComponent>
      <TestComponent  v-if="testType == 'run'" :status="'正在进行'"></TestComponent>
      <TestComponent  v-if="testType == 'none'" :status="'未启动'"></TestComponent>
      <TestComponent  v-if="testType == 'end'" :status="'已结束'"></TestComponent>
    </div>
  </div>
</template>

<script>
  import TestComponent from './ExaminationComponents/TestComponent'

  export default {
    name: "ExaminationComponet",
    data(){
      return{
        testType:"all",
      }
    },
    components: {
      TestComponent
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
