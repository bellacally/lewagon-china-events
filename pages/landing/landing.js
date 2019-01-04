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
  },

  getUserInfo:function(){
    let page = this;
    wx.BaaS.login().then(res => {
      // success
      let userId = res.id;
      let page = this;
      let EventsTable = new wx.BaaS.TableObject('events');
      let query = new wx.BaaS.Query();
      query.contains('attend_by', `${userId}`)
      EventsTable.setQuery(query).orderBy(['date']).find().then(res => {
        if (res.data.objects.length === 0) {
          page.setData({
            show: true,
            hidden: false
          })
        } else {
          page.setData({
            show: false,
            hidden: true,
            attendedEvents: res.data.objects
          })
        }
      })
    }, err => {
      url: '../index/index'
    })
  },


  clicktoIndex: function (e) {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  clicktoFeedback: function (e) {
    let page = this;
    page.data.attendedEvents.forEach((event) => {
      let event_index = page.data.attendedEvents.indexOf(event); 
      for (let i = 0; i < page.data.attendedEvents.length; i++) {
        if (event_index == i) {
          page.setData({
            event_id: page.data.attendedEvents[i].id
          })
          page.data.attendedEvents.splice(page.data.attendedEvents[i], 1);
          page.setData({
            attendedEvents: page.data.attendedEvents
          })
          console.log(1111, page.data.attendedEvents);
          if (page.data.attendedEvents.length === 0) {
            page.setData({
              show: true,
              hidden: false
            })
          } else {
            page.setData({
              show: false,
              hidden: true,
            })
          }
          wx.redirectTo({
            url: `../feedback/feedback?event_id=${page.data.event_id}`,
          })
          break;
        }
      }
    })
    // wx.redirectTo({
    //   url: `../feedback/feedback?event_id=${page.data.attendedEvents[0].id}`,
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

