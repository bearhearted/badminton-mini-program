// pages/index/enroll.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eventId: '',
    enrolls: [],
    event: null,
  },
  /**
   * 加载活动列表
   */
  loadEvent: function () {
    var that = this
    wx.request({
      url: app.apiUrl + 'enroll/event',
      data: {
        sid: app.globalData.USER_SESSION_ID,
        id: that.data.eventId
      },
      method: 'GET',
      header: {
        'Accept': 'application/json'
      },
      success: (requestResult) => {
        that.setData({
          event: requestResult.data.data,
        })
      }
    })
  },
  /**
   * 加载报名列表
   */
  loadEnroll: function () {
    var that = this
    wx.request({
      url: app.apiUrl + 'enroll/list',
      data: {
        sid: app.globalData.USER_SESSION_ID,
        id: that.data.eventId
      },
      method: 'GET',
      header: {
        'Accept': 'application/json'
      },
      success: (requestResult) => {
        that.setData({
          enrolls: requestResult.data.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.data.eventId = options.id
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if(app.globalData.USER_SESSION_ID == '') {
      app.login().then((res)=>{
        this.loadEvent()
        this.loadEnroll()
      })
    } else {
      this.loadEvent()
      this.loadEnroll()
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

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
  enrollEvent() {
    var that = this
    wx.request({
      url: app.apiUrl + 'user/enroll',
      data: {
        sid: app.globalData.USER_SESSION_ID,
        eventId: that.data.eventId
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (requestResuld) {
        if(requestResuld.data.code === 0) {
          wx.showModal({
            title: '成功',
            content: '报名成功，欢迎加入',
            showCancel: false,
            success: (showResult) => {
              if(showResult.confirm) {
                wx.redirectTo({
                  url: '/pages/index/enroll?id=' + that.data.eventId,
                })
              }
            }
          })
        } else {
          wx.showModal({
            title: '出错了',
            content: requestResuld.data.msg,
            showCancel: false
          })
        }
      }
    })
  },
  /**
   * 取消报名
   */
  cancelEvent: function () {
    var that = this
    wx.showModal({
      title: '确认',
      content: '确定要取消报名吗？',
      success: (confirmResult) => {
        if (confirmResult.confirm) {
          if((that.data.event.startTime - new Date().getTime()) < 86400000) {
            wx.showModal({
              title: '失败',
              content: '活动前24小时内无法取消，请联系管理员',
              showCancel: false
            })
          } else {
            wx.request({
              url: app.apiUrl + 'challenge/check',
              data: {
                sid: app.globalData.USER_SESSION_ID,
                eventId: that.data.eventId
              },
              method: 'GET',
              header: {
                'content-type': 'application/json' // 默认值
              },
              success (requestResuld) {
                if(requestResuld.data.data) {
                  wx.showModal({
                    title: '提示',
                    content: '您还有参加挑战，确定要一起取消？',
                    success: (showResult) => {
                      if(showResult.confirm) {
                        that.cancelFuction(app.globalData.USER_SESSION_ID, that.data.eventId)
                      }
                    }
                  })
                } else {
                  that.cancelFuction(app.globalData.USER_SESSION_ID, that.data.eventId)
                }
              }
            })
          }
        }
      }
    })
  },
  cancelFuction: function (sessionId, eventId) {
    wx.request({
      url: app.apiUrl + 'user/cancel',
      data: {
        sid: sessionId,
        eventId: eventId
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (requestResuld) {
        if(requestResuld.data.code === 0) {
          wx.showModal({
            title: '成功',
            content: '取消成功，期待下次见面',
            showCancel: false,
            success: (showResult) => {
              if(showResult.confirm) {
                wx.redirectTo({
                  url: '/pages/index/enroll?id=' + eventId,
                })
              }
            }
          })
        } else {
          wx.showModal({
            title: '出错了',
            content: requestResuld.data.msg,
            showCancel: false
          })
        }
      }
    })
  }
})