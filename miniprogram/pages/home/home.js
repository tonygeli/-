import { Base } from '../../utils/base.js';
import {Home} from './home-model.js';

const home = new Home();

Page({
  data: {
    loadingHidden: false,
    bankArr: [],
    themeArr: { bankName: '银行名称', creditCard: '推荐信用卡'},
    activityArr: []
  },
  onLoad: function () {
    this._loadData();
  },

  /*加载所有数据*/
  _loadData: function (callback) {
    var that = this;

    //获取银行列表
    home.getBankData((data) => {
      that.setData({
        bankArr: data
      });
    });

    //获取推荐活动列表
    home.getActivityData((data) => {
      that.setData({
        activityArr: data
      });
    })
  }
})