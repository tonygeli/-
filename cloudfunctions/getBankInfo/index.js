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
  let bankModel = db.collection("bank");
  let bankRes = await bankModel.where({ "_id": id }).get();
  if (!bankRes || !bankRes.data) {
    return {}
  }
  return bankRes.data[0];
}