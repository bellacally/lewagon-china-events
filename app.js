var hotapp = require('/utils/hotapp.js');

App({
  onLaunch: function () {
    let that = this
    // 展示本地存储能力
    wx.BaaS = requirePlugin('sdkPlugin')
    //让插件帮助完成登录、支付等功能
    wx.BaaS.wxExtend(wx.login,
      wx.getUserInfo)
      wx.BaaS.init('d06840973e93da8277d9');
      wx.BaaS.login(false).then(res => {
        console.log(res)    
        wx.setStorageSync('userId', res.id)
        this.getSignUps(res.id)
        this.getRecentPastEvents()
      }, err => {
        console.log(err.code)
    })
  },
  getSignUps(id) {
    let that = this;
    // LOADING ALL SIGNUPS OF THE CURRENT USER
    const SignupsTable = new wx.BaaS.TableObject('signups');
    let query = new wx.BaaS.Query();
    query.compare('created_by', '=', id)
    SignupsTable.setQuery(query).find().then(res => {
      // success
      console.log(res.data.objects)
      let signUps = [];

      res.data.objects.forEach((e) => {
        let event_id = e.event_id.id
        signUps.push(event_id);
      });
      wx.setStorageSync('signUps', signUps)
    }, err => {
      // err
    })
  },
  getRecentPastEvents() {

    var that = this;
    const EventsTable = new wx.BaaS.TableObject('events');
    let query = new wx.BaaS.Query();

    EventsTable.setQuery(query).orderBy(['date']).find().then(res => {

      let results = res.data.objects
      let recentEvents = [];

      results.forEach((object) => {
        let todaymillisecs = new Date().getTime();
        let oneweekmillisecs = new Date()
        oneweekmillisecs.setDate(oneweekmillisecs.getDate() - 7);
        let eventmillisecs = new Date(object.date).getTime();
        if (eventmillisecs < todaymillisecs && eventmillisecs > oneweekmillisecs) {
          recentEvents.push(object);
        };
        wx.setStorageSync('recentPastEvents', recentEvents)

      })
    })

  },
  globalData: {
    city: ""
  }
  
})
