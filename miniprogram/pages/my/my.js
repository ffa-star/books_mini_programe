const app = getApp();
const config = require("../../config.js");
import { login } from "../../request/index.js";
Page({

      /**
       * 页面的初始数据
       */
      data: {
            showShare: false,
            poster: JSON.parse(config.data).share_poster,
      },
      onShow() {
            this.setData({
                  userInfo: app.userInfo
            })
      },
      getUserInfo() {
            let that = this;
            wx.getUserProfile({
                  desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                   success: async (res) => {
                        const {result} = await login(res);
                        app.openid = result.OPENID;
                        app.userInfo = res.userInfo;
                        let test = res.errMsg.indexOf("ok");
                        if (test == '-1') {
                              wx.showToast({
                                    title: '请授权后方可使用',
                                    icon: 'none',
                                    duration: 2000
                              });
                        } else {
                              that.setData({
                                    userInfo: res.userInfo
                              })
                              // that.check();
                              // that.toZhuCe();
                              wx.navigateTo({
                                    url: '/pages/edit/edit',
                              })
                        }
                  },
                  fail:()=>{
                        console.log("取消了")
                  },
            })
      },
      go(e) {
                  if (!app.openid) {
                       
                        this.getUserInfo();
                        
                  }
                  wx.navigateTo({
                        url: e.currentTarget.dataset.go
                  })     
      },
      // 跳转客服
      go1(e) {
            wx.navigateTo({
                  url: e.currentTarget.dataset.go
            })     
},
      //展示分享弹窗
      showShare() {
            this.setData({
                  showShare: true
            });
      },
      //关闭弹窗
      closePop() {
            this.setData({
                  showShare: false,
            });
      },
      //预览图片
      preview(e) {
            wx.previewImage({
                  urls: e.currentTarget.dataset.link.split(",")
            });
      },
      onShareAppMessage() {
            return {
                  title: JSON.parse(config.data).share_title,
                  imageUrl: JSON.parse(config.data).share_img,
                  path: '/pages/start/start'
            }

      },
})