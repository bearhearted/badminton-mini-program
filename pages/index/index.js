// index.js
var app = getApp()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    events: [],
  },
  /**
   * 加载活动列表
   */
  loadEvents: function () {
    var that = this
    wx.request({
      url: app.apiUrl + 'event/list',
      data: {
        sid: app.globalData.USER_SESSION_ID
      },
      method: 'GET',
      header: {
          'Accept': 'application/json'
      },
      success: (requestResult) => {
        that.setData({
          events: requestResult.data.data,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if(app.globalData.USER_SESSION_ID == '') {
      app.login().then((res)=>{
        this.loadEvents()
      })
    } else {
      this.loadEvents()
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '羽你同行',
      path: '/pages/index/index'
    }
  },
  onShareTimeline: function () {
    return {
      title: '羽你同行',
      path: '/pages/index/index'
    }
  },
  /**
   * 跳转到某个页面
   * @param e 操作对象
   */
  jumpToPage(e) {
    if(!app.globalData.USER_SESSION_STATUS) {
      wx.showModal({
        title: '提示',
        content: '报名需要先完善资料',
        confirmText: '去完善',
        cancelText: '晚点再说',
        success(res) {
          if(res.confirm) {
            wx.switchTab({
              url: '/pages/index/mine',
            })
          }
        }
      })
    } else {
      wx.navigateTo({
        url: '/pages/index/enroll/index?id=' + e.currentTarget.dataset.id,
      })
    }
  }
})
