let app = getApp();
Page({

  /**
   * Page initial data
   */
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
              console.log("user signed up to:", signUps)
              // User signed up, move on

              // Verify if this user has signed up to any event of the past week
              try {
                let recentPastEventsId = wx.getStorageSync('recentPastEventsId')
                
                signUps.forEach((signUp) => {

                  console.log("signed up to:", signUp)

                  let verify = recentPastEventsId.includes(signUp) 

                  if (verify) {

                    // if verify is true, then the user joined an event this past week

                    console.log("user joined an event this past week")

                    // For past events, check if there are no feedbacks

                    let noFeedback = page.checkFeedbacks(signUp, userId);

                      if (noFeedback) {
                        // redirect visitor to the feedback form
                      }
                      else {
                        // do nothing
                      }


                  } else {
                    // verify is wrong, the user didn't join any past event

                    console.log("the user didn't join any past event")

                  }
                  
                
                })

              

              } catch (e) {

              }
              
              // no sign ups
            }
          } catch (e) {
            // Do something when catch error
          }

          // wx.getStorage({
          //   key: 'signUps',
          //   success(signUps) {
          //     if (signUps.length === 0) {
          //       // no sign ups
          //       console.log("user has no sign ups")
          //     }
          //     else {
          //       console.log("user signed up to:", signUps)
          //       // user signed up, move on
          //       // Check if Sign Ups are past or future
          //       // For past events, check if there are no feedbacks
          //       // For past events, has to be within a week

          //     }
          //   }
          // })
          
        }
      }
    })

  },
  checkFeedbacks(signUp, userId) {

    console.log(signUp);
    console.log(userId);

    // CALL TO THE DATABASE TO CHECK IF THIS USER HAS SENT A FEEDBACK YET

    // RETURN TRUE OR FALSE

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

    // wx.redirectTo({
    //   url: `../feedback/feedback?event_id=${page.data.attendedEvents[0].id}`,
    // })
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

