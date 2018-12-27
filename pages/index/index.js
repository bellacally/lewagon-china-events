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
    console.log(options)
    var userId = wx.getStorageSync('userId')
    const EventsTable = new wx.BaaS.TableObject('events');
    let query = new wx.BaaS.Query();
    if (options.city) {
      console.log('has city')
      var results = app.globalData.results
      results.forEach((item) => {
        if (item.attendees.includes(userId)) {
          console.log('in array')
          item.attend = true
        }
      })
      console.log(results)
      that.setData({
        result: results,
        avatar: wx.getStorageSync('avatar')
      });
    } else {
      query.contains('city', 'Shanghai');
      EventsTable.setQuery(query).find().then(res => {
        console.log(res.data.objects);
        res.data.objects.forEach((object) => {
          object.date = object.date.substr(0, 10); 
          if (object.attendees.includes(userId)) {
            console.log('in array shanghai')
            object.attend = true
          }
        })
        app.globalData.results = res.data.objects
        that.setData({
          result: res.data.objects,
          avatar: wx.getStorageSync('avatar')
        });
        console.log(app.globalData.results)
      });
    }
    // wx.getLocation({
    //   type: 'wgs84',
    //   success(res) {
    //     const latitude = res.latitude
    //     const longitude = res.longitude
    //     const speed = res.speed
    //     const accuracy = res.accuracy
    //   }
    // })
    
    var myAmapFun = new amapFile.AMapWX({ key: 'e9ae38eabebabeffed311424ddbbf395' });
    var cities = {
      "成都市": "Chengdu",
      "上海市": "Shanghai",
      "深圳市": "Shenzhen",
      "杭州市": "Hangzhou"
    }
    var cities_location = {
      "Shanghai": {
        longtitude: 121.47,
        latitude: 31.23
      },
      "Shenzhen":{
        longtitude: 114.06667, 
        latitude: 22.62
    },
       "Chengdu": {
         longtitude: 104.06667,
         latitude:  30.67
      }
    }
    // myAmapFun.getRegeo({
    //   success: function (data) {
    //     var city = data[0].regeocodeData.addressComponent.city
    //     app.globalData.city = cities[city];
    //     that.setData({
    //       avatar: app.globalData.avatar,
    //      })
    //     var arr = []
    //     that.data.selectArray.forEach((x) => {
    //       if (x.text != cities[city]) {
    //         arr.push(x)
    //       }
    //     })
    //     that.setData({
    //       city: cities[city],
    //       selectArray: arr
    //     })
        
    //   },
    //   fail: function (info) {
    //     console.log(info)
    //   }
    // })
  },
  onShareAppMessage: function () {
    console.log('share');
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  // need some revision
  clickToShow: function(e){
    // console.log("aaaaaa",e)
  var id = e.currentTarget.dataset.index;
  // app.globalData.eventId = eventId;
    wx.navigateTo({
      url: `/pages/show/show?id=${id}`
    })
  }
})




