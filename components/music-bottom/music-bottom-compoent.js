const app = getApp();

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
        url: 'detail/detail'
      });
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
