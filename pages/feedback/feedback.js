const app = getApp();
Page({
  data: {
    starIndex1: 0,
    starIndex2: 0,
    starIndex3: 0,

    array: ['Meetup.com', 'Huodongxing', 'EventBrite', 'WeChat', 'WeWork', 'Others'],
    objectArray: [
      {
        id: 0,
        name: 'meetup.com'
      },
      {
        id: 1,
        name: 'huodongxing'
      },
      {
        id: 2,
        name: 'EventBrite'
      },
      {
        id: 3,
        name: 'WeChat'
      },
       {
        id: 4,
        name: 'WeWork'
      },
       {
        id: 5,
        name: 'Others'
      }
    ],
  },

  bindPickerChange: function (e) {
    console.log(e);
    this.setData({
      channel_index: e.detail.value
    });
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
      wx.showToast({
          title: 'Booked successfully',
          icon: 'success',
          duration: 1000,
          success: function () {
            setTimeout(function () {
              wx.navigateTo({
                url: '/pages/index/index',
              })
            }, 1000);
          }

        })
    }, err => {
      "opps, the submission did go through. please resubmit"
    })
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