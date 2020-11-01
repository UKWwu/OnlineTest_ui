import axios from 'axios'

export default ({
  getRequest(http,body){
    axios.get(http,body)
    .then((res) => {
      this.tableData = res.data;
    }).catch((err) => {
      console.log(err)
    })
  },
  postRequest(http,body){
    axios.post(
      http,body)
      .then((res) => {
        return res.data;
      }).catch((err) => {
      console.log(err)
    })
  }
})
