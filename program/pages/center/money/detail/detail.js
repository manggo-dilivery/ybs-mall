// pages/center/money/detail/detail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:null,
    list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '交易明细',
    })
    var that = this;
    var user = wx.getStorageSync("userId")
    that.setData({
      userId: user.userId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  detailsList(res){
    console.log("交易明细接口",res)
    var that = this;
    that.setData({
      list:res.data.dt
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    app.apiGet(app.apiList.detailsList, {
      pageIndex: 1,
      sjid: 0,
      UserID: that.data.userId,
    }, that.detailsList)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})