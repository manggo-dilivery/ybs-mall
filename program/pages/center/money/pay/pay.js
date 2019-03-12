// pages/center/money/pay/pay.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //输入充值金额
  money: function(res) {
    console.log("金额", res)
    var that = this;
    that.setData({
      money: res.detail.value
    })
  },
  //确认充值
  confirm: function() {
    var that = this;
    app.apiPost(app.apiList.rechargeInfo, {
      UserID: that.data.userId,
      jyje: that.data.money,
      jyfs: 2,
      czly: 1,
    }, that.rechargeInfo)
  },

  rechargeInfo(res) {
    console.log("充值成功", res)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '充值',
    })
    var that = this;
    var user = wx.getStorageSync('userId')
    that.setData({
      userId: user.userId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },
})