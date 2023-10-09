// pages/index/challenge.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    events: [],
  },
  /**
   * 加载活动列表
   */
  loadChallenges: function () {
    var that = this
    wx.request({
      url: app.apiUrl + 'battle/list',
      data: {
        sid: app.globalData.USER_SESSION_ID
      },
      method: 'GET',
      header: {
          'Accept': 'application/json'
      },
      success: (requestResult) => {
        that.setData({
          events: requestResult.data.data,
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
    if(app.globalData.USER_SESSION_ID == '') {
      app.login().then((res)=>{
        this.loadChallenges()
      })
    } else {
      this.loadChallenges()
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
   * 发起挑战
   * @param {*} e 
   */
  startChallenge(e) {
    if(e.target.dataset.added) {
      wx.showModal({
        title: '提示',
        content: '本次活动您已经参加挑战，无法发起新的约战',
        confirmText: 'ok',
        showCancel: false
      })
    } else if(!app.globalData.USER_SESSION_STATUS) {
      wx.showModal({
        title: '提示',
        content: '发起约战需要先登录',
        confirmText: '去登录',
        cancelText: '晚点再说',
        success(res) {
          if(res.confirm) {
            wx.switchTab({
              url: '/pages/index/mine',
            })
          }
        }
      })
    } else if(!e.target.dataset.enrolled) {
      wx.showModal({
        title: '提示',
        content: '发起约战需要先报名',
        confirmText: '去报名',
        cancelText: '晚点再说',
        success(res) {
          if(res.confirm) {
            wx.redirectTo({
              url: '/pages/index/enroll?id=' + e.target.dataset.eid + '&sid=' + app.globalData.USER_SESSION_ID
            })
          }
        }
      })
    } else {
      var that = this
      wx.request({
        url: app.apiUrl + 'battle/start',
        data: {
          sid: app.globalData.USER_SESSION_ID,
          eventId: e.target.dataset.eid,
          type: 4
        },
        method: 'GET',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (requestResuld) {
          if(requestResuld.data.code === 0) {
            wx.showModal({
              title: '成功',
              content: '发起约战成功，请等待队友和对手加入',
              showCancel: false,
              success: (showResult) => {
                if(showResult.confirm) {
                  that.onShow()
                }
              }
            })
          } else {
            wx.showModal({
              title: '出错了',
              content: requestResuld.data.msg,
              showCancel: false
            })
          }
        }
      })
    }
  },
  /**
   * 取消参与挑战
   * @param {*} e 操作对象
   */
  cancelChallenge(e) {
    var that = this
    if(e.target.dataset.delete) {
      wx.showModal({
        title: '确认',
        content: '确定要取消吗？',
        success: (confirmResult) => {
          if (confirmResult.confirm) {
            wx.request({
              url: app.apiUrl + 'battle/cancel',
              data: {
                sid: app.globalData.USER_SESSION_ID,
                battleId: e.target.dataset.cid,
              },
              method: 'GET',
              header: {
                'content-type': 'application/json' // 默认值
              },
              success (requestResuld) {
                if(requestResuld.data.code === 0) {
                  wx.showModal({
                    title: '成功',
                    content: '取消成功',
                    showCancel: false,
                    success: (showResult) => {
                      if(showResult.confirm) {
                        that.onShow()
                      }
                    }
                  })
                } else {
                  wx.showModal({
                    title: '出错了',
                    content: requestResuld.data.msg,
                    showCancel: false
                  })
                }
              }
            })
          }
        }
      })
    }
  },
  /**
   * 加入左边的队伍
   * @param {*} e 操作对象
   */
  joinChallenge(e) {
    this.challenge(e, 'join');
  },
  /**
   * 加入右边队伍第一个位置
   * @param {*} e 操作对象
   */
  againstChallenge(e) {
    this.challenge(e, 'against');
  },
  /**
   * 加入右边队伍第二个位置
   * @param {*} e 操作对象
   */
  joinAgainstChallenge(e) {
    this.challenge(e, 'join/against');
  },
  /**
   * 加入挑战
   * @param {*} e 操作对象
   * @param {*} opUrl 操作的url
   */
  challenge(e, opUrl) {
    if (e.target.dataset.added) {
      wx.showModal({
        title: '提示',
        content: '同一天无法参与两场约战',
        confirmText: '确定',
        showCancel: false
      })
    } else if(!app.globalData.USER_SESSION_STATUS) {
      wx.showModal({
        title: '提示',
        content: '发起约战需要先登录',
        confirmText: '去登录',
        cancelText: '晚点再说',
        success(res) {
          if(res.confirm) {
            wx.switchTab({
              url: '/pages/index/mine',
            })
          }
        }
      })
    } else if(!e.target.dataset.enrolled) {
      wx.showModal({
        title: '提示',
        content: '发起约战需要先报名',
        confirmText: '去报名',
        cancelText: '晚点再说',
        success(res) {
          if(res.confirm) {
            wx.redirectTo({
              url: '/pages/index/enroll?id=' + e.target.dataset.eid + '&sid=' + app.globalData.USER_SESSION_ID
            })
          }
        }
      })
    } else {
      var that = this
      wx.request({
        url: app.apiUrl + 'battle/' + opUrl,
        data: {
          sid: app.globalData.USER_SESSION_ID,
          battleId: e.target.dataset.cid,
        },
        method: 'GET',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (requestResuld) {
          if(requestResuld.data.code === 0) {
            wx.showModal({
              title: '成功',
              content: '加入成功',
              showCancel: false,
              success: (showResult) => {
                if(showResult.confirm) {
                  that.onShow();
                }
              }
            })
          } else {
            wx.showModal({
              title: '出错了',
              content: requestResuld.data.msg,
              showCancel: false
            })
          }
        }
      })
    }
  },
  /**
   * 给左边的队伍投票
   * @param {*} e 操作对象
   */
  voteLeft(e) {
    this.vote(e, 0)
  },
  /**
   * 给右边的队伍投票
   * @param {*} e 操作对象
   */
  voteRight(e) {
    this.vote(e, 2)
  },
  /**
   * 进行投票
   * @param {*} e 操作对象
   * @param {*} position 投票位置
   */
  vote(e, position) {
    var that = this
    if(!app.globalData.USER_SESSION_STATUS) {
      wx.showModal({
        title: '提示',
        content: '投票需要先登录',
        confirmText: '去登录',
        cancelText: '晚点再说',
        success(res) {
          if(res.confirm) {
            wx.switchTab({
              url: '/pages/index/mine',
            })
          }
        }
      })
    } else if(e.target.dataset.voted) {
      wx.showModal({
        title: '提示',
        content: '已经为该约战投过票了',
        showCancel: false,
      })
    } else if(e.target.dataset.added) {
      wx.showModal({
        title: '提示',
        content: '无法为自己参加的约战投票',
        showCancel: false,
      })
    } else {
      wx.request({
        url: app.apiUrl + 'battle/vote',
        data: {
          sid: app.globalData.USER_SESSION_ID,
          battleId: e.target.dataset.cid,
          position: position
        },
        method: 'GET',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (requestResuld) {
          if(requestResuld.data.code === 0) {
            wx.showModal({
              title: '成功',
              content: '投票成功，谢谢你的支持',
              showCancel: false,
              success: (showResult) => {
                if(showResult.confirm) {
                  that.onShow();
                }
              }
            })
          } else {
            wx.showModal({
              title: '出错了',
              content: requestResuld.data.msg,
              showCancel: false
            })
          }
        }
      })
    }
  },
  /**
   * 取消投票
   * @param {*} e 操作对象
   */
  cancelVote(e) {
    var that = this
    if(e.target.dataset.delete) {
      wx.showModal({
        title: '确认',
        content: '确定要取消吗？',
        success: (confirmResult) => {
          if (confirmResult.confirm) {
            wx.request({
              url: app.apiUrl + 'battle/vote/cancel',
              data: {
                sid: app.globalData.USER_SESSION_ID,
                battleId: e.target.dataset.cid
              },
              method: 'GET',
              header: {
                'content-type': 'application/json' // 默认值
              },
              success (requestResuld) {
                if(requestResuld.data.code === 0) {
                  wx.showModal({
                    title: '成功',
                    content: '取消投票成功',
                    showCancel: false,
                    success: (showResult) => {
                      if(showResult.confirm) {
                        that.onShow();
                      }
                    }
                  })
                } else {
                  wx.showModal({
                    title: '出错了',
                    content: requestResuld.data.msg,
                    showCancel: false
                  })
                }
              }
            })
          }
        }
      })
    }
  }
})