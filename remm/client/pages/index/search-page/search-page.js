// pages/index/search-page/search-page.js
var app = getApp();
var config = app.config;
var utils = require('../../../utils/utils.js');
const globalData = app.globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    newRecList: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var word = options.word;
    var that = this;
    wx.showLoading({
      title: '正在加载',
    })
    wx.request({
      url: 'https://' + config.host + '/search?word=' + word + '&id=' + globalData.userInfo.openId,
      success: (res) => {
        console.log(res);
        if (res.statusCode == 200) {
          // 处理数据并绑定数据
          that.dealData(res.data);
          wx.hideLoading();
        }
      },
      fail: (err) => {
        console.error(err);
      }
    })
  },

  // 处理数据，暂时主要处理评分
  dealData: function (recList) {
    var list = [];
    for (var idx in recList) {
      var obj = recList[idx];
      var temp = obj;
      temp.score = temp.stars;
      temp.stars = utils.starsArray(temp.stars);
      list.push(temp);
    }
    console.log('list', list);
    this.setData({
      newRecList: list
    })
  },

  // 点击内容项的绑定事件，跳转到内容页面
  onShopTap: function (event) {
    var itemId = event.currentTarget.dataset.itemId;
    var tags = event.currentTarget.dataset.tags;
    // 这种方式
    wx.navigateTo({
      url: '../shop-detail/shop-detail?itemid=' + itemId + '&tags=' + tags,
    })
  },


})