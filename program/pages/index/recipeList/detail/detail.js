// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      currentIndex:0,
      isshow:1,
      animation:'',
      num:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
    showRecommend(){
        var that = this;
        this.animation.translateX(-260).step()
        that.setData({
            animation:this.animation.export(),
            currentIndex:1
        })
    },
    hideRecommend(){
        var that = this;
        this.animation.translateX(0).step()
        that.setData({
            animation: this.animation.export(),
            currentIndex:0
        })
    },
    add(){
        var num = this.data.num;
        num ++;
        var that = this;
        that.setData({
            num:num
        })
    },
    sub(){
        var num = this.data.num;
        if(num==1)return;
        num--;
        var that = this;
        that.setData({
            num: num
        })
    },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      this.animation = wx.createAnimation({
          duration:200,
          timingFunction:'linear',
          delay:0,
          transformOrigin:'right top 0',
          success:res=>{
              console.log(res)
          }
      })
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