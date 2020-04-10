// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const bankRes = await db.collection("bank").limit(40).get();
  if (!bankRes || !bankRes.data) {
    return [];
  }
  let banks = bankRes.data;
  
  return banks;
}