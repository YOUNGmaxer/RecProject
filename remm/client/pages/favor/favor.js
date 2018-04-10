// pages/favor/favor.js
const app = getApp();
const config = app.config;
const globalData = app.globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: {
      价格: { name: '价格', value: '价格', checked: false },
      卫生:{ name: '卫生', value: '卫生', checked: false },
      奶茶:{ name: '奶茶', value: '奶茶', checked: false },
      汉堡:{ name: '汉堡', value: '汉堡', checked: false },
      茶餐厅:{ name: '茶餐厅', value: '茶餐厅', checked: false },
      烧烤:{ name: '烧烤', value: '烧烤', checked: false },
      麻辣烫:{ name: '麻辣烫', value: '麻辣烫', checked: false },
      肠粉: { name: '肠粉', value: '肠粉', checked: false }
    },
    favor: {}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 多选触发事件
  onCheckBoxChange: function (event) {
    // 将多选数据绑定起来
    this.setData({
      favor: event.detail.value
    })
  },

  // 修改checked的状态值
  onCheckedChange: function (event) {
    var name = event.currentTarget.dataset.name;
    var temp = this.data.items[name];
    temp.checked = !temp.checked;

  },

  // 初次登录提交 favors 后的事件
  onNextStep: function(event) {
    var favors = this.data.favor;
    // 提交信息到后台
    wx.showLoading({
      title: '正在推荐',
    });
    wx.request({
      login: false,
      url: 'https://' + config.host + '/initfavor?favors=' + favors + '&openId=' + globalData.userInfo.openId,
      success: (res) => {
        console.log(res);
        // 请求成功后跳转到首页
        if(res.statusCode == 200){
          globalData.recList = res.data;
          wx.switchTab({
            url: '/pages/index/index'
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
  },
  // 处理收到推荐

})