const app = getApp();

Component({
  properties: {
    propArray: {
      type: Array,
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    selectShow: false,//初始option不显示
    // nowText: app.globalData.city,//初始内容
    animationData: {}//右边箭头的动画
  },
  
  /**
   * 组件的方法列表
   */
  
  methods: {
    　　　//option的显示与否
    selectToggle: function (options) {
      var nowShow = this.data.selectShow;//获取当前option显示的状态
      //创建动画
      var animation = wx.createAnimation({
        timingFunction: "ease"
      })
      this.animation = animation;
      if (nowShow) {
        animation.rotate(0).step();
        this.setData({
          animationData: animation.export()
        })
      } else {
        animation.rotate(180).step();
        this.setData({
          animationData: animation.export()
        })
      }
      this.setData({
        selectShow: !nowShow
      })
    },
    //设置内容
  
    setText: function (e) {
      const that = this
      var city = e.currentTarget.dataset.item;
      var nowData = this.properties.propArray;//当前option的数据是引入组件的页面传过来的，所以这里获取数据只有通过this.properties
      var nowIdx = e.target.dataset.index;//当前点击的索引
      var nowText = nowData[nowIdx].text;//当前点击的内容
      //再次执行动画，注意这里一定，一定，一定是this.animation来使用动画
      this.animation.rotate(0).step();
      const EventsTable = new wx.BaaS.TableObject('events');
      let query = new wx.BaaS.Query();
      query.contains('city', city);
      wx.showToast({
        title: 'loading...',
        icon: 'loading',
        duration: 1000
      });
      EventsTable.setQuery(query).find().then(res => {
        console.log(res.data.objects)
        app.globalData.results = res.data.objects
        wx.reLaunch({
          url: `../index/index?city=${city}`,
        })
        that.setData({
          city: city,
          selectShow: false,
          result: res.data.objects,
          nowText: nowText,
          animationData: this.animation.export()
        });
      });
    }
  }
})
