
Page({
  data: {
    starIndex1: 0,
    starIndex2: 0,
    starIndex3: 0,
    starIndex4: 4,
    starIndex5: 5
  },

  onChange1(e) {
    const index = e.detail.index;
    this.setData({
      'starIndex1': index
    })
  },
  onChange2(e) {
    const index = e.detail.index;
    this.setData({
      'starIndex2': index
    })
  },
  onChange3(e) {
    const index = e.detail.index;
    this.setData({
      'starIndex3': index
    })
  },
  onChange5(e) {
    const index = e.detail.index;
    this.setData({
      'onChange5': index
    })
  },

  formSubmit: function(e){
    console.log(e);
  const page = this;
  let userId = wx.getStorageSync("userId")
  const Feedback = new wx.BaaS.TableObject('feedbacks');
  let feedback = Feedback.create()
  feedback.set({
      review: e.detail.value.review,
      learntocode: e.detail.value.learntocode[0],
      nps: e.detail.value.nps,
      stars: util.convertToStarsArray(subject.rating.stars),
  }).save().then(res => {
    // success
    console.log(res)
  }, err => {
    //err 为 HError 对象
  })

},

feedbackSuccess: function(){
  wx.showModal({
    title: "Your feedback has successfully submitted!",
    content: "Thank for helping us providing a better learning experience for you and your peers!See you in our next event!"
  })
  // const page = this
  // wx.navigateTo({
  //   url: 'pages/index/index',
  // })
},



  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
  

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