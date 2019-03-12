// pages/center/setting/address/addAddress/addAddress.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: "小区/写字楼/学校",
    houseNum: "",
    name: "",
    phoneNum: null,
    pitchOn: 0,
    isdefault: 1,
    addrId: 0,
    userId: null,
    getAddress: {},
    label: ["家", "公司", "父母家"],
    index: 0,
    zt: 1,
    longitude: null,
    latitude: null,
  },
  // 地图
  toMap: function(e) {
    var that = this;
    wx.getSetting({
      success: function(res) {
        console.log("获取用户信息", res.authSetting['scope.userLocation'])
        if (res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '是否授权当前位置',
            content: '请确认授权,否则将无法填写您的收货地址',
            success: function(res) {
              console.log("确认or取消", res)
              if (res.cancel) {
                console.log("授权失败")
              } else if (res.confirm) {
                wx.openSetting({
                  success: function(e) {
                    console.log("授权成功", e)
                    if (e.authSetting['scope.userLocation'] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 3000
                      })

                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 3000
                      })
                    }
                  }
                })
              }
            }
          })
        } else {
          wx.chooseLocation({
            success: function(res) {
              console.log("确认地址", res.name)
              // var address = that.data.address
              that.setData({
                address: res.name,
                longitude: res.longitude,
                latitude: res.latitude,
              })
            },
          })
        }
      }
    })
  },

  //门牌号
  houseNum: function(res) {
    console.log("门牌号", res.detail.value)
    var that = this;
    that.setData({
      houseNum: res.detail.value
    })
  },
  //联系人
  name: function(res) {
    console.log("联系人", res.detail.value)
    var that = this;
    that.setData({
      name: res.detail.value
    })
  },
  //手机号
  phoneNum: function(res) {
    console.log("手机号", res)
    var that = this;
    that.setData({
      phoneNum: res.detail.value,
    })
  },
  // 选中标签
  pitchOn: function(e) {
    console.log("eeeeeeeeeeeee", e.currentTarget.dataset.index)
    var that = this;
    that.setData({
      pitchOn: e.currentTarget.dataset.index
    })
  },
  //默认地址
  switchChange: function(e) {
    var that = this;
    console.log("默认", e)
    if (e.detail.value == true) {
      that.setData({
        isdefault: 1
      })
    } else {
      that.setData({
        isdefault: 0
      })
    }
    // app.apiPost(app.apiList.shezhiAddress, {
    //   ID: that.data.addrId,
    //   UserID: that.data.userId
    // }, that.shezhiAddress)
  },
  // shezhiAddress(res) {
  //   console.log("默认地址接口", res)
  // },
  //删除地址
  deleteaddr: function(e) {
    var that = this;
    if (e.detail.value == true) {
      that.setData({
        zt: 0
      })
    } else {
      that.setData({
        zt: 1
      })
    }
  },

  //保存
  save: function() {
    var that = this;
    console.log("保存", that.data.phoneNum.length)
    if (that.data.address == "" || that.data.houseNum == "" || that.data.name == "" || that.data.phoneNum.length != 11) {
      wx.showToast({
        title: '请填写完整信息',
        icon: "none",
      })
    } else {
      app.apiPost(app.apiList.addressAdd, {
        ID: that.data.addrId,
        UserID: that.data.userId,
        lxr: that.data.name,
        lxsj: that.data.phoneNum,
        mph: that.data.houseNum,
        dizhi: that.data.address,
        jd: that.data.longitude,
        wd: that.data.latitude,
        bq: that.data.label[that.data.pitchOn],
        zt: that.data.zt,
        isdefault: that.data.isdefault,
      }, that.addressAdd)
    }
  },
  //编辑新增地址
  addressAdd(res) {
    console.log("新增编辑地址接口", res)
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var user = wx.getStorageSync("userId")
    that.setData({
      addrId: options.addrId,
      userId: user.userId
    })
    wx.setNavigationBarTitle({
      title: '新增收货地址',
    })
    wx.getLocation({
      // type: "gcj02",
      success: function(res) {
        console.log("当前位置", res)
      },
      fail(el) {
        console.log("失败", el)
      }
    })
    var that = this;
    if (that.data.addrId == 0) {
      console.log("新增")
    } else {
      app.apiGet(app.apiList.getAddressListByID, {
        ID: that.data.addrId,
      }, that.getAddressListByID)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  //地址详情
  getAddressListByID(res) {
    console.log("地址详情", res)
    var that = this;
    that.setData({
      address: res.data.data.dizhi,
      zt: res.data.data.zt,
      houseNum: res.data.data.mno,
      name: res.data.data.lxr,
      phoneNum: res.data.data.lxrsim,
      isdefault: res.data.data.isdefault,
    })
    if (res.data.data.city == "家") {
      that.setData({
        pitchOn: 0
      })
    } else if (res.data.data.city == "公司") {
      that.setData({
        pitchOn: 1
      })
    } else if (res.data.data.city == "父母家") {
      that.setData({
        pitchOn: 2
      })
    }
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