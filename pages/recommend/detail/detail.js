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
  },
  onStopTap() {
    utils.musicStop();
    this.setData({
      isPlaying: false
    });
  },
  onStartTap() {
    utils.musicStart();
    this.setData({
      isPlaying: true
    });
  }
})