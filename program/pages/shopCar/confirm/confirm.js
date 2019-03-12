// pages/shopCar/confirm/confirm.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coupon: true,
    payment: true,
    time: {},
    index: 0,
    userId: null,
    chooseCoup: 0,
    choosePayment: ['微信', '余额'],
    currentIndex: 0,
    tapCoupon:0,
    totalSum:0.00,
    // coupons:"请选择优惠券",
    // wechat:"微信",
  },
  // 跳转收货地址页面
  toaddress: function() {
    wx.navigateTo({
      url: '/pages/center/setting/address/address',
    })
  },
  // 跳转商品清单页面
  toParcel: function() {
    wx.navigateTo({
      url: '/pages/shopCar/confirm/parcel/parcel',
    })
  },
  // 选择送达时间
  bindPickerChange: function(e) {
    var that = this;
    that.setData({
      index: e.detail.value
    })
  },

  // 选择优惠券
  chooseCoupon: function() {
    var that = this;
    var coupon = that.data.coupon
    that.setData({
      coupon: !that.data.coupon
    })
  },
  tapCoupon: function(e) {
    console.log("yyyyyyyyyy", e.currentTarget.dataset.index)
    var that = this;
    that.setData({
      tapCoupon: e.currentTarget.dataset.index,
      coupons: that.data.couponList[e.currentTarget.dataset.index].yhxx,
      coupon:!that.data.coupon
    })
  },
  // 选择支付方式
  choosePayment: function() {
    var that = this;
    var payment = that.data.payment
    that.setData({
      payment: !that.data.payment
    })
  },
  wechat: function(e) {
    console.log("ooooooooooo", e.currentTarget.dataset.index)
    var that = this;
    that.setData({
      currentIndex: e.currentTarget.dataset.index,
      wechat: that.data.choosePayment[e.currentTarget.dataset.index],
      payment: !that.data.payment,
    })
  },

  toPay:function(){
    var that = this;
    app.apiPost(app.apiList.payOrder, {
      UserID:that.data.userId,
      shr: that.data.addressList.lxr,
      shrsj: that.data.addressList.lxrsim,
      shrdz:that.data.addressList.dizhi,
      sdsj: that.data.time[index].name,
      fkje: that.data.totalSum,
      yhje: that.data.couponList[that.data.tapCoupon].yhje,
      psf:4,
      // ccid:
    }, that.payOrder)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("上个页面传的", options)
    wx.setNavigationBarTitle({
      title: '确认订单',
    })
    var that = this;
    var user = wx.getStorageSync("userId")
    that.setData({
      userId: user.userId,
      totalSum: options.totalSum,
    })
    app.apiGet(app.apiList.getDeliveryTimeList, {}, that.getDeliveryTimeList)
    app.apiGet(app.apiList.getCouponList, {
      UserID: that.data.userId,
      ddje: options.totalSum,
    }, that.getCouponList)
    app.apiGet(app.apiList.getProductsList, {
      UserID: that.data.userId,
      StrGoodsID: options.goodsId
    }, that.getProductsList)
  },
  getDeliveryTimeList(res) {
    var that = this;
    that.setData({
      time: res.data.dt
    })
  },

  getCouponList(res) {
    console.log("优惠券", res)
    var that = this;
    that.setData({
      couponList: res.data.dt
    })
  },

  getProductsList(res) {
    console.log("商品信息", res)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    app.apiGet(app.apiList.getAddressList, {
      Pageindex: 1,
      UserID: that.data.userId,
      IsDefault: 0,
    }, that.getAddressList)
  },
  getAddressList(res) {
    console.log("收货地址列表", res)
    var that = this;
    that.setData({
      addressList: res.data.dt[0]
    })
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