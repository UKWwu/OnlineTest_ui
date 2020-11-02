<template>
  <el-container style="background-color: #faebd7;height: 100%">
    <el-container style="height: 100%; border: 1px solid #eee;">
      <el-header style="text-align: right; font-size: 18px">
        <div style="color: white;font-size: 40px;float: left;margin-left: 20%">在线笔试系统</div>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 1px;font-size: 20px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native = "logOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span style="margin-right: 20%">{{userName}}</span>
      </el-header>
      <div style="width: 60%;margin-left: 20%;height: 100%">
        <el-container style="height: 100%">
          <el-aside width="20%" style="background-color: rgb(238, 241, 246);height: 100%">
            <el-menu default-active="1-4-1" style="height: 100%" class="el-menu-vertical-demo" :default-active="this.$router.path"
                     router>
              <el-menu-item index="/Enterprise_question">
                <i class="el-icon-menu"></i>
                <span slot="title">题库管理</span>
              </el-menu-item>
              <el-menu-item index="/Enterprise_examination">
                <i class="el-icon-document"></i>
                <span slot="title">笔试管理</span>
              </el-menu-item>
              <el-menu-item index="/Enterprise_talent">
                <i class="el-icon-setting"></i>
                <span slot="title">人才库管理</span>
              </el-menu-item>
            </el-menu>

          </el-aside>
          <el-main style="width: 100%;height: 100%;background-color: white">
            <el-page-header @back="goback" content="查看笔试结果" >
            </el-page-header>
            <div style="width:50%;margin-top: 10%;float:left">
              <el-table
                :data="tableData">
                <el-table-column
                  prop="name"
                  label="姓名"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="grade"
                  label="成绩">
                </el-table-column>
              </el-table>
            </div>
            <div id="displayMain" style="width: 50%;height:50%;margin-top: 10%;float:right"></div>
          </el-main>
        </el-container>
      </div>
    </el-container>
  </el-container>
</template>

<script>
  import coo from '../cookie'
  // 引入 ECharts 主模块
  var echarts = require('echarts/lib/echarts');
  // 引入柱状图
  require('echarts/lib/chart/bar');
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  export default {
    name: "DispalyGrade",
    data(){
      return{
        userName:"",
        tableData:{},
        option :{
          series : [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              data:[
              ]
            }
          ]
        }
      }
    },
    methods:{
      goback(){
        this.$router.push({name:'Enterprise_examination'});
      },
      logOut(){
        coo.clearCookie();
        this.$router.push({name: 'HomePage', params: {}});
      },
      display(){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('displayMain'));
        // 绘制图表
        myChart.setOption(this.option);
      },
      findFiveByTestId(){
        let req ={
          targetID : this.testId
        };
        this.$axios.post('http://localhost:8081/Examination/findFiveByTestId',req)
          .then((res) => {
            this.tableData =  res.data;
          }).catch((err) => {
          console.log(err)
        })
      },
      findRatioById(){
        let req ={
          targetID : this.testId
        };
        this.$axios.post('http://localhost:8081/Examination/findRatioById',req)
          .then((res) => {
            this.option.series[0].data = res.data;
            this.display();
          }).catch((err) => {
          console.log(err)
        })
      }
    },
    mounted() {
      this.userName = coo.getCookie("userName");
      this.testId = this.$route.params.testId;
      this.findFiveByTestId();
      this.findRatioById();
    }
  }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>
