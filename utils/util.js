const app = getApp();

function playMusic(music) {
  const backgroundAudioManager = wx.getBackgroundAudioManager();
  backgroundAudioManager.title = music.name;
  backgroundAudioManager.epname = music.name;
  backgroundAudioManager.singer = music.singer;
  backgroundAudioManager.coverImgUrl = music.imgUrl;
  // 设置了 src 之后会自动播放
  backgroundAudioManager.src = music.url;
  wx.setStorageSync('backgroundAudioManager', backgroundAudioManager);

  backgroundAudioManager.onEnded(() => {
    app.globalData.isPlaying = false;
    let pm = app.globalData.pageModels;
    if (Object.keys(pm).length) {
      for (let key in pm) {
        pm[key].updatePlayStatus();
      }
    }
    // app.globalData.pageModels['pages/recommend/recommend'].updatePlayStatus();
    // app.globalData.pageModels['pages/personal/personal'].updatePlayStatus();
  });

  
  app.globalData.showPlayer = true;
  app.globalData.isPlaying = true;
  app.globalData.playingId = music.id;
  app.globalData.music = music;
  app.globalData.backgroundAudioManager = backgroundAudioManager
}

function musicStart() {
  wx.playBackgroundAudio();
  app.globalData.isPlaying = true;
}

function musicStop() {
  wx.pauseBackgroundAudio();
  app.globalData.isPlaying = false;
}

function setPageModel(path, pageModel) {
  // 将页面的 model 保存下来，在需要的时候调用页面中的方法或者获取属性
  app.globalData.pageModels[path] = pageModel;
}

module.exports = {
  playMusic: playMusic,
  musicStop: musicStop,
  musicStart: musicStart,
  setPageModel: setPageModel
}