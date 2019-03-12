// pages/center/orders/orders.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    orderList: [],
  },

  tabChange: function(e) {
    var that = this;
    that.setData({
      currentIndex: e.currentTarget.dataset.index
    })
    that.onReady()
  },
  // 跳转商品详情页面
  orderDetails: function(e) {
    var that = this;
    wx.navigateTo({
      url: '/pages/center/orders/orderDetails/orderDetails?ID=' + that.data.orderList[e.currentTarget.dataset.index].id + "&userId=" + that.data.userId,
    })
  },

  cancel: function(e) {
    var that = this;
    app.apiPost(app.apiList.deleteDingdan, {
      ddid: that.data.orderList[e.currentTarget.dataset.index].id,
      UserID: that.data.userId,
    }, that.deleteDingdan)
  },

  deleteDingdan(res) {
    var that = this;
    if (res.data.state == true) {
      wx.showToast({
        title: '取消订单成功',
      })
        that.onReady()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '我的订单',
    })
    console.log("上个页面传参", options)
    var that = this;
    var currentIndex = that.data.currentIndex;
    var user = wx.getStorageSync('userId');
    that.setData({
      currentIndex: options.index,
      userId: user.userId
    })
  },

  getClientOrderList(res) {
    console.log("我的订单", res)
    var that = this;
    that.setData({
      orderList: res.data.dt
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this;
    // 订单接口
    app.apiGet(app.apiList.getClientOrderList, {
      UserID: that.data.userId,
      pageindex: 1,
      State: that.data.currentIndex
    }, that.getClientOrderList)
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