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
    city: "",
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

      let results = res.data.objects
      let upcomingEvents = [];

      results.forEach((object) => {
        let todaymillisecs = new Date().getTime();
        let eventmillisecs = new Date(object.date).getTime();
        if (eventmillisecs > todaymillisecs) {
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

      // LOADING ALL SIGNUPS OF THE CURRENT USER
      const SignupsTable = new wx.BaaS.TableObject('signups');
      let query = new wx.BaaS.Query();

      console.log(that.data.userId)

      query.compare('created_by', '=', that.data.userId)

      SignupsTable.setQuery(query).find().then(res => {
        // success
        console.log(res.data.objects)

        let participatedEvents = [];
        
        res.data.objects.forEach((e) => {
          console.log(e);
          let event_id = e.event_id.id
          participatedEvents.push(event_id);
        });

        that.setData({
            participatedEvents: participatedEvents
        });
        console.log(participatedEvents)

        app.globalData.participatedEvents = participatedEvents
        
      }, err => {
        // err
      })      

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
    // app.globalData.eventId = eventId;
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
