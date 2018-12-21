const app = getApp();
Page({
  data: {
    starIndex1: 0,
    starIndex2: 0,
    starIndex3: 0,
  },

  onChange1(e) {
    const index = e.detail.index;
    this.setData({
      'starIndex1': index
    })
  },
  onChange2(e) {
    const index = e.detail.index;
    this.setData({
      'starIndex2': index,
    })
  },

  onChange3(e) {
    const index = e.detail.index;
    this.setData({
      'starIndex3': index
    })
  },

  sliderchange: function(e){
    recommend: e.detail.value
  },

  formSubmit: function(e){
    console.log(e)
    let that = this;
    that.setData({
      referer: e.detail.value.referer,
      recommend: e.detail.value.recommend,
      areas_to_improve: e.detail.value.areas_to_improve
    })
    let Feedback = new wx.BaaS.TableObject('feedbacks');
    let feedback = Feedback.create()
    feedback.set({
      'referer': that.data.referer,
      'recommend': that.data.recommend,
      'created_by': that.data.userId,
      'speaker_rating': that.data.starIndex1,
      'location_rating': that.data.starIndex2,
      'content_rating': that.data.starIndex3,
      'areas_to_improve': that.data.areas_to_improve,
      'event_id': `${app.globalData.eventId}`
    }).save().then(res => {
      // success
      console.log("res", res)
    }, err => {
      //err 为 HError 对象
    })
  },

feedbackSuccess: function(){
  wx.showModal({
    title: "Your feedback has successfully submitted!",
    content: "Thank for helping us providing a better learning experience for you and your peers!See you in our next event!"
  })
  // const page = this
  // wx.navigateTo({
  //   url: 'pages/index/index',
  // })
},



  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.BaaS = requirePlugin('sdkPlugin')
    //让插件帮助完成登录、支付等功能
    wx.BaaS.wxExtend(wx.login);
      wx.BaaS.login(false).then(res => {
       this.setData({
         userId: res.id
       })
  }, err => {
    // err
  })
    // wx.getUserInfo({
    //   success(res) {
    //     console.log("res", res)
        
    //     // const userInfo = res.userInfo
    //     // const nickName = userInfo.nickName
    //     // const avatarUrl = userInfo.avatarUrl
    //     // const gender = userInfo.gender // 性别 0：未知、1：男、2：女
    //     // const province = userInfo.province
    //     // const city = userInfo.city
    //     // const country = userInfo.country
    //   }
    // })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})