// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();
const log = cloud.logger()

// 云函数入口函数
exports.main = async (event, context) => {
  let id = parseInt(event.id);
  if (!id) {
    return {}
  }
  let jobModel = db.collection("jobs");
  let companyModel = db.collection("company");
  let jobRes = await jobModel.where({"id": id}).get();
  let jobInfo = jobRes.data[0];
  const companyRes = await cloud.callFunction({
    name: "getCompanyInfo",
    config: {
      env: cloud.DYNAMIC_CURRENT_ENV
    },
    data: {
      id: jobInfo.company_id
    }
  });
  let companyInfo = companyRes.result;
  jobInfo.company_name = companyInfo.name;
  jobInfo.company_icon = companyInfo.icon;
  jobInfo.company_size = companyInfo.size;

  return jobInfo;
}