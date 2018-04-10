// pages/user/user.js
const app = getApp();
const config = app.config;
var globalData = app.globalData;
const wafer = require('../../vendors/wafer-client-sdk/index');

// 只是设置登录的地址
wafer.setLoginUrl('https://' + config.host + '/login');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    logged: false,
    unloginName: "未登录"
  },

  // 用户登录
  // login: function() {
  //   var that = this;

  //   if(this.data.logged) return;
    
  //   wafer.request({
  //     login: true,
  //     url: this.data.url,
  //     method: 'GET',
  //     success: (res) => {
  //       if(res.statusCode == 200){
  //         if(res.data.openId) {
  //           this.setData({
  //             userInfo: res.data,
  //             logged: true
  //           })
  //         }else{
  //           console.error('会话获取失败', res.data);
  //         }
  //       }else{
  //         console.error('响应错误', res.statusCode);
  //       }
  //     },
  //     fail: (error) => {
  //       console.error('请求失败', error.message);
  //     }

  //   })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log('onLoad', globalData.userInfo);
    this.setData({
      userInfo: globalData.userInfo,
    });
    // 判断是否登录成功，如果是将 logged 登录状态设置为 true
    if (globalData.userInfo.openId) {
      console.log('log');
      this.setData({
        logged: true
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})