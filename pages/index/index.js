const app = getApp();
var time = require('../../utils/util.js');
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
    avatar: wx.getStorageSync('avatar')
  },

  onLoad(options) {

    // LOADING UPCOMING EVENTS INTO THE PAGE
    var that = this;
    const EventsTable = new wx.BaaS.TableObject('events');
    let query = new wx.BaaS.Query();
    let city = options.city || 'Shanghai'
    query.contains('city', city);

    EventsTable.setQuery(query).orderBy(['date']).find().then(res => {
      console.log(res.data)
      let results = res.data.objects
      let upcomingEvents = [];

      results.forEach((object) => {
        let now = new Date();
        let year = now.getFullYear()
        let month = now.getMonth()
        let day = now.getDate()
        let todaymillisecs = new Date(year, month, day).getTime();
        let eventmillisecs = new Date(object.date).getTime();
        if (eventmillisecs >= todaymillisecs) {
          upcomingEvents.push(object);
        };
        
        upcomingEvents.forEach((upcomingEvent) => {
          upcomingEvent.date = new Date(upcomingEvent.date).toString().toUpperCase().substr(3,8);
          
        })
        app.globalData.upcomingEvents = upcomingEvents
       
      })


      // SETTING EVENTS AND DATA IN LOCAL STORAGE
      that.setData({
        userId: wx.getStorageSync('userId'),
        SelectedCity: city,
        upcomingEvents: upcomingEvents,
      });      

    });

  },

  onShareAppMessage: function () {
    // SET UP THE SHARING BOX
    return {
      title: 'Le Wagon: Start your journey in tech!',
      path: 'pages/index/index',
      imageUrl: 'https://cloud-minapp-13908.cloud.ifanrusercontent.com/1gYqyahkSIPJy9b1.jpg'
    }
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  
  clickToShow: function (e) {
    var id = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: `/pages/show/show?event_id=${id}`
    })
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
})
