// pages/shopPage/shopPage.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      starAmount: '',
      starAmount2: 5,
      starAmount3: 5,
      currentIndex:0,
      category: [],
      currentTab:0,
      collectCount:0,
      isShowCol:1,
      showCollection:0,

      currentFeel:0,
      shopInfo:[],
      userId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var shopId = options.shopId;
      app.apiGet(app.apiList.shopPage,{sjid:shopId},res=>{
          this.setData({
              shopInfo:res.data.data,
              starAmount:parseInt(res.data.data.xj)
          })
          console.log("商家信息",res)
      })
      app.apiGet(app.apiList.shopFirstCategory,{shopID:shopId},this.shopCategory)
      wx.getStorage({
          key: 'userId',
          success: res => {
            this.setData({
                userId:res.data.userId
            })
          },
      })
      
  },
    tabChange: function (e) {
        var that = this;
        var index = e.currentTarget.dataset.index;
        that.setData({
            currentIndex: index,
        })
    },
    shopCategory(res){
        this.setData({
            category: res.data.dt
        })
        var changeIndex = res.data.dt[0].id;
        console.log('左侧列表信息',res)
        // console.log(changeIndex)
        // app.apiGet(app.apiList.shopCategory, { pageIndex: 1, scid: 219, yjlb: "", ejlb: '', sjlb: changeIndex, sjid: '', name: '' }, res2 => {
        //     console.log('列表详情', res2)
        //     that.setData({
        //         shopList: res2.data.dt
        //     })
        // })
    },
    changeTab: function (e) {
        var that = this;
        var index = e.currentTarget.dataset.index;
        that.setData({
            currentTab: index
        })

    },
    iscollect(){
        var num = this.data.collectCount;
        var userId = this.data.userId;
        var shopId = this.data.shopInfo.shopid;
        if( num%2 == 0 ){
            this.setData({
                showCollection:1,
                collectCount: num + 1,
            })
            app.apiPost(app.apiList.collection, { UserID: userId, sjid: shopId, sclx:1},res=>{
                app.showToast('收藏成功')
            })
        }else if ( num % 2 == 1 ){
            this.setData({
                collectCount: num+1,
                showCollection:0
            })
            app.apiPost(app.apiList.discollection, { spid: 0, sjid: shopId, UserID:userId},res=>{
                app.showToast('取消成功')
            })
        }
    },
    shopCar(){
      wx.switchTab({
            url: '/pages/shopCar/shopCar',
        })
    },
    commentChange(e){
        var that = this;
        var id = e.currentTarget.dataset.feel;
        that.setData({
            currentFeel:id
        })
        console.log(e.currentTarget)
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