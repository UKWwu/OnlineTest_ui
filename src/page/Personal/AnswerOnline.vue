<template>
  <div style="background-color: antiquewhite;height: 100%">
    <div class="top">
      <div style="padding-top:1px;width: 70%;">
        <h1>在线笔试平台</h1>
      </div>
    </div>
    <div id="js">
      <div class="videoContent">
        <video src="" id="videoDemo" class="video"></video>
      </div>
      <div class="jsq">
        <i class="el-icon-time" style="margin-top: 20px"></i>
      </div>
    </div>
    <div class="content">
      <div class="context" style="background-color: black;">
        <button class="next" onclick="next()">下一个</button>
      </div>
      <div class="context" style="background-color: yellow;">
        <button class="next" onclick="next()">下一个</button>
      </div>
      <div class="context" style="background-color: red;">
        <button class="next" onclick="next()">下一个</button>
      </div>
      <div class="context" style="background-color: blue;">
        <button class="next" onclick="next()">下一个</button>
      </div>
    </div>
    <div class="content">
      <div style="width: 100%;height: 20%;">
        <div style="width: 30%;float: left;"><h1>单选题</h1></div>
      </div>
      <div style="width: 100%;height: 60%;">
        <div style="width: 100%;">
          <div style="width: 60%;text-align: left;margin-left: 20%;font-size: 25px">
            <ul v-for="(item,i) in examinationData" :key="i">
              <div v-if="choose == i">
                <div>{{i+1}}、{{item.title}}</div>
                <li>
                  <div style="border: black;border-width: 1px;border-style: solid;margin-top: 5%;">
                    <el-radio style="margin-left: 5%;margin-bottom: 2%"
                              v-model="radio" label="A">{{item.contentA}}
                    </el-radio>
                  </div>
                </li>
                <li>
                  <div style="border: black;border-width: 1px;border-style: solid;margin-top: 5%;">
                    <el-radio style="margin-left: 5%;margin-bottom: 2%"
                              v-model="radio" label="B">{{item.contentB}}
                    </el-radio>
                  </div>
                </li>
                <li>
                  <div style="border: black;border-width: 1px;border-style: solid;margin-top: 5%;">
                    <el-radio style="margin-left: 5%;margin-bottom: 2%"
                              v-model="radio" label="C">{{item.contentC}}
                    </el-radio>
                  </div>
                </li>
                <li>
                  <div style="border: black;border-width: 1px;border-style: solid;margin-top: 5%;">
                    <el-radio style="margin-left: 5%;margin-bottom: 2%"
                              v-model="radio" label="D">{{item.contentD}}
                    </el-radio>
                  </div>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <div style="margin-left:20%;width: 60%;height: 20%;">
        <div style="float: left;margin-left: 5%">
          <el-button type="danger" @click="pre" style="position:relative" v-if="this.choose!=0">上一题</el-button>
        </div>
        <div style="float: right">
          <el-button type="success" @click="next" style="position:relative"
                     v-if="this.choose!=(this.examinationData.length-1)">下一题
          </el-button>
        </div>

        <div style="float: right">
          <el-button type="primary" @click="submit" style="position:relative"
                     v-if="this.choose == this.examinationData.length-1">提交
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import coo from '../cookie'

  export default {
    name: "AnswerOnline",
    data() {
      return {
        userId: "",
        userType: "",
        userName: "",
        hr: 0,
        min: 30,
        sec: 0,
        log: "0",
        choose: "0",
        timeContent: "",
        examinationData: [],
        allRadio: [],//单选答案集合数据
        radio: "", //单选答案
        trueRadio: []
      };
    },
    methods: {
      set: () => {
        var s = 0;
        var m = 30;
        var timer = setInterval(
          function () {
            if (s == 0 && m == 0) {
              clearInterval(timer)
              this.submit()
            } else {
              if (s == 0) {
                m--;
                s = 59;
              }
              s--;
              this.timeContent = m + ":" + s;
              console.log(this.timeContent)
            }
          }, 1000);
      },
      pre() {
        this.choose--;
        this.allRadio[this.log] = this.radio;
        this.log--;
        this.radio = "";
      }
      ,
      next() {
        this.choose++;
        this.allRadio[this.log] = this.radio;
        this.log++;
        this.radio = "";
      }
      ,
      submit() {
        this.$confirm('是否提交笔试?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.allRadio[this.log] = this.radio;
          let num = 0;
          for (let i = 0; i < this.allRadio.length; i++) {
            if (this.allRadio[i] == this.trueRadio[i]) {
              num++;
            }
          }
          let user = {
            userAccountId: this.userId,
            grade: Math.round(100 * num / this.allRadio.length)
          }
          this.$axios.post(
            'http://localhost:8081/IndividualTest/setUserGrade', user)
            .then((res) => {
              this.$message({
                type: 'success',
                message: '交卷成功!'
              });
              this.logOut();
            }).catch((err) => {
            console.log(err)
          })
        }).catch((err) => {
          this.$message({
            type: 'error',
            message: '取消提交'
          });
          console.log(err)
        })
      }
      ,
      // countdown() {
      //   const end = Date.parse(new Date(this.logTime));
      //   const now = Date.parse(new Date());
      //   const msec = end - now;
      //
      //   if (msec < 0) return;
      //   let hr = parseInt(msec / 1000 / 60 / 60 % 24);
      //   let min = parseInt(msec / 1000 / 60 % 60);
      //   let sec = parseInt(msec / 1000 % 60);
      //   this.hr = hr > 9 ? hr : '0' + hr;
      //   this.min = min > 9 ? min : '0' + min;
      //   this.sec = sec > 9 ? sec : '0' + sec;
      //   const that = this
      //   if (min >= 0 && sec >= 0) {
      //     //倒计时结束关闭
      //     if (min == 0 && sec == 0) {
      //       return
      //     }
      //     setTimeout(function () {
      //       that.countdown()
      //     }, 1000)
      //   }
      // },
      logOut() {
        coo.clearCookie();
        this.$router.push({name: 'HomePage', params: {}});
      }
      ,
      findTime() {
        let re = {
          targetID: this.userId
        }
        this.$axios.post(
          'http://localhost:8081/IndividualTest/findTime', re)
          .then((res) => {
          }).catch((err) => {
          console.log(err)
        })
      }
      ,
      findQuestionByExam() {
        let re = {
          targetID: this.userId
        }
        this.$axios.post(
          'http://localhost:8081/IndividualTest/findQuestionByExam', re)
          .then((res) => {
            this.examinationData = res.data;
            for (let i = 0; i < this.examinationData.length; i++) {
              this.trueRadio[i] = this.examinationData[i].answer;
            }
            console.log(this.examinationData);
          }).catch((err) => {
          console.log(err)
        })
      },
      remind() {
        this.$confirm('该场笔试时长半小时，后台统计时间，时间到达时强制交卷，请注意把控时间！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        })
      },
      next() {
        if (log != dom.length - 1) {
          dom[log++].style.display = "none";
          dom[log].style.display = "flex";
        } else {
          dom[log].style.display = "none";
          log = 0;
          dom[log].style.display = "flex";
        }
      }
    }
    ,
    mounted() {
      this.userId = this.$route.params.userId;
      this.userName = this.$route.params.userName;
      this.userType = this.$route.params.userType;
      this.findQuestionByExam();
      this.findTime();
      this.set();
      this.remind();

      //设置捕获摄像头
      let video = document.getElementById("videoDemo");
      navigator.mediaDevices.getUserMedia({
        video: true
      }).then(res => {
        video.srcObject = res;
        video.play();
      })

      //设置初始页面
      let log = 0;
      let dom = document.getElementsByClassName("context");
      console.log(dom);
      dom[0].style.display = "flex";
    }
  }
</script>


<style scoped>
  html, body {
    padding: 0px;
    margin: 0px;
    background-color: antiquewhite;
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

  .jsq {
    width: 15%;
    height: 70px;
    float: right;
    background-color: #ffc445;
    color: white;
    font-size: 30px;
    text-align: center;
    display: inline-block;
  }

  .videoContent {
    float: right;
    margin-right: 20%;
    height: 70px;
  }

  .video {
    height: 70px;
  }

  .content {
    width: 60%;
    height: 600px;
    background-color: white;
    border-color: aliceblue;
    border-width: 3px;
    border-style: solid;
    margin-left: 20%;
    margin-top: 2%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ul, li {
    list-style: none;
  }

  .context {
    width: 100vw;
    height: 100vh;
    display: none;
    justify-content: center;
    align-items: center;
  }

  .next {
    width: 100px;
    height: 100px;
    background-color: blueviolet;
    color: cadetblue;
    border-radius: 10px;
  }
</style>
