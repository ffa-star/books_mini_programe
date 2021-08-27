var data = {
      //云开发环境id
      env: 'ffa-8g9cvwhn17dacc95',
      //分享配置
      share_title: '通大闲闲书店',
      share_img: '/images/poster.jpg', //可以是网络地址，本地文件路径要填绝对位置
      share_poster:'https://user.qzone.qq.com/2388843616',//必须为网络地址
      //客服联系方式
      kefu: {
            weixin: 'l2388843616',
            qq: '2388843616',
            // gzh: 'https://mmbiz.qpic.cn/mmbiz_png/nJPznPUZbhpKCwnibUUqnt7BQXr3MbNsasCfsBd0ATY8udkWPUtWjBTtiaaib6rTREWHnPYNVRZYgAesG9yjYOG7Q/640', //公众号二维码必须为网络地址
            phone: '15895688703' //如果你不设置电话客服，就留空
      },
      //默认启动页背景图，防止请求失败完全空白 
      //可以是网络地址，本地文件路径要填绝对位置
      bgurl: '/images/startBg.jpg',
      //校区
      campus: [{
                  name: '通大啬园校区',
                  id: 0
            },
            {
                  name: '通大启东校区',
                  id: 1
            },
            {
                  name: '通大启秀校区',
                  id: 2
            },
            
      ],
      //配置学院，建议不要添加太多，不然前端不好看
      college: [
            
            {
                  name: '通用',
                  id: -1
            },
            {
                  name: '课外',
                  id: 0
            },
            {
                  name: '考研',
                  id: 1
            },
            {
                  name: '考级',
                  id: 2
            },
            {
                  name: '教科',
                  id: 3
            },
            {
                  name: '文学',
                  id: 4
            },
            {
                  name: '理学',
                  id: 5
            },
            {
                  name: '马克思',
                  id: 6
            },
            {
                  name: '经管 ',
                  id: 7
            },
            {
                  name: '外院',
                  id: 8
            },
            {
                  name: '化工',
                  id: 9
            },
            {
                  name: '生命',
                  id: 10
            },
            {
                  name: '机械',
                  id: 11
            },
            {
                  name: '信科',
                  id: 12
            },
            {
                  name: '电气',
                  id: 13
            },
            {
                  name: '纺织',
                  id: 14
            },
            {
                  name: '医学',
                  id: 15
            },
            {
                  name: '公卫',
                  id: 16
            },
            {
                  name: '体科',
                  id: 17
            },
            {
                  name: '交土',
                  id: 18
            },
            {
                  name: '药学',
                  id: 19
            },
            {
                  name: '张謇',
                  id: 20
            },
            
      ],
}
//下面的就别动了
function formTime(creatTime) {
      let date = new Date(creatTime),
            Y = date.getFullYear(),
            M = date.getMonth() + 1,
            D = date.getDate(),
            H = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds();
      if (M < 10) {
            M = '0' + M;
      }
      if (D < 10) {
            D = '0' + D;
      }
      if (H < 10) {
            H = '0' + H;
      }
      if (m < 10) {
            m = '0' + m;
      }
      if (s < 10) {
            s = '0' + s;
      }
      return Y + '-' + M + '-' + D + ' ' + H + ':' + m + ':' + s;
}

function days() {
      let now = new Date();
      let year = now.getFullYear();
      let month = now.getMonth() + 1;
      let day = now.getDate();
      if (month < 10) {
            month = '0' + month;
      }
      if (day < 10) {
            day = '0' + day;
      }
      let date = year + "" + month + day;
      return date;
}
module.exports = {
      data: JSON.stringify(data),
      formTime: formTime,
      days: days
}