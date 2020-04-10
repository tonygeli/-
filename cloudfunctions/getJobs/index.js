// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const page = event.page ? event.page : 0;
  const skip = page * 20;

  const jobRes = await db.collection("jobs").skip(skip).limit(20).get();
  if (!jobRes || !jobRes.data) {
    return [];
  }
  let jobs = jobRes.data;
  let companyIds = [];
  jobs.forEach(function(val, key){
    jobRes[val.id] = val;
    companyIds.push(parseInt(val.company_id))
  });
  const companyRes = await cloud.callFunction({
    name: "getCompanys",
    config: {
      env: cloud.DYNAMIC_CURRENT_ENV
    },
    data: {
      id: companyIds
    }
  });
  if (!companyRes || !companyRes.result) {
    return jobs;
  }
  let companyList = companyRes.result.data;
  let companyMap = new Map();
  companyList.forEach(function(val, key){
    companyMap.set(val.id, val);
  })

  jobs.forEach(function(val, key){
    let companyInfo = companyMap.get(val.company_id)
    jobs[key].company_name = companyInfo.name;
    jobs[key].company_icon = companyInfo.icon;
    jobs[key].company_size = companyInfo.size;
  });

  return jobs;
}