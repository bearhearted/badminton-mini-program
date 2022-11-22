// pages/index/user.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: app.defaultAvatarUrl,
  },
  /**
   * 加载用户头像
   */
  loadUserInfo() {
    var that = this
    wx.request({
      url: app.apiUrl + 'user/get',
      data: {
        sid: app.globalData.USER_SESSION_ID
      },
      method: 'GET',
      header: {
          'Accept': 'application/json'
      },
      success: (requestResult) => {
        if (requestResult.data.code == 0) {
          that.setData({
            avatarUrl: requestResult.data.data.avatar
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
        this.loadUserInfo()
      })
    } else {
      this.loadUserInfo()
    }
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
   * 用户选择头像的回调
   * @param e 选择事件 
   */
  onChooseAvatar(e) {
    var that = this
    wx.uploadFile({
      url: app.apiUrl + 'upload',
      filePath: e.detail.avatarUrl,
      name: 'file',
      success: (requestResult) => {
        var uploadResult = JSON.parse(requestResult.data);
        if (uploadResult.code == 0) {
          that.setData({
            avatarUrl: uploadResult.data
          })
        } else {
          wx.showModal({
            title: "错误",
            content: "上传图片失败，请重试",
            showCancel: false
          })
        }
      },
      fail: () => {
        wx.showModal({
          title: "错误",
          content: "上传图片失败，请重试",
          showCancel: false
        })
      }
    })
  },

  formSubmit(e) {
    var that = this
    if (this.data.avatarUrl == app.defaultAvatarUrl) {
      wx.showModal({
        title: "错误",
        content: "请点击头像，授权微信头像信息",
        showCancel: false
      })
      return
    }
    if (e.detail.value.username == '' ) {
      wx.showModal({
        title: "错误",
        content: "请点击昵称，授权微信昵称信息",
        showCancel: false
      })
      return
    }
    wx.request({
      url: app.apiUrl + 'user/update',
      data: {
        sid: app.globalData.USER_SESSION_ID,
        nickname: e.detail.value.username,
        avatar: that.data.avatarUrl
      },
      method: 'GET',
      header: {
        'Accept': 'application/json'
      },
      success: (requestResult) => {
        if (requestResult.data.code == 0) {
          // 修改成功，删除用户缓存，更新globalData，重新获取用户
          wx.removeStorage({
            key: 'USER_SESSION'
          })
          app.globalData.USER_SESSION_ID = ''
          wx.showModal({
            title: "成功",
            content: "资料更新成功",
            showCancel: false,
            success(res) {
              if(res.confirm) {
                wx.switchTab({
                  url: '/pages/index/mine',
                })
              }
            }
          })
        }
      }
    })
  },
})