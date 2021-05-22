<template>
  <div>
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
</template>

<script>
  import xlsx from 'xlsx'
  import {character} from "./utils";

  export default {
    name: "ces",
    data() {
      return {
        character: {
          name: {
            text: "姓名",
            type: "String"
          },
          sex:{
            text: "性别",
            type: "String"
          },
          cardId:{
            text:"身份证号码",
            type:"String"
          },
          education:{
            text:"学历",
            type:"String"
          },
          school:{
            text:"学校",
            type:"String"
          },
          telphone:{
            text:"联系电话",
            type:"String"
          },
          age:{
            text:"年龄",
            type:"Number"
          },
          email:{
            text:"邮箱地址",
            type:"String"
          },
        }
      }
    },
    mounted() {
    },
    methods: {
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
        })
        console.log(arr)
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
      }
    }
  }
</script>

<style scoped>

</style>
