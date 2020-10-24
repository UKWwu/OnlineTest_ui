export default ({

  /**
   * 设置cookie
   * @param tel 登陆者账号
   * @param name 登陆者昵称
   * @param day cookie过期时间（单位：天）
   */
  setCookie(tel, name,type,day) {
    var date = new Date();  // 获取时间

    //date.getTime()：指定的日期和时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数。
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * day);  // 保存天数 1000ms * 60s * 60min * 24h = 1d

    // 字符串拼接cookie
    window.document.cookie = "userTel" + "=" + tel + ";path=/;expires=" + date.toGMTString();
    window.document.cookie = "userName" + "=" + name + ";path=/;expires=" + date.toGMTString();
    window.document.cookie = "userType" + "=" + type + ";path=/;expires=" + date.toGMTString();
  },

  /**
   * 获取cookie
   * @param key 需要对应值的key
   * @returns value key所对应的值
   * document.cookie直接获取的cookie原格式：userTel=***********; userName=***
   * 注意：获取原cookie格式的";"后含有一个空格
   */
  getCookie(key) {
    if(document.cookie.length > 0) {
      // 切割后格式：userTel=***********,userName=***
      var arr = document.cookie.split('; ');
      var value = '';  // 用于存储所需cookie值
      for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split('=');  // 再次切割
        if (arr2[0] == key){
          value = arr2[1];
          return value;
        }
      }
    }
    return null
  },
  /**
   * 清除cookie
   * 将cookie的数据设空，时间设0
   */
  clearCookie: function() {
    this.setCookie("", "", 0);
  },
})
