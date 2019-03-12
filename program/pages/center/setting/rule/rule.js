// pages/center/setting/rule/rule.js
var app = getApp()
var WxParse = require('../../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article:"",
  },

  helpcenter(res){
    var that = this;
    console.log("??????????",res.data)
    // var text = res.data;
    that.setData({
      article: WxParse.wxParse('article', 'html', res.data, that, 5)
    })
    // WxParse.wxParse('article', 'html', res.data.content, that, 5);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '规则中心',
    })
    var that = this;
    app.apiGet(app.apiList.helpcenter, {}, that.helpcenter)
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
    // console.log("0000000000000",this.data)
    // WxParse.wxParse('article', 'html', this.data.article, this, 5);
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