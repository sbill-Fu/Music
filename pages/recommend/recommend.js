import {data} from './music.js';
const app = getApp();

Page({
  data: {
    isPlaying: false,
    musics: [],
    showPlayer: false,
    music: {}
  },
  onLoad(options) {
    console.log('recommend load');

    this.setData(data); // 将本地数据放到 data 中

    // 在公共数据那边保存音乐是否播放的状态，以此来决定是否显示本页的播放器
    if (app.globalData.showPlayer) {
      this.setData({
        showPlayer: true
      });
    }
  },
  onShow() {
    this.setData({
      isPlaying: app.globalData.isPlaying
    });
  },
  onMusicTap(event) {
    const music = event.currentTarget.dataset.music;

    // 如果歌曲正在播放，就不要执行播放的函数了
    if (this.data.isPlaying) {
      if (this.data.music.url === music.url){
        return;        
      }
    }
    this.playMusic(music);
    this.setData({
      music: music
    });
    wx.setStorageSync('music', music);
    wx.setStorageSync('isPlaying', true);
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
  },
  playMusic({name, singer, imgUrl, url}) {
    const backgroundAudioManager = wx.getBackgroundAudioManager();
    backgroundAudioManager.title = name;
    backgroundAudioManager.epname = name;
    backgroundAudioManager.singer = singer;
    backgroundAudioManager.coverImgUrl = imgUrl;
    // 设置了 src 之后会自动播放
    backgroundAudioManager.src = url;
    this.setData({
      isPlaying: true,
      showPlayer: true
    });
    app.globalData.showPlayer = true;
    app.globalData.isPlaying = true;
  }
})