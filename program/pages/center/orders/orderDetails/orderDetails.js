// pages/center/orders/orderDetails/orderDetails.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetail: {}
  },
  // 联系快递员
  callCourier: function() {
    var that = this;
    console.log("电话", that.data.orderDetail.psydh)
    wx.makePhoneCall({
      phoneNumber: that.data.orderDetail.psydh,
      success: res => {
        console.log("拨打成功", res)
      },
      fail: res => {
        console.log("拨打失败", res)
      }
    })
  },
  // 联系客服
  callService: function() {
    wx.makePhoneCall({
      phoneNumber: '027-86559130',
      success: res => {
        console.log("拨打成功", res)
      },
      fail: res => {
        console.log("拨打失败", res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '订单详情',
    })
    var that = this;
    console.log("上个页面", options)
    app.apiGet(app.apiList.getCientOrderDetails, {
      UserID: options.userId,
      OrderID: options.ID
    }, that.getCientOrderDetails)
  },

  getCientOrderDetails(res) {
    console.log("订单详情", res.data.dt[0])
    var that = this;
    that.setData({
      orderDetail: res.data.dt[0]
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
})