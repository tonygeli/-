const app = getApp()

Component({
  properties: {
    tableThemes: {
      type: Object, // 因此处的thead是json格式，故将数据类型设置为object
      // value: ‘‘ //默认值
    },
    tableItems: {
      type: Array,
    },
  },
  data: {
    someData: {},
    imagePath: app.globalData.imagePath
  },
  methods: {
    customMethod: function () {
      // 暂为定义
    }
  }
});