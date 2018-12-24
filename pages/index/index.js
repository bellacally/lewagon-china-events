const app = getApp();
var time = require('../../utils/util.js');
// map
var amapFile = require('../../libs/amap-wx.js');
Page({
  data: {
    selectArray: [{
      "id": "10",
      "text": "Shanghai"
    }, 
    {
      "id": "20",
      "text": "Chengdu"
    },
    {
      "id": "30",
      "text": "Shenzhen"
      },
      {
        "id": "40",
        "text": "Hangzhou"
      }
    ],
    city: "Shanghai"
  },

  onLoad(options) {
    console.log(options)
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
      }
    })
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: 'e9ae38eabebabeffed311424ddbbf395' });
    var cities = {
      "成都市": "Chengdu",
      "上海市": "Shanghai",
      "深圳市": "Shenzhen",
      "杭州市": "Hangzhou"
    }
    myAmapFun.getRegeo({
      success: function (data) {
        var city = data[0].regeocodeData.addressComponent.city
        app.globalData.city = cities[city];
        that.setData({
          avatar: app.globalData.avatar,
        })
        var arr = []
        that.data.selectArray.forEach((x) => {
          if (x.text != cities[city]) {
            arr.push(x)
          }
        })
        that.setData({
          city: cities[city],
          selectArray: arr
        })
        const EventsTable = new wx.BaaS.TableObject('events');
        let query = new wx.BaaS.Query();
        if (options.city) {
          that.setData({
            result: app.globalData.results
          });
        } else {
          query.contains('city', 'Shanghai');
          EventsTable.setQuery(query).find().then(res => {
            console.log(res);

            res.data.objects.forEach((object) => {
              object.date = object.date.substr(0, 10);
            })
            app.globalData.results = res.data.objects
            that.setData({
              result: res.data.objects
            });
            console.log(app.globalData.results)
          });
        }
      },
      fail: function (info) {
        console.log(info)
      }
    })
  },


  onShareAppMessage: function () {
    console.log('share');
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  // need some revision
  clickToShow: function(e){
    console.log("aaaaaa",e)
  var id = e.currentTarget.dataset.index;
  // app.globalData.eventId = eventId;
    wx.navigateTo({
      url: `/pages/show/show?id=${id}`
    })
  }
})




