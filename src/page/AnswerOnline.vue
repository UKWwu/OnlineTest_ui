<template>
  <div>
    <div class="top">
      <div style="padding-top:1px;width: 70%;">
        <h1>在线笔试平台</h1>
      </div>
    </div>
    <div id="js">
      <div class="jsq">
        <i class="el-icon-time"></i> {{hr}}:{{min}}:{{sec}}
      </div>
    </div>
    <div class="content">
        <div style="width: 100%;height: 20%;background-color: black">timu</div>
        <div style="width: 100%;height: 60%;background-color: yellow">neirong</div>
        <div style="width: 100%;height: 20%;background-color: red">fanye</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AnswerOnline",
    data() {
      return {
        day: 0,
        hr: 0,
        min: 0,
        sec: 0
      };
    },
    methods: {
      countdown() {
        const end = Date.parse(new Date('2099-05-06 00:00:00'));
        const now = Date.parse(new Date());
        const msec = end - now;

        if (msec < 0) return;
        let hr = parseInt(msec / 1000 / 60 / 60 % 24);
        let min = parseInt(msec / 1000 / 60 % 60);
        let sec = parseInt(msec / 1000 % 60);
        this.hr = hr > 9 ? hr : '0' + hr;
        this.min = min > 9 ? min : '0' + min;
        this.sec = sec > 9 ? sec : '0' + sec;
        const that = this
        if (min >= 0 && sec >= 0) {
          //倒计时结束关闭
          if (min == 0 && sec == 0) {
            return
          }
          setTimeout(function () {
            that.countdown()
          }, 1000)
        }
      }
    },
    mounted() {
      this.countdown()
    }
  }
</script>

<style scoped>
  html, body {
    padding: 0px;
    margin: 0px;
  }

  .jsq {
    width: 15%;
    height: 70px;
    float: right;
    background-color: #ffc445;
    color: white;
    font-size: 30px;
    text-align: center;
    margin-right: 30%
  }

  .top {
    background-color: #14c0e4;
    height: 70px;
    width: 100%;
    color: white;
    text-align: center;
  }

  #js {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .content {
    width: 60%;
    height: 600px;
    background-color: yellow;
    margin-left: 20%;
    margin-top: 2%;
    text-align: center;
  }
</style>
