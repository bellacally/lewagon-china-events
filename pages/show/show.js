// pages/show/show.js
// var util = require('../../utils/util.js');

const app = getApp();
Page({

  userInfoHandler(data) {
    wx.BaaS.handleUserInfo(data).then(res => {
      const page = this;
      let eventId = app.globalData.eventId;
      let userId = data.detail.userInfo.id;
      let EventsTable = new wx.BaaS.TableObject('events');
      let event = EventsTable.getWithoutData(eventId)
      event.set('attend_by', `${userId}`)
      event.update().then(res => {
        // success
        console.log("res", res)
      }, err => {
        // err
      })
    }, res => {
      
    })
  },

  // attendTap: function (e) {

  //   let eventId = app.globalData.eventId;
  //   console.log("aaaaaa", eventId)
  //   this.userInfoHandler();

  // },

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  // loadEventData: function (city) {
  //   const page = this;
  //   // var city = 'Chengdu'
  //   console.log(city)
  //   const EventsTable = new wx.BaaS.TableObject('events');
  //   let query = new wx.BaaS.Query();
  //   query.contains('city', 'city');
  //   EventsTable.setQuery(query).find().then(res => {
  //     console.log("hahahah");
  //     console.log(res);
  //     page.setData({
  //       result: res.data.objects,
  //       date: res.header.date.strftime("%Y-%m-%d")
  //     })
  //   },

  // get user info


  onLoad: function (e) {
    let eventId = app.globalData.eventId;
    // let date = util.formatTime(comms[c].ctime)
    console.log("555", eventId);
    const page = this;
    let EventsTable = new wx.BaaS.TableObject('events');
    EventsTable.get(eventId).then(res => {
      console.log(res);
      res.data.date = res.data.date.substr(0, 10);
      page.setData({
        result: res.data,
        // date: res.data.date.strftime("%Y-%m-%d")
      })
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
    console.log('share');
    wx.showShareMenu({
      withShareTicket: true
    })
  },
})