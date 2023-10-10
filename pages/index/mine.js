// pages/index/mine.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_status: 0,
    avatar: '/images/default_head.png',
    username: '匿名球友',
    win: 0,
    lose: 0,
    ratio: 0,
    point: 0,
  },
  /**
   * 加载用户信息
   */
  loadUserInfo() {
    var that = this
    wx.request({
      url: app.apiUrl + 'user/get',
      data: {
        sid: app.globalData.USER_SESSION_ID
      },
      method: 'GET',
      header: {
          'Accept': 'application/json'
      },
      success: (requestResult) => {
        if (requestResult.data.code == 0) {
          that.setData({
            avatar: requestResult.data.data.avatar,
            username: requestResult.data.data.nickname,
            user_status: requestResult.data.data.status,
            win: requestResult.data.data.win,
            lose: requestResult.data.data.lose,
            ratio: requestResult.data.data.ratio,
            point: requestResult.data.data.point
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
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
        this.loadUserInfo()
      })
    } else {
      this.loadUserInfo()
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
  /**
   * 跳转到用户完善资料页
   */
  updateUser() {
    wx.navigateTo({
      url: '/pages/index/user',
    })
  }
})