// pages/landing/landing.js
let app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.getUserInfo();
    if (app.globalData.deletedattendedEvents) {
      this.setData({
        deletedattendedEvents: app.globalData.deletedattendedEvents
      })
    }
  },

  getUserInfo:function(){
    let page = this;
    if (page.data.deletedattendedEvents) {
      page.setData({
        attendedEvents: page.data.deletedattendedEvents
      })
    } else {
      wx.BaaS.login().then(res => {
        // success
        let userId = res.id;
        let page = this;
        let EventsTable = new wx.BaaS.TableObject('events');
        let query = new wx.BaaS.Query();
        query.contains('attend_by', `${userId}`)
        EventsTable.setQuery(query).orderBy(['date']).find().then(res => {
          app.globalData.attendedEvents = res.data.objects
          page.setData({
            attendedEvents: res.data.objects
          })
        })
      }, err => {
        url: '../index/index'
      })
    }
    if (page.data.attendedEvents.length === 0) {
      page.setData({
        show: true,
        hidden: false
      })
    } else {
      page.setData({
        show: false,
        hidden: true
      })
    }
  },


  clicktoIndex: function (e) {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  clicktoFeedback: function (e) {
    wx.redirectTo({
      url: `../feedback/feedback?event_id=${this.data.attendedEvents[0].id}`,
    })
    // this.data.attendedEvents.forEach((event) => {
    //   console.log(1111, event)
    //   wx.redirectTo({
    //     url: `../feedback/feedback?event_id=${event.id}`,
    //   })
    //   delete(event)
    // })
    // wx.redirectTo({
    //   url: `../feedback/feedback?event_id=${}`,
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

