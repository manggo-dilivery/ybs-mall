// pages/recipeList/recipeList.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodslist:[]
  },
  // 美味食谱列表
  FoodsList(res){
    console.log("列表",res)
    var that = this;
    that.setData({
      foodslist:res.data.dt
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.apiGet(app.apiList.FoodsList, { pageindex: 1 }, that.FoodsList)
  },
    detail(){
        wx.navigateTo({
          url: '/pages/index/recipeList/detail/detail',
        })
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

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})