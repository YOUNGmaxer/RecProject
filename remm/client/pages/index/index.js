//index.js
//获取应用实例
const app = getApp();
const config = app.config;
const globalData = app.globalData;
var shopData = require('../../data/shop-data.js');
var utils = require('../../utils/utils.js');

Page({
  // 页面的初始数据
  data: {
    infoPanelShow: true,
    searchPanelShow: false,
    inputValue: "",
    searchTags: {},
    recList: {},
    newRecList: {}
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    // ?? recList就一定有数据吗？如果是老用户，要用到缓存吗
    wx.showLoading({
      title: '正在加载',
    })
    wx.request({
      login: false,
      url: 'https://' + config.host + '/userIndex?openId=' + globalData.userInfo.openId,
      success: (res) => {
        console.log(res);
        // 请求成功后跳转到首页
        if (res.statusCode == 200) {
          globalData.recList = res.data;
          this.dealData(globalData.recList);
          this.setData({
            recList: globalData.recList
          });
          wx.hideLoading();
        }
        else {
          console.error('响应错误', res.statusCode);
        }
      },
      fail: (error) => {
        console.error('请求错误', error);
      }
    })

    this.setData({
      searchTags: wx.getStorageSync("keyword").split(',')
    })
  },

  onShow: function(options) {
    this.setData({
      searchTags: wx.getStorageSync("keyword").split(',')
    });
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
    console.log(list);
    this.setData({
      recList: list
    })
  },

  // 点击内容项的绑定事件，跳转到内容页面
  onShopTap: function (event) {
    var itemId = event.currentTarget.dataset.itemId;
    var tags = event.currentTarget.dataset.tags;
    // 这种方式
    wx.navigateTo({
      url: 'shop-detail/shop-detail?itemid=' + itemId + '&tags=' + tags,
    })
  },

  // 输入框焦点触发事件
  onBindFocus: function (event) {
    this.setData({
      infoPanelShow: false,
      searchPanelShow: true
    })
  },

  // 输入框搜索触发
  onBindConfirm: function (event) {
    // 获取输入框搜索词
    var word = event.detail.value;
    var key = "keyword";
    var all_word = wx.getStorageSync(key);
    // 先判断keyword是否已经在all_word里面
    var flag = utils.hasKeyword(word, all_word);
    console.log('flag',flag);
    var that = this;
    if (word != "") {
      if (flag) {
        if (all_word == ""){
          wx.setStorageSync(key, word);
        }
        else{
          wx.setStorageSync(key, word + ',' + all_word);
        }
      }
      wx.navigateTo({
        url: 'search-page/search-page?word=' + word,
      })
    } else {
      wx.showToast({
        title: '请输入搜索词',
        icon: 'none'
      });
    }
  },

  // 输入框取消事件
  onCancel: function (event) {
    this.setData({
      infoPanelShow: true,
      searchPanelShow: false,
      // 将输入框清空
      inputValue: ""
    })
  },

  // 基于 tag 的搜索，历史搜索
  // TODO
  onTagSearch: function (event) {
    var tag = event.currentTarget.dataset.tagInfo;
    wx.navigateTo({
      url: 'search-page/search-page?word=' + tag,
    })
    console.log(tag);
  },

  // 清楚历史搜索
  onClearTags: function(event) {
    wx.removeStorageSync("keyword");
    wx.request({
      url: 'https://' + config.host + '/wordsClear?openId=' + globalData.userInfo.openId,
      success: function(res){
        if (res.statusCode == 200) {
          console.log('清楚历史搜索记录', res);
        }
        else {
          console.error('响应错误', res.statusCode);
        }
      },
      fail: function(err) {
        console.log('请求错误',err);
      }
    })
    this.setData({
      searchTags: {}
    })
  }
})
