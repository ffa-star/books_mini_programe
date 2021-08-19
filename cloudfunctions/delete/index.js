// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  try {
      const _ = db.command
      return await db.collection('publish').where({
        place:"" //只要月份字段存在，就删除
      }).remove()
    }
 catch (e) {
    // console.error(e)
  }

 
}

 