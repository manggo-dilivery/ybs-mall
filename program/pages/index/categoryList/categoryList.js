// pages/categoryList/categoryList.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: [],
    currentIndex: 0,
    currentTab: 0,
    count: 0,
    index: 0,
    goodsCategory:[],
    mallId:'',
    shopList:[]
  },

  changeTab: function(e) {
    // console.log("二级点击",e)
    var that = this;
    that.setData({
      currentIndex: e.currentTarget.dataset.tab
    })
    var searchId = e.currentTarget.dataset.tab;
    app.apiGet(app.apiList.goodsCategory, { ID: searchId }, that.goodsCategory)

  },
  touchItem: function(e) {
    var that = this;
    var changeIndex = e.currentTarget.dataset.id
    that.setData({
      currentTab: changeIndex,
      shopList:[]
    })
      app.apiGet(app.apiList.shopCategory, { pageIndex: 1, scid: 219, yjlb: "", ejlb: '', sjlb: changeIndex, sjid:'', name:''},res=>{
        // console.log('列表详情',res.data.dt)
        that.setData({
            shopList: res.data.dt
        })
    })
    //   console.log(changeIndex)
  },
  getUp() {
    this.setData({
      currentTab: 0,
      shopList:[]
    })
    //console.log(this.data.currentTab)
  },
  urlBack: function() {
    wx.navigateBack({
      delta: 1
    })
  },
  goodsDetail(e) {
      var id = e.currentTarget.dataset.goodsid;
    //   console.log(id)
    wx.navigateTo({
        url: '/pages/index/categoryList/goodsDetail/goodsDetail?id='+id,
    })
  },
  shopPage: e => {
    var shopid = e.currentTarget.dataset.shopid;
    wx.navigateTo({
      url: '/pages/shopPage/shopPage?shopId='+shopid,
    })
  },
  // 左侧分类接口
  categoryList(res) {
    var that = this;
    // console.log("左侧分类", res)
    this.setData({
      category: res.data.dt,
      mallId:res.data.dt[0].id,
      currentIndex: res.data.dt[0].id
    })
    app.apiGet(app.apiList.goodsCategory, { ID: this.data.mallId }, that.goodsCategory)
  },
  // 右侧分类接口
  goodsCategory(res){
      console.log("右侧分类", res.data.dt)
    this.setData({
      goodsCategory:res.data.dt,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log("上个页面传过来的参数", options.id)
    var that = this;
    app.apiGet(app.apiList.categoryList, { ID: options.id }, that.categoryList)
    //   console.log(this.data.mallId)
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