//app.js
var app = getApp()
App({
  alert: function(msg) {
    wx.showModal({
      content: msg,
      showCancel: false,
    });
  },
  setWatcher(data, watch) {
    Object.keys(watch).forEach(v => {
      this.observe(data, v, watch[v]);
    })
  },
  observe(obj, key, watchFun) {
    var val = obj[key];
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      set: function(value) {
        val = value;
        watchFun(value, val);
      },
      get: function() {
        return val;
      }
    })
  },
  confirm: function(msg, success) {
    wx.showModal({
      content: msg,
      showCancel: true,
      success: success
    });
  },
  showToast: function(msg, icon) {
    if (!icon) {
      icon = 'success';
    }
    wx.showToast({
      title: msg,
      icon: icon,
      duration: 1000
    })
  },
  //显示加载中
  showloading: function(msg) {
    wx.showLoading({
      title: msg,
      icon: 'loading',
      duration: 800
    })
  },
  //隐藏加载中效果
  hideloading: function(msg) {
    wx.hideLoading()
  },
  config: {
    //接口host
    host: 'http://www.yuanbensheng.com',
    //版本
    version: "1.0",
    //app名称
    channel: '石校长',
    //appid
    key: "wxf467c960d64888c2",
    uid: 294 //企业展示类小程序需要修改的参数
  },
  apiList: {
    //接口
    banner: '/webapi/User/GetBannerAdvertList?', //幻灯片查询接口
    dt: '/webapi/User/GetMarketZhongleiListByID', //商品类别
    gonggao: '/webapi/User/GetNewsList', //美味食谱
    categoryList: '/webapi/User/GetZhongleiListByID?', //商品分类二级
    goodsCategory: '/webapi/User/GetZhongleiListByID?', //商品分类三级
    // goodsCategory: '/webapi/User/GetGoodsListBysjlb', //商品分类三级
    shopCategory: '/webapi/User/GetGoodsList', //商家三级分类列表
    goodsDetail: '/webapi/User/GetGoodsDetails', //商品详情
    market: '/webapi/user/GetReferralMarketsList?', //首页推荐市场
    ShopAreaList: '/webapi/User/GetShopAreaList', //所有区域
    markettype: '/webapi/User/MarketChoiceN_CaichanginfoList?', //选择区域的市场
    shopPage: '/webapi/User/GetShopInfo', //商家页面信息
    shopFirstCategory: '/webapi/User/GetShopZhongleiListByUserID', //商家一级分类
    collection: '/webapi/User/AddCollection', //收藏
    discollection: '/webapi/User/DeleteCollection', //取消收藏
    addToShopCar: '/webapi/User/AddShoppingCart', //添加进购物车
    buy: '/webapi/User/PayGoodsInfo', //立即购买
    shopCar: '/webapi/User/ShoppingCartList', //购物车
    shopCar: '/webapi/User/ShoppingCartList', //购物车
    changeShopCar: '/webapi/User/ChangeShoppingCartCount', //修改购物车
    deleteGoods: '/webapi/User/ShoppingCarDelete', //删除购物车商品
    remarks: '/webapi/User/ShoppingCartRemark', //购物车备注

    getDeliveryTimeList:'/webapi/User/GetDeliveryTimeList',//送达时间
    getCouponList:'/webapi/User/GetCouponList',//选择优惠券
    getProductsList:'/webapi/User/GetProductsList',//商品信息
    payOrder:'/webapi/User/PayOrder',//订单结算
    market: '/webapi/user/GetReferralMarketsList?', //首页推荐市场
    ShopAreaList: '/webapi/User/GetShopAreaList', //所有区域
    markettype: '/webapi/User/MarketChoiceN_CaichanginfoList?', //选择区域的市场
    SearchWord: '/webapi/User/GetSearchWordList', //搜索热门商品
    getGoodsList:'/webapi/user/GetGoodsList', //?pageindex=1&scid=219&name=生菜
    getShopList:'/webapi/user/GetShopList',// ?pageindex=1&scid=219&name=商家名称
    getSearchCaichangList:'/webapi/user/GetSearchCaichangList', //市场搜索
    FoodsList: '/webapi/User/GetFoodsList', //食谱列表
    login: '/webapi/user/ClientLogin', //登录接口
    sentCode: '/webapi/user/SendPhoneCode', //发送验证码
    codeLogin: '/webapi/user/ClientLoginCode', //验证码登录
    register: '/webapi/User/ClientRegister', //用户注册
    findPswd: '/webapi/user/ClientForgetLoginPwd', //找回登录密码
    myCoupon: '/webapi/User/GetMyCouponList', //我的优惠券
    memberCenter: '/webapi/user/MemberCenter', //会员中心首页
    collectionList: '/webapi/user/GetCollectionList', //我的收藏
    deleteCollection: '/webapi/User/DeleteCollection', //取消收藏
    helpcenter: '/wx/help/helpcenter?PID=2', //规则中心
    loginPwd: '/webapi/user/ClientUpdateLoginPwd', //修改登录密码
    clientSetTradePwd: '/webapi/user/ClientSetTradePwd', //支付密码设置
    clientUpdateTradePwd: '/webapi/user/ClientUpdateTradePwd', //修改支付密码
    getAddressList: '/webapi/User/GetAddressList', //收货地址列表
    addressAdd: '/webapi/User/AddressAdd', //新增编辑地址
    getAddressListByID:'/webapi/User/GetAddressListByID',//收货地址详情
    shezhiAddress:'/webapi/User/ShezhiAddress',//默认地址
    detailsList:'/webapi/user/GetTransactionDetailsList',//交易明细
    clientUpdateBankCard:'/webapi/User/ClientUpdateBankCard',//绑定银行卡
    rechargeInfo:'/webapi/User/RechargeInfo',//充值
    getClientOrderList:'/webapi/User/GetClientOrderList',//我的订单
    getCientOrderDetails:'/webapi/User/GetCientOrderDetails',//订单详情
    deleteDingdan:'/webapi/User/DeleteDingdan',//取消订单
    updateUserLogo:'/webapi/user/UpdateUserLogo',//修改用户头像
  },

  apiGet: function(url, data, callback) {
    wx.request({
      url: this.config.host + url,
      data: data,
      method: 'GET',
      dataType: 'json',
      header: {
        'content-type': 'application/json;charset=UTF-8'
      },
      success: function(res) {
        callback(res)
      },
      fail: function(res) {},
      complete: function(res) {}
    })
  },
  apiPost: function(url, data, callback) {
    wx.request({
      url: this.config.host + url,
      data: data,
      method: 'POST',
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      success: function(res) {
        callback(res)
      },
      fail: function(res) {},
      complete: function(res) {}
    })
  },
  getUserInfo: function(cb) {
    var that = this;
    var userInfo = wx.getStorageSync('userInfo');
    this.globalData.userInfo = userInfo;
    var token = wx.getStorageSync(this.config.key + '_token');
    var openid_id = wx.getStorageSync(this.config.key + '_openid');
    if (userInfo && token && openid_id) {
      typeof cb == "function" && cb(that.globalData.url)
    } else {
      //调用登录接口
      wx.login({
        fail: function(fail_res) {
          wx.showModal({
            content: "您点击了拒绝授权，将无法正常使用,请稍后再试!",
            showCancel: false
          })
          return false;
        },
        success: function(res1) {
          wx.getUserInfo({
            fail: function(res1) {
              wx.showModal({
                content: "授权失败，请稍后再试!",
                showCancel: false
              })
            },
            success: function(res) {
              that.globalData.userInfo = res.userInfo;
              wx.setStorageSync('userInfo', res.userInfo)
              wx.request({
                url: 'https://shixiaozhang.cn/api/wxapp/public/login',
                data: {
                  appId: 'wxf467c960d64888c2',
                  appSecret: '4a147e3f4276ef356e17cf0d66d7f591',
                  code: res1.code,
                  iv: res.iv,
                  encrypted_data: res.encryptedData,
                  iv: res.iv,
                  raw_data: res.rawData,
                  signature: res.signature
                },
                success: function(res2) {
                  if (res2.data.code == 1) {
                    wx.setStorageSync(that.config.key + '_token', res2.data.data.token)
                    wx.setStorageSync(that.config.key + '_openid', res2.data.data.openid)
                    typeof cb == "function" && cb(that.globalData.url)
                  }

                  // that.globalData.token = res2.data.data.token

                }
              })
            }
          })
        }
      });
    }
  },
  globalData: {
    url: "",
    userInfo: "",
    text: "",
    appid: "11",
    user_id: "1",
    storageCategoy: []
  }
})