//app.js
// var qcloud = require('./vendor/wafer2-client-sdk/index');
// var config = require('./config');

var wafer = require('vendors/wafer-client-sdk/index');

App({
  globalData: {
    userInfo: {},
    recList: {}
  },

  config: {
    host: 'rs.williamchenpi.shop'
  },
  
  onLaunch: function () {
    // 设置登录地址（只是设置登录地址）
    var that = this;
    var host = this.config.host;
    // 登录并获取用户信息
    wafer.setLoginUrl('https://' + host + '/login');
    wafer.request({
      // 表示需要先登录
      login: true,
      url: 'https://' + host + '/me',
      success: (res) => {
        if (res.statusCode == 200) {
          if (res.data.openId) {
            // 设置全局用户数据
            that.globalData.userInfo = res.data;
            console.log(res.data.newLogin);
            // 如果是第一次登录,跳转到页面favor
            if(res.data.newLogin){
              setTimeout(function(){
                wx.redirectTo({
                  url: '/pages/favor/favor'
                })
              },800)
            }
            // 不是第一次登录，就跳转到页面index
            else{
              setTimeout(function () {
                wx.switchTab({
                  url: '/pages/index/index'
                })
              }, 200)
            }
          } else {
            console.error('会话获取失败', res.data);
          }
        } else {
          console.error('响应错误', res.statusCode);
        }
      },
      fail: (error) => {
        console.error('请求失败', error.message);
      }
    })
  },

})