// pages/information/information.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headportrait: "",
    user: {}
  },

  // 上传图片
  takePictures: function() {
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function(res) {
        console.log("上传照片", res.tempFilePaths)
        var tempFilePaths = res.tempFilePaths
        // wx.saveFile({
        //   tempFilePath: tempFilePaths[0],
        //   success: function(res) {
        //     console.log("保存图片", res)
        //     var savedFilePath = res.savedFilePath
        //     var headportrait = that.data.headportrait
        //     that.setData({
        //       headportrait: savedFilePath
        //     })
        //   }
        // })
        wx.uploadFile({
          url: app.apiList.updateUserLogo,
          filePath: tempFilePaths[0],
          name: 'Img',
          formData: {
            UserID: that.data.user.userId,
            UserLogoImages: tempFilePaths[0],
          },
          header: {
            'content-type': 'multipart/form-data'
          },
          success(res) {
            console.log("上传头像", res)
            that.setData({
              headportrait: tempFilePaths[0]
            })
          },
          fail(res) {
            console.log("shibai", res)
          }
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '会员信息',
    })
    var that = this;
    var user = wx.getStorageSync("userId")
    that.setData({
      user: user,
      headportrait: user.personImg
    })
    console.log("1111111111", that.data.user)
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