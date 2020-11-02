<template>
  <el-container style="background-color: #faebd7;height: 100%">
    <el-container style="height: 100%; border: 1px solid #eee;">
      <el-header style="text-align: right; font-size: 18px">
        <div style="color: white;font-size: 40px;float: left;margin-left: 20%">在线笔试系统</div>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 1px;font-size: 20px"></i>
          <el-dropdown-menu>
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
              <el-menu-item index="/Administrators_business">
                <i class="el-icon-location"></i>
                <span slot="title">企业管理</span>
              </el-menu-item>
              <el-menu-item index="/Administrators_question">
                <i class="el-icon-menu"></i>
                <span slot="title">题库管理</span>
              </el-menu-item>
              <el-menu-item index="/Administrators_talent">
                <i class="el-icon-document"></i>
                <span slot="title">用户管理</span>
              </el-menu-item>
              <el-menu-item index="/Administrators_system">
                <i class="el-icon-setting"></i>
                <span slot="title">系统设置</span>
              </el-menu-item>
            </el-menu>
          </el-aside>

          <el-main  style="width: 100%;height: 100%;background-color: white">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>首页</el-breadcrumb-item>
              <el-breadcrumb-item>系统管理</el-breadcrumb-item>
            </el-breadcrumb>
            <div style="width: 100%;">
              <div style="float: right">
                <el-button  type="success" icon="el-icon-check"  @click="changeRecommend">
                  修改推荐
                </el-button>
              </div>
              <div style="margin-top: 3%;font-size: 30px"><span>推荐栏企业设置</span></div>
              <div style="margin-top: 3%">
                <el-table
                  :data="tableData"
                  border
                  style="width: 100%">
                  <el-table-column
                    fixed
                    prop="name"
                    label="企业名称"
                    width="400">
                  </el-table-column>
                  <el-table-column
                    fixed="right"
                    label="操作"
                    width="400">
                    <template slot-scope="scope">
                      <el-switch
                        v-model="scope.row.recommend"
                        active-text="启用"
                        inactive-text="禁用">
                      </el-switch>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>



            <div style="width: 100%;text-align: center;margin-top: 5%;">
              <el-pagination
                background
                :total= number
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper">
              </el-pagination>
            </div>
          </el-main>
        </el-container>
      </div>


    </el-container>
  </el-container>
</template>

<script>
  import coo from '../cookie'
  export default {
    components: {
    },
    name: "Administrators_system",
    data() {
      return {
        number:0,
        userType:"",
        userName:"",
        isCollapse: false,
        tableData: [],
        re:{}
      }
    },
    methods: {
      handleSizeChange(val){
        this.req.page = 1;
        this.req.number = val;
        this.findAllEnterprise();
      },
      handleCurrentChange(val){
        this.req.page = val;
        this.findAllEnterprise();
      },
      findAllEnterprise(){
        this.$axios.post(
          'http://localhost:8081/Enterprise/findEnterpriseRecommend', this.re)
          .then((res) => {
            this.tableData = res.data;
            this.number = this.tableData.length;
          }).catch((err) => {
          console.log(err)
        })
      },
      changeRecommend(){
        this.$axios.post(
          'http://localhost:8081/Enterprise/changeRecommend', this.tableData)
          .then((res) => {
            this.findAllEnterprise();
          }).catch((err) => {
          console.log(err)
        })
      },
      logOut(){
        coo.clearCookie();
        this.$router.push({name: 'HomePage', params: {}});
      },
    },
    mounted() {
      this.userName = coo.getCookie("userName");
      this.findAllEnterprise();
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
