// pages/index/mybattle.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    battles: [],
    page: 0,
    isLast: true
  },

  /**
   * 加载我的对战列表
   */
  loadBattles: function () {
    var that = this
    wx.request({
      url: app.apiUrl + 'battle/my/list',
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
          var newArray = that.data.battles.concat(requestResult.data.data.list);
          that.setData({
            isLast: requestResult.data.data.last,
            battles: newArray
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
        this.loadBattles()
      })
    } else {
      this.loadBattles()
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    this.data.page = 0;
    this.data.battles = [];
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
   * 跳转对战页面
   */
  jumpToBattle(e) {
    wx.switchTab({
      url: '/pages/index/battle/index',
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