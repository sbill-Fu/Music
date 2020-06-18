const app = getApp();

Page({
  data: {
    music: {},
    showPlayer: false,
    isPlaying: false,
    palyedMusics: {},
    palyedMusicsid: []
  },
  onLoad(){
    
  },
  onShow() {
    // 获取最近播放的歌曲
    let palyedMusicsid = wx.getStorageSync('musicsId');
    let palyedMusics = wx.getStorageSync('musicsMap');

    //获取正在播放的歌曲
    let music = wx.getStorageSync('music');
    let showPlayer = app.globalData.showPlayer;
    let isPlaying = app.globalData.isPlaying;

    this.setData({
      music: music,
      showPlayer: showPlayer,
      isPlaying: isPlaying,
      palyedMusics: palyedMusics,
      palyedMusicsid: palyedMusicsid
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