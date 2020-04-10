// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  let id = parseInt(event.id);
  if (!id) {
    return {}
  }
  let companyInfo = await db.collection("company").where({ "id": id }).get();
  if (!companyInfo || !companyInfo.data) {
    return {}
  }
  return companyInfo.data[0];
}