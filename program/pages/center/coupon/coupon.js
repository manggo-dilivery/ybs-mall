// pages/center/coupon/coupon.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    index: 0,
    user: {},
    userId: null,
    coupon: {},
  },

  tabChange: function(e) {
    var that = this;
    that.setData({
      currentIndex: e.currentTarget.dataset.index
    })
    that.onShow()
  },
  //优惠券接口
  myCoupon(res) {
    console.log("优惠券接口", res)
    var that = this;
    that.setData({
      coupon: res.data.dt
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '我的优惠券',
    })
    var user = wx.getStorageSync("userId")
    that.setData({
      userId: user.userId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    console.log("用户id", that.data.userId)
    app.apiGet(app.apiList.myCoupon, {
      Pageindex: 1,
      UserID: that.data.userId,
      State: that.data.currentIndex
    }, that.myCoupon)
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