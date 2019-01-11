
let app = getApp();
Page({
  data: {
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let page = this;

    // 1. Getting UserID to begin with
    wx.getStorage({
      key: 'userId',
      success(res) {
        console.log("res", res)
        if (!res.data || res.data.length === 0) {

          console.log("alert we have no user ID!");

        } else {

          let userId = res.data

          page.setData({
            userId: userId
          })

          // 2. Check if this user has signed up before

          try {
            let signUps = wx.getStorageSync('signUps')
            if (signUps.length === 0) {
              console.log("user has no sign ups")
              // no need to go to feedbacks
            }
            else {
              console.log("user signed up to events:", signUps)
              // User signed up, move on
              // Verify if this user has signed up to any event of the past week
              try {
                let recentPastEventsId = wx.getStorageSync('recentPastEventsId')
                signUps.forEach((signUp) => {

                  console.log("signed up to event:", signUp)
                  let verify = recentPastEventsId.includes(signUp)

                  if (verify) {
                    console.log("user joined an event this past week:", signUp)
                    // if verify is true, then the user joined an event this past week
                    // For past events, check if there are no feedbacks
                    try {
                      console.log(signUp)
                      let tableID = 33633; // feedbacks table
                      let userQuery = new wx.BaaS.Query()
                      let FeedbacksTable = new wx.BaaS.TableObject(tableID);
                      userQuery.compare('created_by', '=', userId) // check feedbacks for this user
                      userQuery.compare('event_id', '=', signUp) // check feedbacks for this event
                      FeedbacksTable.setQuery(userQuery).find().then(res => {
                        var feedbacks = res.data.objects;
                        console.log("Feedback written by this user:", feedbacks)
                        if (feedbacks == false) {
                          console.log("we need feedback from this user! REDIRECT!")
                          // redirect visitor to the feedback form
                          wx.redirectTo({
                            url: `../feedback/feedback?event_id=${signUp}`,
                          })
                        }
                        else {
                          // do nothing, wait for user click to "start journey"
                            console.log("there are no feedbacks waiting")
                        }
                      }, err => {
                        console.log(err)
                      }) // end of query 

                    }
                    catch (e) {
                   }
                  } else {
                    // verify is wrong, this sign up is old
                    console.log("pass, this sign up is for an old event")
                  }
                })
              } catch (e) {
              }
              // no sign ups
            }
          } catch (e) {
            // Do something when catch error
          }
        }
      }
    })
  },

  getUserInfo(data) {
    let page = this;
    wx.BaaS.handleUserInfo(data).then(res => {
      console.log(res)
      wx.setStorageSync('userName', res.nickName)
      wx.setStorageSync('userCity', res.province)
      wx.setStorageSync('userAvatar', res.avatarUrl)
      page.goToEvents();
    }, res => {
    })
  },

  goToEvents: function () {
    wx.redirectTo({
      url: '../index/index',
    })
  },

  clickToFeedback: function (e) {
    let page = this;
    wx.getStorage({
      key: 'attendedEvents',
      success(res) {
        console.log("res", res)
        res.data.forEach((event) => {
          let event_index = res.data.indexOf(event);
          // console.log("event_index", event_index)
          for (let i = 0; i < res.data.length; i++) {
            app.globalData.event_name = res.data[i].name
            app.globalData.event_image = res.data[i].image
            if (event_index == i) {
              // console.log("i", i)
              page.setData({
                event_id: res.data[i].id,
              })
              // delete res.data[i]
              res.data.splice(res.data[i], 1);
              // console.log(111, res.data)
              wx.setStorage({
                key: 'attendedEvents',
                data: res.data
              })
              wx.redirectTo({
                url: `../feedback/feedback?event_id=${page.data.event_id}`,
              })
              break;
            }
            break;
          }
        })
      }
    })
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

