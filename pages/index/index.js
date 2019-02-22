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
    console.log(options)
    // LOADING UPCOMING EVENTS INTO THE PAGE
    var that = this;
    let follow = options.follow // 'true'
    const EventsTable = new wx.BaaS.TableObject('events');
    const SignupsTable = new wx.BaaS.TableObject('signups');
    let query = new wx.BaaS.Query();
    let city = options.city || 'Shanghai'
    let signups_query = new wx.BaaS.Query();
    var signups = []
    var upcomingEvents = [];
    query.contains('city', city);
    let user_id = wx.getStorageSync('userId')
    signups_query.compare('user_id', '=', user_id)
    EventsTable.setQuery(query).orderBy(['date']).find().then(res => {

      let results = res.data.objects
      // "results" contains the list of upcoming events

      SignupsTable.setQuery(signups_query).find().then(res => {

        signups = res.data.objects.map((s) => {
          return s.event_id.id
        })

        console.log(signups)
        // "signups" contains the list of future events this user has sign up for

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
            upcomingEvent.date = new Date(upcomingEvent.date).toString().toUpperCase().substr(3, 8);

          })

          // "upcoming events" is a clean list of future events

          app.globalData.upcomingEvents = upcomingEvents

        })

        signups.forEach((u) => {
          let attending = upcomingEvents.findIndex(x => x.id === u);
          console.log(attending)
          if (attending >= 0)
          {
            upcomingEvents[attending].attending = true
          }
        })

        // setting true if user has signed up for an upcoming event

        console.log(upcomingEvents)

        that.setData({
          userId: wx.getStorageSync('userId'),
          SelectedCity: city,
          upcomingEvents: upcomingEvents,
          avatar: wx.getStorageSync('userAvatar'),
          follow: follow
          signups: signups
        });

        console.log(wx.getStorageSync('userAvatar'))

        }, err => {
        console.log(err)
      })
      // SETTING EVENTS AND DATA IN LOCAL STORAGE
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
