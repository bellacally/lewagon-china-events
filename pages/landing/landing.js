// pages/landing/landing.js
let app = getApp();
Page({
  onTap: function (event) {
        wx.redirectTo({
            url:"../index/index"
        })
  },

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    // get user_id from local storage if it exists
    // let userInfo = wx.getStorageSync("userInfo")
    this.getUserData();
    this.getEventData();

  },

  getUserData:function(){
    let page = this;
    wx.BaaS.login().then(res => {
      // success
      let userId = res.id;
      let page = this;
      let EventsTable = new wx.BaaS.TableObject('events');
      let query = new wx.BaaS.Query();
      query.contains('attend_by', `${userId}`)
      EventsTable.setQuery(query).find().then(res => {
        res.data.objects.forEach((event) => {
          let time = new Date().getTime();
          let date = new Date(time);
          let todayDate = date.toString();
          event.date = new Date(event.date).toString();
          page.setData({
            result: res.data.objects,
            // date: res.header.date.strftime("%Y-%m-%d")
            todayDate: todayDate,
          });
        })
      })
      setTimeout(function () {
        page.data.result.forEach((event) => {
          if (event.date > page.data.todayDate){
            app.globalData.eventId = event.id
            wx.navigateTo({
              url: '../feedback/feedback',
            })
          }
        })
      }, 500)
    }, err => {
      url: '../index/index'
    })
  },

  getEventData: function(){
    
  },

  clicktoIndex: function (e) {
    wx.navigateTo({
      url: '../index/index',
    })
  },
  clicktoFeedback: function (e) {
    wx.navigateTo({
      url: '../feedback/feedback',
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

