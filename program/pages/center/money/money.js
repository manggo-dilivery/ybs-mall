// pages/center/money/money.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money:0.00,
  },
  // 跳转交易明细页面
  toDetail: function() {
    wx.navigateTo({
      url: '/pages/center/money/detail/detail',
    })
  },
  // 绑定银行卡
  toBankcard: function() {
    wx.navigateTo({
      url: '/pages/center/money/bankcard/bankcard',
    })
  },
  // 立即充值
  toPay: function() {
    wx.navigateTo({
      url: '/pages/center/money/pay/pay',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '我的钱包',
    })
    var that = this;
    that.setData({
      money:options.money
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