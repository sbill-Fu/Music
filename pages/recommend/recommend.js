import {
  data
} from '../../data/music.js';
const app = getApp();
let util = require('../../utils/util.js');

Page({
  data: {
    isPlaying: false,
    musics: [],
    showPlayer: false,
    music: {}
  },
  onLoad(options) {
    this.setData(data); // 将本地数据库中的数据放到 data 中
  },
  onShow() {
    
    this.setData({
      //及时更新状态，绑定变量那边需要
      isPlaying: app.globalData.isPlaying,
      music: app.globalData.music,
      showPlayer: app.globalData.showPlayer
    });
  },
  onMusicTap(event) {
    // 列表渲染时，可以知道一首歌的全部信息
    const music = event.currentTarget.dataset.music;

    wx.navigateTo({
      url: 'detail/detail'
    });
    app.globalData.music = music;

    // 如果歌曲正在播放，就不要执行播放的函数了
    if (this.data.isPlaying) {
      if (this.data.music.url === music.url) {
        return;
      }
    }
    util.playMusic(music);
    // 及时更新状态
    this.setData({
      isPlaying: true,
      showPlayer: true,
      music: music
    });
    this.recordPlay(music); // 最近播放记录
  },
  onControlTap(event) {
    // 这个是点击底部的控制按钮触发，只会改变播放状态，不会改变歌曲
    if (this.data.isPlaying) {
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
  onSearchTap(event) {
    wx.navigateTo({
      url: 'search/search'
    })
  },
  onToDetail() {
    wx.navigateTo({
      url: 'detail/detail'
    })
  },
  recordPlay(music) {
    // 添加到缓存，记录最近播放的歌曲
    // 使用 set 对象来确保 id 不会重复
    let musicsMap = null;
    let musicsId = null;
    if (wx.getStorageSync('musicsMap')) {
      musicsMap = wx.getStorageSync('musicsMap');
    } else {
      musicsMap = {};
    }
    if (wx.getStorageSync('musicsId')) {
      musicsId = wx.getStorageSync('musicsId');
    } else {
      musicsId = [];
    }

    let musicsIdSet = new Set(musicsId);
    if (!musicsIdSet.has(music.id)) {
      // 如果歌曲没有播放过
      musicsMap[music.id] =  music;
      wx.setStorageSync('musicsMap', musicsMap);

      musicsId.unshift(music.id);
      wx.setStorageSync('musicsId', musicsId);
    } else {
      // 利用 set 对象来去重
      musicsId.unshift(music.id);
      musicsIdSet = new Set(musicsId);
      musicsId = [...musicsIdSet];
      wx.setStorageSync('musicsId', musicsId);
    }
  }
})