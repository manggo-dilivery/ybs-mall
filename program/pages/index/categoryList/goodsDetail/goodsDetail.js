// pages/goodsDetail/goodsDetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      imgUrls: [],
      isfocus: false,
      // isfocus:false,
      indicator: false,
      interval: 5000,
      duration: 1000,
      num:1,
      isCollect:false,
      collectCount:0,
      weight:[],
      currentWeight:0,
      detailImage:'',
      goodsInfo:[],
      userInfo:[],
      goodsId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id)
      var id = options.id;
    //   console.log(id)
      app.apiGet(app.apiList.goodsDetail,{ID:id},res=>{
        //   console.log(res.data.data[0].sptpurl)
          var imgUrl = res.data.data[0].sptpurl.split(',');
          var weight0 = res.data.data[0].gg;
          var weight1 = res.data.data[0].gg1;
          var weight2 = res.data.data[0].gg2;
          if(weight1==''){
              var weight = [weight0]
          }
          else if(weight2==''){
              var weight = [weight0,weight1]
          }else{
              var weight = [weight0, weight1, weight2]
          }
          console.log('详情',res)
          this.setData({
              imgUrls: imgUrl,
              weight: weight,
              detailImage: res.data.data[0].spxqurl,
              goodsInfo:res.data.data[0],
              goodsId: id
          })
      })
      wx.getStorage({
          key: 'userId',
          success: res=> {
            this.setData({
                userInfo:res.data
            })
          },
      })
  },
    add() {
        var num = this.data.num;
        num++;
        var that = this;
        that.setData({
            num: num
        })
    },
    sub() {
        var num = this.data.num;
        if (num == 1) return;
        num--;
        var that = this;
        that.setData({
            num: num
        })
    },
    selectWeight(e){
        var that = this;
        that.setData({
            currentWeight: e.currentTarget.dataset.index
        })
    },
    selectCollect() {
        var num = this.data.collectCount;
        var userId = this.data.userInfo.userId;
        var goodsId = this.data.goodsId;
        console.log(goodsId+','+userId)
        if (num % 2 == 0) {
            this.setData({
                isCollect: true,
                collectCount: num + 1
            })
            app.apiPost(app.apiList.collection,{UserID:userId,sjid:goodsId,sclx:2},res=>{
                app.showToast(res.data.content)
                console.log(res)
            })
        } else if (num % 2 == 1) {
            this.setData({
                isCollect: false,
                collectCount: num + 1
            })
            app.apiPost(app.apiList.discollection, {spid:goodsId,sjid:0,UserID:userId},res=>{
                app.showToast(res.data.content,'none')
                console.log(res)
            })
        }
    },
    addToShopCar(){
        var info = this.data.goodsInfo
        var goodsId = this.data.goodsId;
        var userId = this.data.userInfo.userId;
        var purchaseNum = this.data.num;
        var shopId = info.ctid;
        var mallId = 219;
        var weight = this.data.weight[this.data.currentWeight];
        var price = info.dj;
        var amount = info.kc;
        if (this.data.userInfo.length == 0) {
            wx.showModal({
                title: '未登录',
                content: '请先登录再把商品加入购物车',
                success: res => {
                    if (res.confirm) {
                        wx.navigateTo({
                            url: '/pages/login/login',
                        })
                    } else if (res.cancel) {
                        return;
                    }
                }
            })
            return
        }
        app.apiPost(app.apiList.addToShopCar, { cpid: goodsId, UserID: userId, gmsl: purchaseNum, ctid: shopId, scid: mallId, gg: weight, dj: price, kc: amount},res=>{
            // console.log('添加购物车：',res)
            if(!res.data.state){
                app.showToast(res.data.content,'none')
            }else{
                app.showToast(res.data.content)
            }
        })
    },
    buy(){
        // var info = this.data.goodsInfo;
        // var goodsId = this.data.goodsId;
        // var userId = this.data.userInfo.userId;
        // var purchaseNum = this.data.num;
        // var shopId = info.ctid;
        // var mallId = 219;
        // var weight = this.data.weight[this.data.currentWeight];
        // var price = info.dj;
        // var amount = info.kc;
        // app.apiPost(app.apiList.buy, { cpid: goodsId, UserID: userId, gmsl: purchaseNum, ctid: shopId, scid: mallId, gg: weight, dj: price, kc: amount},res=>{
        //     if (!res.data.state) {
        //         app.showToast(res.data.content, 'none')
        //     } else {
        //         app.showToast(res.data.content)
        //     }
        // })
    },
    shopCar(){
        wx.switchTab({
            url: '/pages/shopCar/shopCar',
        })
        console.log(111)
    },
    shopPage(){
        wx.navigateTo({
            url: '/pages/shopPage/shopPage',
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