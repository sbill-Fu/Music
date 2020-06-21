const app = getApp();
const utils = require('../../../utils/util.js');

Page({
  data: {
    music: {},
    isPlaying: false
  },
  onLoad() {
    let music = app.globalData.music
    this.setData({
      music: music,
      isPlaying: app.globalData.isPlaying
    });
    wx.setNavigationBarTitle({
      title: music.name
    });

    utils.setPageModel(this.__route__, this);
  },
  onStopTap() {
    app.globalData.backgroundAudioManager.pause();
    this.setData({
      isPlaying: false
    });
  },
  onStartTap() {
    if (app.globalData.playEnded) {
      utils.playMusic(this.data.music);
    } else {
      app.globalData.backgroundAudioManager.play();
    }
    this.setData({
      isPlaying: true
    });
  },
  updatePlayStatus() {
    this.setData({
      isPlaying: app.globalData.isPlaying
    });
  }
})