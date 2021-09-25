/**
 *                             _ooOoo_
 *                            o8888888o
 *                            88" . "88
 *                            (| -_- |)
 *                            O\  =  /O
 *                         ____/`---'\____
 *                       .'  \\|     |//  `.
 *                      /  \\|||  :  |||//  \
 *                     /  _||||| -:- |||||-  \
 *                     |   | \\\  -  /// |   |
 *                     | \_|  ''\---/''  |   |
 *                     \  .-\__  `-`  ___/-. /
 *                   ___`. .'  /--.--\  `. . __
 *                ."" '<  `.___\_<|>_/___.'  >'"".
 *               | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *               \  \ `-.   \_ __\ /__ _/   .-` /  /
 *          ======`-.____`-.___\_____/___.-`____.-'======
 *                             `=---='
 *          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *                     佛祖保佑        永无BUG
*/


const db = wx.cloud.database();
const app = getApp();
const config = require("../../config.js");
// const Promise = require('../../request/index.js')
import { login } from "../../request/index.js";
Page({

      /**
       * 页面的初始数据
       */
      data: {
            ids: -1,
            phone: '',
            wxnum: '',
            qqnum: '',
            email: '',
            openid: '',
            campus: JSON.parse(config.data).campus,
      },
      choose(e) {
            let that = this;
            that.setData({
                  ids: e.detail.value
            })
            //下面这种办法无法修改页面数据
            /* this.data.ids = e.detail.value;*/
      },
      //获取用户手机号
      phoneInput(e) {
            this.data.phone = e.detail.value;
      },
      wxInput(e) {
            this.data.wxnum = e.detail.value;
      },
      qqInput(e) {
            this.data.qqnum = e.detail.value;
      },
      emInput(e) {
            this.data.email = e.detail.value;
      },
      getUserInfo() {
            let that = this;
            wx.getUserProfile({
                  desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                   success: async (e) => {
                        // wx.login({
                        //       success(re) {
                        //             wx.cloud.callFunction({
                        //                   name: 'regist', // 对应云函数名
                        //                   data: {
                        //                         $url: "phone", //云函数路由参数
                        //                         encryptedData: e.encryptedData,  //这里的e是原本的getPhoneNum中的e 
                        //                         iv: e.iv,
                        //                         code: re.code
                        //                   }
                        //             }).then(res => {
                        //                   const { OPENID } = res.result;
                        //                   that.data.OPENID = OPENID;
                        //                   app.openid = OPENID
                        //                   console.log(OPENID + "success里面的");
                        //             })
                        //             // success: res => {

                        //             // },
                        //             // fail: err => {
                        //             //       console.error(err);
                        //             //       wx.hideLoading()
                        //             //       wx.showToast({
                        //             //             title: '获取失败,请重新获取',
                        //             //             icon: 'none',
                        //             //             duration: 2000
                        //             //       })
                        //             // }

                        //       },

                        //       // 原来的
                        //       //     })
                        //       fail: err => {
                        //             console.error(err);
                        //             wx.hideLoading()
                        //             wx.showToast({
                        //                   title: '获取失败,请重新获取',
                        //                   icon: 'none',
                        //                   duration: 2000
                        //             })
                        //       }
                        // })
                        // let that = this;
                        // const result = await login(e);
                        const {result} = await login(e);
                        that.setData({
                              openid:result.OPENID
                        })
                        console.log(result,"result login ");
                        app.openid = result.OPENID;
                        app.userInfo = result.data;
                        let test = e.errMsg.indexOf("ok");
                        if (test == '-1') {
                              wx.showToast({
                                    title: '请授权后方可使用',
                                    icon: 'none',
                                    duration: 2000
                              });
                        } else {
                              that.setData({
                                    userInfo: e.userInfo
                              })

                              wx.navigateTo({
                                    url: '/pages/edit/edit',
                              })
                        }
                  }
            })
      },

      //校检
      check() {

            let that = this;
            //校检手机
            let phone = that.data.phone;
            if (phone !== '') {
                  if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(phone))) {
                        console.log(!(/^1[3|4|5|7|8][0-9]{9}$/.test(phone)));
                        console.log(phone);
                        wx.showToast({
                              title: '请输入正确的手机号',
                              icon: 'none',
                              duration: 2000
                        });
                        return false;
                  }
            }

            //校检校区
            let ids = that.data.ids;
            if (ids === -1) {
                  wx.showToast({
                        title: '请先获取您的校区',
                        icon: 'none',
                        duration: 2000
                  });
                  return false;
            }
            //校检QQ号
            let qqnum = that.data.qqnum;
            if (qqnum !== '') {
                  if (!(/^\s*[.0-9]{5,11}\s*$/.test(qqnum))) {
                        wx.showToast({
                              title: '请输入正确QQ号',
                              icon: 'none',
                              duration: 2000
                        });
                        return false;
                  }
            }
            //校检微信号
            let wxnum = that.data.wxnum;
            if (wxnum !== '') {
                  if (!(/^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/.test(wxnum))) {
                        wx.showToast({
                              title: '请输入正确微信号',
                              icon: 'none',
                              duration: 2000
                        });
                        return false;
                  }
            }

            // 至少输入一项
            if (!phone && !wxnum && !qqnum) {
                  wx.showToast({
                        title: '联系方式请至少输入一项',
                        icon: 'none',
                        duration: 1000
                  });
                  return false;
            }
            wx.showLoading({
                  title: '正在提交',
            })
            // 录入到数据库中
            db.collection('user').where({
                  _openid: app.openid
            }).update({
                  data: {
                        phone: that.data.phone,
                        campus: that.data.campus[that.data.ids],
                        qqnum: that.data.qqnum,
                        email: that.data.email,
                        wxnum: that.data.wxnum,
                        stamp: new Date().getTime(),
                        info: that.data.userInfo,
                        useful: true,
                        parse: 0,
                  },
                  success: function (res) {
                        db.collection('user').doc(res._id).get({
                              success: function (res) {
                                    console.log(res, "-----");
                                    app.userinfo = res.data;
                                    app.openid = res.data._openid;
                                    wx.hideLoading();
                                    wx.navigateBack({})
                              },
                        })
                  },
                  fail: function (res) {
                        wx.hideLoading();
                        wx.showToast({
                              title: '注册失败，请重新提交',
                              icon: 'none',
                        })
                  }
            })
      }

})