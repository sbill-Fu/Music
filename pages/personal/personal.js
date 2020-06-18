const app = getApp();
let util = require('../../utils/util.js');

Page({
  data: {
    music: {},
    showPlayer: false,
    isPlaying: false,
    palyedMusics: {},
    palyedMusicsid: [],
    playingId: -1
  },
  onLoad(){
    
  },
  onShow() {
    // 获取最近播放的歌曲
    let palyedMusicsid = wx.getStorageSync('musicsId');
    let palyedMusics = wx.getStorageSync('musicsMap');

    //获取正在播放的歌曲
    let music = app.globalData.music;
    let showPlayer = app.globalData.showPlayer;
    let isPlaying = app.globalData.isPlaying;
    let playingId = app.globalData.playingId;

    this.setData({
      music: music,
      showPlayer: showPlayer,
      isPlaying: isPlaying,
      palyedMusics: palyedMusics,
      palyedMusicsid: palyedMusicsid,
      playingId: playingId
    });
  },
  onControlTap(event) {
    // 停止或者播放歌曲，并修改播放状态
    if (this.data.isPlaying){
      this.musicStop();
    } else {
      this.musicStart();
    }
  },
  onStartTap(event) {
    let music = event.currentTarget.dataset.music;
    if (music.id == this.data.playingId) {
      this.musicStart();
    } else {
      util.playMusic(music);
      this.setData({
        showPlayer: true,
        playingId: music.id,
        music: music,
        isPlaying: true
      });

      // 改变一下歌曲的次序
      let ids = this.data.palyedMusicsid;
      ids.unshift(music.id);
      let temp = new Set(ids);
      ids = [...temp];
      this.setData({
        palyedMusicsid: ids
      });
      wx.setStorageSync('palyedMusicsid', ids);
    }
  },
  onStopTap() {
    this.musicStop();
  },
  musicStart() {
    wx.playBackgroundAudio();
    this.setData({
      isPlaying: true
    });
    app.globalData.isPlaying = true;
  },
  musicStop() {
    wx.pauseBackgroundAudio();
    this.setData({
      isPlaying: false
    });
    app.globalData.isPlaying = false;
  }
})