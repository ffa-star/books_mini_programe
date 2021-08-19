const app = getApp()
const db = wx.cloud.database();
const config = require("../../config.js");
const _ = db.command;
Page({
      data: {
            college: JSON.parse(config.data).college,
            collegeCur: -2,
            showList: false,
            scrollTop: 0,
            nomore: false,
            list: [],
            height: 0,
            num: 0
      },
      onLoad() {
            this.listkind();
            this.getbanner();
            this.getList();
            console.log(this.data.list.length + "length的长度");
      },

      // swiper滚动 获取学院书籍列表
      swiperChange(e) {
            if (e.detail.source === "touch") {
                  this.setData({
                        num: e.detail.current
                  })
            }
            if(this.data.scrollTop >300){
            console.log("执行了");
            wx.pageScrollTo({
                  scrollTop: 0
            })
      }
      
            this.swiperCollegeSelect(e.detail.current - 1);
      },
      swiperCollegeSelect(e) {
            this.setData({
                  collegeCur: e - 1,
                  scrollLeft: (e - 3) * 100,
                  showList: false,
            })
            this.getList();
      },

      //监测屏幕滚动
      onPageScroll: function (e) {
            this.setData({
                  scrollTop: parseInt((e.scrollTop) * wx.getSystemInfoSync().pixelRatio)
            })
      },
      //获取上次布局记忆
      listkind() {
            let that = this;
            wx.getStorage({
                  key: 'iscard',
                  success: function (res) {
                        that.setData({
                              iscard: res.data
                        })
                  },
                  fail() {
                        that.setData({
                              iscard: true,
                        })
                  }
            })
      },
      //布局方式选择
      changeCard() {
            let that = this;
            if (that.data.iscard) {
                  that.setData({
                        iscard: false
                  })
                  wx.setStorage({
                        key: 'iscard',
                        data: false,
                  })
            } else {
                  that.setData({
                        iscard: true
                  })
                  wx.setStorage({
                        key: 'iscard',
                        data: true,
                  })
            }
      },
      //跳转搜索
      search() {
            wx.navigateTo({
                  url: '/pages/search/search',
            })
      },
      //学院选择
      collegeSelect(e) {
            this.setData({
                  collegeCur: e.currentTarget.dataset.id - 1,
                  scrollLeft: (e.currentTarget.dataset.id - 3) * 100,
                  num: e.currentTarget.dataset.id+1,
                  showList: false,
            })
            this.getList();
      },
      //选择全部
      selectAll() {
            this.setData({
                  collegeCur: -2,
                  scrollLeft: -200,
                  showList: false,
            })
            this.getList();
      },
      //展示列表小面板
      showlist() {
            let that = this;
            if (that.data.showList) {
                  that.setData({
                        showList: false,
                  })
            } else {
                  that.setData({
                        showList: true,
                  })
            }
      },
      //获取图书列表
      getList() {
            let that = this;
            if (that.data.collegeCur == -2) {
                  var collegeid = _.neq(-2); //除-2之外所有
            } else {
                  var collegeid = that.data.collegeCur + '' //小程序搜索必须对应格式
            }
            db.collection('publish').where({
                  status: 0,
                  dura: _.gt(new Date().getTime()),
                  collegeid: collegeid
            }).orderBy('creat', 'desc').limit(20).get({
                  success: function (res) {
                        wx.stopPullDownRefresh(); //暂停刷新动作
                        if (res.data.length == 0) {
                              that.setData({
                                    list: [],
                                    height: 800
                              })

                              return false;
                        }
                        if (res.data.length < 20) {
                              that.setData({
                                    nomore: true,
                                    page: 0,
                                    list: res.data,
                                    // length:res.data.length,
                                    height: res.data.length > 20 ? 20 : res.data.length * 277

                              })

                        } else {
                              that.setData({
                                    page: 0,
                                    list: res.data,
                                    nomore: false,
                                    height: res.data.length > 20 ? 20 : res.data.length * 277
                              })
                        }
                  }
            })
      },
      // 获得更多
      more() {
            let that = this;
            console.log("more");
            if (that.data.nomore || that.data.list.length < 20) {
                  console.log("nomore");
                  return false
            }

            let page = that.data.page + 1;
            if (that.data.collegeCur == -2) {
                  var collegeid = _.neq(-2); //除-2之外所有
            } else {
                  var collegeid = that.data.collegeCur + '' //小程序搜索必须对应格式
            }
            db.collection('publish').where({
                  status: 0,
                  dura: _.gt(new Date().getTime()),
                  collegeid: collegeid
            }).orderBy('creat', 'desc').skip(page * 20).limit(20).get({
                  success: function (res) {
                        if (res.data.length == 0) {
                              that.setData({
                                    nomore: true
                              })
                              return false;
                        }
                        else if (res.data.length < 20) {
                              console.log("这里");
                              that.setData({
                                    nomore: true,
                                    list: that.data.list.concat(res.data),
                                    height: (that.data.list.length+res.data.length) * 277
                              })
                              that.data.nomore = true
                        }
                        else{
                              that.setData({
                              page: page,
                              list: that.data.list.concat(res.data),
                              height: (that.data.list.length+res.data.length) * 277
                        })
                  }

                        console.log(that.data)
                  },
                  fail() {
                        wx.showToast({
                              title: '获取失败',
                              icon: 'none'
                        })
                  }
            })
      },
      onReachBottom() {
            this.more();
            console.log("触底");
      },
      //下拉刷新
      onPullDownRefresh() {
            this.getList();
      },
      gotop() {
            wx.pageScrollTo({
                  scrollTop: 0
            })
      },
      //跳转详情
      detail(e) {
            let that = this;
            wx.navigateTo({
                  url: '/pages/detail/detail?scene=' + e.currentTarget.dataset.id,
            })
      },
      //获取轮播
      getbanner() {
            let that = this;
            db.collection('banner').get({
                  success: function (res) {
                        console.log(res, "轮播图");
                        that.setData({
                              banner: res.data[0].list
                        })
                  }
            })
      },
      //跳转轮播链接
      goweb(e) {
            if (e.currentTarget.dataset.web) {
                  wx.navigateTo({
                        url: '/pages/web/web?url=' + e.currentTarget.dataset.web.url,
                  })
            }
      },

      //开始页面 
      onShareAppMessage() {
            return {
                  title: JSON.parse(config.data).share_title,
                  imageUrl: JSON.parse(config.data).share_img,
                  path: '/pages/start/start'
            }
      },

})