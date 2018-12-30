// pages/landing/landing.js
let app = getApp();
Page({
  // // onTap: function (event) {
  // //       wx.redirectTo({
  // //           url:"../index/index"
  // //       })
  // },

  /**
   * Page initial data
   */
  data: {
   hidden: false,
   show: true,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.getUserData();
  
  },

  // startAnswer: function () {
  //   {
  //     page.data.result.forEach((event) => {
  //       if (page.data.result[0].attend_by && event.date < page.data.todayDate) {
  //         app.globalData.eventId = event.id
  //         page.setData({
  //           hidden: true,
  //           show: false,
  //         })

  //         wx.navigateTo({
  //           url: '../feedback/feedback',
  //         })
  //       }
  //     })
  //   }
  // },


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
            todayDate: todayDate,
          });
        })
      })
      setTimeout(function () {
        page.data.result.forEach((event) => {
          if (page.data.result[0].attend_by && event.date < page.data.todayDate){
            app.globalData.eventId = event.id
            // id = wx.getStorageSync(id)
            page.setData({
              hidden: true,
              show: false,
            });
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


  clicktoIndex: function (e) {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  clicktoFeedback: function (e) {
    wx.redirectTo({
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

