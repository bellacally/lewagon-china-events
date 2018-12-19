
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
      }
    ],
    city: ""
  },

 

  loadEventData: function (city) {
    const page = this;
    // var city = 'Chengdu'
    console.log(city)
    const EventsTable = new wx.BaaS.TableObject('events');
    let query = new wx.BaaS.Query();
    query.contains('city', 'city');
    EventsTable.setQuery(query).find().then(res => {
      console.log("hahahah");
      console.log(res);
      page.setData({
        result: res.data.objects,
        date: res.header.date.strftime("%Y-%m-%d")
      });
    });
    // console.log(page.data.date);
  },

  onLoad(e) {
    this.loadEventData();
    // getLocation: function () {
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
      "深圳市": "Shenzhen"
    }
    myAmapFun.getRegeo({
      success: function (data) {
        // app.globalData.city = data[0].regeocodeData.addressComponent.province;
        var city = data[0].regeocodeData.addressComponent.province
        console.log(cities[city])
        var arr = []
        that.data.selectArray.forEach((x) => {
          console.log(cities[city]);
          if (x.text != cities[city]) {
            arr.push(x)
          }
        })
        that.setData({
          city: cities[city],
          selectArray: arr
        })
        //成功回调
        const EventsTable = new wx.BaaS.TableObject('events');
        let query = new wx.BaaS.Query();
        query.contains('city', cities[city]);
        EventsTable.setQuery(query).find().then(res => {
          console.log(res);
          that.setData({
            result: res.data.objects
          });
        });
      },
      fail: function (info) {
        //失败回调
        console.log(info)
      }
    })
  },
  
  // myEventListener: function (e) {
  //   console.log("Event in index")
  // },

  // get user info
  userInfoHandler(data) {
    wx.BaaS.handleUserInfo(data).then(res => {
    }, res => {
    })
  },

  onShareAppMessage: function () {
    console.log('share');
    wx.showShareMenu({
      withShareTicket: true
    })
  },

})




