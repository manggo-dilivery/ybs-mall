// pages/index/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    market: [],
    cateItems: [],
    index: 0,
  },

  handlerParent() {
    console.log("父节点");
  },
  handlerChild() {
    console.log("子节点");
  },

  tabChange: function(e) {
    var that = this;

    console.log("点击区域", e)
    that.setData({
      currentIndex: e.currentTarget.dataset.index
    })
    var currentIndex = that.data.currentIndex;
    var market = that.data.cateItems[currentIndex].jx
    app.apiGet(app.apiList.markettype, {
      jx: market
    }, that.markettype)
  },
  // 所有区域接口
  ShopAreaList(res) {
    console.log("所有区域", res)
    var that = this;

    that.setData({
      cateItems: res.data.dt
    })

  },
  // 选择区域的市场
  markettype(res) {
    console.log("选择区域的市场", res)
    var that = this;
    that.setData({
      market: res.data.dt
    })
  },

  //选择市场
  confirm: function(e) {
    console.log("选择", e)
    let marketName = this.data.market[e.currentTarget.dataset.index].name
    app.marketName = marketName
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("onload 监听页面加载");
    var that = this;
    app.apiGet(app.apiList.ShopAreaList, {}, that.ShopAreaList)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},
})