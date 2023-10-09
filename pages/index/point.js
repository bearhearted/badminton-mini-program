// pages/index/point.js
var app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    users: [],
  },

  /**
   * 加载积分列表
   */
  loadUserList: function () {
    var that = this
    wx.request({
      url: app.apiUrl + 'point/user/list',
      data: {
      },
      method: 'POST',
      header: {
        'Accept': 'application/json'
      },
      success: (requestResult) => {
        that.setData({
          users: requestResult.data.data.content,
        })
      }
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
    this.loadUserList();
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  },
  jumpToPage(e) {
    wx.navigateTo({
      url: '/pages/index/rule',
    })
  }
})