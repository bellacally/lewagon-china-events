
// var util = require('../../utils/util.js');
var amapFile = require('../../libs/amap-wx.js');
const app = getApp();
Page({
  userInfoHandler(data) {
    const page = this;
    wx.BaaS.handleUserInfo(data).then(res => {
      let eventId = page.data.result.id;
      app.globalData.avatar = data.detail.userInfo.avatarUrl;
      let userId = data.detail.userInfo.id;
      let EventsTable = new wx.BaaS.TableObject('events');
      let event = EventsTable.getWithoutData(eventId)
      event.set('attend_by', `${userId}`)
      event.set('attend_status', 'true')
      event.set('avatar', `${res.avatarUrl}`)
      event.update().then(res => {
        // success
        wx.showToast({
          title: 'Booked',
          icon: 'success',
          duration: 2000,
          success: function () {
            setTimeout(function () {
              wx.reLaunch({
                url: `/pages/index/index?city=${res.data.city}`,
              })
            }, 1000);
          }

        })
        console.log("res", res)
      }, err => {
        // err
        console.log("already attend")
      })
    }, res => {  
    })
  },
  /**
   * Page initial data
   */
  data: {
    isFold:true,
    scrollTop: 0 
  },
  onChange(event) {
    console.log(event.detail, 'click right menu callback data')
  },
  onPageScroll(event) {
    this.setData({
      scrollTop: event.scrollTop
    })
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
 
  
  showAll: function (e) {
    this.setData({
      isFold: !this.data.isFold,
    })
  },

  onLoad: function (e) {
    let eventId = app.globalData.eventId;
    // let date = util.formatTime(comms[c].ctime)
    let id = Number(e.id)
    // console.log(app.globalData.upcoming[id])
    this.setData({
      result: app.globalData.upcomingEvents[id],
      date: app.globalData.upcomingEvents.date
    })
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: 'e9ae38eabebabeffed311424ddbbf395' });
    myAmapFun.getRegeo({
      success: function (data) {
        var mks = []
          mks.push({ // 获取返回结果，放到mks数组中
            latitude: data[0].latitude,
            longitude: data[0].longitude,
            iconPath: 'https://cloud-minapp-13908.cloud.ifanrusercontent.com/1gZ6CjPj5mLjjf41.png',
            width: 20,
            height: 20
          })
        that.setData({
          latitude: data[0].latitude,
          longitude: data[0].longitude,
          markers: mks
        })
        //成功回调
      },
      fail: function (info) {
        //失败回调
        console.log(info)
      }
    })

  },

  onPullDownRefresh: function () {
    wx.startPullDownRefresh()
    this.onLoad();
  },
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
    console.log('share');
    wx.showShareMenu({
      withShareTicket: true
    })
  },
})