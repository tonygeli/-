// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const id = event.id;
  if (!id) {
    return [];
  }
  const companyRes = await db.collection("company").where({
    id: _.in(id)
  }).get();

  return companyRes
}