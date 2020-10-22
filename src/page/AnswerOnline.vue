<template>
  <div style="background-color: antiquewhite;height: 100%">
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
      <div style="width: 100%;height: 20%;">
        <div style="width: 30%;float: left;"><h1>单选题</h1></div>
      </div>
      <div style="width: 100%;height: 60%;">
        <div style="width: 100%;">
          <div style="width: 60%;text-align: left;margin-left: 20%;font-size: 25px">
            <ul v-for="(item,i) in examinationData" :key="i">
              <div v-if="choose == i">
                <div>{{i+1}}、{{item.question}}</div>
                <li v-for="(son,index) in item.answer" :key="index">
                  <div style="border: black;border-width: 1px;border-style: solid;margin-top: 5%;">
                  <el-radio
                    style="margin-left: 5%;margin-bottom: 2%"
                    v-model="radio[i]"
                    :label="son.value"
                    :name="son.name"
                    @change="getIputValue(i)"
                  ></el-radio>
                  </div>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <div style="margin-left:20%;width: 60%;height: 20%;">
        <div style="float: left;margin-left: 5%">
          <el-button type="danger" :onclick="pre" style="position:relative">上一题</el-button>
        </div>
        <div style="float: right">
          <el-button type="success" :onclick="next" style="position:relative">下一题</el-button>
        </div>
      </div>
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
        sec: 0,
        choose:'2',
        question: "为初始化其成员变量，每个类都定义的方法是（）",
        examinationData: [
          {
            id: "1",
            name: "one",
            question:
              "为初始化其成员变量，每个类都定义的方法是（）",
            answer: [
              {value: "A.Python"},
              {value: "B.Vue"},
              {value: "C.Php"},
              {value: "D.Java"}
            ]
          },
          {
            id: "1",
            name: "two",
            question:
              "为初始化其成员变量，每个类都定义的方法是（）",
            answer: [
              {value: "A.问题一"},
              {value: "B.Vue2"},
              {value: "C.Php2"},
              {value: "D.Java2"}
            ]
          },
          {
            id: "1",
            name: "three",
            question:
              "为初始化其成员变量，每个类都定义的方法是（）",
            answer: [
              {value: "A.问题二"},
              {value: "B.Vue3"},
              {value: "C.Php3"},
              {value: "D.Java3"}
            ]
          },
          {
            id: "1",
            name: "four",
            question:
              "为初始化其成员变量，每个类都定义的方法是（）",
            answer: [
              {
                value:
                  "A.为初始化其成员变量，每个类都定义的方法是（）"
              },
              {value: "B.Vue4"},
              {value: "C.Php4"},
              {value: "D.Java4"}
            ]
          },
          {
            id: "1",
            name: "five",
            question: "How about your in skills?",
            answer: [
              {value: "A.问题四"},
              {value: "B.Vue5"},
              {value: "C.Php5"},
              {value: "D.Java5"}
            ]
          }
        ],
        allRadio: [],//提交给后台的真题数据
        radio: []//单选真题答案
      };
    },
    methods: {
      pre(){
        this.choose--;
      },
      next(){
        this.choose++;
      },
      //答题
      getIputValue(index) {
        // console.log(index + 1 + "题" + this.radio);
        this.allRadio[index] = this.radio[index]; // 将数据存入提交给后台的数据中
        console.log(this.allRadio);
        // console.log(this.radio)
      },
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
    background-color: antiquewhite;
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
    background-color: white;
    border-color: aliceblue;
    border-width: 3px;
    border-style: solid;
    margin-left: 20%;
    margin-top: 2%;
    text-align: center;
  }

  ul, li {
    list-style: none;
  }
</style>
