// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        msg: "小小小施爷",
        userInfo: null,
        isShow: true
    },

    handlerParent() {
        console.log("父节点");
    },
    handlerChild() {
        console.log("子节点");
    },

    /**
    * 回调获取用户信息的函数
    */
    onGotUserInfo: function (data) {
        console.log("当前用户点击了", data);
        console.log(data.detail.userInfo);
        if (data.detail.userInfo) {
            //当前用户点击的是允许
            this.setUserInfo();
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("onload 监听页面加载");

        this.setUserInfo();
    },

    /**
    * 设置用户信息
    */
    setUserInfo() {
        //判断用户是否已经授权了
        wx.getSetting({
            success: (data) => {
                console.log(data);
                if (data.authSetting['scope.userInfo']) {
                    //用户已经授权
                    this.setData({
                        isShow: false
                    });
                } else {
                    //用户没有授权
                    this.setData({
                        isShow: true
                    })
                }
            }
        });

        //获取登陆用户的信息
        wx.getUserInfo({
            success: (data) => {
                console.log(data);
                this.setData({
                    userInfo: data.userInfo
                });
            },
            fail: (data) => {
                console.log("获取用户信息失败" + data);
            }
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        console.log("onReady 页面初次渲染完成");
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        console.log("onShow 页面显示");
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        console.log("onHide 页面隐藏");
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        console.log("onUnload 页面卸载");
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        console.log("onPullDownRefresh 监听用户下拉动作");
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        console.log("onReachBottom 事件的处理函数");
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        console.log("onShareAppMessage 点击右上角分享");
    }
})