// pages/index/myenroll.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    events: [],
    page: 0,
    isLast: true,
  },

  /**
   * 加载我的活动列表
   */
  loadEvents: function () {
    var that = this
    wx.request({
      url: app.apiUrl + 'my/event/list',
      data: {
        page: that.data.page,
        sid: app.globalData.USER_SESSION_ID
      },
      method: 'POST',
      header: {
          'Accept': 'application/json'
      },
      success: (requestResult) => {
        if (requestResult.data.data.list.length > 0) {
          var newArray = that.data.events.concat(requestResult.data.data.list);
          that.setData({
            isLast: requestResult.data.data.last,
            events: newArray
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
        this.loadEvents()
      })
    } else {
      this.loadEvents()
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    this.data.page = 0;
    this.data.events = [];
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
   * 跳转页面
   * @param {} e 
   */
  jumpToPage(e) {
    wx.navigateTo({
      url: '/pages/index/enroll/index?id=' + e.currentTarget.dataset.id,
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