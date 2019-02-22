
// var util = require('../../utils/util.js');
var amapFile = require('../../libs/amap-wx.js');
const app = getApp();
Page({
  /**
   * Page initial data
   */
  data: { 
  },

  onChange(event) {
    console.log(event.detail, 'click right menu callback data')
  },

  onPageScroll(event) {
    this.setData({
      scrollTop: event.scrollTop
    })
  }, 

  showAll: function (e) {
    this.setData({
      isFold: !this.data.isFold,
    })
  },

  onLoad: function (e) {
    console.log(111111, e)
    let page = this

    page.setData({
      event_id: e.event_id,
      userId: wx.getStorageSync('userId')
    })
    var attended;
    let tableID = 60055
    let recordID = page.data.event_id
    let query = new wx.BaaS.Query()
    let EventsTable = new wx.BaaS.TableObject(tableID);
    query.compare('id', '=', recordID)
    let SignupsTable = new wx.BaaS.TableObject(61887);
    let signups_query = new wx.BaaS.Query();
    signups_query.compare('user_id', '=', page.data.userId);

    EventsTable.setQuery(query).find().then(res => {
      // success
      console.log("res", res.data.objects[0])
      let event = res.data.objects[0]
      // event_date=new Date(event.date).toString().toUpperCase().substr(3, 8);
      // event.month = new Date(event.date).toString().toUpperCase().substr(1, 3);
      let date = new Date(event.date).toString().substr(4, 12); 
      let event_date = new Date(event.date).toString().toUpperCase().substr(4, 7);
      page.setData({
        event_image: event.image,
        event_name: event.name,
        event_date: event_date,
        date: date,
        event_address: event.address,
        event_description: event.description,
        event_city: event.city,
        start_time: event.start_time,
        end_time: event.end_time
      })
      
    }, err => {
      // err
    })
    SignupsTable.setQuery(signups_query).find().then(res => {
      console.log("signups", res.data.objects[0])
      let signups = res.data.objects.map((s) => {
        return s.event_id.id
      })
      attended = signups.includes(recordID);
      console.log(recordID)
      page.setData({
        attended: attended,
        // avatar: page.data.userAvatar
      })
      console.log(signups)
    }, err => {
      // err
    })
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: 'e9ae38eabebabeffed311424ddbbf395' });
    
    // GET USER LOCATION

    // myAmapFun.getRegeo({
    //   success: function (data) {
    //     var mks = []
    //       mks.push({ // 获取返回结果，放到mks数组中
    //         latitude: data[0].latitude,
    //         longitude: data[0].longitude,
    //         iconPath: 'https://cloud-minapp-13908.cloud.ifanrusercontent.com/1gZ6CjPj5mLjjf41.png',
    //         width: 20,
    //         height: 20
    //       })
    //     that.setData({
    //       latitude: data[0].latitude,
    //       longitude: data[0].longitude,
    //       markers: mks
    //     })
    //     //成功回调
    //   },
    //   fail: function (info) {
    //     //失败回调
    //     console.log(info)
    //   }
    // })

  },

  signup() {
    const page = this;
      let eventId = page.data.event_id;
      console.log(eventId)
      let userId = page.data.userId;
      console.log(userId)
      let city = page.data.event_city;

      let tableId = 61887;
      let Signups = new wx.BaaS.TableObject(tableId);
      let rsvp = Signups.create();
      console.log(rsvp)
      rsvp.set({
        'event_id': eventId,
        'user_id': `${userId}`,
      }).save().then(res => {
        // success
        console.log(res)
        app.getSignUps(userId)
        wx.showToast({
          title: 'Booked!',
          icon: 'success',
          duration: 2000,
          success: function () {
            setTimeout(function () {
              wx.reLaunch({
                url: `/pages/index/index?city=${city}&follow=true`,
              })
            }, 1000);
          }
        })
      }, err => {
        // HError 对象
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
    // SET UP THE SHARING BOX
    return {
      title: 'Le Wagon: Start your journey in tech!',
      path: 'pages/show/show',
      imageUrl: 'https://cloud-minapp-13908.cloud.ifanrusercontent.com/1gYqyahkSIPJy9b1.jpg'
    }
    wx.showShareMenu({
      withShareTicket: true
    })
  },
})