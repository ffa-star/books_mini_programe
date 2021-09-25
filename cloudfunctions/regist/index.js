const appid = 'wx5236a29540d945cf'; //你的小程序appid
const secret = '1d0b72b8bb6543eb0dcc8fa54c1aba1a'; //你的小程序secret

/*
下
面
不
用
管
*/

const cloud = require('wx-server-sdk');
const TcbRouter = require('tcb-router'); //云函数路由
const rq = require('request');
const wxurl = 'https://api.weixin.qq.com';
var WXBizDataCrypt = require('./RdWXBizDataCrypt') // 用于手机号解密
cloud.init()
// 云函数入口函数
exports.main = async(event, context) => {
      const app = new TcbRouter({
            event
      });
      //登录解密
      app.router('phone', async(ctx) => {
      
            ctx.body = new Promise(resolve => {
                  rq({
                        url: wxurl + '/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + event.code + '&grant_type=authorization_code',
                        method: "GET",
                        json: true,
                  }, function(error, response, body) {
                        const decrypt1 = new WXBizDataCrypt(appid, body.session_key) // -解密第一步
                        const decrypt2 = decrypt1.decryptData(event.encryptedData, event.iv) // 解密第二步*/
                        let{OPENID} = cloud.getWXContext();
                        resolve({
                              data: decrypt2,OPENID
                        })
                  });
            });
      });
      //获取openid
      app.router('getid', async(ctx) => {          
            let{APPID,OPENID} = cloud.getWXContext();
            return{
                  APPID,
                  OPENID
            }
      });
      return app.serve();
}