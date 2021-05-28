<template>
  <div>
    <div class="left">
      <div class="leftButtonDiv">
        <button class="leftButton" style="background-color: #202897;color: white" @click="openQuestion">新增试题</button>
        <button class="leftButton" style="background-color: #F4B335;" @click="downExcel">模板下载</button>
        <button class="leftButton" style="border-color: white;" @click="excelDialogVisible = true">批量上传</button>
        <button class="leftButton" style="background-color: red;border-color: white;" @click="deleteQuestionList">批量删除</button>
      </div>
    </div>
    <div class="right">
      <div>
        <div style="width: 80%;margin-top: 2%;margin-bottom: 1%">
          <el-input v-model="findKey" placeholder="请输入关键字搜索" style="width: 20%"></el-input>
          <el-button type="primary" icon="el-icon-search" @click="findQuestionByKey">搜索</el-button>
        </div>
        <el-table
          :data="tableData"
          border
          ref="questionList"
          @selection-change="handleSelectionChange"
          style="width: 90%;">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            fixed
            prop="name"
            label="题目名称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="problemType"
            label="题目分类"
            width="120">
          </el-table-column>
          <el-table-column
            prop="type"
            label="题目类型"
            width="120">
          </el-table-column>
          <el-table-column
            prop="score"
            label="分数"
            width="120">
          </el-table-column>
          <el-table-column
            prop="time"
            label="日期"
            width="120">
          </el-table-column>
          <el-table-column
            prop="unitName"
            label="所属单位"
            width="120">
          </el-table-column>
          <el-table-column
            prop="answer"
            label="答案"
            width="120">
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            width="300">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="150">
            <template slot-scope="scope">
              <el-button @click="openDisplay(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small" @click="openUpdate(scope.row)">编辑</el-button>
              <el-button type="text" size="small" style="color: red" @click="deleteQuestion(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="width: 100%;text-align: center;margin-top: 5%;">
          <el-pagination
            background
            :total=number
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper">
          </el-pagination>
        </div>
      </div>
    </div>
    <div>
      <div>
        <el-dialog
          title="选择文件进行批量上传"
          :visible.sync="excelDialogVisible"
          width="30%"
          center>
          <div style="margin-left: 17%">
            <el-upload
              class="upload-demo"
              action
              drag
              accept=".xlsx, .xls"
              :auto-upload="false"
              :on-change="getData"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </div>
          <span slot="footer" class="dialog-footer">
          <el-button @click="excelDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="excelDialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>
      </div>
      <div>
        <el-dialog
          :visible.sync="questionForm"
          width="60%"
          center>
          <el-main style="width: 100%;height: 100%;background-color: white">
            <el-page-header @back="goback" content="新增试题" v-if="this.formType == 'add'">
            </el-page-header>
            <el-page-header @back="goback" content="编辑试题" v-if="this.formType == 'update'">
            </el-page-header>
            <el-page-header @back="goback" content="查看试题" v-if="this.formType == 'display'">
            </el-page-header>


            <el-form :model="question" label-width="100px" :rules="rules" ref="question"
                     style="margin-left: 15%;width: 70%;margin-top: 5%" size="small" v-bind:disabled="false">
              <el-form-item label="题目名称" prop="name">
                <el-input v-model="question.name" :readonly="readonly ? 'readonly':false"></el-input>
              </el-form-item>
              <el-form-item label="题目分类" prop="problemType">
                <el-input v-model="question.problemType" :readonly="readonly ? 'readonly':false"></el-input>
              </el-form-item>
              <el-form-item label="题目类型" prop="type">
                <el-select v-model="question.type" :disabled="readonly" placeholder="请选择题目类型">
                  <el-option label="选择题" value="选择题"></el-option>
                  <el-option label="问答题" value="问答题"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="分数" prop="score">
                <el-input v-model="question.score" :readonly="readonly ? 'readonly':false"></el-input>
              </el-form-item>
              <el-form-item label="题目标题" prop="title">
                <el-input v-model="question.title" type="textarea" :readonly="readonly ? 'readonly':false"
                          :rows="3"></el-input>
              </el-form-item>
              <div v-if="question.type == '选择题'">
                <el-form-item label="选项A" prop="contentA">
                  <el-input v-model="question.contentA" type="textarea" :readonly="readonly ? 'readonly':false"
                            :rows="3"></el-input>
                </el-form-item>
                <el-form-item label="选项B" prop="contentB">
                  <el-input v-model="question.contentB" type="textarea" :readonly="readonly ? 'readonly':false"
                            :rows="3"></el-input>
                </el-form-item>
                <el-form-item label="选项C" prop="contentC">
                  <el-input v-model="question.contentC" type="textarea" :readonly="readonly ? 'readonly':false"
                            :rows="3"></el-input>
                </el-form-item>
                <el-form-item label="选项D" prop="contentD">
                  <el-input v-model="question.contentD" type="textarea" :readonly="readonly ? 'readonly':false"
                            :rows="3"></el-input>
                </el-form-item>
                <el-form-item label="答案" prop="answer">
                  <el-input v-model="question.answer" :readonly="readonly ? 'readonly':false"></el-input>
                </el-form-item>
              </div>
              <el-form-item label="备注" prop="remark">
                <el-input v-model="question.remark" :readonly="readonly ? 'readonly':false"></el-input>
              </el-form-item>
              <div style="margin-left: 45%">
                <el-button type="primary" v-if="formType == 'add'" @click.native="addQuestion">新建</el-button>
                <el-button type="primary" v-if="formType == 'update'" @click.native="updateQuestion">修改</el-button>
              </div>
            </el-form>
          </el-main>
        </el-dialog>

      </div>
    </div>
  </div>
</template>

<script>
  import coo from '../../cookie'
  import xlsx from 'xlsx'

  export default {
    name: "ProblemComponet",
    data() {
      return {
        excelDialogVisible: false,
        //查找关键字
        findKey: "",
        tableData: [],
        number: 0,
        req: {
          userName: "",
          page: 1,
          number: 10
        },
        question: {
          id: "",
          name: "",
          problemType: "",
          title: "",
          type: "",
          remark: "",
          score: "",
          contentA: "",
          contentB: "",
          contentC: "",
          contentD: "",
          answer: "",
          content: "",
          unitName: "",
        },
        formType: "add",
        readonly: false,
        //显示操作页面
        questionForm: false,
        //规则
        rules: {
          name: [
            {required: true, message: '请输入题目名称', trigger: 'blur'}
          ],
          problemType: [
            {required: true, message: '请输入题目分类', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请输入题目类型', trigger: 'blur'}
          ],
          title: [
            {required: true, message: '请输入问题描述', trigger: 'blur'}
          ],
          contentA: [
            {required: true, message: '请输入问题选项A', trigger: 'blur'}
          ],
          contentB: [
            {required: true, message: '请输入问题选项B', trigger: 'blur'}
          ],
          contentC: [
            {required: true, message: '请输入问题选项C', trigger: 'blur'}
          ],
          contentD: [
            {required: true, message: '请输入问题选项D', trigger: 'blur'}
          ],
          answer: [
            {required: true, message: '请输入正确选项', trigger: 'blur'}
          ]
        },
        updateRules: {
          name: [
            {required: true, message: '请输入题目名称', trigger: 'blur'}
          ],
          problemType: [
            {required: true, message: '请输入题目分类', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请输入题目类型', trigger: 'blur'}
          ],
          title: [
            {required: true, message: '请输入问题描述', trigger: 'blur'}
          ],
          contentA: [
            {required: true, message: '请输入问题选项A', trigger: 'blur'}
          ],
          contentB: [
            {required: true, message: '请输入问题选项B', trigger: 'blur'}
          ],
          contentC: [
            {required: true, message: '请输入问题选项C', trigger: 'blur'}
          ],
          contentD: [
            {required: true, message: '请输入问题选项D', trigger: 'blur'}
          ],
          answer: [
            {required: true, message: '请输入正确选项', trigger: 'blur'}
          ]
        },

        //对应字符串
        character: {
          name: {
            text: "题目名称",
            type: "String"
          },
          type: {
            text: "题目类型",
            type: "String"
          },
          problemType: {
            text: "题目分类",
            type: "String"
          },
          score: {
            text: "分数",
            type: "String"
          },
          title: {
            text: "题目标题",
            type: "String"
          },
          contentA: {
            text: "选项A",
            type: "String"
          },contentB: {
            text: "选项B",
            type: "String"
          },contentC: {
            text: "选项C",
            type: "String"
          },contentD: {
            text: "选项D",
            type: "String"
          },
          answer: {
            text: "答案",
            type: "String"
          },
          remark: {
            text: "备注",
            type: "String"
          },
        },
        questionList:[],
      }
    },
    mounted() {
      this.userName = coo.getCookie("userName");
      this.req.userName = coo.getCookie("userName");
      this.findQuestionByPage();
    },
    methods: {
      //批量删除
      handleSelectionChange(val){
        this.questionList = val;
      },

      deleteQuestionList(){
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for(let i=0;i<this.questionList.length;i++){
            this.$axios.post(
              'http://localhost:8081/EnterpriseQuestion/deleteQuestion', this.questionList[i])
              .then((res) => {
              }).catch((err) => {
              this.$message({
                type: 'error',
                message: '删除失败'
              });
              console.log(err)
            })
          }
        }).then(()=>{
          this.findQuestionByPage();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(()=>{
          this.$message({
            type: 'info',
            message: '取消删除!'
          });
        })
      },

      //下载模板
      downExcel() {
        var a = document.createElement('a');
        a.href = "../../../../static/flie/试题模板.xlsx";
        a.download = "试题模板.xlsx";
        a.click();
      },

      //查找问题
      findQuestionByPage() {
        this.$axios.post(
          'http://localhost:8081/EnterpriseQuestion/findByPage', this.req)
          .then((res) => {
            this.tableData = res.data;
            this.tableData.forEach(
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
      findQuestionByKey() {
        if (this.findKey == "") {
          this.findQuestionByPage()
        } else {
          this.req.page = 1;
          this.req.remark = this.findKey;
          this.$axios.post(
            'http://localhost:8081/EnterpriseQuestion/findQuestionByKey', this.req)
            .then((res) => {
              this.tableData = res.data;
              this.tableData.forEach(
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

      //推出登录
      logOut() {
        coo.clearCookie();
        this.$router.push({name: 'HomePage', params: {}});
      },

      //对试题进行操作
      openQuestion() {
        this.questionForm = true;
        this.readonly = false;
        this.question = {};
        this.formType = "add";
        this.rules = this.updateRules;
      },
      openDisplay(val) {
        this.questionForm = true;
        this.formType = "display";
        this.readonly = true;
        this.getChoose(val);
        this.rules = {};
      },
      openUpdate(val) {
        this.questionForm = true;
        this.formType = "update";
        this.readonly = false;
        this.getChoose(val);
        this.rules = this.updateRules;
      },
      getChoose(val) {
        let lists = val.content.split("&|&");
        console.log(lists)
        val.contentA = lists[0];
        val.contentB = lists[1];
        val.contentC = lists[2];
        val.contentD = lists[3];
        this.question = val;
      },
      addQuestion(question) {
        if (question.problemType == undefined || question.problemType == null) {
          question = this.question;
        }
        question.unitName = coo.getCookie("userName");
        question.content = question.contentA + "&|&" + question.contentB + "&|&" + question.contentC + "&|&" + question.contentD;
        console.log(question);
        this.$axios.post(
          'http://localhost:8081/EnterpriseQuestion/addQuestion', question)
          .then((res) => {
            var list = res.data;
            this.findQuestionByPage();
            this.questionForm = false;
          }).catch((err) => {
          console.log(err)
        })
      },
      updateQuestion() {
        this.question.unitName = coo.getCookie("userName");
        this.question.content = this.question.contentA + "&|&" + this.question.contentB + "&|&" + this.question.contentC + "&|&" + this.question.contentD;
        this.$axios.post(
          'http://localhost:8081/EnterpriseQuestion/updateQuestion', this.question)
          .then((res) => {
            var list = res.data;
            this.findQuestionByPage();
            this.questionForm = false;
          }).catch((err) => {
          console.log(err)
        })
      },
      deleteQuestion(question) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post(
            'http://localhost:8081/EnterpriseQuestion/deleteQuestion', question)
            .then((res) => {
              this.findQuestionByPage();
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }).catch((err) => {
            this.$message({
              type: 'error',
              message: '删除失败'
            });
            console.log(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
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

      //form页面操作
      goback() {
        this.questionForm = false;
        this.question = {};
      },

      //上传文件
      async getData(ev) {
        let file = ev.raw;
        if (!file) return;
        //获取数据并且转为JSON
        let data = await this.readFile(file);
        let workbook = xlsx.read(data, {type: "binary"});
        let worksheet = workbook.Sheets[workbook.SheetNames[0]];
        data = xlsx.utils.sheet_to_json(worksheet);

        let arr = [];
        data.forEach(item => {
          let obj = {};
          for (let key in this.character) {
            if (!this.character.hasOwnProperty(key)) {
              break;
            }
            let v = this.character[key];

            let text = v.text;
            let type = v.type;
            v = item[text] || "";
            type === "string" ? v = String(v) : null;
            type === "number" ? v = Number(v) : null;
            obj[key] = v;
          }
          arr.push(obj);
          this.addQuestion(obj);
        })
        console.log(arr);
        this.excelDialogVisible = false;
        this.$message({
          type: 'success',
          message: '批量上传成功!'
        });
        this.findQuestionByPage();
      },
      // 按照二进制读取文件
      readFile(file) {
        return new Promise(resolve => {
          let reader = new FileReader();
          reader.readAsBinaryString(file);
          reader.onload = e => {
            resolve(e.target.result)
          }
        })
      },
    },
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

  .excelTag {
    width: 70vh;
    height: 80vw;
    background-color: black;
  }
</style>
