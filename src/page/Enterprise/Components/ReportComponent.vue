<template>
  <div>
    <div>
      <div class="leftDiv">
        <el-table
          :data="talentData"
          style="width: 100%;"
          height="80vh">
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
          <el-table-column
            fixed="right"
            label="操作"
            width="300">
            <template slot-scope="scope">
              <el-button @click="openQuestion(scope.row)" type="primary">查看问答题</el-button>
              <el-button @click="openPicture(scope.row)" type="primary">查看截图记录</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="rightDiv">
        <div id="displayMain" style="width: 100%;height:100%;"></div>
      </div>
      <div>
        <el-dialog
          :visible.sync="questionDisplay"
          title="问答题"
          width="80%"
          center>
          <div v-for="(item,i) in examinationData" :key="i">
            <div v-if="displayProblem == i">
              <div style="font-size: 40px">{{i+1}}、{{item.title}}</div>
              <li v-if="item.type == '选择题'">
                <div style="border: black;border-width: 1px;border-style: solid;margin-top: 5%;">
                  <el-radio style="margin-left: 5%;margin-bottom: 2%"
                            v-model="answer" label="A">{{item.contentA}}
                  </el-radio>
                </div>
              </li>
              <el-input type="textarea"
                        v-model="item.answer" :rows="6"
                        :disabled="true"
                        style="margin-top: 2%;height:20vh;font-size: 30px;margin-bottom: 4%"
              >
              </el-input>
              <div style="width: 100%;height: 8vh;">
                <div style="width: 100%;text-align: center;margin-top: 10%">
                  <el-button type="primary" round @click="last()" icon="el-icon-arrow-left">上一题</el-button>
                  <el-input v-model="item.grade" style="width: 5%;font-size: 20px"></el-input>
                  <span> / </span>
                  <el-input v-model="item.score" style="width: 5%;font-size: 20px" :disabled="true"></el-input>
                  <el-button @click="submit(item)">评分</el-button>
                  <el-button type="primary" round @click="next()">下一题<i class="el-icon-arrow-right el-icon--right"></i>
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </el-dialog>

        <el-dialog
          :visible.sync="pictureDisplay"
          title="防作弊截图"
          width="80%"
          center>
          <div id="imgDiv">
          </div>
          <div class="cameraDisplay">
            <H1>摄像头截图</H1>
            <div class="imgBody" v-for="url in cameraUrls">
              <el-image :src="url" lazy style="width: 300px"
                        :preview-src-list="[url]"
                        @click.stop="handleClickItem">
              </el-image>
            </div>
          </div>
          <div class="screenDisplay">
            <H1>屏幕截图</H1>
            <div class="imgBody" v-for="url in urls">
              <el-image :src="url" lazy style="width: 400px"
                        :preview-src-list="[url]"
                        @click.stop="handleClickItem"></el-image>
            </div>
          </div>
        </el-dialog>
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
    name: "ReportComponet",
    props: ["examId"],
    data() {
      return {
        number: 0,
        talentData: [],
        tableData: [],
        req: {
          userName: "",
          page: 1,
          number: 10,
          remark: "",
          //查询关键字为status
          key: ""
        },
        questionDisplay: false,
        pictureDisplay: false,
        urls: [],
        //摄像头照片
        cameraUrls: [],
        examinationData: [],
        displayProblem: 0,
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
      this.req.userName = this.userName;
      this.req.key = "已结束";
      this.findTalent(this.examId);
      this.findRatioById(this.examId);
    },
    methods: {

      //关闭图片放大
      handleClickItem() {
        this.$nextTick(() => {
          let domImageMask = document.querySelector(".el-image-viewer__mask");  // 获取遮罩层dom
          if (!domImageMask) {
            return;
          }
          domImageMask.addEventListener("click", () => {
            // 点击遮罩层时调用关闭按钮的 click 事件
            document.querySelector(".el-image-viewer__close").click();
          });
        })
      },

      //查找考生
      findTalent(val) {
        let req = {
          targetID: val
        };
        this.$axios.post('http://localhost:8081/EnterpriseTalent/findTalentListByTestId', req)
          .then((res) => {
            this.talentData = res.data;
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


      //查询问答题
      openQuestion(val) {
        this.questionDisplay = true;
        this.findTalentSimpleQuestion(val.id);
      },

      //查找考生的简答题
      findTalentSimpleQuestion(val) {
        this.displayProblem = 0;
        let req = {
          targetID: val
        };
        this.$axios.post('http://localhost:8081/EnterpriseTalent/findTalentSimpleQuestion', req)
          .then((res) => {
            this.examinationData = res.data;
            console.log(res.data)
          }).catch((err) => {
          console.log(err)
        })
      },

      //查看防作弊截图
      openPicture(val) {
        this.pictureDisplay = true;
        let req = {
          targetID: val.id
        };
        this.urls = [];
        this.cameraUrls = [];
        this.$axios.post('http://localhost:8081/EnterpriseTalent/findPictureSrc', req)
          .then((res) => {
            console.log(res.data);
            let imgDiv = document.getElementById("imgDiv");
            for (let i = 0; i < res.data.length; i++) {
              let src = res.data[i].picture.replace("G:/homework/localImg/", "");
              if (res.data[i].type == "摄像头") {
                this.cameraUrls.push(require("G:/homework/localImg/" + src));
              }
              if (res.data[i].type == "屏幕") {
                this.urls.push(require("G:/homework/localImg/" + src));
              }
            }
          }).catch((err) => {
          console.log(err)
        })
      },
      last() {
        if (this.displayProblem != 0) {
          this.displayProblem--;
        } else {
          this.$alert('无更多题目', '提示', {
            confirmButtonText: '确定',
          })
        }
      },
      next() {
        if (this.displayProblem == this.examinationData.length - 1) {
          this.$alert('无更多题目', '提示', {
            confirmButtonText: '确定',
          })
        }
        if (this.displayProblem < this.examinationData.length - 1) {
          this.displayProblem++;
        }
      },

      submit(item) {
        this.$confirm('是否进行评分?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (item.grade <= item.score) {
            this.$axios.post('http://localhost:8081/EnterpriseTalent/updateTestAnswer', item)
              .then((res) => {
                this.findTalent(this.examId);
                this.findRatioById(this.examId);
                this.$message({
                  type: 'success',
                  message: '打分成功'
                });
              })
          } else {
            this.$message({
              type: 'error',
              message: '请输入正确的分数'
            })
          }
        }).catch((err) => {
          this.$message({
            type: 'error',
            message: '取消评分'
          });
          console.log(err)
        })
      },

      display() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('displayMain'));
        // 绘制图表
        myChart.setOption(this.option);
      },

      //获取信息考试
      findRatioById(val) {
        let req = {
          targetID: val
        };
        this.$axios.post('http://localhost:8081/Examination/findRatioById', req)
          .then((res) => {
            this.option.series[0].data = res.data;
            for (let i = 0; i < res.data.length; i++) {
              this.tableData.push(res.data[i]);
            }
            this.display();
          }).catch((err) => {
          console.log(err)
        })
      },
    }
  }
</script>

<style scoped>
  .leftDiv {
    width: 40%;
    height: 80vh;
    margin-left: 10%;
    margin-top: 3%;
    float: left;
  }

  .rightDiv {
    width: 40%;
    height: 80vh;
    margin-top: 3%;
    float: left;
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

  .dialogDiv {
    width: 100%;
    height: 60vh;
  }

  .pictureTitlte {
    display: inline-block;
    width: 40%;
    text-align: center;
  }

  .cameraDisplay {
    width: 30%;
    margin-left: 10%;
    display: inline-block;
    color: #9093a6;
    text-align: center;
  }

  .screenDisplay {
    width: 30%;
    margin-left: 20%;
    display: inline-block;
    color: #9093a6;
    text-align: center;
  }

  .imgBody {
    width: 100%;
    border: solid;
  }
</style>
