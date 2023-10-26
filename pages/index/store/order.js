// pages/index/point/order.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemId: '',
    success: false,
    errorMsg: '',
  },
  
  /**
   * 购买商品
   */
  buyItem: function () {
    var that = this
    wx.request({
      url: app.apiUrl + 'store/item/' + that.data.itemId + '/order',
      data: {
        sid: app.globalData.USER_SESSION_ID
      },
      method: 'POST',
      header: {
        'Accept': 'application/json'
      },
      success: (requestResult) => {
        if (requestResult.data.data.code == 0) {
          that.setData({
            success: true
          });
        } else {
          that.setData({
            errorMsg: requestResult.data.data.msg
          });
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.data.itemId = options.id,
    this.buyItem()
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
   * 跳转到我的订单界面
   */
  mine() {
    wx.redirectTo({
      url: '/pages/index/store/mine',
    })
  }
})