// pages/login/login.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phoneNum: '',
    password: '',
    code: '',
    userId: '0',
    time: 120,
    showTime: 0
  },

  // 用户注册
  register: function() {
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },

  // 用户登录
  login:function(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  tabChange(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    that.setData({
      currentIndex: index
    })
  },
  // 获取input中的值
  getPhoneNum(e) {
    var num = e.detail.value;
    this.setData({
      phoneNum: num
    })
  },
  getPswd(e) {
    var num = e.detail.value;
    this.setData({
      password: num
    })
  },
  // 获取验证码中input的值
  getCodePswd(e) {
    var num = e.detail.value;
    this.setData({
      code: num
    })
  },



  // 点击获取验证码，出现倒计时
  getVertificate() {
    var phoneNum = this.data.phoneNum;
    if (!(/^1[345678]\d{9}$/.test(phoneNum))) {
      app.showToast("手机号格式有误", "none")
      return false;
    }
    this.setData({
      showTime: 1
    })
    app.apiPost(app.apiList.sentCode, {
      accountName: phoneNum,
      SendSource: 1,
      SmsType: 1
    }, function(res) {
      console.log(res.data)
      if (res.data.state == false) {
        app.showToast("验证码发送失败", 'none')
      } else if (res.data.state) {
        app.showToast("发送成功")
      } else {
        app.showToast("发送失败，请联系管理员", 'none')
      }
    })
    var interval = setInterval(function() {
      var currentTime = this.data.time;
      if (currentTime == 0) {
        this.setData({
          showTime: 0,
          time: 120
        })
        clearInterval(interval)
        return;
      };
      this.setData({
        time: currentTime - 1
      })
    }.bind(this), 1000)
  },
  // 提交注册
  codeLogin() {
    var phoneNum = this.data.phoneNum;
    var code = this.data.code;
    var pswd = this.data.password;
    if (!(/^1[345678]\d{9}$/.test(phoneNum))) {
      app.showToast("手机号格式有误", "none")
      return false;
    }
    if (/^\s*$/.test(code) || code == "") {
      app.showToast("验证码不能为空", "none")
      return false;
    }
    if (!(/^[a-zA-Z\d_]{8,}$/.test(pswd))) {
      app.showToast("密码不足8位", "none")
      return false;
    }
    app.apiPost(app.apiList.findPswd, {
      accountName: phoneNum,
      phonecode: code,
      newloginpwd: pswd,
      sendsource: 1
    }, this.loginRequest)
  },

  loginRequest(res) {
    console.log(res);
    if (res.data.state) {
      app.showToast(res.data.content, 'none')
      wx.setStorageSync('userId', {
        userId: this.data.userId,
        phoneNum: res.data.data.dhhm,
        personImg: res.data.data.grtp
      })
      wx.switchTab({
        url: '/pages/index/index',
      })
    } else {
      app.showToast(res.data.content, "none")
      return
    }
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