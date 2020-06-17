const app = getApp();

Page({
  data: {
    music: {},
    showPlayer: false,
    isPlaying: false
  },
  onShow() {
    let music = wx.getStorageSync('music');
    let showPlayer = app.globalData.showPlayer;
    let isPlaying = app.globalData.isPlaying;
    this.setData({
      music: music,
      showPlayer: showPlayer,
      isPlaying: isPlaying
    });
  },
  onControlTap(event) {
    if (this.data.isPlaying){
      wx.pauseBackgroundAudio();
      this.setData({
        isPlaying: false
      });
      app.globalData.isPlaying = false;
    } else {
      wx.playBackgroundAudio();
      this.setData({
        isPlaying: true
      });
      app.globalData.isPlaying = true;
    }
  }
})