const { envList } = require('../../envList');
const app = getApp()

// pages/me/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    openId: '',
    showUploadTip: false,
    avatarUrl: '../../images/icons/avatar.png',
    loginName:'',
  },

  getOpenId() {
    console.log("getOpenId>>>");
    wx.showLoading({
      title: '',
    });
    wx.cloud
      .callFunction({
        name: 'quickstartFunctions',
        data: {
          type: 'getOpenId',
        },
      })
      .then((resp) => {
        this.setData({
          haveGetOpenId: true,
          openId: resp.result.openid,
        });
        wx.hideLoading();
      })
      .catch((e) => {
        this.setData({
          showUploadTip: true,
        });
        wx.hideLoading();
      });
  },

  gotoWxCodePage() {
    wx.navigateTo({
      url: `/pages/exampleDetail/index?envId=${envList?.[0]?.envId}&type=getMiniProgramCode`,
    });
  },

  getUserProfile() {
    wx.getUserProfile({
      desc: '用于完善用户资料', // 必填项，声明获取用户个人信息的用途
      success: (res) => {
        const userInfo = res.userInfo;
        console.log('res:', res);
        this.setData({
          isLogin: true,
          avatarUrl: userInfo.avatarUrl,
          loginName: userInfo.nickName
        });

        // 获取用户的openid（通常在用户登录时已获取并存储）
        // const openid = wx.getStorageSync('openid'); // 假设openid已存储在本地

        // 将用户信息发送到云托管服务
        // wx.request({
        //   url: 'https://your-cloud-service.com/api/saveUserInfo', // 替换为你的云托管服务接口
        //   method: 'POST',
        //   data: {
        //     openid: openid,
        //     nickname: userInfo.nickName,
        //     avatarUrl: userInfo.avatarUrl
        //   },
        //   success: (response) => {
        //     console.log('用户信息保存成功:', response.data);
        //   },
        //   fail: (error) => {
        //     console.error('请求失败:', error);
        //   }
        // });
      },
      fail: (err) => {
        console.error('获取用户信息失败:', err);
      }
    });
  },

  async onLoad(){
    const res = await app.call({
      path:'/test',
      method:"GET",
    })
    console.log('业务返回结果',res)
  }

});
