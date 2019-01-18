const WeValidator = require('../../utils/we-validator');
const app = getApp();
Page({
  data: {
    items: [
      { name: '1', value: '1' },
      { name: '2', value: '2', checked: 'true' },
      { name: '3', value: '3' },
      { name: '4', value: '4' },
      { name: '5', value: '5' },
    ],
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
    feedbackForm: true,
    feedbackMessage: false,
    
    text: {
      en: {
        reg: '* How did you register for the event?',
        like: '* In general, how did you like the event?',
        rec: 'How likely will you recommend our event?(1 is the least likely and 5 is the most likely)',
        content:'Content',
        speaker: 'Speaker',
        location: 'Location',
        improve:'How do you think the event can be improved?'
      },
      zh: {
        reg: '您是如何听说我们的活动呢？',
        like: '总体来说您觉得我们的活动如何?',
        rec:'您会愿意向其他人推荐我们的活动吗？',
        content:'活动内容',
        speaker:'演讲嘉宾',
        location:'活动地点',
        improve:'您觉得本次活动有哪些可以改善的地方呢?',
      }
    }
  },

  bindPickerChange: function (e) {
    let page = this
    console.log(page.data.array[e.detail.value])
    this.setData({
      channel_index: parseInt(e.detail.value),
      // channel_index: a
    });
  },
  radioChange:function(e){
    const recommend = e.detail.value;
    console.log(recommend)
    var items = this.data.items
    console.log(items[recommend -1])
    items[recommend -1]['checked'] = true
    console.log(items[recommend -1])
    this.setData({
      items: items
    })
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
 
  showModal() {
    wx.showModal({
      content: "please fill out all the * fields",
      showCancel: false,
      showConfirm:confirm
    })
  },

  formSubmit: function(e){ 
   console.log(e.detail.value)
    let that = this;
    that.setData({
      channels: e.detail.value.channels,
      recommend: e.detail.value.recommend,
      areas_to_improve: e.detail.value.areas_to_improve
    })
    let Feedback = new wx.BaaS.TableObject('feedbacks');
    let eventId = that.data.event_id;
    console.log(that.data)
    let feedback = Feedback.create()
    feedback.set({
      'channels': that.data.array[that.data.channel_index],
      'recommend': parseInt(e.detail.value.recommend),
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
      console.log(err)
      that.showModal()
      return false
    })
  },

  checkSubmitStatus: function () {
    let page = this
    return new Promise(function (resolve, reject) {
      
      let tableID = 33633
       // feedback table
      let eventID = page.data.event_id
      let userID = page.data.userId
      let query = new wx.BaaS.Query()
      let FeedbacksTable = new wx.BaaS.TableObject(tableID);
      query.compare('event_id', '=', eventID)
      query.compare('created_by', '=', userID)

      FeedbacksTable.setQuery(query).find().then(res => {
        console.log(res.data.objects)
        console.log('yess',res.data.objects.length)
        if (res.data.objects.length == 0 || res.data.objects === undefined)
        {
        // THIS USER NEVER SUBMITTED A FEEDBACK FOR THIS EVENT, RETURN FALSE
         resolve(true)
        }
        else {
        // THIS USER HAS ALREADY SUBMITTED A FEEDBACK, RETURN TRUE
          resolve(false)
        }      

      }, err => {

        // err
      })
    })
  },

  clickToIndex: function(){
    wx.redirectTo({
      url: '../index/index',
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let page = this
    var lan = app.globalData.language
    var text = this.data.text[lan]
    console.log(lan, text)
    // var check_userinfo = wx.getStorage('userInfo')
    // console.log(check_userinfo);
    // console.log(wx.getStorageSync('texts').length)
    console.log(options)
    this.setData({
      userId: wx.getStorageSync('userId'),
      text: text
    })
    wx.BaaS = requirePlugin('sdkPlugin')
    wx.BaaS.wxExtend(wx.login);
    wx.BaaS.login(false).then(res => {
      page.setData({
        userId: res.id
      })
    }, err => {
      // err
    })

    

    console.log(options.event_id)

    if (options.event_id) {
      
      page.setData({
        event_id: options.event_id,
      })
      let tableID = 60055
      let recordID = page.data.event_id
      // console.log('tryyyy', recordID)
      let query = new wx.BaaS.Query()      
      let EventsTable = new wx.BaaS.TableObject(tableID);
      query.compare('id', '=', recordID)

      EventsTable.setQuery(query).find().then(res => {
        // success
        console.log("resyyyyyy", res)
        let event = res.data.objects[0]

        page.setData({
          event_image: event.image,
          event_name: event.name
        })

      }, err => {
        // err
      })

    };

    // CHECK IF USER ALREADY SENT A FEEDBACK, 
    // IF YES, HIDE THE FORM AND DISPLAY A THANK YOU NOTE
    // page.checkSubmitStatus().then(function (value) {
    //   console.log(value);    // => 'Async Hello world'
    //   if (value) {
    //     page.setData({
    //       feedbackForm: true,
    //       feedbackMessage: false,
    //     })
    //   }
    //   else {
    //     page.setData({
    //       feedbackForm: false,
    //       feedbackMessage: true,
    //     })
    //   }

    // }).catch(function (error) {
    //   console.log(error);
      
    // });

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