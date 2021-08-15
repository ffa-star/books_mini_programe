export const login = (e) => {
  return new Promise((resolve, reject) => {
    wx.login({
      success(re) {
        wx.cloud.callFunction({
          name: 'regist', // 对应云函数名
          data: {
            $url: "phone", //云函数路由参数
            encryptedData: e.encryptedData,  //这里的e是原本的getPhoneNum中的e 
            iv: e.iv,
            code: re.code
          }
        }).then(res => {
          resolve(res);
        }).catch(error => {
          resolve(error)
        })
      },
      fail: (err) => {
        reject(err);
      }
    });
  })
}