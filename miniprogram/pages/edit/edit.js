const db = wx.cloud.database();
var app = getApp();
// const { userInfo } = require("os");
const config = require("../../config.js");

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
      onLoad() {
            this.getdetail();
      },
      getdetail() {
            let that = this;
            that.userInfo = app.userInfo;
            db.collection('user').where({
                  _openid: app.openid
            }).get().then(res => {
                  if (res.data.length === 0) {
                        db.collection('user').add({
                              data: {
                                    // 下面给默认值
                                    phone: that.data.phone,
                                    // campus: that.data.campus[that.data.ids],
                                    campus: { "id": 0, "name": '通大啬园校区' },
                                    qqnum: that.data.qqnum,
                                    email: that.data.email,
                                    wxnum: that.data.wxnum,
                                    info: app.userInfo,
                                    useful: true,
                                    updatedat: new Date().getTime(),
                                    parse: 0,
                              },
                              // 这里的添加失败是一开始默认登录的时候
                              fail: function (res) {
                                    wx.showToast({
                                          title: '添加失败',
                                          icon: 'none'
                                    })
                              }
                        })
                  }
                  else {
                        let infor = res.data[0];
                        console.log(infor, "info");
                        that.setData({
                              phone: infor.phone,
                              qqnum: infor.qqnum,
                              wxnum: infor.wxnum,
                              info:app.userInfo,
                              ids: infor.campus.id,
                              _id: infor._id,
                        
                        })
                  }
            })
      },
      //获取用户手机号
      // getPhoneNumber: function(e) {
      //       let that = this;
      //       //判断用户是否授权确认
      //       if (!e.detail.errMsg || e.detail.errMsg != "getPhoneNumber:ok") {
      //             wx.showToast({
      //                   title: '获取手机号失败',
      //                   icon: 'none'
      //             })
      //             return;
      //       }
      //       wx.showLoading({
      //             title: '获取手机号中...',
      //       })
      //       wx.login({
      //             success(re) {
      //                   wx.cloud.callFunction({
      //                         name: 'regist', // 对应云函数名
      //                         data: {
      //                               $url: "phone", //云函数路由参数
      //                               encryptedData: e.detail.encryptedData,
      //                               iv: e.detail.iv,
      //                               code: re.code
      //                         },
      //                         success: res => {
      //                               console.log(res);
      //                               wx.hideLoading();
      //                               if (res.result == null) {
      //                                     wx.showToast({
      //                                           title: '获取失败,请重新获取',
      //                                           icon: 'none',
      //                                           duration: 2000
      //                                     })
      //                                     return false;
      //                               }
      //                               //获取成功，设置手机号码
      //                               that.setData({
      //                                     phone: res.result.data.phoneNumber
      //                               })
      //                         },
      //                         fail: err => {
      //                               console.error(err);
      //                               wx.hideLoading()
      //                               wx.showToast({
      //                                     title: '获取失败,请重新获取',
      //                                     icon: 'none',
      //                                     duration: 2000
      //                               })
      //                         }
      //                   })
      //             },
      //             fail: err => {
      //                   console.error(err);
      //                   wx.hideLoading()
      //                   wx.showToast({
      //                         title: '获取失败,请重新获取',
      //                         icon: 'none',
      //                         duration: 2000
      //                   })
      //             }
      //       })

      // },
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
      // getUserInfo(e) {
      //       let that = this;
      //       console.log(e);
      //       let test = e.detail.errMsg.indexOf("ok");
      //       if (test == '-1') {
      //             wx.showToast({
      //                   title: '请授权后方可使用',
      //                   icon: 'none',
      //                   duration: 2000
      //             });
      //       } else {
      //             that.setData({
      //                   userInfo: e.detail.userInfo
      //             })
      //             that.check();
      //       }
      // },
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
            return true;
      },

      // 提交
      submit() {
            let that = this;
            if (that.check()) {
                  wx.showLoading({
                        title: '正在提交',
                  })
                  db.collection('user').where({
                        _openid: app.openid
                  }).update({
                        data: {
                              phone: that.data.phone,
                              campus: that.data.campus[that.data.ids],
                              qqnum: that.data.qqnum,
                              email: that.data.email,
                              wxnum: that.data.wxnum,
                              info: app.userInfo,
                              updatedat: new Date().getTime(),
                        }
                  }).then(res=>{
                        wx.showToast({
                              title: '修改成功',
                              icon: 'success'
                        })
                        wx.navigateBack({
                              delta: 2,
                        })
                  }).catch(res=>{
                        wx.hideLoading();
                        wx.showToast({
                              title: '注册失败，请重新提交',
                              icon: 'none',
                        })
                  })
            }
      },
      skip(){
            if(this.check()){
                  wx.navigateBack({
                        delta: 1,
                  })
            }
      }


})