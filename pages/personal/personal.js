const app = getApp();
let util = require('../../utils/util.js');

Page({
  data: {
    music: {}, // 正在播放的歌曲
    showPlayer: false, // 是否显示底部的播放器
    isPlaying: false, // 音乐的播放状态
    palyedMusics: {}, // 最近播放的歌曲，key 值是歌曲的 id
    palyedMusicsid: [], // 最近播放歌曲id组成的数组
    playingId: -1, // 正在播放歌曲的 id
    showPlaylist: false, // 是否显示播放列表
    playlist: [] // 在播放列表中的歌曲
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
      wx.setStorageSync('musicsId', ids);
    }
  },
  onStopTap() {
    this.musicStop();
  },
  onToDetail() {
    wx.navigateTo({
      url: '../recommend/detail/detail'
    })
  },
  onPlayAllTap() {
    // 播放全部歌曲，将第一首歌播放，且将歌曲添加至播放列表
    let musics = this.data.palyedMusics;
    let musicsId = this.data.palyedMusicsid;
    let playlist = [];
    for (let key of musicsId) {
      console.log('key: ', key);
      playlist.push(musics[key]);
    }
    console.log(playlist);
    app.globalData.playlist = musics;
    let music = musics[musicsId[0]];
    util.playMusic(music);
    this.setData({
      showPlayer: true,
      playingId: music.id,
      music: music,
      isPlaying: true,
      playlist: playlist
    });
  },
  onPlaylistTap() {
    this.setData({
      showPlaylist: true
    });
  },
  onClosePlaylistTap() {
    this.setData({
      showPlaylist: false
    });
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