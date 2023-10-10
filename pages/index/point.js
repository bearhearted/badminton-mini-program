// pages/index/point.js
var app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    users: [],
    page: 0,
    isLast: false,
  },

  /**
   * 加载积分列表
   */
  loadUserList: function () {
    var that = this
    wx.request({
      url: app.apiUrl + 'point/user/list?p=' + that.data.page,
      data: {
      },
      method: 'POST',
      header: {
        'Accept': 'application/json'
      },
      success: (requestResult) => {
        var newList = that.data.users.concat(requestResult.data.data.content);
        that.setData({
          users: newList,
          isLast: requestResult.data.data.last
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
    this.data.page = 0;
    this.data.users = [];
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
  jumpToPage(e) {
    wx.navigateTo({
      url: '/pages/index/rule',
    })
  },
  loadMore() {
    this.data.page = this.data.page+1;
    this.onShow();
  }
})