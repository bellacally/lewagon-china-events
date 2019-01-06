const WeValidator = require('../../utils/we-validator');
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
    let page = this
    console.log(page.data.array[e.detail.value])
    this.setData({
      channel_index: e.detail.value,
      // channel_index: a
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

  showModal() {
    wx.showModal({
      content: "please fill out all the * fields",
      showCancel: false,
      showConfirm:confirm
    })
  },
  formSubmit: function(e){ 
    if (this.oValidator) return
    let that = this;
    that.setData({
      channels: e.detail.value.channels,
      recommend: e.detail.value.recommend,
      areas_to_improve: e.detail.value.areas_to_improve
    })
    let Feedback = new wx.BaaS.TableObject('feedbacks');
    let eventId = that.data.event_id;
    // let userId = data.detail.userInfo.id;
    let userId = wx.getStorageSync('userId')
    let EventsTable = new wx.BaaS.TableObject('events');
    let event = EventsTable.getWithoutData(eventId)
    event.set('attend_status', 'false')
    event.update().then(res => {
      // success
      // console.log("res2", res)
      
    }, err => {
      // err
      console.log(err)
    })
    
    let feedback = Feedback.create()
    feedback.set({
      'channels': that.data.array[that.data.channel_index],
      'recommend': that.data.recommend,
      'created_by': that.data.userId,
      'speaker_rating': that.data.starIndex1,
      'location_rating': that.data.starIndex2,
      'content_rating': that.data.starIndex3,
      'areas_to_improve': that.data.areas_to_improve,
      'event_id': `${that.data.event_id}`
    }).save().then(res => {
      wx.showToast({
          title: 'Submitted',
          icon: 'success',
          duration: 1000,
          success: function () { 
            setTimeout(function () {
              wx.navigateTo({
                url: '/pages/landing/landing',
              })
            }, 1000);
          }

        })
    }, err => {
      that.showModal()
      return false
    })
  },
  initValidator() {
    // 实例化
    this.oValidator = new WeValidator({
      rules: {
        channels: {
          required: true,
        },
        content_rating: {
          required: true,
        },
        speaker_rating: {
          required: true,
        },
        location_rating: {
          required: true,
        }
      },
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let page = this
    if (options.event_id) {
      this.setData({
        event_id: options.event_id,
        event_name: app.globalData.event_name,
        event_image: app.globalData.event_image
      })
    }
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
    // wx.reLaunch({
    //   url: '../landing/landing'
    // })
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

  },

})