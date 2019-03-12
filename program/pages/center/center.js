// pages/center/center.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    userId: null,
    memberCenter: {},
    orderForm: [{
      img: "../../images/icon/Group492.png",
      text: "全部订单"
    }, {
      img: "../../images/icon/Group244.png",
      text: "待付款"
    }, {
      img: "../../images/icon/Group259.png",
      text: "待配送"
    }, {
      img: "../../images/icon/Group245.png",
      text: "待收货"
    }, {
      img: "../../images/icon/Group249.png",
      text: "待评价"
    }, {
      img: "../../images/icon/Group252.png",
      text: "售后订单"
    }],
    tools: [{
        img: "../../images/icon/Group366.png",
        text: "我的收藏"
      }, {
        img: "../../images/icon/Group367.png",
        text: "邀请有礼"
      }, {
        img: "../../images/icon/Group368.png",
        text: "我的优惠券"
      },
      {
        img: "../../images/icon/Group369.png",
        text: "联系客服"
      }
    ]

  },
  // 跳转到设置页面
  toSet: function() {
    console.log(this.data.memberCenter)
    wx.navigateTo({
      url: '/pages/center/setting/setting?SetTradePwd=' + this.data.memberCenter.SetTradePwd,
    })
  },
  // 跳转到优惠券页面
  toCoupon: function() {
    wx.navigateTo({
      url: '/pages/center/coupon/coupon',
    })
  },
  // 跳转到余额页面
  toMymoney: function() {
    wx.navigateTo({
      url: '/pages/center/money/money?money=' + this.data.memberCenter.zhye,
    })
  },
  // 跳转到订单页面
  toOrders: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    that.setData({
      currentIndex: index
    })
    wx.navigateTo({
      url: '/pages/center/orders/orders?index=' + that.data.currentIndex,
    })
  },

  // 跳转常用工具页面
  toCollect: function(e) {
    if (e.currentTarget.dataset.index == 0) {
      wx.navigateTo({
        url: '/pages/center/collect/collect',
      })
    } else if (e.currentTarget.dataset.index == 1) {
      wx.navigateTo({
        url: '/pages/center/QRcode/QRcode',
      })
    } else if (e.currentTarget.dataset.index == 2) {
      wx.navigateTo({
        url: '/pages/center/coupon/coupon',
      })
    } else {
      wx.navigateTo({
        url: '/pages/center/phoneNum/phoneNum',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '我的',
    })
    if (wx.getStorageSync("userId").userId == null) {
      wx.reLaunch({
        url: '/pages/login/login',
      })
    } else {
      var user = wx.getStorageSync("userId")
      that.setData({
        userId: user.userId
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  // 会员中心首页接口
  memberCenter(res) {
    console.log("会员中心首页接口", res)
    var that = this;
    that.setData({
      memberCenter: res.data.data
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    app.apiPost(app.apiList.memberCenter, {
      UserID: that.data.userId
    }, that.memberCenter)
  },

})