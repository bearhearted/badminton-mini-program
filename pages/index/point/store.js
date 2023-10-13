// pages/index/point/store.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
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
   * 跳转积分规则页面
   */
  jumpToRule(e) {
    wx.navigateTo({
      url: '/pages/index/point/rule',
    })
  },
  /**
   * 跳转积分规则页面
   */
  jumpToList(e) {
    wx.switchTab({
      url: '/pages/index/point/list',
    })
  },
  /**
   * 加载更多
   */
  loadMore() {
    //this.data.page = this.data.page+1;
    this.onShow();
  }
})