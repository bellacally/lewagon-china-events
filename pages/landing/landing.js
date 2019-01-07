// pages/landing/landing.js
let app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {
    show: true,
    hidden: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let page = this;
    
    wx.getStorage({
      key: 'attendedEvents',
      success(res) {
        console.log("res", res)
        if (!res.data || res.data.length === 0) {
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
      }
    })
  },


  getUserInfo(data) {
    wx.BaaS.handleUserInfo(data).then(res => {
      let page = this;
      // page.setData({
      //   userId: res.id
      // })
      page.getevents();

    }, res => {
    })
  },

  getevents: function() {
    let page = this;
    let EventsTable = new wx.BaaS.TableObject('events');
    let query = new wx.BaaS.Query();
    query.contains('attend_status', 'true')
    EventsTable.setQuery(query).orderBy(['date']).find().then(res => {
      console.log("res", res)
      let results = res.data.objects
      let attendedEvents = [];
      results.forEach((object) => {
        let todaymillisecs = new Date().getTime();
        let eventmillisecs = new Date(object.date).getTime();
        if (eventmillisecs < todaymillisecs) {
          attendedEvents.push(object);
        };
    })
      app.globalData.attendedEvents = attendedEvents

      wx.setStorage({
        key: 'attendedEvents',
        data: attendedEvents
      })
      console.log('aaaaaaa', attendedEvents)
      // page.setData({
      //   attendedEvents: res.data.objects
      // })
    })
    // wx.redirectTo({
    //   url: '../index/index',
    // })
  },
 clickToIndex:function(){
   wx.redirectTo({
     url: '../index/index',
   })
 },
  clickToFeedback: function (e) {
    let page = this;
    wx.getStorage({
      key: 'attendedEvents',
      success(res) {
        console.log("res", res)
        res.data.forEach((event) => {
          let event_index = res.data.indexOf(event);
          // console.log("event_index", event_index)
          for (let i = 0; i < res.data.length; i++) {
            app.globalData.event_name = res.data[i].name
            app.globalData.event_image = res.data[i].image
            if (event_index == i) {
              // console.log("i", i)
              page.setData({
                event_id: res.data[i].id,
              })
              // delete res.data[i]
              res.data.splice(res.data[i], 1);
              // console.log(111, res.data)
              wx.setStorage({
                key: 'attendedEvents',
                data: res.data
                
              })
              wx.redirectTo({
                url: `../feedback/feedback?event_id=${page.data.event_id}`,
              })
              break;
            }
            break;
          }
        })
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

