// pages/index/point/confirm.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemId: '',
    pic:'',
    name:'',
    intro: '',
    point:0,
    left:0,
  },
  
  /**
   * 加载确认购买详情
   */
  loadItem: function () {
    var that = this
    wx.request({
      url: app.apiUrl + 'store/item/' + that.data.itemId + '/buy',
      data: {
        sid: app.globalData.USER_SESSION_ID
      },
      method: 'POST',
      header: {
        'Accept': 'application/json'
      },
      success: (requestResult) => {
        that.setData({
          pic: requestResult.data.data.pic,
          name: requestResult.data.data.name,
          intro: requestResult.data.data.introduction,
          point: requestResult.data.data.point,
          left: requestResult.data.data.left,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.data.itemId = options.id
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
    this.loadItem();
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
   * 跳转到订购页面
   */
  order() {
    wx.redirectTo({
      url: '/pages/index/store/order?id=' + this.data.itemId,
    })
  }
})