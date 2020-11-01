<template>
  <el-container style="background-color: #faebd7;height: 100%">
    <el-container style="height: 100%; border: 1px solid #eee;">
      <el-header style="text-align: right; font-size: 18px">
        <div style="color: white;font-size: 40px;float: left;margin-left: 20%">在线笔试系统</div>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 1px;font-size: 20px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span style="margin-right: 20%">{{userName}}</span>
      </el-header>
      <div style="width: 60%;margin-left: 20%;height: 100%">
        <el-container style="height: 100%">
          <el-aside width="20%" style="background-color: rgb(238, 241, 246);height: 100%">
            <el-menu default-active="1-4-1" style="height: 100%" class="el-menu-vertical-demo":default-active="this.$router.path"
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
            <el-page-header @back="goback" content="新建笔试">
            </el-page-header>

            <div style="margin-top: 5%">
              <el-steps :active="active" align-center>
                <el-step title="基本信息">
                </el-step>
                <el-step title="选择题目"></el-step>
                <el-step title="考试人员"></el-step>
              </el-steps>
              <div v-if="active == 1" style="width: 80%;margin-left: 10%;margin-top: 10%">
                <el-form ref="form" :model="form" label-width="80px">
                  <el-form-item label="笔试名称">
                    <el-input v-model="form.name" style="width: 45%;"></el-input>
                  </el-form-item>
                  <el-form-item label="笔试时间">
                    <el-col :span="11">
                      <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
                                      style="width: 100%;"></el-date-picker>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="是否启动" prop="form">
                    <el-switch v-model="form.delivery"></el-switch>
                  </el-form-item>
                  <el-form-item>
                    <div style="text-align: center">
                      <el-button style="margin-top: 12px;" type="primary" @click="next">下一步</el-button>
                    </div>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="active == 2" style="width: 80%;margin-left: 10%;margin-top: 10%">
                <el-form ref="form" :model="form2" label-width="80px">
                  <el-form-item label="笔试类型">
                    <el-select v-model="form2.type" placeholder="请选择笔试类型">
                      <el-option label="前端" value="shanghai"></el-option>
                      <el-option label="后端" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="选择来源">
                    <el-select v-model="form2.source" placeholder="请选择笔试类型">
                      <el-option label="公共题库" value="shanghai"></el-option>
                      <el-option label="企业题库" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="题目数量">
                    <el-input-number v-model="form2.number" @change="handleChange" :min="1" :max="10"
                                     label="描述文字"></el-input-number>
                  </el-form-item>
                  <el-form-item label="考试时间">
                    <el-time-picker arrow-control placeholder="选择时间" v-model="form2.time"
                                    style="width: 35%;"></el-time-picker>
                  </el-form-item>

                </el-form>
                <div style="text-align: center">
                  <el-button style="margin-top: 12px;" type="primary" @click="pre">上一步</el-button>
                  <el-button style="margin-top: 12px;" type="primary" @click="next">下一步</el-button>
                </div>
              </div>
              <div v-if="active == 3" style="width: 80%;margin-left: 10%;margin-top: 10%">
                <el-transfer
                  filterable
                  :titles="['候选人', '考试人员']"
                  :filter-method="filterMethod"
                  filter-placeholder="请输入候选人 "
                  v-model="value"
                  :data="data">
                </el-transfer>
                <div style="text-align: center">
                  <el-button style="margin-top: 12px;" type="primary" @click="pre">上一步</el-button>
                  <el-button style="margin-top: 12px;" type="danger" @click="next">提交</el-button>
                </div>
              </div>

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
    name: "Enterprise_examination",
    data() {
      const generateData = _ => {
        const data = [];
        const cities = ['张三', '李四', '小青蛙'];
        cities.forEach((city, index) => {
          data.push({
            label: city,
            key: index,
          });
        });
        return data;
      };
      return {
        userType:"",
        userName:"",
        data: generateData(),
        value: [],
        filterMethod(query, item) {
          return item.label.indexOf(query) > -1;
        },
        active: 1,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        form2: {
          type: '',
          time: '',
          number: '',
          source: ''
        },
      }
    },
    methods: {
      next() {
        if (this.active++ > 2) this.active = 1;
      },
      pre() {
        if (this.active-- < 1) this.active = 3;
      },
      goback() {
        this.$router.push({name: 'Enterprise_examination', params: {userType: this.userType, userName: this.userName}})
      }
    },
    mounted() {
      this.userName = coo.getCookie("userName");
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
