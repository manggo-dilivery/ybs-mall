// pages/center/setting/loginPassword/loginPassword.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: null,
    oldPassword: null,
    newPassword: null,
    password: null,
  },

  // 旧密码
  oldPassword: function(res) {
    var that = this;
    that.setData({
      oldPassword: res.detail.value
    })
  },
  //新密码
  newPassword: function(res) {
    var that = this;
    that.setData({
      newPassword: res.detail.value
    })
  },
  //密码
  password: function(res) {
    var that = this;
    that.setData({
      password: res.detail.value
    })
  },

  //完成
  accomplish: function() {
    var that = this;
    app.apiPost(app.apiList.loginPwd, {
      oldloginpwd: that.data.oldPassword,
      newloginpwd: that.data.newPassword,
      newaffirmloginpwd: that.data.password,
      accountName: that.data.phoneNumber,
      sendsource: 1,
    }, that.loginPwd)
  },

  loginPwd(res) {
    wx.showToast({
      title: res.data.content,
      icon:'none',
    })
    setTimeout(function(){
      if (res.data.state == true) {
        wx.navigateBack({
          delta: 2,
        })
      }
    },2000)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '登录密码修改',
    })
    var that = this;
    var user = wx.getStorageSync("userId")
    that.setData({
      phoneNumber: user.phoneNum
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
})