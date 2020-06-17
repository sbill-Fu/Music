Page({
  data:{},
  onLoad() {},
  onStartTap(event) {
    wx.switchTab({
      url: '../recommend/recommend'
    })
  }
})