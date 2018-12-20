// pages/show/show.js
Page({

  /**
   * Page initial data
   */
  data: {

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
  onLoad: function (e) {
    var eventId = e.id;
    console.log("555", eventId);
 

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
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

  }
})