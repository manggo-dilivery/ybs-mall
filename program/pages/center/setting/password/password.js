// pages/center/setting/password/password.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: null,
    oldtradepwd:null,
    newtradepwd: null,
    newaffirmtradepwd: null,
  },
  //旧密码
  oldtradepwd: function(res) {
    var that = this;
    that.setData({
      oldtradepwd: res.detail.value,
    })
  },

  //新密码
  newtradepwd: function(res) {
    var that = this;
    that.setData({
      newtradepwd: res.detail.value
    })
  },
  // 确认密码
  newaffirmtradepwd: function(res) {
    var that = this;
    that.setData({
      newaffirmtradepwd: res.detail.value
    })
  },

  //完成
  accomplish: function() {
    var that = this;
    // 修改支付密码
    if (that.data.SetTradePwd == 1) {
      app.apiPost(app.apiList.clientUpdateTradePwd, {
        oldtradepwd: that.data.oldtradepwd,
        newtradepwd: that.data.newtradepwd,
        newaffirmtradepwd: that.data.newaffirmtradepwd,
        accountName: that.data.phoneNumber,
        sendsource: 1,
      }, that.clientUpdateTradePwd)
    } 
    // 设置支付密码
    else {
      app.apiPost(app.apiList.clientSetTradePwd, {
        newtradepwd: that.data.newtradepwd,
        newaffirmtradepwd: that.data.newaffirmtradepwd,
        accountName: that.data.phoneNumber,
        sendsource: 1,
      }, that.clientSetTradePwd)
    }

  },
// 设置
  clientSetTradePwd(res) {
    wx.showToast({
      title: res.data.content,
      icon: 'none',
    })
    setTimeout(function() {
      if (res.data.state == true) {
        wx.navigateBack({
          delta: 2,
        })
      }
    }, 2000)
  },
// 修改
  clientUpdateTradePwd(res) {
    wx.showToast({
      title: res.data.content,
      icon: 'none',
    })
    setTimeout(function () {
      if (res.data.state == true) {
        wx.navigateBack({
          delta: 2,
        })
      }
    }, 2000)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '支付密码设置',
    })
    console.log("是否设置支付密码", options)
    var that = this;
    var user = wx.getStorageSync("userId")
    that.setData({
      phoneNumber: user.phoneNum,
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
})