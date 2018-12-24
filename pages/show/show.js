
// var util = require('../../utils/util.js');
var amapFile = require('../../libs/amap-wx.js');
const app = getApp();
Page({
  userInfoHandler(data) {
    const page = this;
    wx.BaaS.handleUserInfo(data).then(res => {
      let eventId = page.data.result.id;
      app.globalData.avatar = res.avatarUrl;      
      let userId = data.detail.userInfo.id;
      let EventsTable = new wx.BaaS.TableObject('events');
      let event = EventsTable.getWithoutData(eventId)
      event.set('attend_by', `${userId}`)
      event.update().then(res => {
        // success
        console.log("res2", res)
        wx.showToast({
          title: 'Booked successfully',
          icon: 'success',
          duration: 2000,
          success: function () {
            setTimeout(function () {
              wx.navigateTo({
                url: '/pages/index/index',
              })
            }, 1000);
          }

        })
        console.log("res", res)
      }, err => {
        // err
        console.log(err)
      })
    }, res => {
      
    })
  },


  /**
   * Page initial data
   */
  data: {
  //  showExpand: false
    expand: true, 
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
 
  

  expand: function (e) {
    var value = !this.data.expand;
    this.setData({
      expand: value
    })
  },

  onLoad: function (e) {
    let eventId = app.globalData.eventId;
    // let date = util.formatTime(comms[c].ctime)
    let id = Number(e.id)
    console.log(app.globalData.results[id])
    this.setData({
      result: app.globalData.results[id] 
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