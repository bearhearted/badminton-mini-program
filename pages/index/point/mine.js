// pages/index/mypoint.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page: 0,
    isLast: true,
    point: 0
  },

  /**
   * 加载积分列表
   */
  loadPointRecordList: function () {
    var that = this
    wx.request({
      url: app.apiUrl + 'my/point/list',
      data: {
        page: that.data.page,
        sid: app.globalData.USER_SESSION_ID
      },
      method: 'POST',
      header: {
        'Accept': 'application/json'
      },
      success: (requestResult) => {
        if (requestResult.data.data.content.length > 0) {
          var newArray = that.data.list.concat(requestResult.data.data.content);
          that.setData({
            list: newArray,
            isLast: requestResult.data.data.last,
            point: requestResult.data.data.content[0].user.point
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
    this.loadPointRecordList();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    this.data.page = 0;
    this.data.list = [];
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
   * 跳转活动页面
   */
  jumpToEvent(e) {
    wx.switchTab({
      url: '/pages/index/index',
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