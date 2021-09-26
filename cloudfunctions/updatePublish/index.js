// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command;

// 云函数入口函数
// event中传递两个参数，一个是书籍的id，一个是更改的图片路径
// exports.main = async (event,context) => {
//   db.collection("publish").where
//   ({"bookinfo":_.elemMatch({
//     "_id":event._id,
//   })}).update({
//     data:{
//     "bookinfo.pic":event.pic}
//   }).then(res=>{
//     console.log(res);
//   })

//   }