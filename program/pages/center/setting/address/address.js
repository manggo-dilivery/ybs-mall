// pages/center/setting/address/address.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: null,
    addressList: [],
  },

  // 添加新收货地址
  addAddress: function() {
    wx.navigateTo({
      url: '/pages/center/setting/address/addAddress/addAddress?addrId=0',
    })
  },
  // 修改收货地址
  toChange: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index
    var addrId = that.data.addressList[index].id
    wx.navigateTo({
      url: '/pages/center/setting/address/addAddress/addAddress?addrId=' + addrId,
    })
  },
  //结算页面跳转过来选择地址
  chooseAddress: function(e) {
    console.log("选择地址",e)
    wx.redirectTo({
      url: '/pages/shopCar/confirm/confirm?theAddress=' + e.currentTarget.dataset.index,
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '收货地址',
    })
    var that = this;
    var user = wx.getStorageSync("userId")
    that.setData({
      userId: user.userId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  getAddressList(res) {
    console.log("收货地址列表", res)
    var that = this;
    that.setData({
      addressList: res.data.dt
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    app.apiGet(app.apiList.getAddressList, {
      Pageindex: 1,
      UserID: that.data.userId,
      IsDefault: 0,
    }, that.getAddressList)
  },

})