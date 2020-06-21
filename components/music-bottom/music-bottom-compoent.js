const app = getApp();
const utils = require('../../utils/util');

Component({
  options: {
    styleIsolation: 'isolated' //样式只在当前组件生效
  },
  properties: {
    // 可以随着父组件的变化响应式变化，而且绑定的数据也可以响应式变化
    music: Object,        // 正在播放的歌曲
    isPlaying: Boolean,
    showPlaylist: Boolean
  },
  data: {
    playlist: []
  },
  // observers: {
  //   'playlist': function(newval) {
  //     console.log('change');
  //     console.log(newval);
  //   }
  // },
  methods: {
    onToDetail() {
      wx.navigateTo({
        url: '/pages/recommend/detail/detail'
      });
    },
    onControlTap(event) {
      // 获取到播放器的实例
      const backgroundAudioManager = app.globalData.backgroundAudioManager;
      // 这个是点击底部的控制按钮触发，只会改变播放状态，不会改变歌曲
      if (this.data.isPlaying) {
        backgroundAudioManager.pause();
        this.setData({
          isPlaying: false
        });
        app.globalData.isPlaying = false;
      } else if (app.globalData.playEnded){
        utils.playMusic(this.data.music);
      } else{
        backgroundAudioManager.play();
        this.setData({
          isPlaying: true
        });
        app.globalData.isPlaying = true;
      }
      this.triggerEvent('playstatuschange');
    },
    onPlaylistTap() {
      this.setData({
        showPlaylist: true,
        playlist: app.globalData.playlist
      });
    },
    onClosePlaylistTap() {
      this.setData({
        showPlaylist: false
      });
    },
  }
})
