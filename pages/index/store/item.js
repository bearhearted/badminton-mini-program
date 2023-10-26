// pages/index/point/item.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemId: '',
    id:'',
    name:'',
    point:0,
    stock:0,
    sold:0,
    left:0,
    afford:false,
    intro:'',
    pics:[],
  },
  
  /**
   * 加载商品详情
   */
  loadItem: function () {
    var that = this
    wx.request({
      url: app.apiUrl + 'store/item/' + that.data.itemId,
      data: {
        sid: app.globalData.USER_SESSION_ID
      },
      method: 'POST',
      header: {
        'Accept': 'application/json'
      },
      success: (requestResult) => {
        that.setData({
          id: requestResult.data.data.id,
          name: requestResult.data.data.name,
          point: requestResult.data.data.point,
          stock: requestResult.data.data.stock,
          sold: requestResult.data.data.sold,
          left: requestResult.data.data.left,
          afford: requestResult.data.data.afford,
          intro: requestResult.data.data.introduction,
          pics: requestResult.data.data.pics
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
    this.loadItem()
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
   * 跳转确认页面
   */
  confirm() {
    wx.redirectTo({
      url: '/pages/index/store/confirm?id=' + this.data.itemId,
    })
  }
})