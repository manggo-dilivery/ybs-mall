// pages/register/register.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      currentIndex:0,
      isChecked:false,
      count:1,
      phoneNum:'',
      code:'',
      password:'',
      codeRecommand:'',
      showTime:0,
      time: 120,
  },

  // 返回登录
  login:function(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  // 找回密码
  changePswd:function(){
    wx.navigateTo({
      url: '/pages/changePswd/changePswd',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
    // 获取input中的值
    getPhoneNum(e) {
        var num = e.detail.value;
        this.setData({
            phoneNum: num
        })
    },
    // 获取验证码中input的值
    getCodePswd(e) {
        var num = e.detail.value;
        this.setData({
            code: num
        })
    },
    getPswd(e) {
        var num = e.detail.value;
        this.setData({
            password: num
        })
    },
    getRecommand(e) {
        var num = e.detail.value;
        this.setData({
            codeRecommand: num
        })
    },
    // 单选按钮
    isChecked(e){
        var num = this.data.count;
        if(num%2==0){
            this.setData({
                isChecked:false,
                count: num + 1
            })
        }else{
            this.setData({
                isChecked: true,
                count: num + 1
            })
        }
    },
    // 发送验证码
    getVertificate() {
        var phoneNum = this.data.phoneNum;
        if (!(/^1[345678]\d{9}$/.test(phoneNum))) {
            app.showToast("手机号格式有误", "none")
            return false;
        }
        this.setData({
            showTime: 1
        })
        app.apiPost(app.apiList.sentCode, { accountName: phoneNum, SendSource: 1, SmsType: 1 }, function (res) {
            console.log(res.data)
            if (res.data.state == false) {
                app.showToast(res.data.content, 'none')
            } else if (res.data.state) {
                app.showToast(res.data.content)
            } else {
                app.showToast("发送失败，请联系管理员", 'none')
            }
        })
        var interval = setInterval(function () {
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
    codeLogin(){
        if(!this.data.isChecked){
            app.showToast('未勾选注册协议','none');
            return
        }
        var phoneNum = this.data.phoneNum;
        var code = this.data.code;
        var password = this.data.password;
        var codeRecommand = this.data.codeRecommand||'';
        console.log(codeRecommand)
        if (!(/^1[34578]\d{9}$/.test(phoneNum))) {
            app.showToast("手机号格式有误", "none")
            return false;
        }
        console.log(code)
        if (/^\s*$/.test(code)||code==""){
            app.showToast("验证码不能为空", "none")
            return false;
        }
        if (!(/^[a-zA-Z\d_]{8,}$/.test(password))) {
            app.showToast("密码不足8位", "none")
            return false;
        } 
        // console.log({ accountName: phoneNum, password: password, phonecode: code, recommended: codeRecommand, loginsource: 1 })
        app.apiPost(app.apiList.register, { accountName: phoneNum, password: password, phonecode: code, recommended: codeRecommand, loginsource:1 }, this.registerRequest)
    },
    registerRequest(res) {
        console.log(res);
        // console.log(app.globalData.user_id);
        if (res.data.state) {
            app.globalData.user_id = res.data.data.userid;
            this.setData({
                userId: res.data.data.userid
            })
            // wx.setStorageSync('userId', this.data.userId)
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
        }
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
})