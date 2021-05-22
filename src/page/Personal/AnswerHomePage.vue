<!--suppress ALL -->
<template>
  <div>
    <div class="top">
      <div style="width: 40%;">
        <h1>在线笔试平台</h1>
      </div>

      <!--摄像头计时器模块-->
      <div class="topContent" v-if="problemDisplay">
        <div class="topVideo">
          <video id="topCameraVideo" autoplay src="">
            请打开您的摄像头
          </video>
        </div>
        <div class="topTime">
          <i class="el-icon-time"></i>
          <p id="timeDiv"></p>
        </div>
      </div>
    </div>
    <div class="content">
      <!-- 考试须知模块 -->
      <div id="rulesContext">
        <div class="logHead">
          <H1>考试须知</H1>
        </div>
      </div>
      <!-- 个人信息确认模块 -->
      <div id="personContext">
        <div class="logHead">
          <H1>请确认个人信息</H1>
        </div>
        <div v-for="temp in personLog">
          <div class="person-row">
            <div class="person-att">{{temp.att}}</div>
            <el-input class="person-input" v-model="temp.value" :disabled="personInputChange"></el-input>
          </div>
        </div>
        <div class="personButton" v-if="personButtonDisplay">
          <el-button class="changeButton" @click="changePersonValue()">修改信息</el-button>
          <el-button class="nextButton" @click="enterPersonValue()">确认</el-button>
        </div>
        <div class="personButton" v-else>
          <el-button class="changeButton" @click="cancelPersonValue()">取消修改</el-button>
          <el-button class="nextButton" @click="enterChangePersonValue()">确认修改</el-button>
        </div>
      </div>
      <!-- 视频监控模块 -->
      <div id="videoContext" v-if="videoContextDisplay">
        <div class="logHead">
          <H1>请共享您的屏幕</H1>
        </div>
        <div class="videoTextContent">
          <p>1.请点击分享摄像头按键，系统将会分享您的摄像头</p>
          <p>2.请点击分享屏幕按键，系统将会分享您的屏幕</p>
          <p>3.点击拍照按键，系统将会记录相关信息</p>
        </div>
        <div class="videoDiv">
          <div class="leftVideo">
            <video id="screenVideo" autoplay src="">
              请允许共享您的屏幕
            </video>
          </div>
          <div class="centerVideo">
            <el-button @click="screenShot()" class="getPicture" icon="el-icon-camera-solid"></el-button>
          </div>
          <div class="rightVideo">
            <video id="cameraVideo" autoplay src="">
              请打开您的摄像头
            </video>
          </div>
        </div>
        <div class="bottomDiv">
          <div>
            <input type="checkbox" @click="setVideo()">已同意分享摄像头
            <br>
            <input type="checkbox" @click="setScreenVideo()">已同意共享屏幕
          </div>
          <div>
            <button class="videoButton" @click="beginTest()">已拍照,进行考试</button>
          </div>
        </div>
        <!--<input type="button" id="capture" value="截图"/>-->
        <!--<canvas id="canvas"></canvas>-->
        <!--<div>-->
        <!--<input type="range">-->
        <!--</div>-->
      </div>
      <!--答题模块-->
      <div id="problemContext" v-model="examinationData" v-if="problemDisplay">
        <div style="width: 60%;text-align: left;margin-left: 20%;font-size: 25px">
          <ul v-for="(item,i) in examinationData" :key="i">
            <div v-if="displayProblem == i">
              <div>{{i+1}}、{{item.title}}</div>
              <li>
                <div style="border: black;border-width: 1px;border-style: solid;margin-top: 5%;">
                  <el-radio style="margin-left: 5%;margin-bottom: 2%"
                            v-model="answer" label="A">{{item.contentA}}
                  </el-radio>
                </div>
              </li>
              <li>
                <div style="border: black;border-width: 1px;border-style: solid;margin-top: 5%;">
                  <el-radio style="margin-left: 5%;margin-bottom: 2%"
                            v-model="answer" label="B">{{item.contentB}}
                  </el-radio>
                </div>
              </li>
              <li>
                <div style="border: black;border-width: 1px;border-style: solid;margin-top: 5%;">
                  <el-radio style="margin-left: 5%;margin-bottom: 2%"
                            v-model="answer" label="C">{{item.contentC}}
                  </el-radio>
                </div>
              </li>
              <li>
                <div style="border: black;border-width: 1px;border-style: solid;margin-top: 5%;">
                  <el-radio style="margin-left: 5%;margin-bottom: 2%"
                            v-model="answer" label="D">{{item.contentD}}
                  </el-radio>
                </div>
              </li>
            </div>
          </ul>
        </div>
        <!--按键-->
        <div class="problemButtonContext">
          <el-button class="problemButton" @click="last()" style="color: white;background-color: green">上一题</el-button>
          <el-button class="problemButton" @click="next()" v-if="problemNextButton">下一题</el-button>
          <el-button class="problemButton" @click="submit()" v-else>提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import coo from '../cookie'


  export default {
    name: "AnswerHomePage",
    data() {
      return {
        //用户ID
        userId: 0,
        userName: null,
        userType: null,
        ruleData: [
          "考试过程中，笔试系统客户端会全程对考生的行为进行监控，因此考生本人务必始终在监控视频范围内，同时考生所处考试环境不得有其他人员在场，一经发现，一律按违纪处理取消考生本次笔试成绩。",
          "考试系统后台实时监控，全程录像、抓拍。在考试期间如考生使用快捷键切屏、截屏，导致系统卡顿、退出等情况，所造成的后果由考生自行承担责任。考试全程不允许多屏登录，一经发现，一律按违纪处理取消考生本次笔试成绩。",
          "考试过程中，考生若有疑似违纪行为，系统将自动记录，考试结束后由考务工作小组根据记录视频、电脑截屏、作答数据、监考员记录、系统日志等多种方式进行判断，以下情况会被系统判定为异常情况：①人 像离屏、②面部有遮挡、③照片与本人不符、④画面内被识别到多人面部。被判定为监控异常的画面会上传到考试后台的考试详情页，实属违纪的将 作出违纪处理，取消考生本次考试成绩。",
          "考试过程中，考生不得中途离开座位，不得在考试结束后传递、发送考试内容，一经发现，一律按违纪处理取消考生本次笔试成绩。造成严重后果的，考生承担由此带来的法律责任。",
          "考试结束时，系统将提示交卷，对于超时仍未交卷的考生，系统将做强制交卷处理。",
          "考生若没有按照要求进行登录、答题、保存、交卷，将不能正确记录相关信息，后果由考生承担。",
          "如违反以上相关要求导致考试异常，由考生自行承担责任；属于违纪行为的，一律取消考试成绩。"
        ],
        videoButtonData: [{
          id: 1,
          value: "已同意分享摄像头",
        }, {
          id: 2,
          value: "已同意共享屏幕"
        }],
        oldPersonLog: [],
        personLog: [],
        //确认信息模块展示什么按键
        personButtonDisplay: true,
        //设置确认信息模块文本是否可读
        personInputChange: true,
        //设置是否选中相关事项
        agreeCameraVideo: false,
        agreeScreenVideo: false,
        videoPicture: false,

        //是否展示截图页面
        videoContextDisplay: true,
        problemDisplay: false,

        //个人信息类型类型匹配数组
        personType: {
          name: "姓名",
          sex: "性别",
          age: "年龄",
          cardId: "身份证号",
          school: "学校",
          education: "学历",
        },
        testDate: 0,

        //题目
        examinationData: [],
        //当前问题的位置
        displayProblem: 0,
        //获取DIV
        problemDiv: [],
        //显示是否提交的button
        problemNextButton: true,
        //当前问题回答
        answer: "",
        //问题答案合集
        answerList: [],

        //视频流
        screenStream: null,
        cameraStream: null,
      }
    },
    mounted() {
      //获取人员信息
      this.userId = this.$route.params.userId;
      this.userName = this.$route.params.userName;
      this.userType = this.$route.params.userType;

      let personDom = document.getElementById("personContext");
      let videoContext = document.getElementById("videoContext");
      //考试须知模块
      let ruleDom = document.getElementById("rulesContext")
      for (let i in this.ruleData) {
        let tempDom = document.createElement("p");
        i++;
        tempDom.textContent = i + " : ";
        i--;
        tempDom.textContent = tempDom.textContent + this.ruleData[i];
        ruleDom.appendChild(tempDom);
      }
      let button = document.createElement("button");
      button.setAttribute("style", " width: 10%;\n" +
        "    height: 5%;\n" +
        "    border-radius: 20px;\n" +
        "    position: absolute;\n" +
        "    margin: 5% 0;\n" +
        "    left: 45%;\n" +
        "    background-color: #14c0e4;\n" +
        "    outline: 0 none !important;");
      button.innerText = "我已阅读相关条例并同意";
      button.onclick = function () {
        ruleDom.style.display = "none";
        personDom.style.display = "block";
      }
      ruleDom.appendChild(button);

      //获取个人信息
      this.getPerson();

      //获取时间
      this.getTime();

      //获取题目
      this.findQuestionByExam();
    },
    methods: {
      //个人信息模块
      changePersonValue() {
        this.personInputChange = false;
        this.personButtonDisplay = false;
      },
      enterPersonValue() {
        let personDom = document.getElementById("personContext");
        personDom.style.display = "none";
        let videoContext = document.getElementById("videoContext");
        videoContext.style.display = "block";
      },
      cancelPersonValue() {
        this.personInputChange = true;
        this.personButtonDisplay = true;
        this.enterPersonValue();
        // this.personLog = this.oldPersonLog.map((x) => x);
      },
      enterChangePersonValue() {
        // console.log(this.personLog);
        //双向绑定已修改，发送请求；
        let data = {
          id: this.userId
        }
        for (let log in this.personLog) {
          //前端数据类型转换为后端的数据类型
          for (let temp in this.personType) {
            if (this.personLog[log].att == this.personType[temp]) {
              data[temp] = this.personLog[log].value;
            }
          }
        }

        this.$axios.post('http://localhost:8081/IndividualTest/updateTalent', data)
          .then((data) => {
              this.$message({
                type: 'success',
                message: '修改成功!'
              })
            }
          ).catch((err) => {
            this.$message({
              type: 'error',
              message: '修改失败!'
            })
          }
        )

        // this.oldPersonLog = this.personLog.map((x) => x);
        this.personInputChange = true;
        this.personButtonDisplay = true;
      },
      //设置摄像头
      setVideo() {
        //监控摄像头
        if (event.target.checked) {
          this.agreeCameraVideo = true;
          navigator.mediaDevices.getUserMedia({video: true})
            .then(mediaStream => {
              this.cameraStream = mediaStream;
              document.getElementById('cameraVideo').srcObject = this.cameraStream;
            }).then()
          let cameraVideoDiv = document.getElementById("cameraVideo");
          cameraVideoDiv.style.backgroundColor = "white";
        } else {
          this.agreeScreenVideo = false;
        }
      },

      //监控屏幕
      setScreenVideo() {
        //监控屏幕
        if (event.target.checked) {
          this.agreeScreenVideo = true;
          navigator.mediaDevices.getDisplayMedia({video: true}).then(stream => {
            this.screenStream = stream;
            document.getElementById("screenVideo").srcObject = this.screenStream;
          }).catch(error => {
            console.log(error);
          })
          let screenVideoDiv = document.getElementById("screenVideo");
          screenVideoDiv.style.backgroundColor = "white";
        } else {
          this.agreeScreenVideo = false;
        }
      },

      //获取截图
      screenShot() {
        if (this.agreeCameraVideo && this.agreeScreenVideo) {
          const screenVideo = document.getElementById('screenVideo');
          const cameraVideo = document.getElementById('cameraVideo');
          const screenCanvas = document.createElement('canvas');
          const cameraCanvas = document.createElement('canvas');
          const sctx = screenCanvas.getContext('2d');
          const cctx = cameraCanvas.getContext('2d');
          screenCanvas.width = screenVideo.videoWidth;
          screenCanvas.height = screenVideo.videoHeight;
          cameraCanvas.width = cameraVideo.videoWidth;
          cameraCanvas.height = cameraVideo.videoHeight;
          sctx.drawImage(screenVideo, 0, 0);
          cctx.drawImage(cameraVideo, 0, 0);
          this.videoPicture = true;
          this.saveImg (cameraCanvas);
          this.saveImg(screenCanvas);
        } else {
          window.alert("请勾选确认分享摄像头以及屏幕");
        }
      },
      //load picture
      saveImg(canvas) {
        const dataUrl = canvas.toDataURL('images/jpg')
        // 第一步：将dataUrl转换成Blob
        var fd = new FormData()
        var blob = this.dataURItoBlob(dataUrl)
        fd.append('file', blob, Date.now() + '.jpg')
        // 第二步：上传分享图
        this.$axios.post('http://localhost:8081/IndividualTest/saveImg', fd).then((res) => {
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
        }).catch((err) => {
          this.$message({
            type: 'error',
            message: '保存失败!'
          })
        })
      },
      // base64转buffer
      dataURItoBlob(dataURI) {
        var byteString = atob(dataURI.split(',')[1])
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
        var ab = new ArrayBuffer(byteString.length)
        var ia = new Uint8Array(ab)
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i)
        }
        return new Blob([ab], {type: mimeString})
      },

      //已截图，进行考试
      beginTest() {
        if (this.videoPicture) {
          this.videoContextDisplay = false;
          this.problemDisplay = true;

          //获取考试时间
          this.getTime();

          navigator.mediaDevices.getUserMedia({video: true})
            .then(mediaStream => {
              document.getElementById('topCameraVideo').srcObject = mediaStream;
            }).then()

        } else {
          window.alert("请先确认拍照")
        }
      },

      getPerson() {
        let receiveEntity = {
          //目标用户ID
          targetID: this.userId
        }
        this.$axios.post(
          'http://localhost:8081/IndividualTest/findTalent', receiveEntity)
          .then((data) => {
            for (let temp in data.data) {
              if (data.data[temp] == null) {
                if (this.personType[temp]) {
                  let obj = {};
                  obj.att = this.personType[temp];
                  obj.value = "";
                  this.personLog.push(obj);
                }
              } else {
                if (this.personType[temp]) {
                  let obj = {};
                  obj.att = this.personType[temp];
                  obj.value = data.data[temp];
                  this.personLog.push(obj);
                }
              }
            }
            // this.oldPersonLog = this.personLog.map((x) => x);
          })
      },

      //设置考试时间
      getTime() {
        //发送请求
        let re = {
          targetID: this.userId
        }
        this.$axios.post('http://localhost:8081/IndividualTest/findTestTime', re)
          .then((res) => {
            let time = res.data.continueTime.toString().slice(11, 19);
            let timeArr = time.split(":");
            let timer = 0;
            //将获取的时间转为秒数
            let newTime = timeArr.map((time) => {
              return parseInt(time);
            })
            for (let i = 0; i < 3; i++) {
              if (i == 0) {
                timer += newTime[i] * 60 * 60;
              } else if (i == 1) {
                timer += newTime[i] * 60;
              } else if (i == 3) {
                timer += newTime[i];
              }
            }
            this.testDate = timer;
          }).catch((err) => {
          console.log(err)
        })

        var timer = "";
        if (!window.timer) {//清掉上一次设置的实时刷新
          //开始实时刷新
          window['timer'] = () => {
            setInterval(() => {
              this.runTime();
            }, 1000)
          }
          window.timer();
        }
      },
      runTime() {
        this.testDate--;
        this.setTime();
        if (this.testDate == 0) {
          clearInterval(timer);
          //打开提示框
          this.$alert('时间已到，系统将会自动提交试卷', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.logOut();
              this.$message({
                type: 'success',
                message: '交卷成功!'
              });
            }
          });
        }
      },

      setTime() {
        let hour = parseInt(this.testDate / 3600);
        let min = parseInt((this.testDate / 60) - hour);
        let second = this.testDate % 60;
        let timeDiv = document.getElementById("timeDiv");
        let String = "";
        if (hour < 10) {
          String += "0" + hour + ":";
        } else {
          String += hour + ":";
        }
        if (min < 10) {
          String += "0" + min + ":";
        } else {
          String += min + ":";
        }
        if (second < 10) {
          String += "0" + second;
        } else {
          String += second;
        }
        try {
          timeDiv.innerHTML = String;
        } catch (e) {
          console.log(e)
        }
      },

      //查询题目
      findQuestionByExam() {
        let re = {
          targetID: this.userId
        }
        this.$axios.post(
          'http://localhost:8081/IndividualTest/findQuestionByExam', re)
          .then((res) => {
            this.examinationData = res.data;
          }).catch((err) => {
          console.log(err)
        })
      },
      last() {
        this.updateSelect();
        if (this.displayProblem != 0) {
          this.problemNextButton = true;
          // this.problemDiv[this.displayProblem].style.display = "none";
          this.displayProblem--;
          // this.problemDiv[this.displayProblem].style.display = "block";
        } else {
          this.$alert('无更多题目', '提示', {
            confirmButtonText: '确定',
          })
        }
      },
      next() {
        this.updateSelect();
        if (this.displayProblem < this.examinationData.length - 1) {
          // this.problemDiv[this.displayProblem].style.display = "none";
          this.displayProblem++;
          // this.problemDiv[this.displayProblem].style.display = "block";
        }

        if (this.displayProblem == this.examinationData.length - 1) {
          this.problemNextButton = false;
        }
      },
      //刷新
      updateSelect() {
        this.answerList[this.displayProblem] = this.answer;
        this.answer = "";
      },
      submit() {
        this.updateSelect();
        this.$confirm('是否提交笔试?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let testAnswerList = {
            personId: this.userId,
            testAnswers: []
          }
          console.log(this.examinationData)
          for (let i = 0; i < this.examinationData.length; i++) {
            let temp = {
              answer: this.answerList[i],
              problem: this.examinationData[i].id,
              trueAnswer: this.examinationData[i].answer,
              score: 10,
            }
            testAnswerList.testAnswers.push(temp)
          }
          this.$axios.post(
            'http://localhost:8081/IndividualTest/setUserGrade', testAnswerList)
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
      },

      //退出登录
      logOut() {
        this.cancelVideo();
        coo.clearCookie();
        this.$router.push({name: 'HomePage', params: {}});
      },

      //退出取消监控
      cancelVideo() {
        this.screenStream.getTracks().forEach(track => track.stop());
        this.cameraStream.getTracks().forEach(track => track.stop());
      },
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
    height: 10vh;
    width: 100%;
    color: white;
    text-align: center;
    font-size: 30px;
    user-select: none;
  }

  .topContent {
    width: 25%;
    height: 10vh;
    position: absolute;
    top: 0px;
    right: 20%;
  }

  .topVideo {
    width: 26%;
    height: 10vh;
    background-color: red;
  }

  #topCameraVideo {
    width: 127px;
    height: 10vh;
    left: 0px;
  }

  .topTime {
    width: 74%;
    height: 10vh;
    background-color: #02ffbb;
    position: absolute;
    top: 0px;
    right: 0px;
  }

  .topTime i {
    font-size: 3em;
    float: left;
  }

  .topTime p {
    font-size: 2.1em;
  }

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content p {
    text-indent: 2em;
    font-size: 1em;
    padding: 10px 0px;
    width: 400px;
  }

  .content H1 {
    font-size: 3em;
  }

  #personContext {
    width: 60%;
    height: 90vh;
    user-select: none;
    display: none;
    text-align: center;
  }

  #rulesContext {
    width: 60%;
    height: 90vh;
    user-select: none;
  }

  .logHead {
    width: 100%;
    text-align: center;
  }

  #videoContext {
    display: none;
    width: 60%;
    height: 90vh;
    user-select: none;
  }

  .person-row {
    margin-top: 2%;
    height: 10vh;
    font-size: 1em;
  }

  .person-att {
    width: 100px;
    height: 3vh;
    display: inline-block;
    margin-left: 20%;
    margin-top: 1%;
  }

  .person-input {
    width: 40%;
    height: 1em;
    float: right;
    margin-right: 20%;
    border-radius: 10px;
    border-color: blue;
  }

  .person-input-display {
    width: 40%;
    height: 1em;
    float: right;
    margin-right: 20%;
    border-radius: 10px;
    border-color: blue;
  }

  .changeButton {
    width: 10%;
    height: 5%;
    border-radius: 20px;
    position: absolute;
    left: 40%;
    background-color: red;
    outline: 0 none !important;
    font-size: 20px;
    color: white;
  }

  .nextButton {
    width: 10%;
    height: 5%;
    border-radius: 20px;
    position: absolute;
    left: 50%;
    background-color: #14c0e4;
    outline: 0 none !important;
    font-size: 20px;
    color: white;
  }

  .nextButton:hover {
    color: white;
    cursor: pointer;
  }

  #screenVideo {
    width: 26%;
    height: 30%;
    position: absolute;
    left: 14%;
    margin-top: 3%;
    background-color: black;
  }

  #cameraVideo {
    width: 19%;
    height: 29%;
    position: absolute;
    left: 60%;
    background-color: black;
    margin-top: 3%;
  }

  .videoTextContent {
    text-align: left;
    padding: 10px 390px;
  }

  .videoDiv {
  }

  .videoCheckbox {
    position: absolute;
    margin-top: 5%;
    margin-left: 2%;
  }

  .getPicture {
    position: absolute;
    margin-top: 10%;
    margin-left: 7%;
    width: 6%;
    height: 10%;
    left: 40%;
    font-size: 50px;
    border: none;
  }

  .leftVideo {
    width: 40%;
    height: 400px;
    display: inline-block;
  }

  .centerVideo {
    width: 19%;
    height: 400px;
    display: inline-block;
    border: 1px solid #69FFF8;
  }

  .rightVideo {
    width: 40%;
    height: 400px;
    display: inline-block;
    float: right;
  }

  .bottomDiv {
    margin-left: 40%;
  }

  .videoButton {
    width: 10%;
    height: 5%;
    border-radius: 20px;
    position: absolute;
    left: 44%;
    background-color: #14c0e4;
    outline: 0 none !important;
    font-size: 20px;
    color: white;
    margin-top: 10px;
    border: none;
  }

  #problemContext {
    font-size: 40px;
    width: 100%;
  }

  .problemTitle {
    width: 100%;
    margin-top: 3%;
    margin-left: 20%;
  }

  .problemRadioGroup {
    border: #908eff solid;
    border-radius: 10px;
    width: 60%;
    margin-left: 20%;
    margin-top: 3%;
  }

  .problemRadio {
    border-radius: 10px;
    width: 100%;
    margin-left: 20%;
    margin-top: 3%;
  }

  .problemButtonContext {
  }

  .problemButton {
    width: 8%;
    height: 8vh;
    font-size: 20px;
    background-color: red;
    border-radius: 10px;
    border: none;
    margin-left: 27%;
    margin-top: 3%;
  }

  /*问题的div框*/
  .problemContent {
    display: none;
  }
</style>
