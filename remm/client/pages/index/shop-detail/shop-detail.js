const app = getApp();
const config = app.config;
var utils = require('../../../utils/utils.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemId: "",
    tags: {},
    itemInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var itemId = options.itemid;
    // ?? 同一个 item 推荐给不同用户的理由一样吗，tags要从item详情里面拿吗，还是在首页的推荐列表拿？
    // var tags = options.tags;
    this.setData({
      // itemId，跟服务器请求详细信息
      itemId: itemId,
      // 推荐理由
      // tags: tags
    });

    wx.showLoading({
      title: '正在加载',
    });
    // 请求item的详细数据
    wx.request({
      login: false,
      url: 'https://' + config.host + '/itemInfo?itemId=' + itemId,
      success: (res) => {
        // TODO 拿到 item 信息，然后绑定数据
        console.log(res);
        that.dealData(res.data);
        wx.hideLoading();
      },
      fail: (error) => {
        console.error(error);
      }
    })

  },

  // 处理数据，暂时主要处理评分
  dealData: function (recList) {
    var list = {};
    var temp = recList;
    temp.score = temp.stars;
    temp.stars = utils.starsArray(temp.stars);

    console.log('list', temp);
    this.setData({
      itemInfo: temp
    })
  },

  // 定位商家
  onLocateShop: function(event) {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        console.log('getLocation',latitude,longitude);
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          name: that.data.itemInfo.itemName,
          address: that.data.itemInfo.address
        })
      }
    })
  },

  // 商家电话
  onCallShop: function(event) {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.itemInfo.phone,
    })
  }

})