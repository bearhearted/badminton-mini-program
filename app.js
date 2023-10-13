// app.js
App({
  apiUrl: 'https://badminton.bearvalley.cc/api/',
  defaultAvatarUrl: '/images/default_head.png',
  globalData: {
    USER_SESSION_ID: '',
    USER_SESSION_STATUS: false,
  },
  /**
   * 用户登录
   */
  login: function () {
    var that = this
    var WX_STORAGE_KEY = 'USER_SESSION'
    // 如果全局变量USER_SESSION_ID为空，说明用户是未登录状态
    if (this.globalData.USER_SESSION_ID == '') {
      // 先试图从缓存中获取登录信息
      var sessionStored = wx.getStorageSync(WX_STORAGE_KEY)
      if(sessionStored) { // 如果登录信息在缓存中有值
        if(Date.now() < sessionStored.time) {
          // 如果还没有到存储的过期时间，则直接获取缓存的id，赋值给变量USER_SESSION_ID
          that.globalData.USER_SESSION_ID = sessionStored.id
          that.globalData.USER_SESSION_STATUS = sessionStored.status
        } 
      }
    }
    /**
     * 如果这时全局变量USER_SESSION_ID还是空
     * 说明缓存中没有登录信息或者缓存已经超过7天
     * 需要去服务器获取用户的登录信息
     */
    if (that.globalData.USER_SESSION_ID == '') {
      return new Promise(function (resolve) {
        wx.login({
          success: (loginResult) => {
            // 调用wx.login获取登录凭证（code）成功，将返回的code发送到服务端，返回这个用户在服务端的一个sessionId;
            wx.request({
              url: 'https://badminton.bearvalley.cc/api/login',
              data: {
                code: loginResult.code,
              },
              method: "GET",
              header: { 
                "content-type": "application/json" 
              },
              success: (requestResult) => {
                if (requestResult.statusCode == 200 && requestResult.data.code == 0) {
                  // 接口访问成功，也成功返回了用户的sessionId，将这个sessionId复制给变量USER_SESSION_ID
                  that.globalData.USER_SESSION_ID = requestResult.data.data.sessionId;
                  // 将这个用户是否填写了头像和昵称的状态复制给变量USER_SESSION_STATUS
                  that.globalData.USER_SESSION_STATUS = requestResult.data.data.completed;
                  // 将sessionId的值，是否填写昵称的状态，和缓存失效时间一起存到缓存中
                  wx.setStorageSync(WX_STORAGE_KEY, 
                    {
                      id: requestResult.data.data.sessionId,
                      status: requestResult.data.data.completed,
                      time: requestResult.data.data.time
                    }
                  );
                }
                resolve();
              },
              fail: () => {
                wx.showModal({
                  title: '登录失败',
                  content: '服务器错误',
                  showCancel: false
                })
              },
            });
          },
          fail: () => {
            wx.showModal({
              title: '登录失败',
              content: '微信账号登录失败',
              showCancel: false
            })
          },
        });
      })
    } else {
      return new Promise(function (resolve) {
        resolve();
      })
    }
  },
})
