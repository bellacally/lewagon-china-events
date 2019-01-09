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
                url: '/pages/index/index',
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
    console.log(options)
    wx.BaaS = requirePlugin('sdkPlugin')
    wx.BaaS.wxExtend(wx.login);
    wx.BaaS.login(false).then(res => {
      this.setData({
        userId: res.id
      })
    }, err => {
      // err
    })

    let page = this

    console.log(options.event_id)

    if (options.event_id) {
      
      page.setData({
        event_id: options.event_id,
      })

      let tableID = 60055
      let recordID = page.data.event_id
      let query = new wx.BaaS.Query()      
      let EventsTable = new wx.BaaS.TableObject(tableID);
      query.compare('id', '=', recordID)

      EventsTable.setQuery(query).find().then(res => {
        // success
        console.log("res", res.data.objects[0])
        let event = res.data.objects[0]

        page.setData({
          event_image: event.image,
          event_name: event.name
        })

      }, err => {
        // err
      })

      // EventsTable.get(recordID).then(res => {
      //   console.log("res", res)
      // }, err => {
      //   // err
      //   console.log("no results")
      // })

      page.setData({
        userId: wx.getStorageSync('userId'),
      })

    }
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