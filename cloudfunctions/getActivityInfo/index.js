// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  let id = event.id + '';
  if (!id) {
    return {}
  }
  let model = db.collection("activity");
  let res = await model.where({ "_id": id }).get();
  if (!res || !res.data) {
    return {}
  }
  return res.data[0];
}