// pages/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 跳转会员信息页面
  information: function() {
    wx.navigateTo({
      url: '/pages/center/setting/information/information',
    })
  },
  // 跳转登录密码修改
  loginPassword: function() {
    wx.navigateTo({
      url: '/pages/center/setting/loginPassword/loginPassword',
    })
  },
  // 跳转支付密码修改
  payPassword: function() {
    wx.navigateTo({
      url: '/pages/center/setting/password/password?SetTradePwd=' + this.data.SetTradePwd,
    })
  },
  // 跳转收货地址
  address: function() {
    wx.navigateTo({
      url: '/pages/center/setting/address/address',
    })
  },
  // 跳转问题反馈
  feedback: function() {
    wx.navigateTo({
      url: '/pages/center/setting/feedback/feedback',
    })
  },
  // 跳转规则中心
  rule: function() {
    wx.navigateTo({
      url: '/pages/center/setting/rule/rule',
    })
  },
  // 跳转加盟合作
  cooperation: function() {
    wx.navigateTo({
      url: '/pages/center/setting/cooperation/cooperation',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '我的设置',
    })
    console.log("是否设置支付密码", options.SetTradePwd)
    var that = this;
    that.setData({
      SetTradePwd: options.SetTradePwd
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