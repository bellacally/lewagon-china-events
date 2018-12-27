App({
  onLaunch: function () {
    // 展示本地存储能力
    wx.BaaS = requirePlugin('sdkPlugin')
    //让插件帮助完成登录、支付等功能
    wx.BaaS.wxExtend(wx.login,
      wx.getUserInfo,
      wx.requestPayment)
      wx.BaaS.init('d06840973e93da8277d9');
      wx.BaaS.login(false).then(res => {
        console.log(res)
        wx.setStorageSync('userId', res.id)
      }, err => {
        console.log(err.code)
    })
  },
  globalData: {
    city: ""
  }
  
})
