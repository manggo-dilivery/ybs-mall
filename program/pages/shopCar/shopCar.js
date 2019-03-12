// pages/shopCar/shopCar.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [],
    itemInfo: [],
    totalSum: '',
    selectAll: true,
    showMark: false,
    shopId: ''
  },

  toConfirm: function() {
    wx.getStorage({
      key: 'info',
      success: res => {
        let arr = [];
        var info = res.data;
        for (let item of info) {
          for (let goods of item.CartProductList) {
            if (goods.ischecked) {
              arr.push(goods.OrderProductInfoModel.cpid)
            }
          }
        }
        var goodsId = arr.join(",")
        wx.navigateTo({
          url: '/pages/shopCar/confirm/confirm?totalSum=' + this.data.totalSum + '&goodsId=' + goodsId,
        })
      },
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '购物车',
    })
    if (wx.getStorageSync("userId").userId == null) {
      wx.reLaunch({
        url: '/pages/login/login',
      })
    } else {
      wx.getStorage({
        key: 'userId',
        success: res => {
          this.setData({
            userInfo: res.data
          })
          app.apiPost(app.apiList.shopCar, {
            userId: res.data.userId
          }, res => {
            var info = res.data.data.StoreCartList
            // console.log(info)
            // console.log(res)
            let totalSum = 0;
            for (let i = 0; i < info.length; ++i) {
              let goodsSum = 0;
              for (let n = 0; n < info[i].CartProductList.length; ++n) {
                info[i].CartProductList[n].ischecked = true
                if (info[i].CartProductList[n].ischecked) {
                  goodsSum = goodsSum + info[i].CartProductList[n].OrderProductInfoModel.dj * info[i].CartProductList[n].OrderProductInfoModel.gmsl
                }
              }
              info[i].goodsSum = Math.round(goodsSum * 100) / 100;
              totalSum = totalSum + goodsSum;
            }
            info.totalSum = Math.round(totalSum * 100) / 100;
            this.setData({
              itemInfo: info,
              totalSum: info.totalSum
            })
            wx.setStorage({
              key: 'info',
              data: info,
            })
          })
        }
      })
    }


    // console.log(this.data.userInfo.userId)

  },
  checkboxChange(e) {
    // console.log('checkbox发生change事件，携带value值为：', e.detail.value[0])
    // console.log(this.data.itemInfo)
    var goodsId = e.detail.value[0];
    var id = e.currentTarget.dataset.goodsid;
    // console.log(id)
    var info = wx.getStorageSync('info');
    // console.log(info)
    // var arr = this.data.array;
    // arr.push(goodsId)
    var totalSum = 0;
    for (var i = 0; i < info.length; ++i) {
      var goodsSum = info[i].goodsSum;
      for (var n = 0; n < info[i].CartProductList.length; ++n) {
        if (id == info[i].CartProductList[n].OrderProductInfoModel.cpid) {
          if (goodsId) {
            info[i].CartProductList[n].ischecked = true;
            goodsSum = goodsSum + info[i].CartProductList[n].OrderProductInfoModel.dj * info[i].CartProductList[n].OrderProductInfoModel.gmsl
          } else {
            info[i].CartProductList[n].ischecked = false;
            goodsSum = goodsSum - info[i].CartProductList[n].OrderProductInfoModel.dj * info[i].CartProductList[n].OrderProductInfoModel.gmsl
          }
        }
      }
      info[i].goodsSum = Math.round(goodsSum * 100) / 100;
      totalSum = totalSum + goodsSum;
    }
    info.totalSum = Math.round(totalSum * 100) / 100;
    // console.log(info)
    // 使用setData复选框会出现问题
    var that = this;
    that.setData({
      itemInfo: info,
      totalSum: info.totalSum
    })
    wx.setStorage({
      key: 'info',
      data: info,
    })
    // console.log(this.data.itemInfo)
  },
  add(e) {
    var info = e.currentTarget.dataset;
    var userId = this.data.userInfo.userId;
    // console.log(e)
    app.apiPost(app.apiList.changeShopCar, {
      cpid: info.goodsid,
      UserID: userId,
      gmsl: info.index + 1,
      ctid: info.shopid,
      scid: info.mallid,
      gg: info.weight,
      dj: info.price,
      kc: 9999
    }, res => {})
    var userInfo = wx.getStorageSync('info');
    var totalSum = 0;
    for (var i = 0; i < userInfo.length; ++i) {
      var goodsSum = 0;
      for (var n = 0; n < userInfo[i].CartProductList.length; ++n) {
        if (info.goodsid == userInfo[i].CartProductList[n].OrderProductInfoModel.cpid) {
          userInfo[i].CartProductList[n].OrderProductInfoModel.gmsl = userInfo[i].CartProductList[n].OrderProductInfoModel.gmsl + 1;
        }
        if (userInfo[i].CartProductList[n].ischecked) {
          goodsSum = goodsSum + userInfo[i].CartProductList[n].OrderProductInfoModel.dj * userInfo[i].CartProductList[n].OrderProductInfoModel.gmsl
        }
      }
      userInfo[i].goodsSum = Math.round(goodsSum * 100) / 100;
      totalSum = totalSum + goodsSum;
    }
    userInfo.totalSum = Math.round(totalSum * 100) / 100;
    this.setData({
      itemInfo: userInfo,
      totalSum: userInfo.totalSum
    })
    wx.setStorage({
      key: 'info',
      data: userInfo,
    })
  },
  sub(e) {
    var info = e.currentTarget.dataset;
    var userId = this.data.userInfo.userId;
    var purchaseNum = info.index
    if (purchaseNum == 1) return;
    var purchaseNum = purchaseNum - 1;
    app.apiPost(app.apiList.changeShopCar, {
      cpid: info.goodsid,
      UserID: userId,
      gmsl: purchaseNum,
      ctid: info.shopid,
      scid: info.mallid,
      gg: info.weight,
      dj: info.price,
      kc: 9999
    }, res => {})
    var userInfo = wx.getStorageSync('info');
    var totalSum = 0;
    for (var i = 0; i < userInfo.length; ++i) {
      var goodsSum = 0;
      for (var n = 0; n < userInfo[i].CartProductList.length; ++n) {
        if (info.goodsid == userInfo[i].CartProductList[n].OrderProductInfoModel.cpid) {
          userInfo[i].CartProductList[n].OrderProductInfoModel.gmsl = userInfo[i].CartProductList[n].OrderProductInfoModel.gmsl - 1;
        }
        if (userInfo[i].CartProductList[n].ischecked) {
          goodsSum = goodsSum + userInfo[i].CartProductList[n].OrderProductInfoModel.dj * userInfo[i].CartProductList[n].OrderProductInfoModel.gmsl
        }
      }
      userInfo[i].goodsSum = Math.round(goodsSum * 100) / 100;
      totalSum = totalSum + goodsSum;
    }
    userInfo.totalSum = Math.round(totalSum * 100) / 100;
    this.setData({
      itemInfo: userInfo,
      totalSum: userInfo.totalSum
    })
    wx.setStorage({
      key: 'info',
      data: userInfo,
    })
  },
  goodsCount(e) {
    var num = e.detail.value;
  },
  selectAll(e) {
    // console.log(e)
    var info = wx.getStorageSync('info')
    var totalSum = 0;
    for (var i = 0; i < info.length; ++i) {
      var goodsSum = 0;
      for (var n = 0; n < info[i].CartProductList.length; ++n) {
        if (e.detail.value == 1) {
          info[i].CartProductList[n].ischecked = true;
          goodsSum = goodsSum + info[i].CartProductList[n].OrderProductInfoModel.dj * info[i].CartProductList[n].OrderProductInfoModel.gmsl
          this.setData({
            selectAll: true
          })
        } else {
          info[i].CartProductList[n].ischecked = false;
          goodsSum = 0
          this.setData({
            selectAll: false
          })
        }
      }
      info[i].goodsSum = Math.round(goodsSum * 100) / 100;
      totalSum = totalSum + goodsSum;
    }
    info.totalSum = Math.round(totalSum * 100) / 100;
    this.setData({
      itemInfo: info,
      totalSum: info.totalSum
    })
    wx.setStorage({
      key: 'info',
      data: info,
    })
  },
  delete() {
    // var info = wx.getStorageSync('info')
    // var totalSum = 0;
    // var arr = []
    // for (var i = 0; i < info.length; ++i) {
    //     var goodsSum = info[i].goodsSum;
    //     for (var n = 0; n < info[i].CartProductList.length; ++n) {
    //         if (info[i].CartProductList[n].ischecked) {
    //             goodsSum = goodsSum + info[i].CartProductList[n].OrderProductInfoModel.dj * info[i].CartProductList[n].OrderProductInfoModel.gmsl;
    //             arr.push(info[i].CartProductList[n].OrderProductInfoModel.cpid)
    //         }
    //     }
    //     info[i].goodsSum = Math.round(goodsSum * 100) / 100;
    //     totalSum = totalSum + goodsSum;
    // }
    // info.totalSum = Math.round(totalSum * 100) / 100;
    // this.setData({
    //     itemInfo: info,
    //     totalSum: info.totalSum
    // })
    // wx.setStorage({
    //     key: 'info',
    //     data: info,
    // })
    // var StrGoodsID = arr.join(",")
    // console.log(typeof (parseInt(this.data.userInfo.userId)))
    // app.apiPost(app.apiList.deleteGoods, { StrGoodsID: StrGoodsID,UserID:this.data.userInfo.userId},res=>{
    //     // app.showToast(res)
    //     console.log(res)
    // })
  },
  goodsMark() {
    var userId = this.data.userInfo.userId;

  },
  showMark() {
    this.setData({
      showMark: true
    })
  },
  hideMark() {
    this.setData({
      showMark: false
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