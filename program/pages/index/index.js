// pages/index/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    text: [],
    marketName: "请选择市场",
    showSearch: 0,
    imgUrls: [],
    isfocus: false,
    indicator: false,
    interval: 5000,
    duration: 1000,
    classify: [],
    classifyIndex: null,
    // category: [],
    moreCategory: [],
    listData: [],
    moreListData: [],
    showMore: false,
    recommendMarket: "",
    goods: [],
    showWord: false,
    latitude: "",
    longitude: "",
    MarketID: null,
    goodsList: [],
    haveGoodsList: true,
  },
  tabChange: function(e) {
    var that = this;
    that.setData({
        currentIndex: e.currentTarget.dataset.index
    })
    // 点商家
    if (e.currentTarget.dataset.index == 1) {
      app.apiGet(app.apiList.getShopList, {
        pageindex: 1,
        scid: that.data.MarketID,
        // name: that.data.text[e.currentTarget.dataset.index].Title
      }, that.getShopList)
    }
    if (e.currentTarget.dataset.index==2){
      app.apiGet(app.apiList.getSearchCaichangList, {
        Pageindex: 1,
        // scid: that.data.MarketID,
        // name: that.data.text[e.currentTarget.dataset.index].Title
      }, that.getSearchCaichangList)
    }

  },
  getShopList(res) {
    console.log("商家列表", res)
    var that = this;
    that.setData({
      shopList: res.data.dt
    })
  },
  getSearchCaichangList(res){
    console.log("市场列表",res)
    var that = this;
    that.setData({
      caichangList:res.data.dt
    })
  },
  // 搜索热门商品
  goodsDetail: function(e) {
    var that = this;
    app.apiGet(app.apiList.getGoodsList, {
      pageindex: 1,
      scid: that.data.MarketID,
      name: that.data.text[e.currentTarget.dataset.index].Title
    }, that.getGoodsList)
  },
  getGoodsList(res) {
    console.log("获取搜索商品列表", res)
    var that = this;
    that.setData({
      goodsList: res.data.dt,
      haveGoodsList: false,
    })
  },
  onfocus: function(e) {
    var that = this;
    that.setData({
      showSearch: 1,
      isfocus: true
    })
  },
  onblur: function() {
    var that = this;
    that.setData({
      showSearch: 0,
      isfocus: false,
      haveGoodsList: true,
    })
  },

  //点击搜索出来的商品跳转至详情页面
  toGoods: function(e) {
    wx.navigateTo({
      url: '/pages/index/categoryList/goodsDetail/goodsDetail?id=' + this.data.goodsList[e.currentTarget.dataset.index].id,
    })
  },

  toShop:function(e){
    wx.navigateTo({
      url: '/pages/shopPage/shopPage?shopId=' + this.data.shopList[e.currentTarget.dataset.index].id,
    })
  },

  // 点击药检弹出文本
  tapword: function(el) {
    var that = this;
    that.setData({
      showWord: true
    })
  },
  // 点击文本右上角×关闭弹出层
  showClose: function() {
    var that = this;
    that.setData({
      showWord: false
    })
  },
  // 点击切换跳转市场分类
  changeMall: function() {
    wx.navigateTo({
      url: '/pages/index/markettype/markettype'
    })
  },
  //   点击跳转到分类列表
  categoryList: function(e) {
    wx.navigateTo({
      url: '/pages/index/categoryList/categoryList?id=' + e.currentTarget.dataset.id,
    })
  },
  moreCategory: function() {
    wx.navigateTo({
      url: '/pages/index/categoryList/moreCategory/moreCategory',
    })
  },
  recipeList() {
    wx.navigateTo({
      url: '/pages/index/recipeList/recipeList',
    })
  },
  // 轮播图接口
  banner(res) {
    // console.log("轮播图接口",res)
    var that = this;
    that.setData({
      imgUrls: res.data.data.banner
    })
  },
  // 商品分类接口
  dt(res) {
    // console.log("商品分类接口",res)
    var that = this;
    var classifyCount = res.data.dt
    if (classifyCount.length <= 10) {
      that.data.listData = [];
      that.setData({
        classify: res.data.dt,
      })
    } else {
      that.data.listData = [];
      that.data.moreListData = [];
      for (var i = 0; i < 9; i++) {
        that.data.listData.push(classifyCount[i])
      }
      for (var n = 9; n < classifyCount.length; n++) {
        that.data.moreListData.push(classifyCount[n])
      }
      that.setData({
        classify: that.data.listData,
        moreCategory: that.data.moreListData,
        showMore: true
      })
      app.globalData.storageCategoy = that.data.moreListData;
    }
  },
  // 美味食谱接口
  gonggao(res) {
    // console.log("美味食谱接口",res)
    var that = this;
    that.setData({

    })
  },
  //首页推荐市场接口
  market(res) {
    console.log("首页推荐市场接口", res)
    var that = this;
    that.setData({
      recommendMarket: res.data.dt[0].name,
      MarketID: res.data.dt[0].id,
      marketName: res.data.dt[0].name,
    })
    app.apiGet(app.apiList.banner, {
      MarketID: that.data.MarketID
    }, that.banner)
    app.apiGet(app.apiList.dt, {
      scid: that.data.MarketID
    }, that.dt)
  },
  // 搜索热门商品
  SearchWord(res) {
    console.log("搜索热门商品接口", res)
    var that = this;
    that.setData({
      text: res.data.data.banner
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.getLocation({
      success: function(res) {
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude,
        })
      },
    })
    app.apiGet(app.apiList.market, {
      jd: that.data.longitude,
      wd: that.data.latitude,
      ReferralType: 0
    }, that.market)

    app.apiGet(app.apiList.gonggao, {}, that.gonggao)
    app.apiGet(app.apiList.SearchWord, {}, that.SearchWord)
    // getApp().setWatcher(this.data, this.watch);
    // var userId = wx.getStorageSync("userId").userId
  },
  watch: {
    showSearch: function(newValue) {
      if (newValue == 1) {

      }
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
    var that = this;
    let marketName = app.marketName
    console.log("选择的市场", marketName)
    that.setData({
      marketName: marketName
    })
  },
})