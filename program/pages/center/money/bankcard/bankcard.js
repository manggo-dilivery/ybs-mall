// pages/center/money/bankcard/bankcard.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardNum: "",
    cardName: "",
    bank: "",
    bankBranch: "",
  },
  //银行卡号
  cardNum: function(res) {
    console.log("111111111", res.detail.value)
    var that = this;
    that.setData({
      cardNum: res.detail.value
    })
  },
  //银行卡户主
  cardName: function(res) {
    console.log("222222222", res.detail.value)
    var that = this;
    that.setData({
      cardName: res.detail.value
    })
  },
  //开户银行
  bank: function(res) {
    console.log("333333333", res.detail.value)
    var that = this;
    that.setData({
      bank: res.detail.value
    })
  },
  //银行支行
  bankBranch: function(res) {
    console.log("444444444", res.detail.value)
    var that = this;
    that.setData({
      bankBranch: res.detail.value
    })
  },
  // 保存
  save: function() {
    var that = this;
    app.apiPost(app.apiList.clientUpdateBankCard, {
      ID: 0,
      UserID: that.data.userId,
      yhkh: that.data.cardNum,
      yhkhz: that.data.cardName,
      khyh: that.data.bank,
      khzh: that.data.bankBranch,
    }, that.clientUpdateBankCard)
  },

  clientUpdateBankCard(res) {
    console.log("保存", res)
    if (res.data.state == true) {
      wx.showToast({
        title: '保存成功',
      })
      setTimeout(function() {
        if (res.data.state == true) {
          wx.navigateBack({
            delta: 1,
          })
        }
      }, 2000)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '绑定银行卡',
    })
    var user = wx.getStorageSync("userId")
    var that = this;
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