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
    name: '',
    avatar: '',
    point: 0,
  },

  /**
   * 加载积分列表
   */
  loadUserList: function () {
    var that = this
    wx.request({
      url: app.apiUrl + 'point/list?p=' + that.data.page,
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
   * 加载积分列表
   */
  loadUserPoint: function () {
    var that = this
    wx.request({
      url: app.apiUrl + 'user/get?sid=' + app.globalData.USER_SESSION_ID,
      data: {
      },
      method: 'GET',
      header: {
        'Accept': 'application/json'
      },
      success: (requestResult) => {
        that.setData({
          name: requestResult.data.data.nickname,
          avatar: requestResult.data.data.avatar,
          point: requestResult.data.data.point
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
    if(this.data.point == 0) {
      this.loadUserPoint()
    }
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
  /**
   * 跳转积分规则页面
   */
  jumpToRule(e) {
    wx.navigateTo({
      url: '/pages/index/point/rule',
    })
  },
  /**
   * 跳转积分商场页面
   */
  jumpToStore(e) {
    wx.navigateTo({
      url: '/pages/index/store/list',
    })
  },
  /**
   * 加载更多
   */
  loadMore() {
    this.data.page = this.data.page+1;
    this.onShow();
  }
})