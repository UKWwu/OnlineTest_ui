<template>
  <div>
    <div class="left">
      <div class="leftButtonDiv">
        <button class="leftButton" style="background-color: #202897;color: white" @click="open">新增考生</button>
        <button class="leftButton" style="background-color: #F4B335;" @click="downExcel">模板下载</button>
        <button class="leftButton" style="border-color: white;" @click="excelDialogVisible = true">批量上传</button>
        <button class="leftButton" style="background-color: red;border-color: white;" @click="deleteTalentList">批量删除</button>
      </div>
    </div>
    <div class="right">
      <div style="width: 80%;margin-top: 2%;margin-bottom: 1%">
        <el-input v-model="req.remark" placeholder="请输入关键字搜索" style="width: 20%"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="findAllTalent">搜索</el-button>
      </div>
      <el-table
        :data="tableData"
        ref="talentList"
        @selection-change="handleSelectionChange"
        border
        style="width: 90%;">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          fixed
          prop="name"
          label="考生姓名"
          width="150">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="120">
        </el-table-column>
        <el-table-column
          prop="education"
          label="学历"
          width="120">
        </el-table-column>
        <el-table-column
          prop="school"
          label="学校"
          width="120">
        </el-table-column>
        <el-table-column
          prop="telphone"
          label="电话号码"
          width="120">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="200">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          width="220">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="300">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="displayTalent(scope.row)">查看</el-button>
            <el-button type="text" size="small" @click="openUpdateTalent(scope.row)">编辑</el-button>
            <el-button type="text" size="small" style="color: red" @click="deleteTalent(scope.row)">删除</el-button>
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
          layout="total, sizes, prev, pager, next, jumper"></el-pagination>
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
          :visible.sync="talentForm"
          width="60%"
          center>
          <el-main style="width: 100%;height: 100%;background-color: white">
            <el-page-header @back="goback" content="新增考生" v-if="this.formType == 'add'">
            </el-page-header>
            <el-page-header @back="goback" content="编辑考生" v-if="this.formType == 'update'">
            </el-page-header>
            <el-page-header @back="goback" content="查看考生" v-if="this.formType == 'display'">
            </el-page-header>


            <el-form :model="talent" label-width="100px" :rules="rules" ref="question"
                     style="margin-left: 15%;width: 70%;margin-top: 5%" size="small" v-bind:disabled="false">
              <el-form-item label="候选人姓名" prop="name">
                <el-input v-model="talent.name" :readonly="readonly ? 'readonly':false"></el-input>
              </el-form-item>
              <el-form-item label="年龄" prop="age">
                <el-input v-model="talent.age" :readonly="readonly ? 'readonly':false"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="sex">
                <el-input v-model="talent.sex" :readonly="readonly ? 'readonly':false"></el-input>
              </el-form-item>
              <el-form-item label="身份证号码" prop="cardId">
                <el-input v-model="talent.cardId" :readonly="readonly ? 'readonly':false"></el-input>
              </el-form-item>
              <el-form-item label="学历" prop="education">
                <el-input v-model="talent.education" :readonly="readonly ? 'readonly':false"></el-input>
              </el-form-item>
              <el-form-item label="学校" prop="school">
                <el-input v-model="talent.school" :readonly="readonly ? 'readonly':false"></el-input>
              </el-form-item>
              <el-form-item label="联系电话" prop="telphone">
                <el-input v-model="talent.telphone" :readonly="readonly ? 'readonly':false"></el-input>
              </el-form-item>
              <el-form-item label="电子邮箱" prop="email" >
                <el-input v-model="talent.email" :readonly="readonly ? 'readonly':false"></el-input>
              </el-form-item>
              <el-form-item label="备注" prop="remark">
                <el-input v-model="talent.remark" type="textarea" :readonly="readonly ? 'readonly':false"
                          :rows="3"></el-input>
              </el-form-item>
              <div style="margin-left: 45%">
                <el-button type="primary" v-if="formType == 'add'" @click.native="addTalent()">新建</el-button>
                <el-button type="primary" v-if="formType == 'update'" @click.native="updateTalent()">修改</el-button>
              </div>
            </el-form>
          </el-main>
        </el-dialog>

      </div>
    </div>
  </div>
</template>

<script>
  import xlsx from 'xlsx'
  import coo from '../../cookie'

  export default {
    name: "TalentComponet",
    data() {
      return {
        excelDialogVisible: false,
        userName: "",
        character: {
          name: {
            text: "姓名",
            type: "String"
          },
          sex: {
            text: "性别",
            type: "String"
          },
          cardId: {
            text: "身份证号码",
            type: "String"
          },
          education: {
            text: "学历",
            type: "String"
          },
          school: {
            text: "学校",
            type: "String"
          },
          telphone: {
            text: "联系电话",
            type: "String"
          },
          age: {
            text: "年龄",
            type: "Number"
          },
          email: {
            text: "邮箱地址",
            type: "String"
          },
        },
        userType: "",
        number: 0,
        userName: "",
        tableData: [],
        req: {
          userName: "",
          page: 1,
          number: 10,
          remark: ""
        },
        //编辑页面样式
        formType: "add",
        rules: {
          name: [
            {required: true, message: '请输入候选人名称', trigger: 'blur'}
          ],
          sex: [
            {required: true, message: '请输入性别', trigger: 'blur'}
          ],
          education: [
            {required: true, message: '请输入学历', trigger: 'blur'}
          ],
          school: [
            {required: true, message: '请输入候选人院校', trigger: 'blur'}
          ],
          cardId: [
            {required: true, message: '请输入身份证号码', trigger: 'blur'}
          ],
          telphone: [
            {required: true, message: '正确的手机号', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '正确的手机号', trigger: 'blur'}
          ],
        },
        updateRules: {
          name: [
            {required: true, message: '请输入候选人名称', trigger: 'blur'}
          ],
          sex: [
            {required: true, message: '请输入性别', trigger: 'blur'}
          ],
          education: [
            {required: true, message: '请输入学历', trigger: 'blur'}
          ],
          school: [
            {required: true, message: '请输入候选人院校', trigger: 'blur'}
          ],
          cardId: [
            {required: true, message: '请输入身份证号码', trigger: 'blur'}
          ],
          telphone: [
            {required: true, message: '正确的手机号', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '正确的手机号', trigger: 'blur'}
          ],
        },
        readonly: false,
        talent: {
          userName:""
        },
        talentForm:false,
        talentList:[]
      }
    },
    mounted() {
      this.userName = coo.getCookie("userName");
      this.req.userName = coo.getCookie("userName");
      this.findAllTalent();
    },
    methods: {
      //选中
      handleSelectionChange(val) {
        this.talentList = val;
      },
      deleteTalentList(){
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for(let i=0;i<this.talentList.length;i++){
            let re = {targetID: this.talentList[i].id};
            this.$axios.post(
              'http://localhost:8081/EnterpriseTalent/deleteTalent', re)
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
          this.findAllTalent();
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
        a.href = "../../../../static/flie/人才库模板.xlsx";
        a.download = "人才库模板.xlsx";
        a.click();
      },
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
          obj.userName = coo.getCookie("userName");
          this.$axios.post(
            'http://localhost:8081/EnterpriseTalent/addTalent', obj)
            .then((res) => {
            }).catch((err) => {
            console.log(err)
          })
        })
        this.excelDialogVisible = false;
        this.$message({
          type: 'success',
          message: '批量上传成功!'
        });
        this.findAllTalent();
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

      //对人才库数据的操作
      findAllTalent() {
        this.$axios.post('http://localhost:8081/EnterpriseTalent/findTalentList', this.req)
          .then((res) => {
            this.tableData = res.data;
            this.findTalentNumber();
          }).catch((err) => {
          console.log(err)
        })
      },
      findTalentNumber() {
        this.$axios.post('http://localhost:8081/EnterpriseTalent/findTalentNumber', this.req)
          .then((res) => {
            this.number = res.data;
          }).catch((err) => {
          console.log(err)
        })
      },
      handleSizeChange(val) {
        this.req.page = 1;
        this.req.number = val;
        this.findAllTalent();
      },
      handleCurrentChange(val) {
        this.req.page = val;
        this.findAllTalent();
      },
      deleteTalent(talent) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let re = {
            targetID: talent.id
          };
          this.$axios.post(
            'http://localhost:8081/EnterpriseTalent/deleteTalent', re)
            .then((res) => {
              this.findAllTalent();
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
      open() {
        this.talent = {};
        this.talentForm = true;
        this.formType = "add";
        this.readonly = false;
        this.rules = this.updateRules;
      },
      openUpdateTalent(val) {
        this.talent = val;
        this.talentForm = true;
        this.formType = "update";
        this.readonly = false;
        this.rules = this.updateRules;
      },
      displayTalent(val) {
        this.talent = val;
        this.talentForm = true;
        this.formType = "display";
        this.readonly = true;
        this.rules = {};
      },
      logOut() {
        coo.clearCookie();
        this.$router.push({name: 'HomePage', params: {}});
      },
      addTalent(talent) {
        if(talent == undefined){
          talent = this.talent;
        }
        talent.userName = coo.getCookie("userName");
        this.$axios.post(
          'http://localhost:8081/EnterpriseTalent/addTalent', talent)
          .then((res) => {
            var list = res.data;
            this.talentForm = false;
            this.talent = {};
            this.$message({
              type: 'success',
              message: '添加成功'
            });
            this.findAllTalent();
          }).catch((err) => {
          console.log(err)
        })
      },
      updateTalent(){
        this.talent.userName = coo.getCookie("userName");
        this.$axios.post(
          'http://localhost:8081/EnterpriseTalent/updateTalent', this.talent)
          .then((res) => {
            var list = res.data;
            this.talentForm = false;
            this.talent = {};
            this.$message({
              type: 'success',
              message: '修改成功'
            });
            this.findAllTalent();
          }).catch((err) => {
          console.log(err)
        })
      },

      //form页面操作
      goback() {
        this.talentForm  = false;
        this.talent = {};
      }
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
</style>
