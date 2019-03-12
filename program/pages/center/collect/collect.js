// pages/center/collect/collect.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: null,
    goods: [],
  },
  // 取消收藏
  cancel: function(e) {
    var that = this;
    if (that.data.goods[e.currentTarget.dataset.index].bz == 1) {
      app.apiPost(app.apiList.deleteCollection, {
        spid: 0,
        sjid: that.data.goods[e.currentTarget.dataset.index].ctid,
        UserID: that.data.userId,
      }, that.deleteCollection)
      that.onShow()
    } else if (that.data.goods[e.currentTarget.dataset.index].bz == 2) {
      app.apiPost(app.apiList.deleteCollection, {
        spid: that.data.goods[e.currentTarget.dataset.index].cpbh,
        sjid: 0,
        UserID: that.data.userId,
      }, that.deleteCollection)
      that.onShow()
    }

  },

  deleteCollection(res) {
    console.log("qqqqqqqqqq", res)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '我的收藏',
    })
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
  //我的收藏接口
  collectionList(res) {
    console.log("我的收藏接口", res)
    var that = this;
    that.setData({
      goods: res.data.dt
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    app.apiGet(app.apiList.collectionList, {
      Pageindex: 1,
      UserID: that.data.userId,
    }, that.collectionList)
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