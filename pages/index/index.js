const app = getApp();
var time = require('../../utils/util.js');
// map
var amapFile = require('../../libs/amap-wx.js');
Page({
  data: {
    selectArray: [{
      "id": "10",
      "text": "Shanghai",
    },
    {
      "id": "20",
      "text": "Chengdu"
    },
    {
      "id": "30",
      "text": "Shenzhen"
    }
    ],
    city: "",
    avatar: wx.getStorageSync('avatar')
  },

  onLoad(options) {
    var that = this;
    // console.log(options)
    var userId = wx.getStorageSync('userId')
    const EventsTable = new wx.BaaS.TableObject('events');
    let query = new wx.BaaS.Query();
    let city = options.city || 'Shanghai'
    // console.log(city);
    query.contains('city', city);
    EventsTable.setQuery(query).orderBy(['date']).find().then(res => {
      let results = res.data.objects
      let upcomingEvents = [];
      results.forEach((object) => {
        // object.date = object.date.substr(0, 10);
        let todaymillisecs = new Date().getTime();
        // let date = new Date(time);
        // let todayDate = date.toString();
        // let eventDate = new Date(object.date).toString();
        let eventmillisecs = new Date(object.date).getTime();
        if (eventmillisecs > todaymillisecs) {
          upcomingEvents.push(object);
        };
        upcomingEvents.forEach((upcomingEvent) => {
          upcomingEvent.date = new Date(upcomingEvent.date).toString().substr(0, 16);
        })
        app.globalData.upcomingEvents = upcomingEvents
        // console.log(3333333, upcomingEvents)
        // that.setData({
        //   upcomingEvents: upcomingEvents,
        // }); 
        // object.date = new Date(object.date).toString().substr(0, 10);
        // console.log(444444, upcomingEvents)
      })
   
      that.setData({
        // avatar: app.globalData.avatar,
        userId: wx.getStorageSync('userId'),
        nowText: city,
        upcomingEvents: upcomingEvents,
      });
    });


    var myAmapFun = new amapFile.AMapWX({ key: 'e9ae38eabebabeffed311424ddbbf395' });
    var cities = {
      "成都市": "Chengdu",
      "上海市": "Shanghai",
      "深圳市": "Shenzhen",
      "杭州市": "Hangzhou"
    }
  },
  onShareAppMessage: function () {
    // console.log('share');
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  
  clickToShow: function (e) {
    var id = e.currentTarget.dataset.index;
    // app.globalData.eventId = eventId;
    wx.navigateTo({
      url: `/pages/show/show?id=${id}`
    })
  }
})
