
class Home 
{
  getBankData(callback) {
    wx.cloud.callFunction({
      name: "getBanks",
      data: {},
      success: function(data) {
        let bankArr = [];
        let resArr = data.result;
        resArr.forEach(function (val, key) {
          bankArr.push({
            name: {
              name: val.name,
              link: "/pages/bank/index?id=" + val._id,
              icon: "icon/bank/" + val.name + ".svg"
            },
            creditCard: val.creditCard
          });
        });
        callback(bankArr)
      }
    })
  }

  getActivityData(callback) {
    wx.cloud.callFunction({
      name: "getActivity",
      data: {},
      success: function (data) {
        callback(data.result)
      }
    })
  }
}

export {Home};