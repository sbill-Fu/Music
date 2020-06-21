const app = getApp();

function playMusic(music) {
  const backgroundAudioManager = wx.getBackgroundAudioManager();
  backgroundAudioManager.title = music.name;
  backgroundAudioManager.epname = music.name;
  backgroundAudioManager.singer = music.singer;
  backgroundAudioManager.coverImgUrl = music.imgUrl;
  // 设置了 src 之后会自动播放
  backgroundAudioManager.src = music.url;

  // 音乐播放结束后，相关页面刷新播放状态
  backgroundAudioManager.onEnded(() => {
    app.globalData.isPlaying = false;
    app.globalData.playEnded = true;
    _updatePagePlayStatus();
  });

  backgroundAudioManager.onPlay(() => {
    app.globalData.isPlaying = true;
    _updatePagePlayStatus();
  });

  backgroundAudioManager.onPause(() => {
    app.globalData.isPlaying = false;
    _updatePagePlayStatus();
  });

  app.globalData.showPlayer = true;
  app.globalData.isPlaying = true;
  app.globalData.playingId = music.id;
  app.globalData.music = music;
  app.globalData.backgroundAudioManager = backgroundAudioManager
}

function setPageModel(path, pageModel) {
  // 将页面的 model 保存下来，在需要的时候调用页面中的方法或者获取属性
  app.globalData.pageModels[path] = pageModel;
}

function _updatePagePlayStatus() {
  let pm = app.globalData.pageModels;
  if (Object.keys(pm).length) {
    for (let key in pm) {
      pm[key].updatePlayStatus();
    }
  }
}

module.exports = {
  playMusic: playMusic,
  setPageModel: setPageModel
}