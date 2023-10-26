// pages/index/point/store.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    page:0,
    isLast:true
  },

  /**
   * 加载商品列表
   */
  loadItemList: function () {
    var that = this
    wx.request({
      url: app.apiUrl + 'store/list',
      data: {
        page: that.data.page
      },
      method: 'POST',
      header: {
        'Accept': 'application/json'
      },
      success: (requestResult) => {
        var newList = that.data.goods.concat(requestResult.data.data.list);
        that.setData({
          goods: newList,
          isLast: requestResult.data.data.last
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.loadItemList()
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
    if(!this.data.isLast) {
      this.loadMore()
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
   * 跳转积分规则页面
   */
  jumpToRule(e) {
    wx.navigateTo({
      url: '/pages/index/point/rule',
    })
  },
  /**
   * 跳转积分列表页面
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
    this.data.page = this.data.page+1;
    this.onShow();
  }
})