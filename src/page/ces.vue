<template>
  <div>
    <div v-model="examinationData">

    </div>
    <div>
      <el-button @click="last()">上一步</el-button>
      <el-button @click="next()" v-if="problemNextButton">下一步</el-button>
      <el-button @click="submit()" v-else>提交</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ces",
    data(){
      return{

      }
    },
    mounted(){
      setTimeout(()=>{
        this.problemDiv = document.getElementsByClassName("content");
        this.problemDiv[this.displayProblem].style.display = "block";
      },1000);
      this.findQuestionByExam();
    },
    methods: {
      //查询题目
      findQuestionByExam() {
        let re = {
          targetID: 3
        }
        this.$axios.post(
          'http://localhost:8081/IndividualTest/findQuestionByExam', re)
          .then((res) => {
            this.examinationData = res.data;
            for (let i = 0; i < this.examinationData.length; i++) {
            }
            console.log(this.examinationData);
          }).catch((err) => {
          console.log(err)
        })
      },

    }
  }
</script>

<style scoped>

</style>
