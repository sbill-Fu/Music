import {
  data
} from './music.js';
const app = getApp();

Page({
  data: {
    isPlaying: false,
    musics: [],
    showPlayer: false,
    music: {}
  },
  onLoad(options) {
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
      isPlaying: app.globalData.isPlaying //及时更新状态，绑定变量那边需要
    });
  },
  onMusicTap(event) {
    // 列表渲染时，可以知道一首歌的全部信息
    const music = event.currentTarget.dataset.music;

    wx.navigateTo({
      url: 'detail/detail'
    });

    // 如果歌曲正在播放，就不要执行播放的函数了
    if (this.data.isPlaying) {
      if (this.data.music.url === music.url) {
        return;
      }
    }
    this.playMusic(music);
    this.setData({
      music: music
    });
    wx.setStorageSync('music', music); // 给personal页面底部使用，不使用全局变量，使用缓存试试
    this.recordPlay(music);

  },
  onControlTap(event) {
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
  playMusic({
    name,
    singer,
    imgUrl,
    url
  }) {
    const backgroundAudioManager = wx.getBackgroundAudioManager();
    backgroundAudioManager.title = name;
    backgroundAudioManager.epname = name;
    backgroundAudioManager.singer = singer;
    backgroundAudioManager.coverImgUrl = imgUrl;
    // 设置了 src 之后会自动播放
    backgroundAudioManager.src = url;

    // 及时更新状态
    this.setData({
      isPlaying: true,
      showPlayer: true
    });
    app.globalData.showPlayer = true;
    app.globalData.isPlaying = true;
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