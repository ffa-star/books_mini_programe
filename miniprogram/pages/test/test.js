// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
go(){
  wx.cloud.callFunction({
                name: 'regist', // 对应云函数名
                data: {
                      $url: "getid", //云函数路由参数
                      // encryptedData: e.encryptedData,  //这里的e是原本的getPhoneNum中的e 
                      // iv: e.iv,
                      // code: re.code
                },
                success: res => {
                    console.log(res,"成功了！！！！！！");
                },
                fail: err => {
                      console.error(err);
                      // wx.hideLoading()
                      // wx.showToast({
                      //       title: '获取失败,请重新获取',
                      //       icon: 'none',
                      //       duration: 2000
                      // })
                }
          })






},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})