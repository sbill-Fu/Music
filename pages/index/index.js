Page({
  data:{},
  onLoad() {},
  onStartTap(event) {
    wx.switchTab({
      url: '../recommend/recommend'
    })
  },
  onShareAppMessage() {
    return {
      title: '你好啊'
    }
  }
})