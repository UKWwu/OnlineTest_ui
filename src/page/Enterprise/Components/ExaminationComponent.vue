<template>
  <div>
    <div class="left">
      <div class="leftButtonDiv">
        <button class="leftButton" style="background-color: #202897;color: white" @click="openExamForm">新建考试</button>
        <button class="leftButton" style="border-color: white;" @click="changeComponent">考试分析</button>
      </div>
      <div class="testLog">
        <button class="testLogButton" @click="allTest">所有考试</button>
        <button class="testLogButton" @click="runTest">正在进行</button>
        <button class="testLogButton" @click="noneTest">未开始</button>
        <button class="testLogButton" @click="endTest">已结束</button>
      </div>
    </div>
    <div class="right">
      <TestComponent v-if="testType == 'all'"></TestComponent>
      <TestComponent v-if="testType == 'run'" :status="'正在进行'"></TestComponent>
      <TestComponent v-if="testType == 'none'" :status="'未启动'"></TestComponent>
      <TestComponent v-if="testType == 'end'" :status="'已结束'"></TestComponent>
    </div>
    <div>
      <el-dialog
        :visible.sync="examForm"
        title="考试信息"
        width="80%"
        center>
        <div class="examFormDiv">
          <div style="display: inline-block;height: 60vh">
            <el-steps direction="vertical" :active="active">
              <el-step title="基本信息"></el-step>
              <el-step title="考试题目"></el-step>
              <el-step title="参考人员"></el-step>
            </el-steps>
          </div>
          <div class="formContent" v-if="active == 1">
            <el-form ref="examination" :model="examination" label-width="120px" style="margin-left: 20%">
              <el-form-item label="笔试名称">
                <el-input v-model="examination.name" style="width: 45%;"></el-input>
              </el-form-item>
              <el-form-item label="笔试开始时间">
                <el-col :span="11">
                  <el-date-picker type="date" placeholder="选择日期" v-model="examination.beginTime"
                                  style="width: 100%;"></el-date-picker>
                </el-col>
              </el-form-item>
              <el-form-item label="笔试结束时间">
                <el-col :span="11">
                  <el-date-picker type="date" placeholder="选择日期" v-model="examination.endTime"
                                  style="width: 100%;"></el-date-picker>
                </el-col>
              </el-form-item>
              <el-form-item label="考试时间">
                <el-col :span="11">
                  <el-time-select
                    style="width: 100%;"
                    v-model="examination.continueTime"
                    :picker-options="{start: '00:15',step: '00:15',end: '6:00'
                             }"
                    placeholder="选择时间">
                  </el-time-select>
                </el-col>
              </el-form-item>
              <el-form-item label="是否启动" prop="form">
                <el-switch v-model="examStatus"></el-switch>
              </el-form-item>
              <el-form-item>
                <div style="margin-left: 20%">
                  <el-button style="margin-top: 12px;" type="primary" @click="next">下一步</el-button>
                </div>
              </el-form-item>
            </el-form>
          </div>
          <div class="formContent" v-if="active == 2">
            <div style="margin-left: 10%;">
              <H1>请选择考试题目</H1>
              <el-button type="primary" style="float: right;margin-right: 11%" @click="next">
                下一步
              </el-button>
              <el-button type="primary" style="float: right;margin-right: 1%" @click="pre">
                上一步
              </el-button>
              <div style="width: 80%;margin-top: 2%;margin-bottom: 1%">
                <el-input v-model="findKey" placeholder="请输入关键字搜索" style="width: 20%"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="findQuestionByKey">搜索</el-button>
              </div>
            </div>
            <el-table
              :data="problemData"
              @selection-change="handleSelectionChange"
              border
              height="250"
              style="width: 80%;margin-left: 10%">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                fixed
                prop="name"
                label="题目名称"
                width="200">
              </el-table-column>
              <el-table-column
                prop="problemType"
                label="题目分类"
                width="160">
              </el-table-column>
              <el-table-column
                prop="type"
                label="题目类型"
                width="160">
              </el-table-column>
              <el-table-column
                prop="score"
                label="分数"
                width="160">
              </el-table-column>
              <el-table-column
                prop="time"
                label="日期"
                width="163">
              </el-table-column>
              <el-table-column
                prop="answer"
                label="答案"
                width="170">
              </el-table-column>
            </el-table>
            <div style="width: 100%;text-align: center;margin-top: 5%;">
              <el-pagination
                background
                :total=number
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                :page-sizes="[10, 20, 30, 40,500]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper">
              </el-pagination>
            </div>
          </div>
          <div class="formContent" v-if="active == 3">
            <div style="margin-left: 10%;">
              <H1>请选择考试人员</H1>
            </div>
            <div>
              <el-transfer
                style="margin-left: 30%"
                filterable
                :titles="['候选人', '考试人员']"
                :filter-method="filterMethod"
                filter-placeholder="请输入候选人 "
                v-model="chooseValue"
                :data="data">
              </el-transfer>
              <div style="text-align: center">
                <el-button style="margin-top: 12px;" type="primary" @click="pre">上一步</el-button>
                <el-button style="margin-top: 12px;" type="danger" @click="submit">提交</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import TestComponent from './ExaminationComponents/TestComponent'
  import coo from '../../cookie'

  export default {
    name: "ExaminationComponet",
    data() {
      return {
        testType: "all",
        examForm: true,
        findKey: "",
        active: 1,
        number: 0,
        examStatus: true,
        problemData: [],
        //人员选择框
        data: [],
        chooseValue: [],
        filterMethod(query, item) {
          return item.label.indexOf(query) > -1;
        },
        examination: {
          name: "",
          beginTime: "",
          status: "",
          type: "",
          continueTime: "",
          endTime: "",
          questionNumber: "",
          userName: ""
        },
        req: {
          userName: "",
          page: 1,
          number: 10
        },
        problemList: [],
      }
    },
    components: {
      TestComponent
    },
    mounted() {
      this.userName = coo.getCookie("userName");
      this.req.userName = coo.getCookie("userName");
      this.findQuestionByPage();
      this.findExamTalent();
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
      changeComponent() {
        this.$parent.reportButton();
      },
      openExamForm() {
        this.examForm = true;
        this.active = 1;
        this.examination = {
          name: "",
          beginTime: "",
          status: "",
          type: "",
          continueTime: "",
          endTime: "",
          questionNumber: "",
          userName: ""
        };
      },
      next() {
        this.active++;
      },
      pre() {
        this.active--;
      },

      //题目表格
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.problemList = val;
        console.log(this.problemList)
      },

      //查找题目
      findQuestionByPage() {
        this.$axios.post(
          'http://localhost:8081/EnterpriseQuestion/findByPage', this.req)
          .then((res) => {
            this.problemData = res.data;
            this.problemData.forEach(
              function (item) {
                if (item.time != null) {
                  item.time = item.time.substr(0, 10);
                }
              }
            );
            this.findQuestionNumber();
          }).catch((err) => {
          console.log(err)
        })
      },
      findQuestionNumber() {
        let temp = {
          userName: this.userName
        };
        this.$axios.post(
          'http://localhost:8081/EnterpriseQuestion/findQuestionNumber', temp)
          .then((res) => {
            this.number = res.data;
          }).catch((err) => {
          console.log(err)
        })
      },
      //换页
      handleSizeChange(val) {
        this.req.page = 1;
        this.req.number = val;
        this.findQuestionByPage();
      },
      handleCurrentChange(val) {
        this.req.page = val;
        this.findQuestionByPage();
      },

      //根据关键字查找问题
      findQuestionByKey() {
        console.log(this.findKey)
        if (this.findKey == "") {
          this.findQuestionByPage()
        } else {
          this.req.page = 1;
          this.req.remark = this.findKey;
          this.$axios.post(
            'http://localhost:8081/EnterpriseQuestion/findQuestionByKey', this.req)
            .then((res) => {
              this.problemData = res.data;
              this.problemData.forEach(
                function (item) {
                  if (item.time != null) {
                    item.time = item.time.substr(0, 10);
                  }
                }
              );
              this.findQuestionNumberByKey();
            }).catch((err) => {
            console.log(err)
          })
        }
      },
      findQuestionNumberByKey() {
        this.$axios.post(
          'http://localhost:8081/EnterpriseQuestion/findQuestionNumberByKey', this.req)
          .then((res) => {
            this.number = res.data;
          }).catch((err) => {
          console.log(err)
        })
      },
      //寻找参考人员
      findExamTalent() {
        let re = {
          userName: this.userName
        };
        this.$axios.post(
          'http://localhost:8081/Examination/findExamTalent', re)
          .then((res) => {
            let temps = res.data;
            temps.forEach((temp) => {
              this.data.push({
                label: temp.name,
                key: temp.id,
              })
            })
          }).catch((err) => {
          console.log(err)
        })
      },

      //提交新建考试
      submit() {
        this.addExamination();
      },

      //新增考试场次
      addExamination() {
        let dateString = "2021-11-12 " + this.examination.continueTime;
        if (dateString) {
          var arr1 = dateString.split(" ");
          var sdate = arr1[0].split('-');
          var date = new Date(sdate[0], sdate[1] - 1, sdate[2]);
          this.examination.continueTime = date;
        }
        this.examination.userName = coo.getCookie("userName");
        if (this.examStatus) {
          this.examination.status = "正在进行";
        } else {
          this.examination.status = "未启动";
        }
        this.$axios.post(
          'http://localhost:8081/Examination/addExamination', this.examination)
          .then((res) => {
            let re = {
              object: this.chooseValue,
              userName: this.userName,
              targetID: res.data.id,
            };
            this.addExaminee(re);
            let problemTemp = [];
            this.problemList.forEach((item) => {
              problemTemp.push(item.id)
            });
            let reProblem = {
              object: problemTemp,
              userName: this.userName,
              targetID: res.data.id,
            };
            this.addExamProblem(reProblem);
            this.examForm = false;
            this.$message({
              type: 'success',
              message: '新建考试成功!'
            });
          }).then(() => {
          this.testType = "";
        }).then(() => {
          this.testType = "all";

        }).catch((err) => {
          console.log(err)
        })
      },
      //添加人员
      addExaminee(re) {
        this.$axios.post(
          'http://localhost:8081/Examination/addExaminee', re)
          .then((res) => {
          }).catch((err) => {
          console.log(err)
        })
      },
      //添加题目
      addExamProblem(re) {
        this.$axios.post(
          'http://localhost:8081/Examination/addExamProblem', re)
          .then((res) => {
          }).catch((err) => {
          console.log(err)
        })
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
    background-color: #fafbfc;

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

  .examFormDiv {
    width: 100%;
    height: 60vh;
  }

  .formContent {
    width: 90%;
    height: 60vh;
    float: right;
    display: inline-block;
  }
</style>
