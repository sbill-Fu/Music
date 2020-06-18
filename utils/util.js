const app = getApp();

function playMusic(music) {
  const backgroundAudioManager = wx.getBackgroundAudioManager();
  backgroundAudioManager.title = music.name;
  backgroundAudioManager.epname = music.name;
  backgroundAudioManager.singer = music.singer;
  backgroundAudioManager.coverImgUrl = music.imgUrl;
  // 设置了 src 之后会自动播放
  backgroundAudioManager.src = music.url;

  backgroundAudioManager.onEnded(() => {
    app.globalData.isPlaying = false;
  });

  
  app.globalData.showPlayer = true;
  app.globalData.isPlaying = true;
  app.globalData.playingId = music.id;
  app.globalData.music = music;
}

function musicStart() {
  wx.playBackgroundAudio();
  app.globalData.isPlaying = true;
}

function musicStop() {
  wx.pauseBackgroundAudio();
  app.globalData.isPlaying = false;
}

module.exports = {
  playMusic: playMusic,
  musicStop: musicStop,
  musicStart: musicStart
}